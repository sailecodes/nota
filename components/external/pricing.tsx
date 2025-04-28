import PricingCard from "./pricing-card";
import { TIERS } from "@/constants";

export default function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-5xl font-bold">Start free. Scale with your ambitions.</header>
      <p className="text-muted-foreground text-lg font-semibold">
        Get started with smart meeting summaries and action tracking. Upgrade when your workflow
        grows.
      </p>
      <div className="grid grid-cols-3 auto-rows-[620px] gap-4">
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
