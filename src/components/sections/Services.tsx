import { Reveal, TiltCard } from "@/components/ui-primitives";
import { SERVICES } from "@/data";

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 block">What We Do</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
                CORE<br />CAPABIL<span className="text-gradient-cyan">ITIES</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We provide end-to-end business support services that let you focus on growth while we handle the operations.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.08}>
                <TiltCard>
                  <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(192_95%_55%/0.15)]">
                    <div className="flex items-start gap-6">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                        <service.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tools.map((tool) => (
                            <span key={tool} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
