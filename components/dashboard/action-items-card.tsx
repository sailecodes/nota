import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
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
      <CardFooter>
        <Link
          href="/dashboard/action-items"
          className={buttonVariants({ variant: "secondary", className: "w-full" })}>
          See actions
        </Link>
      </CardFooter>
    </Card>
  );
}
