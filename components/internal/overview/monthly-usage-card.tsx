import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { Button, buttonVariants } from "../../ui/button";
import Link from "next/link";

export default function MonthlyUsageCard() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardDescription>
          <CardDescription className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            <span>Monthly usage</span>
          </CardDescription>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            2 <span className="text-xs text-muted-foreground">/ 3 uploads</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-muted-foreground">Keep an eye on your upload count</span>
      </CardContent>
      <CardFooter className="px-[23px]">
        <div className="w-full p-[2px] rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:via-green-500 hover:to-indigo-400 animate-gradient-x">
          <Link
            href="/dashboard/subscription"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full hover:bg-secondary/100",
            })}>
            Upgrade subscription
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
