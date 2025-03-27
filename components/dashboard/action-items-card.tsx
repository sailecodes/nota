import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { Button } from "../ui/button";

export default function ActionItemsCard() {
  return (
    <Card>
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
        <Button
          variant="secondary"
          className="w-full hover:cursor-pointer">
          See actions
        </Button>
      </CardFooter>
    </Card>
  );
}
