import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import prisma from "@/lib/prisma";
import { ProcessStatus } from "@/utils/enum";
import { parseName } from "@/utils/utils";

export default async function Meetings() {
  const meetings = await prisma.meeting.findMany({
    include: {
      result: {
        include: { actionItems: true },
      },
      uploader: true,
    },
  });

  if (meetings.length === 0)
    return (
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 font-medium text-center text-lg">
        No meetings yet :(
        <br />
        Try uploading?
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-[25px]">
      <div
        className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px]
      justify-center gap-3">
        {meetings.map((meeting) => {
          if (meeting.processStatus !== ProcessStatus.COMPLETED)
            return (
              <MeetingCardSkeleton
                key={meeting.id}
                title={meeting.title}
                processStatus={meeting.processStatus}
                uploader={parseName(meeting.uploader.firstName, meeting.uploader.lastName)}
                dateUploaded={meeting.createdAt}
              />
            );
          else
            return (
              <MeetingCard
                key={meeting.id}
                uploadId={meeting.id}
                title={meeting.title}
                processStatus={meeting.processStatus}
                uploader={parseName(meeting.uploader.firstName, meeting.uploader.lastName)}
                dateUploaded={meeting.createdAt}
                summary={meeting.result!.summary}
                numOfActionItems={meeting.result!.actionItems.length}
              />
            );
        })}
      </div>
    </section>
  );
}
