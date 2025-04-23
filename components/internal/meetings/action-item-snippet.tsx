"use client";

import { DueStatus } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionItemSnippetProps } from "@/schemas";
import { getActionItemDueStatusBadgeColor, getDate, parseStatus, parseName } from "@/utils";
import { CalendarClock, UserCheck2Icon } from "lucide-react";
import { useState } from "react";

export default function ActionItemSnippet({
  action,
  dueDate,
  assignee,
  dueStatus,
}: ActionItemSnippetProps) {
  const [status, setStatus] = useState<DueStatus>(dueStatus);

  const handleMarkAsComplete = () => {
    // TODO: Create a server action to update db dueStatus field
    if (status !== "COMPLETED") setStatus("COMPLETED");
    else setStatus(dueStatus);
  };

  return (
    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
      <span className="block font-semibold line-clamp-1">{action}</span>
      <Badge className={`self-start justify-self-end  ${getActionItemDueStatusBadgeColor(status)}`}>
        {parseStatus(status)}
      </Badge>
      <div className="space-y-1">
        <span className="flex gap-2 items-center text-muted-foreground text-sm">
          <CalendarClock className="w-4 h-4" /> {getDate(dueDate)}
        </span>
        <span className="flex gap-2 items-center text-muted-foreground text-sm">
          <UserCheck2Icon className="w-4 h-4" />
          {parseName(assignee?.firstName, assignee?.lastName)}
        </span>
      </div>
      <Button
        className="max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end
        w-[165px] hover:cursor-pointer"
        variant="secondary"
        onClick={handleMarkAsComplete}>
        {status === "COMPLETED" ? "Unmark as complete" : "Mark as complete"}
      </Button>
    </div>
  );
}
