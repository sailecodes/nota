import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <div className="flex py-24">
      <div className="flex flex-col gap-5 flex-1">
        <p className="font-bold text-4xl">AI-Powered Meeting Notes, Instantly</p>
        <p className="text-muted-foreground text-lg">
          Turn conversations into actionable insights — summaries, transcripts, and to-dos, all in
          one place.
        </p>
        <div className="flex gap-2">
          <Link
            href="/#core-features"
            className={buttonVariants({ variant: "default" })}>
            Core Features
          </Link>
          <Link
            href="/#pricing"
            className={buttonVariants({ variant: "outline" })}>
            Pricing
          </Link>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
