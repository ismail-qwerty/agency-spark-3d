import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Star, Menu, X, CheckCircle2, Users, Briefcase, Award,
  Mail, MapPin, Clock, Zap, Shield, BarChart3, Headphones, ShoppingCart, FolderKanban,
  MessageSquare, ChevronDown
} from "lucide-react";

/* ─── DATA ─── */
const SERVICES = [
  { icon: Briefcase, title: "Virtual Assistance & Admin Support", desc: "Calendar management, email handling, data entry, and comprehensive administrative support to keep your operations running smoothly.", tools: ["Google Workspace", "Microsoft 365", "Slack", "Notion"] },
  { icon: BarChart3, title: "CRM Setup & Management", desc: "End-to-end CRM implementation and optimization across GoHighLevel, Salesforce, HubSpot, and more.", tools: ["GoHighLevel", "Salesforce", "HubSpot", "Apollo"] },
  { icon: Zap, title: "Lead Generation & Prospecting", desc: "Strategic outreach campaigns, prospect research, and pipeline management to fuel your growth.", tools: ["Apollo", "LinkedIn", "Hunter.io", "Lemlist"] },
  { icon: Headphones, title: "Customer Support & Follow-ups", desc: "Professional customer communication, ticket management, and relationship nurturing.", tools: ["Zendesk", "Intercom", "Freshdesk", "Crisp"] },
  { icon: ShoppingCart, title: "E-commerce & Catalog Management", desc: "Product listing optimization, inventory tracking, and marketplace management across platforms.", tools: ["Shopify", "Amazon", "WooCommerce", "BigCommerce"] },
  { icon: FolderKanban, title: "Project Management & Coordination", desc: "End-to-end project coordination, milestone tracking, and cross-team communication.", tools: ["Trello", "Asana", "Monday.com", "ClickUp"] },
];

const PROJECTS = [
  { client: "Voomi Supply", category: "E-commerce Catalog", year: "2024", rating: 5, quote: "Exceptional attention to detail in managing our entire product catalog. Highly recommended!", color: "from-primary/20 to-primary/5" },
  { client: "Decimalytics", category: "Executive VA / CRM", year: "2024", rating: 5, quote: "Taimour and team transformed our CRM workflow. Outstanding professionalism and results.", color: "from-primary/15 to-secondary" },
  { client: "SSP Residential Renovations", category: "Construction Admin", year: "2024", rating: 5, quote: "Reliable, efficient, and always ahead of deadlines. A true asset to our operations.", color: "from-primary/20 to-primary/5" },
  { client: "Block Street Homes", category: "Real Estate VA", year: "2023", rating: 5, quote: "They streamlined our entire listing process. Can't imagine working without them now.", color: "from-primary/15 to-secondary" },
  { client: "Highkey Enterprises", category: "Business Operations", year: "2023", rating: 5, quote: "Professional, proactive, and incredibly organized. Top-tier virtual assistance.", color: "from-primary/20 to-primary/5" },
  { client: "OpenCS AI", category: "AI Platform Support", year: "2024", rating: 5, quote: "Handled complex workflows with ease. Their technical aptitude is impressive.", color: "from-primary/15 to-secondary" },
];

const TEAM = [
  { name: "Taimour A.", role: "Founder & Lead VA", badge: "Top Rated Plus", initials: "TA" },
  { name: "Fahad Bin A.", role: "Senior VA", badge: "Top Rated Plus", initials: "FA" },
  { name: "Muhammad F.", role: "CRM Specialist", badge: "Top Rated", initials: "MF" },
  { name: "Umar F.", role: "Lead Gen Expert", badge: "Top Rated", initials: "UF" },
  { name: "Qasim J.", role: "E-commerce VA", badge: "Top Rated", initials: "QJ" },
  { name: "Farhan A.", role: "Project Manager", badge: "Top Rated", initials: "FA" },
  { name: "Zeeshan N.", role: "Admin Support", badge: "Top Rated", initials: "ZN" },
];

