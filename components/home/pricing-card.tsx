import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import PricingCardFeature from "./pricing-card-feature";

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
    <Card className="h-[550px]">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          <p className="text-base">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold mb-5">{pricing}</p>
        <Link
          href="/payment"
          className={buttonVariants({
            size: "lg",
            variant: "default",
            className: "w-full",
          })}>
          {btnText}
        </Link>
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
  );
}
