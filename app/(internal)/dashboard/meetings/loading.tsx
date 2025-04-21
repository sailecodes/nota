import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto p-4 pb-[25px] space-y-[25px]">
      <div
        className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))] auto-rows-[300px]
      justify-center gap-3">
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map(() => (
          <Card className="bg-background justify-between">
            <CardHeader>
              <div className="flex items-center justify-between gap-6">
                <Skeleton className="w-[100px] h-[26px]" />
                <Skeleton className="w-[24px] h-[24px]" />
              </div>
              <CardDescription>
                <Skeleton className="w-[140px] h-[20px]" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="w-[120px] h-[20px]" />
              <div className="space-y-1">
                <Skeleton className="w-full h-[20px]" />
                <Skeleton className="w-[80%] h-[20px]" />
              </div>
              <Skeleton className="w-[120px] h-[20px]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="w-full h-[36px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
