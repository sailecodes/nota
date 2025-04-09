import { createClient } from "@/lib/utils/supabase/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  audioUploader: f({
    audio: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // TODO: Maybe implement better error handling
      if (!user) throw new UploadThingError("Unauthorized");
      else if (error) throw new UploadThingError(error.message);

      return {
        user: {
          userId: user.user_metadata.sub,
          firstName: user.user_metadata.firstName,
          lastName: user.user_metadata.lastName,
        },
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { fileUrl: file.ufsUrl, fileName: file.name, user: metadata.user };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
