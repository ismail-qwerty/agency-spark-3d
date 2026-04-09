import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Star, Menu, X, CheckCircle2, Users, Briefcase, Award,
  Mail, MapPin, Clock, Zap, Shield, BarChart3, Headphones, ShoppingCart, FolderKanban,
  MessageSquare, ChevronDown, Linkedin, Instagram, Facebook, Twitter, Globe, ExternalLink
} from "lucide-react";

import teamTaimour from "@/assets/team-taimour.jpg";
import teamFahad from "@/assets/team-fahad.jpg";
import teamMuhammad from "@/assets/team-muhammad.jpg";
import teamUmar from "@/assets/team-umar.jpg";
import teamQasim from "@/assets/team-qasim.jpg";
import teamFarhan from "@/assets/team-farhan.jpg";
import teamZeeshan from "@/assets/team-zeeshan.jpg";

/* ─── DATA ─── */
const SERVICES = [
  { icon: Briefcase, title: "Virtual Assistance & Admin Support", desc: "Calendar management, email handling, data entry, and comprehensive administrative support to keep your operations running smoothly.", tools: ["Google Workspace", "Microsoft 365", "Slack", "Notion"] },
  { icon: BarChart3, title: "CRM Setup & Management", desc: "End-to-end CRM implementation and optimization across GoHighLevel, Salesforce, HubSpot, and more.", tools: ["GoHighLevel", "Salesforce", "HubSpot", "Apollo"] },
  { icon: Zap, title: "Lead Generation & Prospecting", desc: "Strategic outreach campaigns, prospect research, and pipeline management to fuel your growth.", tools: ["Apollo", "LinkedIn", "Hunter.io", "Lemlist"] },
  { icon: Headphones, title: "Customer Support & Follow-ups", desc: "Professional customer communication, ticket management, and relationship nurturing.", tools: ["Zendesk", "Intercom", "Freshdesk", "Crisp"] },
  { icon: ShoppingCart, title: "E-commerce & Catalog Management", desc: "Product listing optimization, inventory tracking, and marketplace management across platforms.", tools: ["Shopify", "Amazon", "WooCommerce", "BigCommerce"] },
  { icon: FolderKanban, title: "Project Management & Coordination", desc: "End-to-end project coordination, milestone tracking, and cross-team communication.", tools: ["Trello", "Asana", "Monday.com", "ClickUp"] },
];

interface Project {
  client: string;
  category: string;
  year: string;
  rating: number;
  quote: string;
  color: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  tools: string[];
  duration: string;
}

