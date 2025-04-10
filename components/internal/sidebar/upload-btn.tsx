"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing/uploader";
import { CheckCircle2, PlusCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { transcribeWithDeepgram } from "@/utils/deepgram/transcription";

export default function UploadButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full hover:cursor-pointer">
          <PlusCircle />
          <span>Upload meeting</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          {/* TODO: Update text */}
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Upload your files here</DialogDescription>
        </VisuallyHidden>
        <UploadDropzone
          endpoint="audioUploader"
          config={{ cn: twMerge }}
          appearance={{
            label: "text-base text-primary",
            allowedContent: "text-sm text-muted-foreground",
            button:
              "ut-ready:bg-primary ut-ready:text-background ut-ready:font-medium ut-ready:text-sm ut-readying:bg-primary ut-readying:text-sm ut-readying:text-background ut-uploading:bg-green-500",
          }}
          onClientUploadComplete={async (res) => {
            const {
              file: { name, size, url },
              user: { userId, firstName, lastName },
            } = res[0].serverData;

            toast.success("Uploaded successfully!", {
              description: `${name} is secured in our trusted storage servers`,
              icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
            });

            // const { transcript } = await transcribeWithDeepgram(url);

            // console.log(transcript);

            // TODO:
            //  upload to neon (postgres db)
            //    - file url
            //    - file name
            //    - user id
            //  show in meetings as "transcribing"
            //  start transcription phase with deepgram
          }}
          onUploadError={(error: Error) => {
            console.error(error.message);
          }}
          onUploadBegin={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
