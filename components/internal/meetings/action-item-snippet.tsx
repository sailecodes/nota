"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DueStatusType } from "@/schemas";
import { getActionItemDueStatusBadgeColor, getDate, parseActionItemDueStatus } from "@/utils";
import { CalendarClock, UserCheck2Icon } from "lucide-react";
import { useState } from "react";

interface ActionItemSnippetProps {
  action: string;
  fileName: string;
  dueDate: Date;
  assignee: string; // FIXME:
  dueStatus: DueStatusType;
}

export default function ActionItemSnippet({
  action,
  fileName,
  dueDate,
  assignee,
  dueStatus,
}: ActionItemSnippetProps) {
  const [status, setStatus] = useState<DueStatusType>(dueStatus);

  const handleMarkAsComplete = () => {
    // TODO: Create a server action to update db dueStatus field
    if (status !== "COMPLETED") setStatus("COMPLETED");
    else setStatus(dueStatus);
  };

  return (
    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
      <div className="space-y-1">
        <span className="block font-semibold line-clamp-1">{action}</span>
        <span className="text-sm text-muted-foreground line-clamp-2">
          Captured in <span className="font-medium">{fileName}</span>
        </span>
      </div>
      <Badge className={`self-start justify-self-end  ${getActionItemDueStatusBadgeColor(status)}`}>
        {parseActionItemDueStatus(status)}
      </Badge>
      <div className="space-y-1">
        <span className="flex gap-2 items-center text-muted-foreground text-sm">
          <CalendarClock className="w-4 h-4" /> {getDate(dueDate)}
        </span>
        <span className="flex gap-2 items-center text-muted-foreground text-sm">
          <UserCheck2Icon className="w-4 h-4" />
          {assignee}
          {/* {getUploader(meeting.uploader.firstName, meeting.uploader.lastName)} */}
        </span>
      </div>
      <Button
        className="max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end w-[165px] hover:cursor-pointer"
        variant="secondary"
        onClick={handleMarkAsComplete}>
        {status === "COMPLETED" ? "Unmark as complete" : "Mark as complete"}
      </Button>
    </div>
  );
}
