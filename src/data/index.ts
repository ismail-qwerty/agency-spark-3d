import {
  Briefcase, BarChart3, Zap, Headphones, ShoppingCart, FolderKanban,
} from "lucide-react";

import teamTaimour from "@/assets/team-taimour.jpg";
import teamFahad from "@/assets/team-fahad.jpg";
import teamMuhammad from "@/assets/team-muhammad.jpg";
import teamUmar from "@/assets/team-umar.jpg";
import teamQasim from "@/assets/team-qasim.jpg";
import teamFarhan from "@/assets/team-farhan.jpg";
import teamZeeshan from "@/assets/team-zeeshan.jpg";
import type { Project, TeamMember } from "@/types";

export const SERVICES = [
  { icon: Briefcase, title: "Virtual Assistance & Admin Support", desc: "Calendar management, email handling, data entry, and comprehensive administrative support to keep your operations running smoothly.", tools: ["Google Workspace", "Microsoft 365", "Slack", "Notion"] },
  { icon: BarChart3, title: "CRM Setup & Management", desc: "End-to-end CRM implementation and optimization across GoHighLevel, Salesforce, HubSpot, and more.", tools: ["GoHighLevel", "Salesforce", "HubSpot", "Apollo"] },
  { icon: Zap, title: "Lead Generation & Prospecting", desc: "Strategic outreach campaigns, prospect research, and pipeline management to fuel your growth.", tools: ["Apollo", "LinkedIn", "Hunter.io", "Lemlist"] },
  { icon: Headphones, title: "Customer Support & Follow-ups", desc: "Professional customer communication, ticket management, and relationship nurturing.", tools: ["Zendesk", "Intercom", "Freshdesk", "Crisp"] },
  { icon: ShoppingCart, title: "E-commerce & Catalog Management", desc: "Product listing optimization, inventory tracking, and marketplace management across platforms.", tools: ["Shopify", "Amazon", "WooCommerce", "BigCommerce"] },
  { icon: FolderKanban, title: "Project Management & Coordination", desc: "End-to-end project coordination, milestone tracking, and cross-team communication.", tools: ["Trello", "Asana", "Monday.com", "ClickUp"] },
];

