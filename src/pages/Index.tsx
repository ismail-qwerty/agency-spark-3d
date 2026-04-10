import { CustomCursor } from "@/components/CustomCursor";
import { GradientOrb } from "@/components/Backgrounds";
import { ScrollProgress } from "@/components/ui-primitives";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterCTA } from "@/components/sections/FooterCTA";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden cursor-none md:cursor-none">
      <CustomCursor />
      <GradientOrb />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <Services />
      <Work />
      <Team />
      <Testimonials />
      <FooterCTA />
    </div>
  );
};

export default Index;
