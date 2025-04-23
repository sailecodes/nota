"use client";

import ActionItemSnippet from "@/components/internal/meetings/action-item-snippet";
import MeetingSkeleton from "@/components/internal/meetings/meeting-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { parseName } from "@/utils";
import { Calendar, UserCircle2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Prisma } from "@/app/generated/prisma";
import { IMeetingProps } from "@/schemas";

export default function Meeting({ params }: IMeetingProps) {
  const { meetingId } = use(params);
  const [meeting, setMeeting] = useState<Prisma.UploadGetPayload<{
    include: {
      result: {
        include: {
          actionItems: {
            include: {
              assignee: true;
            };
          };
        };
      };
      uploader: true;
    };
  }> | null>(null);

  useEffect(() => {
    const getMeeting = async () => {
      const res = await fetch(`/api/meetings?meetingId=${meetingId}`);
      const data = await res.json();

      setMeeting(data);
    };

    getMeeting();
  }, []);

  return (
    <>
      {!meeting && <MeetingSkeleton />}
      {meeting && (
        <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-10">
          <div className="space-y-1">
            <span className="inline-block text-2xl font-semibold mb-2">{meeting.title}</span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" /> {"Jan 1, 2025"}
            </span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <UserCircle2 className="w-4 h-4" />
              {parseName(meeting.uploader.firstName, meeting.uploader.lastName)}
            </span>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
            <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
              <CardContent>
                <Tabs
                  defaultValue="summary"
                  className="gap-5">
                  <TabsList className="bg-background border">
                    <TabsTrigger
                      value="summary"
                      className="border-none hover:cursor-pointer">
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      value="transcript"
                      className="border-none hover:cursor-pointer">
                      Transcript
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <div className="flex flex-col gap-4">
                      <span className="font-semibold text-lg">Summary</span>
                      <span className="text-muted-foreground text-sm leading-6">
                        {meeting.result!.summary}
                      </span>
                    </div>
                  </TabsContent>
                  <TabsContent value="transcript">
                    <div className="flex flex-col gap-4">
                      <span className="font-semibold text-lg">Transcript</span>
                      <span className="text-muted-foreground text-sm leading-6">
                        {meeting.result!.transcript}
                      </span>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
              <CardHeader className="text-lg font-semibold">Action Items</CardHeader>
              <CardContent className="space-y-5">
                {meeting.result!.actionItems.map(
                  ({ action, dueDate, assignee, dueStatus }, ind) => (
                    <>
                      <ActionItemSnippet
                        action={action}
                        dueDate={dueDate}
                        assignee={assignee}
                        dueStatus={dueStatus}
                      />
                      {ind < meeting.result!.actionItems.length - 1 && <Separator />}
                    </>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