export const PROJECTS: Project[] = [
  {
    client: "Voomi Supply", category: "E-commerce Catalog", year: "2024", rating: 5,
    quote: "Exceptional attention to detail in managing our entire product catalog. Highly recommended!",
    color: "from-primary/20 to-primary/5",
    description: "Full-scale e-commerce catalog management for a leading supply chain company, covering thousands of SKUs across multiple marketplaces.",
    challenge: "Voomi Supply needed to manage an ever-growing product catalog with inconsistent data quality across Shopify, Amazon, and their own storefront. Manual entry was causing delays and errors.",
    solution: "We built a streamlined catalog management workflow using custom templates and bulk-edit processes, integrating Shopify and Amazon APIs to synchronize inventory in real-time.",
    results: ["99.8% catalog accuracy achieved", "40% reduction in listing errors", "3× faster product onboarding", "Full Shopify + Amazon sync"],
    tools: ["Shopify", "Amazon Seller Central", "Google Sheets", "Zapier"], duration: "8 months (ongoing)",
  },
  {
    client: "Decimalytics", category: "Executive VA / CRM", year: "2024", rating: 5,
    quote: "Taimour and team transformed our CRM workflow. Outstanding professionalism and results.",
    color: "from-primary/15 to-secondary",
    description: "Executive-level virtual assistance and complete CRM overhaul for a fast-growing analytics SaaS startup.",
    challenge: "Decimalytics' sales pipeline was fragmented across spreadsheets, email threads, and sticky notes. The CEO was spending 3+ hours daily on admin tasks instead of strategy.",
    solution: "We migrated their entire pipeline into HubSpot, automated follow-up sequences, set up deal tracking, and provided executive VA support for scheduling, research, and reporting.",
    results: ["CEO saved 15+ hrs/week on admin", "Pipeline visibility improved 100%", "Lead response time cut from 48h to 2h", "HubSpot fully implemented in 2 weeks"],
    tools: ["HubSpot", "Google Workspace", "Calendly", "Slack", "Notion"], duration: "6 months (ongoing)",
  },
  {
    client: "SSP Residential Renovations", category: "Construction Admin", year: "2024", rating: 5,
    quote: "Reliable, efficient, and always ahead of deadlines. A true asset to our operations.",
    color: "from-primary/20 to-primary/5",
    description: "Comprehensive administrative support for a busy residential construction and renovation company managing multiple concurrent projects.",
    challenge: "SSP was juggling 12+ active renovation projects with no centralized system. Contractor scheduling, permit tracking, and client communication were all siloed.",
    solution: "We created a unified project management hub in Asana, set up automated client update emails, built contractor scheduling workflows, and managed permit document pipelines.",
    results: ["12 concurrent projects tracked seamlessly", "Zero missed permit deadlines", "Client satisfaction score: 4.9/5", "30% faster contractor coordination"],
    tools: ["Asana", "Google Workspace", "DocuSign", "Calendly"], duration: "10 months (ongoing)",
  },
  {
    client: "Block Street Homes", category: "Real Estate VA", year: "2023", rating: 5,
    quote: "They streamlined our entire listing process. Can't imagine working without them now.",
    color: "from-primary/15 to-secondary",
    description: "End-to-end virtual assistance for a real estate brokerage, managing MLS listings, client follow-ups, and transaction coordination.",
    challenge: "Block Street Homes was losing potential leads due to slow listing uploads and inconsistent follow-up. Agents were buried in paperwork instead of closing deals.",
    solution: "We took over all MLS listing preparation, photo uploads, description writing, and CRM entry. Built an automated drip campaign for lead nurturing in GoHighLevel.",
    results: ["Listing turnaround cut from 3 days to 4 hours", "Lead follow-up 100% automated", "25% increase in conversion rate", "GoHighLevel CRM fully operational"],
    tools: ["GoHighLevel", "MLS Platforms", "Google Workspace", "Canva"], duration: "14 months (ongoing)",
  },
  {
    client: "Highkey Enterprises", category: "Business Operations", year: "2023", rating: 5,
    quote: "Professional, proactive, and incredibly organized. Top-tier virtual assistance.",
    color: "from-primary/20 to-primary/5",
    description: "Full business operations support for a multi-brand digital agency, covering project management, team coordination, and executive support.",
    challenge: "Highkey's rapid growth meant internal processes couldn't keep up. Multiple brands, 20+ freelancers, and complex client deliverables were creating operational chaos.",
    solution: "We restructured their ClickUp workspace, introduced SOPs for each brand, onboarded new freelancers, managed weekly reporting, and provided executive-level support to the founder.",
    results: ["20+ freelancers onboarded smoothly", "Weekly reporting automated", "SOP library with 40+ documented processes", "On-time delivery rate improved to 97%"],
    tools: ["ClickUp", "Slack", "Notion", "Google Workspace", "Loom"], duration: "18 months (ongoing)",
  },
  {
    client: "OpenCS AI", category: "AI Platform Support", year: "2024", rating: 5,
    quote: "Handled complex workflows with ease. Their technical aptitude is impressive.",
    color: "from-primary/15 to-secondary",
    description: "Technical virtual assistance and operations support for an AI-powered customer service platform during a critical growth phase.",
    challenge: "OpenCS AI needed support managing technical documentation, client onboarding workflows, and complex multi-stakeholder projects — all with tight SLAs.",
    solution: "We embedded with their team to manage client onboarding documentation, set up automated ticketing via Zendesk, maintained product wikis in Notion, and coordinated cross-functional sprints.",
    results: ["Client onboarding time reduced by 50%", "Zendesk ticketing system fully configured", "100% SLA compliance maintained", "Product docs always up-to-date"],
    tools: ["Zendesk", "Notion", "Jira", "Slack", "Google Workspace"], duration: "5 months",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Taimour A.", role: "Founder & Lead VA", badge: "Top Rated Plus", initials: "TA",
    image: teamTaimour,
    bio: "Visionary leader with 5+ years of experience in virtual assistance and business operations. Built Prime Assist from the ground up, specializing in CRM management, lead generation, and scaling remote teams for global clients.",
    email: "taimour@primeassist.co", isLead: true,
    skills: ["CRM Strategy", "Team Leadership", "Business Operations", "GoHighLevel", "Lead Generation", "Executive Support"],
    experience: "5+ years",
  },
  {
    name: "Fahad Bin A.", role: "Senior VA", badge: "Top Rated Plus", initials: "FA",
    image: teamFahad,
    bio: "Expert in executive-level administrative support with deep proficiency in Google Workspace and project coordination. Fahad specializes in calendar management, inbox zero strategies, and building efficient workflows for busy executives.",
    email: "fahad@primeassist.co", isLead: false,
    skills: ["Google Workspace", "Calendar Management", "Email Handling", "Data Entry", "Research", "Scheduling"],
    experience: "4+ years",
  },
  {
    name: "Qasim J.", role: "E-commerce VA", badge: "Top Rated", initials: "QJ",
    image: teamQasim,
    bio: "E-commerce operations expert managing product catalogs, inventory, and marketplace optimization on Shopify and Amazon. Qasim ensures product data accuracy and maximizes visibility through SEO-optimized listings.",
    email: "qasim@primeassist.co", isLead: false,
    skills: ["Shopify", "Amazon FBA", "Product Listing", "Inventory Management", "WooCommerce", "Catalog SEO"],
    experience: "3+ years",
  },
  {
    name: "Faizan A.", role: "Senior VA", badge: "Top Rated", initials: "FZ",
    bio: "Dedicated virtual assistant with a strong background in administrative support, client communication, and operational workflows. Faizan brings reliability and precision to every task, ensuring seamless day-to-day operations for clients.",
    email: "faizan@primeassist.co", isLead: false,
    skills: ["Virtual Assistance", "Admin Support", "Client Communication", "Google Workspace", "Data Entry", "Scheduling"],
    experience: "3+ years",
  },
  {
    name: "Muhammad F.", role: "CRM Specialist", badge: "Top Rated", initials: "MF",
    image: teamMuhammad,
    bio: "CRM architect specializing in GoHighLevel, Salesforce, and HubSpot implementations for scaling businesses. Muhammad has built and optimized CRM systems for 30+ clients across real estate, SaaS, and e-commerce industries.",
    email: "muhammad@primeassist.co", isLead: false,
    skills: ["GoHighLevel", "Salesforce", "HubSpot", "Automation", "Pipeline Management", "CRM Migration"],
    experience: "3+ years",
  },
  {
    name: "Umar F.", role: "Lead Gen Expert", badge: "Top Rated", initials: "UF",
    image: teamUmar,
    bio: "Strategic outreach specialist with proven results in B2B lead generation using Apollo, LinkedIn, and cold email campaigns. Umar has generated 10,000+ qualified leads for clients across tech, real estate, and professional services.",
    email: "umar@primeassist.co", isLead: false,
    skills: ["Apollo.io", "LinkedIn Outreach", "Cold Email", "B2B Prospecting", "Lemlist", "Hunter.io"],
    experience: "3+ years",
  },
  {
    name: "Farhan A.", role: "Project Manager", badge: "Top Rated", initials: "FA",
    image: teamFarhan,
    bio: "Certified project manager experienced in Agile methodologies, cross-team coordination, and milestone delivery. Farhan keeps complex multi-stakeholder projects on track with clear communication and proactive risk management.",
    email: "farhan@primeassist.co", isLead: false,
    skills: ["Agile/Scrum", "Asana", "ClickUp", "Risk Management", "Stakeholder Communication", "Monday.com"],
    experience: "4+ years",
  },
  {
    name: "Zeeshan N.", role: "Admin Support", badge: "Top Rated", initials: "ZN",
    image: teamZeeshan,
    bio: "Detail-oriented administrative professional handling data entry, scheduling, and operational workflows with precision. Zeeshan is the backbone of our day-to-day operations, ensuring nothing falls through the cracks.",
    email: "zeeshan@primeassist.co", isLead: false,
    skills: ["Data Entry", "Scheduling", "Report Generation", "MS Office", "Document Management", "Transcription"],
    experience: "2+ years",
  },
  {
    name: "Wahaj Ali", role: "Operations VA", badge: "Rising Talent", initials: "WA",
    bio: "Dedicated operations virtual assistant with a strong focus on workflow optimization, task management, and cross-functional support. Wahaj brings energy and precision to every project, ensuring smooth day-to-day operations.",
    email: "wahaj@primeassist.co", isLead: false,
    skills: ["Workflow Optimization", "Task Management", "Google Workspace", "Slack", "Notion", "Operations Support"],
    experience: "2+ years",
  },
  {
    name: "Haseeb Hashmi", role: "Digital Marketing VA", badge: "Rising Talent", initials: "HH",
    bio: "Digital marketing specialist focused on content scheduling, social media management, and campaign support.",
    email: "haseeb@primeassist.co", isLead: false,
    skills: ["Social Media", "Content Scheduling", "Canva", "Buffer", "Email Marketing", "Analytics"],
    experience: "2+ years",
  },
  {
    name: "Hamza Bhatti", role: "Sales Support VA", badge: "Rising Talent", initials: "HB",
    bio: "Sales-focused VA specializing in prospecting, CRM data hygiene, and follow-up automation.",
    email: "hamza@primeassist.co", isLead: false,
    skills: ["CRM Data Entry", "Prospecting", "Follow-up Sequences", "Sales Reporting", "Apollo", "HubSpot"],
    experience: "2+ years",
  },
  {
    name: "Arslan Bhatti", role: "Tech & Automation VA", badge: "Rising Talent", initials: "AB",
    bio: "Tech-savvy virtual assistant with expertise in no-code automation and workflow optimization using Zapier and Make.com.",
    email: "arslan@primeassist.co", isLead: false,
    skills: ["Zapier", "Make.com", "Airtable", "Notion", "API Integrations", "Workflow Automation"],
    experience: "2+ years",
  },
  {
    name: "Ismail Bhatti", role: "Research & Data VA", badge: "Rising Talent", initials: "IB",
    bio: "Meticulous research analyst and data management specialist excelling at market research and competitor analysis.",
    email: "ismail@primeassist.co", isLead: false,
    skills: ["Market Research", "Data Analysis", "Google Sheets", "Competitor Analysis", "Report Writing", "Excel"],
    experience: "2+ years",
  },
];

