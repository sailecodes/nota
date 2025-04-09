import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionAndBilling() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex flex-col justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current plan</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">Starter</Badge>
              <span className="text-sm text-muted-foreground">Renews Apr 30, 2025</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Usage</p>
            <p className="text-sm font-medium mt-1">2 / 3 uploads used</p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="self-end w-[158px] hover:cursor-pointer">
          Manage plan
        </Button>
      </CardContent>
    </Card>
  );
}
