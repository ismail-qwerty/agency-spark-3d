import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, X, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { Reveal, TiltCard } from "@/components/ui-primitives";
import { PROJECTS } from "@/data";
import type { Project } from "@/types";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-primary/20 shadow-[0_0_80px_-20px_hsl(192_95%_55%/0.25)]"
        onClick={(e) => e.stopPropagation()}>
        <div className={`relative p-8 pb-6 bg-gradient-to-br ${project.color} rounded-t-3xl`}>
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-primary transition-all backdrop-blur-sm">
            <X size={18} />
          </button>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">{Array.from({ length: project.rating }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}</div>
            <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{project.year}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{project.client}</h2>
          <p className="text-primary font-semibold text-lg mb-3">{project.category}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} className="text-primary" /><span>{project.duration}</span>
          </div>
        </div>
        <div className="p-8 pt-6 space-y-6">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
          <div className="p-5 rounded-xl bg-secondary/50 border border-border">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">The Challenge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
          </div>
          <div className="p-5 rounded-xl bg-primary/5 border border-primary/15">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">Our Solution</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((result, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border">
                  <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">{result}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border">{tool}</span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <p className="text-sm text-muted-foreground leading-relaxed italic mb-3">"{project.quote}"</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} className="fill-primary text-primary" />)}</div>
              <span className="text-xs text-primary font-semibold">— {project.client}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-border text-center">
            <a href="https://www.upwork.com/agencies/primeassist/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.4)] transition-all duration-300">
              Work With Us <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <section id="work" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 block">Portfolio</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
              SELECTED <span className="text-gradient-cyan">WORK</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm">Click any project to see full details</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.client} delay={i * 0.08}>
              <TiltCard className="h-full">
                <motion.div
                  className={`group relative h-full p-8 rounded-2xl bg-gradient-to-br ${project.color} border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedProject(project)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-primary">{project.year}</span>
                      <div className="flex gap-0.5">{Array.from({ length: project.rating }).map((_, j) => <Star key={j} size={12} className="fill-primary text-primary" />)}</div>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">{project.client}</h3>
                    <p className="text-sm text-primary font-medium mb-4">{project.category}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">"{project.quote}"</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
