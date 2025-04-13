import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ActionItemStatus, getActionItemCardAccentColor, getActionItemStatusBadgeColor } from "@/utils/general";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

interface ActionItemCardProps {
  id: string;
  action: string;
  status: string;
  from: string;
  dueDate: string;
  assignedTo: string;
}

export default function ActionItemCard({ id, action, status, from, dueDate, assignedTo }: ActionItemCardProps) {
  return (
    <Card className="relative justify-between bg-background overflow-hidden">
      <div
        className={`w-10 h-10 rounded-2xl absolute -left-6 -top-6 ${getActionItemCardAccentColor(
          status as ActionItemStatus
        )}`}
      />
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          {/* TODO: line-clamp cuts off previous line */}
          <CardTitle className="line-clamp-2">{action}</CardTitle>
          <Badge className={getActionItemStatusBadgeColor(status as ActionItemStatus)}>{status}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Captured in <span className="font-medium">{from}</span>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4" />
            {dueDate}
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Avatar className="w-4 h-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TL</AvatarFallback>
            </Avatar>
            {assignedTo}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/meetings/${id}`}
            className={buttonVariants({ variant: "ghost" })}>
            View summary
          </Link>
          {/* TODO: Implement functionality */}
          <Button
            variant="secondary"
            className="hover:cursor-pointer">
            Mark as complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
