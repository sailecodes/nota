import PricingCard from "./pricing-card";
import { TIERS } from "@/constants";

export default function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-[2.5rem]/11 font-bold ml:text-5xl">
        Start free. Scale with your ambitions.
      </header>
      <p className="text-muted-foreground text-lg font-semibold">
        Get started with smart meeting summaries and action tracking. Upgrade when your workflow
        grows.
      </p>
      {/* <div className="grid grid-cols-3 auto-rows-[560px] gap-4"> */}
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,385px))] auto-rows-[635px] gap-4 ml:auto-rows-[560px]">
        {TIERS.map((tier) => (
          <PricingCard
            key={tier.title}
            title={tier.title}
            description={tier.description}
            pricing={tier.pricing}
            btnText={tier.btnText}
            features={tier.features}
          />
        ))}
      </div>
    </div>
  );
}
