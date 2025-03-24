import CoreFeaturesCard from "./CoreFeaturesCard";

export default function CoreFeatures() {
  return (
    <div className="flex flex-col gap-5 py-24">
      <header className="text-4xl font-bold">Core Features</header>
      <p className="text-muted-foreground text-lg">
        Everything you need to turn meetings into clear, actionable notes — powered by AI.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <CoreFeaturesCard
          className="col-span-2"
          title="AI-Powered Transcription Engine"
          description="Powered by state-of-the-art speech recognition models like Deepgram, Nota delivers fast, reliable transcriptions with real-world accuracy. Detect multiple speakers, preserve natural sentence flow, and clean up filler words — all automatically. No manual cleanup or rewinding needed."
        />
        <CoreFeaturesCard
          className=""
          title="Instant Meeting Summaries"
          description="Turn long conversations into clean, concise bullet-point summaries that capture the who, what, and why of every meeting."
        />
        <CoreFeaturesCard
          title="Smart Action Item Detection"
          description="Automatically extract tasks, decisions, and follow-ups — and assign them to team members with due dates and status tracking."
        />
        <CoreFeaturesCard
          className="col-span-2"
          title="Organized Dashboard & Search"
          description="Stay in control with a simple, intuitive dashboard that stores every meeting in one place. Quickly search through transcripts, summaries, or action items using full-text and semantic search. Filter by date, title, or task status to find exactly what you need — whether it’s last week’s decisions or tomorrow’s to-dos."
        />
      </div>
    </div>
  );
}
