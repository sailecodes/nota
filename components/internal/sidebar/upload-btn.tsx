"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { CheckCircle2, PlusCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

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
          onClientUploadComplete={(res) => {
            toast.success("Uploaded successfuly!", {
              description: `${res[0].serverData.fileName}`,
              icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
            });

            console.log(res[0]);

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
          onUploadBegin={() => {
            console.log("begin upload");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
