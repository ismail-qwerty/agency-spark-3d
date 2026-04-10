import { ArrowRight, Mail, Globe, MapPin, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { Reveal } from "@/components/ui-primitives";
import { TOOLS } from "@/data";

export function FooterCTA() {
  const doubledTools = [...TOOLS, ...TOOLS];

  return (
    <section id="cta" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-6">
              READY TO <span className="text-gradient-cyan">SCALE</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Let's discuss how Prime Assist can streamline your operations and accelerate your growth.
            </p>
            <a href="https://www.upwork.com/agencies/primeassist/" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:shadow-[0_0_60px_-10px_hsl(192_95%_55%/0.5)] transition-all duration-500">
              Hire Us on Upwork
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <Mail size={24} className="text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-3">Email Us</h4>
              <a href="mailto:contact@primeassist.co" className="block text-sm text-muted-foreground hover:text-primary transition-colors mb-1">contact@primeassist.co</a>
              <a href="mailto:taimour@primeassist.co" className="block text-sm text-muted-foreground hover:text-primary transition-colors">taimour@primeassist.co</a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border text-center">
              <Globe size={24} className="text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-3">Follow Us</h4>
              <div className="flex items-center justify-center gap-4">
                {[{ href: "https://linkedin.com/company/primeassist", icon: Linkedin },
                  { href: "https://instagram.com/primeassist", icon: Instagram },
                  { href: "https://facebook.com/primeassist", icon: Facebook },
                  { href: "https://twitter.com/primeassist", icon: Twitter }].map(({ href, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border text-center sm:col-span-2 lg:col-span-1">
              <MapPin size={24} className="text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-3">Location</h4>
              <p className="text-sm text-muted-foreground">Remote — Worldwide</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative py-8 border-t border-b border-border overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee gap-12" style={{ width: "max-content" }}>
              {doubledTools.map((tool, i) => (
                <span key={i} className="text-sm text-muted-foreground font-medium whitespace-nowrap">{tool}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground">
          <div className="font-display text-lg font-bold text-foreground">PRIME<span className="text-primary">ASSIST</span></div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="mailto:contact@primeassist.co" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14} className="text-primary" /> contact@primeassist.co</a>
            <a href="mailto:taimour@primeassist.co" className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14} className="text-primary" /> taimour@primeassist.co</a>
          </div>
          <p className="text-xs text-muted-foreground/60">© 2024 Prime Assist. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
