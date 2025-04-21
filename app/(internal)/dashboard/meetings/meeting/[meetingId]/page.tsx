"use client";

import { Result, User } from "@/app/generated/prisma";
import ActionItemSnippet from "@/components/internal/meetings/action-item-snippet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProcessStatus } from "@/utils/enum";
import { getActionItemDueStatusBadgeColor, getDate, getUploader } from "@/utils/utils";
import { Calendar, CalendarClock, UserCheck2Icon, UserCircle2 } from "lucide-react";
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
      {/* TODO: Create skeleton */}
      {!meeting && <span>Loading data...</span>}
      {meeting && (
        <>
          <div className="space-y-1">
            <span className="inline-block text-2xl font-semibold mb-2">{meeting.title}</span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" /> {"Jan 1, 2025"}
            </span>
            <span className="flex gap-2 items-center text-muted-foreground text-sm">
              <UserCircle2 className="w-4 h-4" />{" "}
              {getUploader(meeting.uploader.firstName, meeting.uploader.lastName)}
            </span>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
            <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-lg">
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </span>
                  <span className="text-muted-foreground">{meeting.result.summary}</span>
                </div>
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