const PROJECTS: Project[] = [
  {
    client: "Voomi Supply",
    category: "E-commerce Catalog",
    year: "2024",
    rating: 5,
    quote: "Exceptional attention to detail in managing our entire product catalog. Highly recommended!",
    color: "from-primary/20 to-primary/5",
    description: "Full-scale e-commerce catalog management for a leading supply chain company, covering thousands of SKUs across multiple marketplaces.",
    challenge: "Voomi Supply needed to manage an ever-growing product catalog with inconsistent data quality across Shopify, Amazon, and their own storefront. Manual entry was causing delays and errors.",
    solution: "We built a streamlined catalog management workflow using custom templates and bulk-edit processes, integrating Shopify and Amazon APIs to synchronize inventory in real-time.",
    results: ["99.8% catalog accuracy achieved", "40% reduction in listing errors", "3× faster product onboarding", "Full Shopify + Amazon sync"],
    tools: ["Shopify", "Amazon Seller Central", "Google Sheets", "Zapier"],
    duration: "8 months (ongoing)",
  },
  {
    client: "Decimalytics",
    category: "Executive VA / CRM",
    year: "2024",
    rating: 5,
    quote: "Taimour and team transformed our CRM workflow. Outstanding professionalism and results.",
    color: "from-primary/15 to-secondary",
    description: "Executive-level virtual assistance and complete CRM overhaul for a fast-growing analytics SaaS startup.",
    challenge: "Decimalytics' sales pipeline was fragmented across spreadsheets, email threads, and sticky notes. The CEO was spending 3+ hours daily on admin tasks instead of strategy.",
    solution: "We migrated their entire pipeline into HubSpot, automated follow-up sequences, set up deal tracking, and provided executive VA support for scheduling, research, and reporting.",
    results: ["CEO saved 15+ hrs/week on admin", "Pipeline visibility improved 100%", "Lead response time cut from 48h to 2h", "HubSpot fully implemented in 2 weeks"],
    tools: ["HubSpot", "Google Workspace", "Calendly", "Slack", "Notion"],
    duration: "6 months (ongoing)",
  },
  {
    client: "SSP Residential Renovations",
    category: "Construction Admin",
    year: "2024",
    rating: 5,
    quote: "Reliable, efficient, and always ahead of deadlines. A true asset to our operations.",
    color: "from-primary/20 to-primary/5",
    description: "Comprehensive administrative support for a busy residential construction and renovation company managing multiple concurrent projects.",
    challenge: "SSP was juggling 12+ active renovation projects with no centralized system. Contractor scheduling, permit tracking, and client communication were all siloed.",
    solution: "We created a unified project management hub in Asana, set up automated client update emails, built contractor scheduling workflows, and managed permit document pipelines.",
    results: ["12 concurrent projects tracked seamlessly", "Zero missed permit deadlines", "Client satisfaction score: 4.9/5", "30% faster contractor coordination"],
    tools: ["Asana", "Google Workspace", "DocuSign", "Calendly"],
    duration: "10 months (ongoing)",
  },
  {
    client: "Block Street Homes",
    category: "Real Estate VA",
    year: "2023",
    rating: 5,
    quote: "They streamlined our entire listing process. Can't imagine working without them now.",
    color: "from-primary/15 to-secondary",
    description: "End-to-end virtual assistance for a real estate brokerage, managing MLS listings, client follow-ups, and transaction coordination.",
    challenge: "Block Street Homes was losing potential leads due to slow listing uploads and inconsistent follow-up. Agents were buried in paperwork instead of closing deals.",
    solution: "We took over all MLS listing preparation, photo uploads, description writing, and CRM entry. Built an automated drip campaign for lead nurturing in GoHighLevel.",
    results: ["Listing turnaround cut from 3 days to 4 hours", "Lead follow-up 100% automated", "25% increase in conversion rate", "GoHighLevel CRM fully operational"],
    tools: ["GoHighLevel", "MLS Platforms", "Google Workspace", "Canva"],
    duration: "14 months (ongoing)",
  },
  {
    client: "Highkey Enterprises",
    category: "Business Operations",
    year: "2023",
    rating: 5,
    quote: "Professional, proactive, and incredibly organized. Top-tier virtual assistance.",
    color: "from-primary/20 to-primary/5",
    description: "Full business operations support for a multi-brand digital agency, covering project management, team coordination, and executive support.",
    challenge: "Highkey's rapid growth meant internal processes couldn't keep up. Multiple brands, 20+ freelancers, and complex client deliverables were creating operational chaos.",
    solution: "We restructured their ClickUp workspace, introduced SOPs for each brand, onboarded new freelancers, managed weekly reporting, and provided executive-level support to the founder.",
    results: ["20+ freelancers onboarded smoothly", "Weekly reporting automated", "SOP library with 40+ documented processes", "On-time delivery rate improved to 97%"],
    tools: ["ClickUp", "Slack", "Notion", "Google Workspace", "Loom"],
    duration: "18 months (ongoing)",
  },
  {
    client: "OpenCS AI",
    category: "AI Platform Support",
    year: "2024",
    rating: 5,
    quote: "Handled complex workflows with ease. Their technical aptitude is impressive.",
    color: "from-primary/15 to-secondary",
    description: "Technical virtual assistance and operations support for an AI-powered customer service platform during a critical growth phase.",
    challenge: "OpenCS AI needed support managing technical documentation, client onboarding workflows, and complex multi-stakeholder projects — all with tight SLAs.",
    solution: "We embedded with their team to manage client onboarding documentation, set up automated ticketing via Zendesk, maintained product wikis in Notion, and coordinated cross-functional sprints.",
    results: ["Client onboarding time reduced by 50%", "Zendesk ticketing system fully configured", "100% SLA compliance maintained", "Product docs always up-to-date"],
    tools: ["Zendesk", "Notion", "Jira", "Slack", "Google Workspace"],
    duration: "5 months",
  },
];

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  initials: string;
  image?: string;
  bio: string;
  email: string;
  isLead: boolean;
  skills: string[];
  experience: string;
  linkedin?: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Taimour A.",
    role: "Founder & Lead VA",
    badge: "Top Rated Plus",
    initials: "TA",
    image: teamTaimour,
    bio: "Visionary leader with 5+ years of experience in virtual assistance and business operations. Built Prime Assist from the ground up, specializing in CRM management, lead generation, and scaling remote teams for global clients.",
    email: "taimour@primeassist.co",
    isLead: true,
    skills: ["CRM Strategy", "Team Leadership", "Business Operations", "GoHighLevel", "Lead Generation", "Executive Support"],
    experience: "5+ years",
  },
  {
    name: "Fahad Bin A.",
    role: "Senior VA",
    badge: "Top Rated Plus",
    initials: "FA",
    image: teamFahad,
    bio: "Expert in executive-level administrative support with deep proficiency in Google Workspace and project coordination. Fahad specializes in calendar management, inbox zero strategies, and building efficient workflows for busy executives.",
    email: "fahad@primeassist.co",
    isLead: false,
    skills: ["Google Workspace", "Calendar Management", "Email Handling", "Data Entry", "Research", "Scheduling"],
    experience: "4+ years",
  },
  {
    name: "Muhammad F.",
    role: "CRM Specialist",
    badge: "Top Rated",
    initials: "MF",
    image: teamMuhammad,
    bio: "CRM architect specializing in GoHighLevel, Salesforce, and HubSpot implementations for scaling businesses. Muhammad has built and optimized CRM systems for 30+ clients across real estate, SaaS, and e-commerce industries.",
    email: "muhammad@primeassist.co",
    isLead: false,
    skills: ["GoHighLevel", "Salesforce", "HubSpot", "Automation", "Pipeline Management", "CRM Migration"],
    experience: "3+ years",
  },
  {
    name: "Umar F.",
    role: "Lead Gen Expert",
    badge: "Top Rated",
    initials: "UF",
    image: teamUmar,
    bio: "Strategic outreach specialist with proven results in B2B lead generation using Apollo, LinkedIn, and cold email campaigns. Umar has generated 10,000+ qualified leads for clients across tech, real estate, and professional services.",
    email: "umar@primeassist.co",
    isLead: false,
    skills: ["Apollo.io", "LinkedIn Outreach", "Cold Email", "B2B Prospecting", "Lemlist", "Hunter.io"],
    experience: "3+ years",
  },
  {
    name: "Qasim J.",
    role: "E-commerce VA",
    badge: "Top Rated",
    initials: "QJ",
    image: teamQasim,
    bio: "E-commerce operations expert managing product catalogs, inventory, and marketplace optimization on Shopify and Amazon. Qasim ensures product data accuracy and maximizes visibility through SEO-optimized listings.",
    email: "qasim@primeassist.co",
    isLead: false,
    skills: ["Shopify", "Amazon FBA", "Product Listing", "Inventory Management", "WooCommerce", "Catalog SEO"],
    experience: "3+ years",
  },
  {
    name: "Farhan A.",
    role: "Project Manager",
    badge: "Top Rated",
    initials: "FA",
    image: teamFarhan,
    bio: "Certified project manager experienced in Agile methodologies, cross-team coordination, and milestone delivery. Farhan keeps complex multi-stakeholder projects on track with clear communication and proactive risk management.",
    email: "farhan@primeassist.co",
    isLead: false,
    skills: ["Agile/Scrum", "Asana", "ClickUp", "Risk Management", "Stakeholder Communication", "Monday.com"],
    experience: "4+ years",
  },
  {
    name: "Zeeshan N.",
    role: "Admin Support",
    badge: "Top Rated",
    initials: "ZN",
    image: teamZeeshan,
    bio: "Detail-oriented administrative professional handling data entry, scheduling, and operational workflows with precision. Zeeshan is the backbone of our day-to-day operations, ensuring nothing falls through the cracks.",
    email: "zeeshan@primeassist.co",
    isLead: false,
    skills: ["Data Entry", "Scheduling", "Report Generation", "MS Office", "Document Management", "Transcription"],
    experience: "2+ years",
  },
  {
    name: "Haseeb Hashmi",
    role: "Digital Marketing VA",
    badge: "Rising Talent",
    initials: "HH",
    bio: "Digital marketing specialist focused on content scheduling, social media management, and campaign support. Haseeb helps clients maintain a consistent online presence across all major platforms with engaging, on-brand content.",
    email: "haseeb@primeassist.co",
    isLead: false,
    skills: ["Social Media", "Content Scheduling", "Canva", "Buffer", "Email Marketing", "Analytics"],
    experience: "2+ years",
  },
  {
    name: "Hamza Bhatti",
    role: "Sales Support VA",
    badge: "Rising Talent",
    initials: "HB",
    bio: "Sales-focused VA specializing in prospecting, CRM data hygiene, and follow-up automation. Hamza keeps sales pipelines clean and active, ensuring no lead goes cold and every opportunity is maximized.",
    email: "hamza@primeassist.co",
    isLead: false,
    skills: ["CRM Data Entry", "Prospecting", "Follow-up Sequences", "Sales Reporting", "Apollo", "HubSpot"],
    experience: "2+ years",
  },
  {
    name: "Arslan Bhatti",
    role: "Tech & Automation VA",
    badge: "Rising Talent",
    initials: "AB",
    bio: "Tech-savvy virtual assistant with expertise in no-code automation and workflow optimization. Arslan builds Zapier and Make.com automations that eliminate repetitive tasks and connect tools seamlessly across business stacks.",
    email: "arslan@primeassist.co",
    isLead: false,
    skills: ["Zapier", "Make.com", "Airtable", "Notion", "API Integrations", "Workflow Automation"],
    experience: "2+ years",
  },
  {
    name: "Ismail Bhatti",
    role: "Research & Data VA",
    badge: "Rising Talent",
    initials: "IB",
    bio: "Meticulous research analyst and data management specialist. Ismail excels at market research, competitor analysis, and transforming raw data into actionable insights through clean, structured reports.",
    email: "ismail@primeassist.co",
    isLead: false,
    skills: ["Market Research", "Data Analysis", "Google Sheets", "Competitor Analysis", "Report Writing", "Excel"],
    experience: "2+ years",
  },
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

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 300, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/60 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}

