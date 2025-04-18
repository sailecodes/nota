import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { transcribe } from "@/actions/transcribe.action";
import { summarize } from "@/actions/summarize.action";
import { ProcessStatus } from "@/utils/enum";
import { Result, User } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

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

        const newResult = await prisma.result.create({
          include: {
            actionItems: true,
            upload: true,
          },
          data: {
            summary: result.summary,
            // actionItems: {
            //   createMany: {
            //     data: modifyActionItems(result.actionItems),
            //   },
            // },
            uploadId: newUpload.id,
          },
        });

        console.log("result:\n", result);
        console.log("new result:\n", result);

        revalidatePath("/dashboard/meetings");
      } catch (e) {
        // TODO: Implement failure
        console.error((e as Error).message);
        throw new UploadThingError((e as Error).message);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// export function modifyActionItems(
//   actionItems: {
//     action: string;
//     dueDate?: string | undefined;
//     assignee?: string | undefined;
//   }[],
//   assignee: User | undefined,
//   result: Result
// ): {
//   action: string,
//   dueDate?: string | undefined,
//   assignee?: string | undefined,
// } {
//   return actionItems.map((actionItem) => {
//     let a = { ...actionItem, assigneeId: assignee?.id, resultId: result.id };
//   });
// }
