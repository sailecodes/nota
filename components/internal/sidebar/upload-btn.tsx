"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { CheckCircle2, CircleX, Info, PlusCircle, Upload } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { summarize } from "@/actions/summarize.action";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { useCallback, useState } from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default function UploadButton() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("audioUploader", {
    onClientUploadComplete: async (res) => {
      const { transcript, uploadId } = res[0].serverData;

      toast.success("Uploaded successfully!", {
        description: `Your file has been safely stored in our dedicated servers`,
        icon: <CheckCircle2 className="size-4 stroke-green-300" />,
      });

      toast.info("Starting summarization process...", {
        icon: <Info className="size-4" />,
      });

      const meeting = await prisma.upload.findUnique({ where: { id: uploadId } });
      meeting!.processStatus = "SUMMARIZING";

      revalidatePath("/dashboard/meetings");

      const result = await summarize(transcript!);

      if ("error" in result) {
        console.error(result.error); // TODO:
      } else {
        meeting!.processStatus = "COMPLETED";

        const dbResult = await prisma.result.create({
          include: {
            upload: true,
            actionItems: true,
          },
          data: {
            summary: result.summary,
            actionItems: result.actionItems,
            uploadId: meeting?.id,
          },
        });
      }

      // TODO:
      //  show in meetings as "transcribing"
    },
    onUploadError: (e) => {
      toast.error(e.message, {
        icon: <CircleX className="size-4 stroke-red-300" />,
      });
    },
    onUploadBegin: () => {
      toast.info("Uploading file...", {
        icon: <Info className="size-4" />,
      });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(generatePermittedFileTypes(routeConfig).fileTypes),
  });

  const handleDialogOpenChange = () => setFiles([]);

  const isFileReady = files.length > 0;

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full hover:cursor-pointer">
          <PlusCircle />
          <span>Upload meeting</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[320px]">
        <VisuallyHidden>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Choose a file or drag and drop</DialogDescription>
        </VisuallyHidden>
        <div
          {...getRootProps()}
          className="flex flex-col justify-center items-center gap-4">
          <input {...getInputProps()} />
          <Upload className="size-12" />
          <div className="flex flex-col items-center">
            <span className="text-base font-medium">
              {isFileReady ? files[0].name : "Choose a file or drag and drop"}
            </span>
            <span className="text-muted-foreground">Audio (32MB)</span>
          </div>
          <Button
            onClick={() => startUpload(files)}
            disabled={!isFileReady}
            variant={isFileReady ? "default" : "secondary"}
            className="w-[150px] hover:cursor-pointer">
            {isFileReady ? "Upload file" : "Select file"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