/* ─── GRADIENT ORB BACKGROUND ─── */
function GradientOrb() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, hsl(192 95% 55%) 0%, hsl(280 80% 60%) 40%, hsl(340 80% 55%) 70%, transparent 100%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 300, -200, 100, 0],
          y: [0, -200, 150, -100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, hsl(280 90% 65%) 0%, hsl(192 95% 55%) 50%, transparent 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -250, 150, -50, 0],
          y: [0, 150, -200, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── AURORA BACKGROUND ─── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora layer 1 — cyan/teal sweep */}
      <motion.div
        className="absolute -top-1/4 left-1/2 w-[160vw] h-[100vh] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, hsl(192 95% 55% / 0.32) 0%, hsl(210 90% 60% / 0.18) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scaleX: [1, 1.25, 0.9, 1.1, 1],
          scaleY: [1, 0.85, 1.2, 0.95, 1],
          x: ["-50%", "-42%", "-58%", "-46%", "-50%"],
          rotate: [0, 6, -5, 3, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurora layer 2 — purple/violet */}
      <motion.div
        className="absolute -top-1/3 left-0 w-[110vw] h-[80vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 30% 50%, hsl(280 75% 58% / 0.26) 0%, hsl(250 80% 65% / 0.14) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          scaleX: [1.1, 0.85, 1.15, 1, 1.1],
          x: ["0%", "12%", "-8%", "5%", "0%"],
          y: ["0%", "-10%", "6%", "-4%", "0%"],
          rotate: [0, -8, 10, -4, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurora layer 3 — green/emerald accent */}
      <motion.div
        className="absolute top-0 right-0 w-[90vw] h-[70vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 70% 40%, hsl(160 80% 50% / 0.2) 0%, hsl(140 70% 48% / 0.1) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scaleX: [0.9, 1.2, 0.85, 1.1, 0.9],
          x: ["0%", "-10%", "8%", "-5%", "0%"],
          rotate: [0, -10, 8, -3, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurora layer 4 — pink shimmer */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[80vw] h-[50vh] rounded-full"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(330 80% 60% / 0.12) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{
          scaleX: [1, 1.3, 0.8, 1.15, 1],
          scaleY: [1, 0.7, 1.3, 0.9, 1],
          x: ["0%", "15%", "-12%", "8%", "0%"],
          y: ["0%", "-8%", "12%", "-5%", "0%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

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

/* ─── TEAM MEMBER MODAL ─── */
function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-primary/20 shadow-[0_0_80px_-20px_hsl(192_95%_55%/0.25)]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header gradient */}
          <div className="relative p-8 pb-6 bg-gradient-to-br from-primary/10 via-card to-card rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                {member.image ? (
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_-8px_hsl(192_95%_55%/0.3)]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_-8px_hsl(192_95%_55%/0.3)]">
                    <span className="font-display text-2xl font-bold text-primary">{member.initials}</span>
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center gap-1">
                  <Award size={10} /> {member.badge}
                </div>
              </div>

              {/* Name / role */}
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

          {/* Body */}
          <div className="p-8 pt-6 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Skills & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all border border-primary/20 hover:border-primary/40"
              >
                <Mail size={14} /> {member.email}
              </a>
              <a
                href="https://www.upwork.com/agencies/primeassist/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.4)]"
              >
                Hire on Upwork <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── PROJECT MODAL ─── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-primary/20 shadow-[0_0_80px_-20px_hsl(192_95%_55%/0.25)]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`relative p-8 pb-6 bg-gradient-to-br ${project.color} rounded-t-3xl`}>
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-primary transition-all backdrop-blur-sm"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {Array.from({ length: project.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{project.year}</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{project.client}</h2>
            <p className="text-primary font-semibold text-lg mb-3">{project.category}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={12} className="text-primary" />
              <span>{project.duration}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 pt-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Challenge */}
            <div className="p-5 rounded-xl bg-secondary/50 border border-border">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">The Challenge</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>

            {/* Solution */}
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/15">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">Our Solution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>

            {/* Results */}
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

            {/* Tools */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-3">"{project.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} className="fill-primary text-primary" />)}
                </div>
                <span className="text-xs text-primary font-semibold">— {project.client}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-border text-center">
              <a
                href="https://www.upwork.com/agencies/primeassist/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:shadow-[0_0_30px_-5px_hsl(192_95%_55%/0.4)] transition-all duration-300"
              >
                Work With Us <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
      {/* Aurora lights — NO grid */}
      <AuroraBackground />

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
              { icon: Users, label: "11 Specialists" },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                <stat.icon size={18} className="text-primary" />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

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
            <Reveal key={project.client} delay={i * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  className={`group relative h-full p-8 rounded-2xl bg-gradient-to-br ${project.color} border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── TEAM ─── */
function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const lead = TEAM.find(m => m.isLead)!;
  const members = TEAM.filter(m => !m.isLead);

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

        {/* Lead card */}
        <Reveal className="mb-10">
          <TiltCard>
            <motion.div
              className="group p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_-15px_hsl(192_95%_55%/0.2)] cursor-pointer"
              onClick={() => setSelectedMember(lead)}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_-10px_hsl(192_95%_55%/0.3)]">
                    <img src={lead.image} alt={lead.name} className="w-full h-full object-cover" />
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
                    <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
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

        {/* Other members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.06}>
              <TiltCard className="h-full">
                <motion.div
                  className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 text-center cursor-pointer hover:shadow-[0_0_30px_-10px_hsl(192_95%_55%/0.15)]"
                  onClick={() => setSelectedMember(member)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden border border-primary/20 relative">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
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
                    <span>View Profile</span>
                    <ArrowRight size={10} />
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
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
                <a href="https://linkedin.com/company/primeassist" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"><Linkedin size={18} /></a>
                <a href="https://instagram.com/primeassist" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"><Instagram size={18} /></a>
                <a href="https://facebook.com/primeassist" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"><Facebook size={18} /></a>
                <a href="https://twitter.com/primeassist" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"><Twitter size={18} /></a>
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
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee gap-12" style={{ width: "max-content" }}>
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <span key={i} className="text-sm text-muted-foreground font-medium whitespace-nowrap">{tool}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground">
          <div className="font-display text-lg font-bold text-foreground">
            PRIME<span className="text-primary">ASSIST</span>
          </div>
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

/* ─── SCROLL PROGRESS ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]" style={{ scaleX }} />;
}

/* ─── MAIN PAGE ─── */
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
