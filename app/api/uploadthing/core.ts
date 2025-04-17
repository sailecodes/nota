import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { transcribe } from "@/actions/transcribe.action";

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

      return {
        user: {
          id: user.user_metadata.sub,
          firstName: user.user_metadata.firstName,
          lastName: user.user_metadata.lastName,
        },
      };
    })
    .onUploadComplete(async ({ metadata, file: { name, size, ufsUrl } }) => {
      // Create Upload record and start transcription process

      let currUser;

      try {
        currUser = await prisma.user.findUnique({ where: { supabaseId: metadata.user.id } });
        console.log(currUser);
      } catch (e) {
        throw new UploadThingError("Prisma error...");
      }

      if (!currUser) throw new UploadThingError(`Cannot find user with id ${metadata.user.id}`);

      const { transcript } = await transcribe(ufsUrl);

      const newUpload = await prisma.upload.create({
        data: {
          title: name,
          fileUrl: ufsUrl,
          uploaderId: currUser.id,
        },
      });

      return { transcript, uploadId: newUpload.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
