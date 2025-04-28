import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import PricingCardFeature from "./pricing-card-feature";
import { Badge } from "../ui/badge";
import { MOST_POPULAR_TIER } from "@/constants";

interface PricingCardProps {
  title: string;
  description: string;
  pricing: string;
  btnText: string;
  features: string[];
}

export default function PricingCard({
  title,
  description,
  pricing,
  btnText,
  features,
}: PricingCardProps) {
  return (
    <div
      className={`p-[2px] rounded-xl ${
        title === MOST_POPULAR_TIER &&
        "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 animate-gradient-x"
      }`}>
      <Card className={`min-h-full ${title === MOST_POPULAR_TIER && "bg-background"}`}>
        <CardHeader>
          <CardTitle className="flex justify-between gap-2">
            <p className="text-lg">{title}</p>
            {title === MOST_POPULAR_TIER && <Badge>Most popular</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative flex gap-1">
              <p className="text-4xl font-bold">{pricing}</p>
              {pricing.includes("$") && (
                <p className="relative self-end text-xs text-muted-foreground bottom-1">
                  per month
                </p>
              )}
            </div>
            <p className="text-sm/relaxed text-muted-foreground">{description}</p>
            <Link
              href="/sign-up"
              className={buttonVariants({
                size: "lg",
                className: `${title !== "Starter" ? "pointer-events-none opacity-50" : ""}`,
              })}>
              {btnText}
            </Link>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-3">
            {features.map((feature) => (
              <PricingCardFeature
                key={feature}
                feature={feature}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
