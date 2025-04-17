import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import prisma from "@/lib/prisma";
import { getUploader } from "@/utils/utils";

export default async function Meetings() {
  const meetings = await prisma.upload.findMany({
    include: { result: true, uploader: true, team: true },
  });

  return (
    // <section className="grid grid-cols-3 auto-rows-[300px] gap-3 max-w-7xl mx-auto p-4">
    <section className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px] justify-center gap-3 max-w-7xl mx-auto p-4 pb-[25px]">
      {/* TODO: Implement search bar and filter */}
      {meetings.map((upload) => {
        if (upload.processStatus === "COMPLETED")
          return (
            <MeetingCard
              key={upload.id}
              uploadId={upload.id}
              title={upload.title}
              processStatus={upload.processStatus}
              uploader={getUploader(upload.uploader.firstName, upload.uploader.lastName)}
              dateUploaded={upload.createdAt}
              summary={
                "Introduced new sales materials, trained reps on updated product pitch, and discussed KPIs."
              }
              numOfActionItems={3}
            />
          );
        else if (upload.processStatus === "FAILED") return <div>failed</div>;
        else
          return (
            <MeetingCardSkeleton
              key={upload.id}
              title={upload.title}
              processStatus={upload.processStatus}
              uploader={getUploader(upload.uploader.firstName, upload.uploader.lastName)}
              dateUploaded={upload.createdAt}
            />
          );
      })}
    </section>
  );
}
