"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { CircleX, Info, PlusCircle, Upload } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("audioUploader", {
    onClientUploadComplete: async () => {
      setIsDialogOpen(false);
      router.push("/dashboard/meetings");
    },
    onUploadError: (e) => {
      console.error(e.message);
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

  const handleDialogOpenChange = () => {
    setFiles([]);
    setIsDialogOpen((prev) => !prev);
  };

  const isFileReady = files.length > 0;

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      open={isDialogOpen}>
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
          {/* FIXME: Button shouldn't make file explorer popup */}
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
