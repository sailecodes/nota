import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { Button } from "../ui/button";

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
      <CardFooter>
        {/* TODO: Fix bg bug */}
        <div className="p-[2px] rounded-md hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:via-green-500 hover:to-indigo-400 animate-gradient-x">
          <Button
            variant="secondary"
            className="hover:cursor-pointer">
            Upgrade subscription
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
