import PricingCard from "./pricing-card";

const pricingTiers = [
  {
    title: "Starter",
    description:
      "Get started with Nota and make meetings more manageable — no commitments, just smarter workflows.",
    pricing: "Free",
    btnText: "Get started now",
    features: [
      "3 uploads/mo (max 100MB each)",
      "1 workspace to manage your meetings",
      "AI-powered transcription & summaries",
      "Automatic action item extraction",
      "Access to dashboard & smart search",
      "Email support",
    ],
  },
  {
    title: "Teams",
    description:
      "Unlock Nota’s full potential — guaranteed access to the most powerful AI models, faster processing, and deeper collaboration features.",
    pricing: "$15",
    btnText: "Upgrade to teams",
    features: [
      "Unlimited uploads (max 500MB each)",
      "5 workspaces for team collaboration",
      "Guaranteed usage of best-in-class AI",
      "Priority support",
      "Collaboration tools — assign, track, and manage actions (coming soon)",
      "Role-based access control for teams (coming soon)",
    ],
  },
  {
    title: "Organizations",
    description:
      "For growing teams and organizations that need advanced collaboration, custom workflows, and scalable AI infrastructure — coming soon.",
    pricing: "Personalized",
    btnText: "Join the waitlist",
    features: [
      "Flexible usage tiers + overage plans",
      "Unlimited workspaces with advanced admin control",
      "Analytics dashboard for team activity, summary accuracy, and usage tracking",
      "SSO & enterprise-grade authentication",
      "Workflow integrations with tools like Slack, Asana, Notion, and Google Calendar",
      "Custom AI model selection & fine-tuning",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-5xl font-bold">Start free. Scale with your ambitions.</header>
      <p className="text-muted-foreground text-lg font-semibold">
        Get started with smart meeting summaries and action tracking. Upgrade when your workflow
        grows.
      </p>
      <div className="grid grid-cols-3 auto-rows-[620px] gap-4">
        {pricingTiers.map((tier) => (
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
