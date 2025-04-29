import CoreFeaturesCard from "./core-features-card";
import { BookOpenText, Brain, ChartColumnBig, Pencil } from "lucide-react";

export const CORE_FEATURES = [
  {
    icon: <Brain />,
    title: "AI-Powered Transcription Engine",
    description:
      "Powered by state-of-the-art speech recognition models like Deepgram and AssemblyAI, Nota delivers fast, reliable transcriptions with real-world accuracy. Detect multiple speakers, preserve natural sentence flow, and clean up filler words — all automatically.",
  },
  {
    icon: <BookOpenText />,
    title: "Instant Meeting Summaries",
    description:
      "Our AI-powered summaries cut through the clutter and instantly surface what mattered most: who said what, what was decided, and what’s next. Whether you missed a call or just need a quick refresh, Nota gives you crystal-clear recaps, without the replay.",
  },
  {
    icon: <Pencil />,
    title: "Smart Action Item Detection",
    description:
      "Automatically identify what needs to get done — and who’s doing it. Nota’s AI pinpoints actionable takeaways from your conversations, detecting task assignments, deadlines, and follow-ups in real time. Every decision is captured, structured, and ready to move forward.",
  },
  {
    icon: <ChartColumnBig />,
    title: "Organized Dashboard & Search",
    description:
      "Stay in control with a simple, intuitive dashboard that stores every meeting in one place. Quickly search through transcripts, summaries, or action items using full-text and semantic search. Filter by date, title, or task status to find exactly what you need — whether it’s last week’s decisions or tomorrow’s to-dos.",
  },
];

export default function CoreFeatures() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-[2.5rem]/11 font-bold ml:text-5xl">Core features</header>
      <p className="text-muted-foreground text-lg font-semibold">
        Utilize powerful AI tools that transcribe, summarize, and structure your meetings into clear
        notes.
      </p>
      {/* <div className="grid lg:grid-cols-2 gap-4"> */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] auto-rows-auto gap-4 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {CORE_FEATURES.map((feature) => (
          <CoreFeaturesCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
