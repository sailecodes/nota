import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { Button } from "../../ui/button";
import { IMonthlyUsageCardProps } from "@/schemas";

export default function MonthlyUsageCard({ user }: IMonthlyUsageCardProps) {
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
            {user?.totalMonthlyUploads}
            <span className="text-xs text-muted-foreground"> / 5 uploads</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-muted-foreground">Keep an eye on your upload count</span>
      </CardContent>
      <CardFooter className="px-[23px] mt-auto">
        <div className="w-full p-[2px] rounded-md">
          <Button
            disabled
            variant="secondary"
            className="w-full hover:bg-secondary/100">
            Tier upgrade coming soon
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
