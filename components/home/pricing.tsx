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
          description="Unlock Nota’s full potential — guaranteed access to the most powerful AI models, faster processing, and deeper collaboration features."
          pricing="$15/mo"
          btnText="Upgrade To Team"
          features={[
            "Unlimited uploads (max 500MB each)",
            "Guaranteed usage of best-in-class AI",
            "Priority support",
            "Collaboration tools — assign, track, and manage actions (coming soon)",
            "Role-based access control for teams (coming soon)",
          ]}
        />
      </div>
    </div>
  );
}
