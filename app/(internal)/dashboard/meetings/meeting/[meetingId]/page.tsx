"use client";

import { Result } from "@/app/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProcessStatus } from "@/utils/enum";
import { use, useEffect, useState } from "react";

type Meeting = {
  id: string;
  title: string;
  fileUrl: string;
  processStatus: ProcessStatus;
  result: Result;
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
      <Select
        defaultValue="summary"
        value={view}
        onValueChange={setView}>
        <SelectTrigger>
          <SelectValue placeholder={"Select a view"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="summary">Summary</SelectItem>
          <SelectItem value="transcript">Transcript</SelectItem>
        </SelectContent>
      </Select>
      {!meeting && <span>Loading data...</span>}
      {meeting && (
        <>
          <div>
            <span className="text-2xl font-semibold">{meeting.title}</span>
          </div>
          <div></div>

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
        </>
      )}
    </section>
  );
}
