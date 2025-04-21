import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CalendarClock, UserCheck2Icon, UserCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function MeetingSkeleton() {
  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-10">
      <div className="space-y-1">
        <Skeleton className="w-[250px] h-[32px] mb-2" />
        <span className="flex gap-2 items-center text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <Skeleton className="w-[80px] h-[20px]" />
        </span>
        <span className="flex gap-2 items-center text-muted-foreground">
          <UserCircle2 className="w-4 h-4" />
          <Skeleton className="w-[80px] h-[20px]" />
        </span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
        <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
          <CardContent>
            <Tabs
              defaultValue="summary"
              className="gap-5">
              <TabsList className="bg-background border">
                <TabsTrigger
                  value="summary"
                  className="border-none hover:cursor-pointer">
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="border-none hover:cursor-pointer">
                  Transcript
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-lg">Summary</span>
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-[80%] h-[20px]" />
                  <Skeleton className="w-[95%] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-[88%] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                </div>
              </TabsContent>
              <TabsContent value="transcript">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-lg">Transcript</span>
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-[90%] h-[20px]" />
                  <Skeleton className="w-[85%] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-[92%] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-[40%] h-[20px]" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
          <CardHeader className="text-lg font-semibold">Action Items</CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="space-y-1">
                <Skeleton className="w-[100px] h-[24px]" />
                <Skeleton className="w-[150px] h-[20px]" />
              </div>
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <span className="flex gap-2 items-center text-muted-foreground">
                  <CalendarClock className="w-4 h-4" />
                  <Skeleton className="w-[80px] h-[20px]" />
                </span>
                <span className="flex gap-2 items-center text-muted-foreground text-sm">
                  <UserCheck2Icon className="w-4 h-4 text-muted-foreground" />
                  <Skeleton className="w-[80px] h-[20px]" />
                </span>
              </div>
              <Button
                className="max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end w-[165px] hover:cursor-pointer"
                variant="secondary"
                disabled>
                Mark as complete
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="space-y-1">
                <Skeleton className="w-[100px] h-[24px]" />
                <Skeleton className="w-[150px] h-[20px]" />
              </div>
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <span className="flex gap-2 items-center text-muted-foreground">
                  <CalendarClock className="w-4 h-4" />
                  <Skeleton className="w-[80px] h-[20px]" />
                </span>
                <span className="flex gap-2 items-center text-muted-foreground text-sm">
                  <UserCheck2Icon className="w-4 h-4 text-muted-foreground" />
                  <Skeleton className="w-[80px] h-[20px]" />
                </span>
              </div>
              <Button
                className="max-[475px]:row-start-3 max-[475px]:col-start-1 min-[475px]:self-end min-[475px]:justify-self-end w-[165px] hover:cursor-pointer"
                variant="secondary"
                disabled>
                Mark as complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
