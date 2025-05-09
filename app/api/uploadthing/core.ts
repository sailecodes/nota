import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { transcribe } from "@/actions/transcribe.action";
import { summarize } from "@/actions/summarize.action";
import { revalidatePath } from "next/cache";
import { ProcessStatus, Result, User } from "@/app/generated/prisma";

const f = createUploadthing();

export const ourFileRouter = {
  audioUploader: f({
    audio: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const {
        data: { user },
        error,
      } = await (await createClient()).auth.getUser();

      if (!user) throw new UploadThingError("Unauthorized access");
      else if (error) throw new UploadThingError(error.message);

      return { user: { id: user.user_metadata.sub } };
    })
    .onUploadComplete(async ({ metadata, file: { name, ufsUrl } }) => {
      try {
        const currUser = await prisma.user.findUnique({ where: { supabaseId: metadata.user.id } });

        if (!currUser) throw new UploadThingError(`Cannot find user with id ${metadata.user.id}`);

        // 1. Create new Meeting record
        // TODO: Include team

        const newUpload = await prisma.meeting.create({
          include: {
            uploader: true,
            team: true,
          },
          data: {
            title: name,
            fileUrl: ufsUrl,
            uploaderId: currUser.id,
          },
        });

        revalidatePath("/dashboard/meetings");

        // 2. Transcribe audio file

        const { transcript } = await transcribe(ufsUrl);

        // 3. Update Upload record to process status `SUMMARIZING`

        await prisma.meeting.update({
          where: {
            id: newUpload.id,
          },
          data: {
            processStatus: ProcessStatus.SUMMARIZING,
          },
        });

        revalidatePath("/dashboard/meetings");

        // 4. Summarize (and extract) transcript

        const result = await summarize(transcript!);

        if ("error" in result) throw new UploadThingError("Error occurred during summarization");

        // 5. Update Upload record to process status `COMPLETED`

        await prisma.meeting.update({
          where: {
            id: newUpload.id,
          },
          data: {
            processStatus: ProcessStatus.COMPLETED,
          },
        });

        // 6. Create new Result record
        // TODO: Include team
        // TODO: Action items

        const newResult = await prisma.result.create({
          include: {
            meeting: true,
          },
          data: {
            summary: result.summary,
            meetingId: newUpload.id,
          },
        });

        // 7. Create related ActionItem records

        await prisma.actionItem.createMany({
          data: await formatActionItems(result.actionItems, newResult.id),
        });

        revalidatePath("/dashboard/meetings");
      } catch (e) {
        // TODO: Implement failure
        console.error((e as Error).message);
        throw new UploadThingError((e as Error).message);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

const isValidDate = (date: string) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

type RawActionItem = {
  action: string;
  assignee?: string;
  dueDate?: string;
};

export async function formatActionItems(items: RawActionItem[], resultId: string) {
  return await Promise.all(
    items.map(async (item) => {
      let assigneeId: string | undefined = undefined;

      if (item.assignee) {
        // FIXME: Temporary logic...
        //        Only finding first user that matches assignee
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ firstName: item.assignee }, { lastName: item.assignee }],
          },
        });

        if (user) assigneeId = user.id;
      }

      const dueDate =
        item.dueDate && isValidDate(item.dueDate) ? new Date(item.dueDate) : undefined;

      return {
        action: item.action,
        dueDate,
        assigneeId,
        resultId,
      };
    })
  );
}
