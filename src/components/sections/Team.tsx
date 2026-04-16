import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Mail, CheckCircle2, Clock, X, ArrowRight, ExternalLink } from "lucide-react";
import { Reveal, TiltCard } from "@/components/ui-primitives";
import { TEAM } from "@/data";
import type { TeamMember } from "@/types";

function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-primary/20 shadow-[0_0_80px_-20px_hsl(192_95%_55%/0.25)]"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative p-8 pb-6 bg-gradient-to-br from-primary/10 via-card to-card rounded-t-3xl">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
            <X size={18} />
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              {member.image ? (
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_-8px_hsl(192_95%_55%/0.3)]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">{member.initials}</span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center gap-1">
                <Award size={10} /> {member.badge}
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">{member.name}</h2>
              <p className="text-primary font-semibold text-lg mb-2">{member.role}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={11} className="text-primary" /> {member.experience} experience</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-primary" /> 100% Job Success</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 pt-6 space-y-6">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">About</h3>
            <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Skills & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">{skill}</span>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-4">
            <a href={`mailto:${member.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all border border-primary/20 hover:border-primary/40">
              <Mail size={14} /> {member.email}
            </a>
            <a href={member.linkedin || "https://www.upwork.com/agencies/1953211500372666476/"} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.4)]">
              View on Upwork <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const lead = TEAM.find((m) => m.isLead)!;
  const members = TEAM.filter((m) => !m.isLead);

  return (
    <section id="team" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 block">Our People</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
              THE <span className="text-gradient-cyan">TEAM</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm">Click any member to view their full profile</p>
          </div>
        </Reveal>
        <Reveal className="mb-10">
          <TiltCard>
            <motion.div className="group p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_-15px_hsl(192_95%_55%/0.2)] cursor-pointer"
              onClick={() => setSelectedMember(lead)} whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_-10px_hsl(192_95%_55%/0.3)]">
                    <img src={lead.image} alt={lead.name} className="w-full h-full object-cover object-top" loading="eager" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
                    <Award size={12} /> {lead.badge}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{lead.name}</h3>
                  <p className="text-lg text-primary font-semibold mb-4">{lead.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{lead.bio}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail size={14} className="text-primary" /> {lead.email}
                    </a>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 size={12} className="text-primary" /> 100% Job Success
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-xs text-primary font-medium">
                    <span>View Full Profile</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <TiltCard className="h-full">
                <motion.div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 text-center cursor-pointer hover:shadow-[0_0_30px_-10px_hsl(192_95%_55%/0.15)]"
                  onClick={() => setSelectedMember(member)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden border border-primary/20">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="font-display text-xl font-bold text-primary">{member.initials}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">{member.bio}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                    <Award size={12} /> {member.badge}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Profile</span><ArrowRight size={10} />
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedMember && <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </section>
  );
}
