"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { CheckCircle2, Info, PlusCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { summarize } from "@/actions/summarize.action";

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
            const { transcript, uploadId } = res[0].serverData;

            console.log(transcript);

            toast.success("Uploaded successfully!", {
              description: `Your file is safely stored in our trusted servers`,
              icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
            });

            toast.info("Starting summarization and extraction process", {
              icon: <Info className="w-4 h-4" />,
            });

            await summarize(transcript!);

            // TODO:
            //  show in meetings as "transcribing"
          }}
          onUploadError={(error: Error) => {
            console.error(error.message);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
