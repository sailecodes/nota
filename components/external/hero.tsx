export default function Hero() {
  return (
    <div className="flex items-center gap-5 py-44">
      <div className="flex flex-col gap-5 flex-1">
        <div className="font-bold text-6xl">
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text animate-gradient-x">
            AI-Powered
          </span>
          <span> Meeting Notes, Instantly</span>
        </div>
        <p className="text-muted-foreground text-lg/relaxed font-semibold">
          Turn conversations into actionable insights — summaries, transcripts, and more, all in one
          place.
        </p>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
