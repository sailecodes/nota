import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export default function ActionItemsCard() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <ListTodo className="w-5 h-5" />
          <span>Action items</span>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            5 <span className="text-xs text-muted-foreground">due soon</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-muted-foreground">Tasks from recent meetings need attention</span>
      </CardContent>
      <CardFooter className="px-[23px]">
        <div className="w-full p-[2px] rounded-md">
          <Link
            href="/dashboard/action-items"
            className={buttonVariants({ variant: "secondary", className: "w-full" })}>
            See actions
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
