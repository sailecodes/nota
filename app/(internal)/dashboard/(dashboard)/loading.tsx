import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section
      className="grid [grid-template-columns:repeat(auto-fit,minmax(0,408px))]
      justify-center gap-3 max-w-7xl mx-auto p-4 pb-[25px]">
      {Array.from([1, 2, 3]).map((ind) => (
        <Card
          key={ind}
          className="bg-background">
          <CardHeader>
            <CardDescription>
              <Skeleton className="h-[21px] w-[120px]" />
            </CardDescription>
            <CardTitle>
              <Skeleton className="h-[41px] w-[85px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[22px] w-[275px]" />
          </CardContent>
          <CardFooter className="px-[23px] mt-auto">
            <Skeleton className="h-[36px] w-full" />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
