import CoreFeaturesCard from "./core-features-card";
import { BookOpenText, Brain, ChartColumnBig, Pencil } from "lucide-react";

export const CORE_FEATURES = [
  {
    icon: <Brain />,
    title: "AI-Powered Transcription Engine",
    description:
      "Powered by state-of-the-art speech recognition models like Deepgram, Nota delivers fast, reliable transcriptions with real-world accuracy. Detect multiple speakers, preserve natural sentence flow, and clean up filler words — all automatically. No manual cleanup or rewinding needed.",
    isLong: true,
  },
  {
    icon: <BookOpenText />,
    title: "Instant Meeting Summaries",
    description:
      "Turn long conversations into clean, concise bullet-point summaries that capture the who, what, and why of every meeting.",
    isLong: false,
  },
  {
    icon: <Pencil />,
    title: "Smart Action Item Detection",
    description:
      "Automatically extract tasks, decisions, and follow-ups — and assign them to team members with due dates and status tracking.",
    isLong: false,
  },
  {
    icon: <ChartColumnBig />,
    title: "Organized Dashboard & Search",
    description:
      "Stay in control with a simple, intuitive dashboard that stores every meeting in one place. Quickly search through transcripts, summaries, or action items using full-text and semantic search. Filter by date, title, or task status to find exactly what you need — whether it’s last week’s decisions or tomorrow’s to-dos.",
    isLong: true,
  },
];

export default function CoreFeatures() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-5xl font-bold">Core features</header>
      <p className="text-muted-foreground text-lg font-semibold">
        Utilize powerful AI tools that transcribe, summarize, and structure your meetings into clear
        notes.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {CORE_FEATURES.map((feature) => (
          <CoreFeaturesCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            isLong={feature.isLong}
          />
        ))}
      </div>
    </div>
  );
}
