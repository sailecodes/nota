import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ListTodo } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";
import { getDate, getMeetingSkeletonColor, getMeetingStatusBadgeColor } from "@/utils/utils";
import { ProcessStatus as ProcessStatusType } from "@/schemas";

interface MeetingCardSkeletonProps {
  title: string;
  processStatus: ProcessStatusType;
  uploader: string;
  dateUploaded: Date;
}

export default function MeetingCardSkeleton({
  title,
  processStatus,
  uploader,
  dateUploaded,
}: MeetingCardSkeletonProps) {
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{getDate(dateUploaded)}</span>
        </div>
        <div className="space-y-2 mb-3">
          <Skeleton className={`h-[18px] w-full ${getMeetingSkeletonColor(processStatus)}`} />
          <Skeleton className={`h-[18px] w-full ${getMeetingSkeletonColor(processStatus)}`} />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ListTodo className="h-4 w-4" />
          <Skeleton className={`h-[18px] w-[100px] ${getMeetingSkeletonColor(processStatus)}`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled
          variant="secondary"
          className="w-full">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
