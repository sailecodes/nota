import CoreFeatures from "@/components/home/CoreFeatures";
import Demo from "@/components/home/Demo";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <section>
      <Hero />
      {/* <Demo /> */}
      <CoreFeatures />
      <Pricing />
    </section>
  );
}
