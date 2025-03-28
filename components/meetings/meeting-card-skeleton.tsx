import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ListTodo } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface MeetingCardSkeletonProps {
  title: string;
  uploadedBy: string;
  dateUploaded: string;
}

export default function MeetingCardSkeleton({ title, uploadedBy, dateUploaded }: MeetingCardSkeletonProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
        </div>
        <CardDescription>Uploaded by {uploadedBy}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{dateUploaded}</span>
        </div>
        <div className="space-y-2 mb-3">
          <Skeleton className="h-[18px] w-full" />
          <Skeleton className="h-[18px] w-full" />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ListTodo className="h-4 w-4" />
          <Skeleton className="h-[18px] w-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
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