const TESTIMONIALS = [
  { text: "Prime Assist completely transformed how we handle day-to-day operations. Their team is proactive, detail-oriented, and always delivers ahead of schedule.", author: "James K.", company: "Voomi Supply" },
  { text: "Working with Taimour's team has been an absolute game-changer. Our CRM is finally organized and our leads are converting better than ever.", author: "Sarah M.", company: "Decimalytics" },
  { text: "I've hired many VAs on Upwork, but Prime Assist is in a league of their own. Professional, reliable, and they truly understand business operations.", author: "Michael R.", company: "Block Street Homes" },
  { text: "Their attention to detail is unmatched. Every task is completed with precision and care. Highly recommend for any business looking to scale.", author: "David L.", company: "Highkey Enterprises" },
  { text: "From project management to customer support, they handle everything seamlessly. It's like having an entire operations team at a fraction of the cost.", author: "Emily T.", company: "SSP Renovations" },
  { text: "The team's technical skills combined with their business acumen make them invaluable. They don't just execute—they strategize and improve processes.", author: "Alex P.", company: "OpenCS AI" },
];

const TOOLS = ["Slack", "Notion", "Trello", "Salesforce", "GoHighLevel", "Apollo", "HubSpot", "Asana", "Shopify", "ClickUp", "Zendesk", "Monday.com", "Google Workspace", "LinkedIn", "Zapier", "Calendly"];

const NAV_ITEMS = ["Home", "Services", "Work", "Team", "Testimonials", "Contact"];

/* ─── 3D TILT CARD ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => { springX.set(rotateX); springY.set(rotateY); }, [rotateX, rotateY, springX, springY]);

  const handleMouse = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 15); setRotateY(x * 15);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── SCROLL REVEAL ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVIGATION ─── */
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold tracking-tight text-foreground">
            PRIME<span className="text-primary">ASSIST</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => scrollTo(item === "Contact" ? "cta" : item.toLowerCase())}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.upwork.com/agencies/primeassist/" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.5)] transition-all duration-300">
              Hire Us <ArrowUpRight size={14} />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(item === "Contact" ? "cta" : item.toLowerCase())}
                className="text-3xl font-display font-bold text-foreground hover:text-primary transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(192 95% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(192 95% 55%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Available for Hire — Top Rated Plus on Upwork</span>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] mb-6">
            WE <span className="text-gradient-cyan">STREAMLINE</span>
            <br />YOUR BUSINESS
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
            Premium virtual assistance, CRM management, and business operations support. We help agencies, startups, and enterprises scale effortlessly.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#work"
              onClick={e => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:shadow-[0_0_40px_-5px_hsl(192_95%_55%/0.5)] transition-all duration-300">
              View Our Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.upwork.com/agencies/primeassist/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-border rounded-full font-semibold text-lg text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              Hire on Upwork <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { icon: CheckCircle2, label: "100% Job Success" },
              { icon: Briefcase, label: "11+ Projects" },
              { icon: Star, label: "5.0★ Rating" },
              { icon: Users, label: "7+ Specialists" },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                <stat.icon size={18} className="text-primary" />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
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
              <Reveal key={service.title} delay={i * 0.1}>
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
                          {service.tools.map(tool => (
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

/* ─── WORK ─── */
function Work() {
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
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.client} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className={`group relative h-full p-8 rounded-2xl bg-gradient-to-br ${project.color} border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-primary">{project.year}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: project.rating }).map((_, j) => (
                          <Star key={j} size={12} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">{project.client}</h3>
                    <p className="text-sm text-primary font-medium mb-4">{project.category}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">"{project.quote}"</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM ─── */
function Team() {
  return (
    <section id="team" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 block">Our People</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
              THE <span className="text-gradient-cyan">TEAM</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <TiltCard>
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary">{member.initials}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Award size={12} />
                    {member.badge}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2 size={12} className="text-primary" />
                    100% Job Success
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
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

      {/* Marquee row 1 */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[400px] shrink-0 p-6 rounded-2xl bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-primary">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee-reverse gap-6" style={{ width: "max-content" }}>
          {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)].map((t, i) => (
            <div key={i} className="w-[400px] shrink-0 p-6 rounded-2xl bg-card border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-primary">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER / CTA ─── */
function FooterCTA() {
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

        {/* Tools Marquee */}
        <Reveal delay={0.2}>
          <div className="relative mt-20 py-8 border-t border-b border-border overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee gap-12" style={{ width: "max-content" }}>
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <span key={i} className="text-sm text-muted-foreground font-medium whitespace-nowrap">{tool}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground">
          <div className="font-display text-lg font-bold text-foreground">
            PRIME<span className="text-primary">ASSIST</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Remote — Worldwide</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Available 24/7</div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-primary" /> Contact via Upwork</div>
          </div>
          <p className="text-xs text-muted-foreground/60">© 2024 Prime Assist. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── SCROLL PROGRESS ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]" style={{ scaleX }} />;
}

/* ─── MAIN PAGE ─── */
const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
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
