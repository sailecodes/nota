import MeetingCard from "@/components/internal/meetings/meeting-card";
import MeetingCardSkeleton from "@/components/internal/meetings/meeting-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { ProcessStatus } from "@/utils/enum";
import { parseName } from "@/utils/utils";
import { Badge, Calendar, ListTodo } from "lucide-react";
import Link from "next/link";

export default async function Meetings() {
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
      {meetings.length === 0 && <div>No meetings</div>}
      {meetings.length >= 0 && (
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
      )}
    </section>
  );
}
