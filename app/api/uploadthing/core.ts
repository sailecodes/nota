import { createClient } from "@/utils/supabase/server";
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
      const {
        data: { user },
        error,
      } = await (await createClient()).auth.getUser();

      if (!user) throw new UploadThingError("Unauthorized access");
      else if (error) throw new UploadThingError(error.message);

      return {
        user: {
          userId: user.user_metadata.sub,
          firstName: user.user_metadata.firstName,
          lastName: user.user_metadata.lastName,
        },
      };
    })
    .onUploadComplete(async ({ metadata, file: { name, size, ufsUrl } }) => ({
      file: {
        name,
        size,
        url: ufsUrl,
      },
      user: metadata.user,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
