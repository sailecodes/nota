import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IMeetingCardProps } from "@/schemas";
import { EProcessStatus } from "@/utils/enum";
import { getDate, getMeetingStatusBadgeColor } from "@/utils";
import { Calendar, CircleAlert, ListTodo } from "lucide-react";
import Link from "next/link";

export default function MeetingCard({
  title,
  processStatus,
  uploader,
  dateUploaded,
  summary,
  numOfActionItems,
  meetingId,
}: IMeetingCardProps) {
  return (
    <Card className="bg-background justify-between">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle className="line-clamp-2 leading-5">{title}</CardTitle>
          <Badge className={getMeetingStatusBadgeColor(processStatus)}>
            {processStatus.charAt(0) + processStatus.slice(1).toLocaleLowerCase()}
          </Badge>
        </div>
        <CardDescription>Uploaded by {uploader}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{getDate(dateUploaded)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListTodo className="h-4 w-4" />
          <Link
            href="/dashboard/action-items"
            className="hover:underline">
            {numOfActionItems} {numOfActionItems !== 1 ? " action items" : " action item"}
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        {processStatus === EProcessStatus.FAILED ? (
          <div className="flex gap-2 items-center text-sm font-medium text-red-400">
            <CircleAlert className="size-4 stroke-red-400" /> An error occurred. Please retry
            uploading the file.
          </div>
        ) : (
          <Link
            href={`/dashboard/meetings/meeting/${meetingId}`}
            className={buttonVariants({ variant: "secondary", className: "w-full" })}>
            View details
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
