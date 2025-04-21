"use client";

import { Result, User } from "@/app/generated/prisma";
import ActionItemSnippet from "@/components/internal/meetings/action-item-snippet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProcessStatus } from "@/utils/enum";
import { parseName } from "@/utils/utils";
import { Calendar, UserCircle2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MeetingSkeleton from "@/components/internal/meetings/meeting-skeleton";

type Meeting = {
  id: string;
  title: string;
  fileUrl: string;
  processStatus: ProcessStatus;
  result: Result;
  uploader: User;
  uploaderId: string;
  teamId?: string;
  createdAt: Date;
  updatedAt: Date;
};

type ActionItem = {};

export default function Meeting({ params }: { params: Promise<{ meetingId: string }> }) {
  const { meetingId } = use(params);
  const [meeting, setMeeting] = useState<Meeting | undefined>(undefined);

  useEffect(() => {
    const getMeeting = async () => {
      const res = await fetch(`/api/meetings?meetingId=${meetingId}`);
      const data = await res.json();

      setMeeting(data);
    };

    getMeeting();
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-10">
      {!meeting && <MeetingSkeleton />}
      {meeting && (
        <>
          <div className="space-y-1">
            <span className="inline-block text-2xl font-semibold mb-2">{meeting.title}</span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" /> {"Jan 1, 2025"}
            </span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <UserCircle2 className="w-4 h-4" />{" "}
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
                        {meeting.result.summary}
                      </span>
                    </div>
                  </TabsContent>
                  <TabsContent value="transcript">
                    <div className="flex flex-col gap-4">
                      <span className="font-semibold text-lg">Transcript</span>
                      <span className="text-muted-foreground text-sm leading-6">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, iste neque?
                        Iste molestiae dolorum culpa sequi aliquam laudantium facilis consequuntur
                        quasi deserunt in, mollitia cum eveniet quos quo, omnis vitae? Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Dolores quasi totam rem
                        laudantium. Aperiam, adipisci, placeat, animi laboriosam repellat laudantium
                        impedit itaque dignissimos quae doloremque explicabo nesciunt aut amet
                        atque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, iste
                        neque? Iste molestiae dolorum culpa sequi aliquam laudantium facilis
                        consequuntur quasi deserunt in, mollitia cum eveniet quos quo, omnis vitae?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi totam
                        rem laudantium. Aperiam, adipisci, placeat, animi laboriosam repellat
                        laudantium impedit itaque dignissimos quae doloremque explicabo nesciunt aut
                        amet atque.
                      </span>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
              <CardHeader className="text-lg font-semibold">Action Items</CardHeader>
              <CardContent className="space-y-5">
                <ActionItemSnippet
                  action="Walk the dog"
                  fileName="Family Meeting 2025"
                  dueDate={new Date("April 5, 2025")}
                  assignee="Sandra R."
                  dueStatus="DUE_SOON"
                />
                <Separator />
                <ActionItemSnippet
                  action="Get standup breakfast"
                  fileName="Standup 2"
                  dueDate={new Date("April 11, 2025")}
                  assignee="Elias R."
                  dueStatus="NEW"
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </section>
  );
}
