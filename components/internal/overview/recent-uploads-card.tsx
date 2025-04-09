import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { buttonVariants } from "../../ui/button";
import Link from "next/link";

export default function RecentUploadsCard() {
  return (
    <Card className="bg-background">
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
      <CardContent>
        <span className="text-sm text-muted-foreground">
          Latest meetings are summarized and ready
        </span>
      </CardContent>
      <CardFooter className="px-[23px]">
        <div className="w-full p-[2px] rounded-md">
          <Link
            href="/dashboard/summaries"
            className={buttonVariants({ variant: "secondary", className: "w-full" })}>
            View summaries
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
