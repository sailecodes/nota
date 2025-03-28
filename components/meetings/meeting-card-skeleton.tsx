import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusBadgeColor } from "@/lib/utils";
import { Calendar, ListTodo } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function MeetingCardSkeleton() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <Skeleton className="h-[22px] w-[190px]" />
          <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
        </div>
        <CardDescription>
          <Skeleton className="h-[18px] w-[140px]" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4" />
          <Skeleton className="h-[18px] w-[100px]" />
        </div>
        <p className="space-y-2 mb-3">
          <Skeleton className="h-[18px] w-full" />
          <Skeleton className="h-[18px] w-full" />
        </p>
        <div className="flex items-center gap-2">
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
