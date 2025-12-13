import { CTA } from "@/components/web/homepage/cta";
import { Features } from "@/components/web/homepage/features";
import { Footer } from "@/components/web/homepage/footer";
import { Hero } from "@/components/web/homepage/hero";
import { HowItWorks } from "@/components/web/homepage/how-it-works";
import { Stats } from "@/components/web/homepage/stats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
