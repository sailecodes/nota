"use client";

import { Result, User } from "@/app/generated/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProcessStatus } from "@/utils/enum";
import { getDate, getUploader } from "@/utils/utils";
import { CalendarClock, UserCheck2Icon, UserCircle2 } from "lucide-react";
import { use, useEffect, useState } from "react";

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
  const [view, setView] = useState("summary");

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
      {!meeting && <span>Loading data...</span>}
      {meeting && (
        <>
          <div className="space-y-1">
            <span className="inline-block text-2xl font-semibold mb-2">{meeting.title}</span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <CalendarClock className="w-4 h-4" /> {"Jan 1, 2025"}
            </span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <UserCircle2 className="w-4 h-4" /> {getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
            </span>
          </div>
          <div className="flex gap-4">
            <Card className="bg-background w-[60%]">
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-lg">{view.charAt(0).toUpperCase() + view.slice(1)}</span>
                  <span className="text-muted-foreground">{meeting.result.summary}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-lg">Key Insights</span>
                  <ul className="grid grid-cols-2 list-disc list-inside text-muted-foreground">
                    <li>Insight 1</li>
                    <li>Insight 2</li>
                    <li>Insight 3</li>
                    <li>Insight 4</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background w-[40%]">
              <CardHeader className="text-lg font-semibold">Action Items</CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <span className="block font-semibold">Walk the dog</span>
                    <span className="text-muted-foreground">
                      Captured in <span className="font-semibold">Family Meeting 2025</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="flex gap-2 items-center text-muted-foreground text-sm">
                      <CalendarClock className="w-4 h-4" /> {"April 1, 2025"}
                    </span>
                    <span className="flex gap-2 items-center text-muted-foreground text-sm">
                      <UserCheck2Icon className="w-4 h-4" />
                      {getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between gap-4">
                  <div>
                    <span className="block font-semibold">Buy donuts</span>
                    <span className="text-muted-foreground">
                      Captured in <span className="font-semibold">Nota standup</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="flex gap-2 items-center text-muted-foreground text-sm">
                      <CalendarClock className="w-4 h-4" /> {"April 13, 2025"}
                    </span>
                    <span className="flex gap-2 items-center text-muted-foreground text-sm">
                      <UserCheck2Icon className="w-4 h-4" />
                      {getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <h1 className="text-2xl font-semibold">{meeting.title}</h1>

          {meeting.result?.summary && (
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Summary</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{meeting.result.summary}</p>
            </div>
          )}

          {meeting.result?.actionItems?.length ? (
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Action Items</h2>
              <ul className="list-disc list-inside space-y-1">
                {meeting.result.actionItems.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm">
                    <span className="font-medium">{item.action}</span>
                    {item.assignee && (
                      <span className="text-muted-foreground">
                        {" "}
                        — assigned to {item.assignee.name}
                      </span>
                    )}
                    {item.dueDate && (
                      <span className="text-muted-foreground">
                        {" "}
                        — due by {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No action items extracted.</p>
          )} */}
          </div>
        </>
      )}
    </section>
  );
}
