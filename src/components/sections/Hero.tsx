import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, CheckCircle2, Users, Briefcase, ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/Backgrounds";
import { Reveal } from "@/components/ui-primitives";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AuroraBackground />
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Available for Hire — Top Rated Plus on Upwork</span>
          </motion.div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-6">
            WE <span className="text-gradient-cyan">STREAMLINE</span><br />YOUR BUSINESS
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
            Premium virtual assistance, CRM management, and business operations support. We help agencies, startups, and enterprises scale effortlessly.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:shadow-[0_0_40px_-5px_hsl(192_95%_55%/0.5)] transition-all duration-300">
              View Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.upwork.com/agencies/1953211500372666476/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-border rounded-full font-semibold text-lg text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              Hire on Upwork <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[{ icon: CheckCircle2, label: "100% Job Success" }, { icon: Briefcase, label: "11+ Projects" }, { icon: Star, label: "5.0★ Rating" }, { icon: Users, label: "11 Specialists" }].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                <stat.icon size={18} className="text-primary" />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
