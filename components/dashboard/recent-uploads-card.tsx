import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

export default function RecentUploadsCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Recent uploads</span>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            2 <span className="text-xs text-muted-foreground">completed</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button
          variant="secondary"
          className="w-full hover:cursor-pointer">
          View summaries
        </Button>
      </CardFooter>
    </Card>
  );
}
