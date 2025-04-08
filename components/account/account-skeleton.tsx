import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AccountSkeleton() {
  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Profile information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[58px] space-y-2 text-muted-foreground">
              <span className="font-medium text-sm leading-none block">First name</span>
              <Skeleton className="h-[36px]" />
            </div>
            <div className="h-[58px] space-y-2 text-muted-foreground">
              <span className="font-medium text-sm leading-none block">Last name</span>
              <Skeleton className="h-[36px]" />
            </div>
            <div className="h-[58px] space-y-2 text-muted-foreground">
              <span className="font-medium text-sm leading-none block">Username</span>
              <Skeleton className="h-[36px]" />
            </div>
            <Button
              variant="secondary"
              className="self-end justify-self-end">
              Update information
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
