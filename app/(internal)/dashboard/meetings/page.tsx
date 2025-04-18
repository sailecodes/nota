import { ProcessStatus } from "@/app/generated/prisma";
import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import prisma from "@/lib/prisma";
import { getUploader } from "@/utils/utils";

export default async function Meetings() {
  // FIXME: Find all meetings related to User's team
  const meetings = await prisma.meeting.findMany({
    include: {
      result: {
        include: { actionItems: true },
      },
      uploader: true,
    },
  });

  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-[25px]">
      {/* TODO: Implement search bar and filter */}
      {meetings.length === 0 && <div>No meetings</div>}
      {meetings.length >= 0 && (
        <div
          className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px]
      justify-center gap-3">
          {meetings.map((meeting) => {
            if (meeting.processStatus === ProcessStatus.COMPLETED)
              return (
                <MeetingCard
                  key={meeting.id}
                  uploadId={meeting.id}
                  title={meeting.title}
                  processStatus={meeting.processStatus}
                  uploader={getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
                  dateUploaded={meeting.createdAt}
                  summary={meeting.result!.summary}
                  numOfActionItems={meeting.result!.actionItems.length}
                />
              );
            else if (meeting.processStatus === ProcessStatus.FAILED) return <div>failed</div>;
            else
              return (
                <MeetingCardSkeleton
                  key={meeting.id}
                  title={meeting.title}
                  processStatus={meeting.processStatus}
                  uploader={getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
                  dateUploaded={meeting.createdAt}
                />
              );
          })}
        </div>
      )}
    </section>
  );
}
