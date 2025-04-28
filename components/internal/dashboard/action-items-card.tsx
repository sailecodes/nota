import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { Button } from "../../ui/button";
import { IActionItemsCardProps } from "@/schemas";

export default function ActionItemsCard({ user }: IActionItemsCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <ListTodo className="w-5 h-5" />
          <span>Action items</span>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            {user?.actionItems.length}
            <span className="text-xs text-muted-foreground"> due soon</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-muted-foreground">
          Tasks from recent meetings need attention
        </span>
      </CardContent>
      <CardFooter className="px-[23px]">
        <div className="w-full p-[2px] rounded-md">
          <Button
            disabled
            variant="secondary"
            className="w-full">
            Actions page coming soon
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
