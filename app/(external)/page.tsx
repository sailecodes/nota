import CoreFeatures from "@/components/external/core-features";
import Hero from "@/components/external/hero";
import Pricing from "@/components/external/pricing";
import Demo from "@/components/external/demo";

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
