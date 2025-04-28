import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import NoMeetings from "@/components/internal/meetings/no-meetings";
import prisma from "@/lib/prisma";
import { EProcessStatus } from "@/schemas/enum";
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

  return (
    <>
      {uploads.length < 1 && <NoMeetings />}
      {uploads.length >= 0 && (
        <section
          className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px]
          justify-center gap-3 max-w-7xl mx-auto p-4 pb-[25px]">
          {uploads.map((upload) =>
            upload.processStatus !== EProcessStatus.COMPLETED ? (
              <MeetingCardSkeleton
                key={upload.id}
                title={upload.title}
                processStatus={upload.processStatus}
                uploader={parseName(upload.uploader.firstName, upload.uploader.lastName)}
                createdAt={upload.createdAt}
              />
            ) : (
              <MeetingCard
                key={upload.id}
                meetingId={upload.id}
                title={upload.title}
                processStatus={upload.processStatus}
                uploader={parseName(upload.uploader.firstName, upload.uploader.lastName)}
                createdAt={upload.createdAt}
                summary={upload.result!.summary}
                actionItemsNum={upload.result!.actionItems.length}
              />
            )
          )}
        </section>
      )}
    </>
  );
}
