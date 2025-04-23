import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-4">
      <Card className="bg-background">
        <CardHeader>
          <Skeleton className="w-[140px] h-[16px]" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 xs:flex-row">
            <div className="flex-1 space-y-2">
              <Skeleton className="w-[70px] h-[14px]" />
              <Skeleton className="w-full h-[36px]" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="w-[70px] h-[14px]" />
              <Skeleton className="w-full h-[36px]" />
            </div>
            <Skeleton className="w-[158px] h-[36px] xs:self-end" />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full bg-background">
        <CardHeader>
          <Skeleton className="w-[110px] h-[16px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col justify-between gap-4 xs:flex-row">
            <div className="flex-1 space-y-2">
              <Skeleton className="w-[75px] h-[16px]" />
              <Skeleton className="w-full h-[36px]" />
            </div>
            <Skeleton className="w-[158px] h-[36px] xs:self-end" />
          </div>
          <Skeleton className="w-[225px] h-[16px]" />
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader>
          <Skeleton className="w-[75px] h-[16px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="w-[158px] h-[36px]" />
          <Skeleton className="w-[225px] h-[16px]" />
        </CardContent>
      </Card>
      <Card className="col-span-full border-red-400">
        <CardHeader>
          <Skeleton className="w-[75px] h-[16px]" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="w-[225px] h-[20px]" />
          <Skeleton className="w-[158px] h-[36px]" />
        </CardContent>
      </Card>
    </div>
  );
}
