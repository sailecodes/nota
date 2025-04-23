import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import prisma from "@/lib/prisma";
import { EProcessStatus } from "@/utils/enum";
import { parseName } from "@/utils";

export default async function Meetings() {
  const uploads = await prisma.upload.findMany({
    include: {
      result: {
        include: { actionItems: true },
      },
      uploader: true,
    },
  });

  if (uploads.length === 0)
    return (
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 font-medium text-center text-lg">
        No meetings yet :(
        <br />
        Try uploading?
      </div>
    );

  return (
    <section
      className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px]
      justify-center gap-3 max-w-7xl mx-auto p-4 pb-[25px] space-y-[25px]">
      {uploads.map((upload) => {
        if (upload.processStatus !== EProcessStatus.COMPLETED)
          return (
            <MeetingCardSkeleton
              key={upload.id}
              title={upload.title}
              processStatus={upload.processStatus}
              uploader={parseName(upload.uploader.firstName, upload.uploader.lastName)}
              dateUploaded={upload.createdAt}
            />
          );
        else
          return (
            <MeetingCard
              key={upload.id}
              meetingId={upload.id}
              title={upload.title}
              processStatus={upload.processStatus}
              uploader={parseName(upload.uploader.firstName, upload.uploader.lastName)}
              dateUploaded={upload.createdAt}
              summary={upload.result!.summary}
              numOfActionItems={upload.result!.actionItems.length}
            />
          );
      })}
    </section>
  );
}
