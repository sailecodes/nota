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
import { ProcessStatus } from "@/schemas";
import { getMeetingStatusBadgeColor } from "@/utils/utils";
import { Calendar, ListTodo } from "lucide-react";
import Link from "next/link";

interface MeetingCardProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  dateUploaded: Date;
  summary: string;
  numOfActionItems: number;
  uploadId: string;
}

export default function MeetingCard({
  title,
  processStatus,
  uploader,
  dateUploaded,
  summary,
  numOfActionItems,
  uploadId,
}: MeetingCardProps) {
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
          <span>{dateUploaded.getDate()}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListTodo className="h-4 w-4" />
          <Link
            href="/dashboard/action-items"
            className="hover:underline">
            {numOfActionItems} {numOfActionItems > 1 ? " action items" : "action item"}
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        {/* TODO: */}
        <Link
          href={`/dashboard/meetings/${uploadId}`}
          className={buttonVariants({ variant: "secondary", className: "w-full" })}>
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
