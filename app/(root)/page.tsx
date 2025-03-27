import CoreFeatures from "@/components/home/core-features";
import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";
import Demo from "@/components/home/demo";

export default function Home() {
  return (
    <main>
      <Hero />
      <Demo />
      <CoreFeatures />
      <Pricing />
    </main>
  );
}
