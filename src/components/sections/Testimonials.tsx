import { Star } from "lucide-react";
import { Reveal } from "@/components/ui-primitives";
import { TESTIMONIALS } from "@/data";

function TestimonialCard({ text, author, company }: { text: string; author: string; company: string }) {
  return (
    <div className="w-[400px] shrink-0 p-6 rounded-2xl bg-card border border-border">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{text}"</p>
      <div>
        <p className="text-xs text-primary">{company}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  const reversedDoubled = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 block">Testimonials</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
              CLIENT <span className="text-gradient-cyan">VOICES</span>
            </h2>
          </div>
        </Reveal>
      </div>
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
          {doubled.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-reverse gap-6" style={{ width: "max-content" }}>
          {reversedDoubled.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
