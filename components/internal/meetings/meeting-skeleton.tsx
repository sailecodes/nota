import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function MeetingSkeleton() {
  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-10">
      <div className="space-y-1">
        <Skeleton className="w-[250px] h-[32px] mb-2" />
        <Skeleton className="w-[110px] h-[20px]" />
        <Skeleton className="w-[110px] h-[20px]" />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
        <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
          <CardContent className="space-y-5">
            <Skeleton className="w-[163px] h-[36px]" />
            <Skeleton className="w-[85px] h-[28px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-[80%] h-[20px]" />
              <Skeleton className="w-[95%] h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-[88%] h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
          <CardHeader>
            <Skeleton className="w-[105px] h-[24px]" />
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <Skeleton className="w-[100px] h-[24px]" />
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <Skeleton className="w-[115px] h-[20px]" />
                <Skeleton className="w-[115px] h-[20px]" />
              </div>
              <Skeleton className="h-[36px] max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end w-[165px]" />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <Skeleton className="w-[100px] h-[24px]" />
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <Skeleton className="w-[115px] h-[20px]" />
                <Skeleton className="w-[115px] h-[20px]" />
              </div>
              <Skeleton className="h-[36px] max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end w-[165px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
