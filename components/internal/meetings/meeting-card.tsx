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
import { getMeetingStatusBadgeColor, MeetingStatus } from "@/lib/utils/general";
import { Calendar, ListTodo } from "lucide-react";
import Link from "next/link";

interface MeetingCardProps {
  title: string;
  status: string;
  uploadedBy: string;
  dateUploaded: string;
  summary: string;
  numOfActionItems: number;
  id: string;
}

export default function MeetingCard({
  title,
  status,
  uploadedBy,
  dateUploaded,
  summary,
  numOfActionItems,
  id,
}: MeetingCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          {/* TODO: line-clamp cuts off previous line */}
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <Badge className={getMeetingStatusBadgeColor(status as MeetingStatus)}>{status}</Badge>
        </div>
        <CardDescription>Uploaded by {uploadedBy}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{dateUploaded}</span>
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
      <CardFooter className="mt-auto">
        <Link
          href={`/dashboard/meetings/${id}`}
          className={buttonVariants({ variant: "secondary", className: "w-full" })}>
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