export const TESTIMONIALS = [
  { text: "Prime Assist completely transformed how we handle day-to-day operations. Their team is proactive, detail-oriented, and always delivers ahead of schedule.", author: "James K.", company: "Voomi Supply" },
  { text: "Working with Taimour's team has been an absolute game-changer. Our CRM is finally organized and our leads are converting better than ever.", author: "Sarah M.", company: "Decimalytics" },
  { text: "I've hired many VAs on Upwork, but Prime Assist is in a league of their own. Professional, reliable, and they truly understand business operations.", author: "Michael R.", company: "Block Street Homes" },
  { text: "Their attention to detail is unmatched. Every task is completed with precision and care. Highly recommend for any business looking to scale.", author: "David L.", company: "Highkey Enterprises" },
  { text: "From project management to customer support, they handle everything seamlessly. It's like having an entire operations team at a fraction of the cost.", author: "Emily T.", company: "SSP Renovations" },
  { text: "The team's technical skills combined with their business acumen make them invaluable. They don't just execute—they strategize and improve processes.", author: "Alex P.", company: "OpenCS AI" },
];

export const TOOLS = ["Slack", "Notion", "Trello", "Salesforce", "GoHighLevel", "Apollo", "HubSpot", "Asana", "Shopify", "ClickUp", "Zendesk", "Monday.com", "Google Workspace", "LinkedIn", "Zapier", "Calendly"];

export const NAV_ITEMS = ["Home", "Services", "Work", "Team", "Testimonials", "Contact"];
