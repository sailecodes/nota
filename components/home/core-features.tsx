import { BookOpenText, Brain, ChartColumnBig, Pencil } from "lucide-react";
import CoreFeaturesCard from "./core-features-card";
import { coreFeatures } from "@/lib/constants";

const coreFeaturesIcons = [
  <Brain size={32} />,
  <BookOpenText size={32} />,
  <Pencil size={32} />,
  <ChartColumnBig size={32} />,
];

export default function CoreFeatures() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-4xl font-bold">Core Features</header>
      <p className="text-muted-foreground text-lg">
        Everything you need to turn meetings into clear, actionable notes — powered by AI.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {coreFeatures.map((feature, ind) => (
          <CoreFeaturesCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={coreFeaturesIcons[ind]}
            isLong={feature.isLong}
          />
        ))}
      </div>
    </div>
  );
}
