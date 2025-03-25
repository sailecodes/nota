import PricingCard from "./pricing-card";

export default function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-4xl font-bold">Simple, transparent pricing</header>
      <p className="text-muted-foreground text-lg">
        Get started with smart meeting summaries and action tracking. Upgrade when your workflow
        grows.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <PricingCard
          title="Starter"
          description="Get started with Nota and make meetings more manageable — no commitments, just
                smarter workflows."
          pricing="Free"
          btnText="Get Started Now"
          features={[
            "Up to 5 uploads/mo (max 100MB each)",
            "AI-powered transcription & summaries",
            "Automatic action item extraction",
            "Access to dashboard & smart search",
            "Email support",
          ]}
        />
        <PricingCard
          title="Team"
          description="For professionals and teams who need reliable transcription, summaries, and action
                tracking — with more power and fewer limits."
          pricing="$15/mo"
          btnText="Upgrade To Team"
          features={["Unlimited uploads (max 500MB each)", "Faster processing & priority support"]}
        />
      </div>
    </div>
  );
}
