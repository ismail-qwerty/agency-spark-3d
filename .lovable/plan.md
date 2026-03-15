

# Prime Assist — Premium Agency Portfolio

A dark-themed, multi-page single-file React website with 3D card animations, scroll-triggered effects, and a bold typographic identity following the Vanguard Studio design system.

## Pages (all in single React file with state-based routing)

### 1. **Hero / Home**
- Full-screen hero with massive typography: "WE STREAMLINE YOUR BUSINESS"
- Animated availability badge ("Available for Hire — Top Rated Plus")
- Stats bar: 100% Job Success • 11+ Projects • 5.0★ Rating
- CTA buttons: "View Our Work" and "Hire on Upwork"
- Scroll-triggered services preview section
- Custom cursor with spring physics

### 2. **Services**
- Sticky left heading "CORE CAPABILITIES" with scrollable right column
- Six service cards with 3D perspective tilt effect:
  - Virtual Assistance & Admin Support
  - CRM Setup & Management (GHL, Salesforce, etc.)
  - Lead Generation & Prospecting
  - Customer Support & Follow-ups
  - E-commerce & Product Catalog Management
  - Project Management & Coordination
- Each card lists relevant tools (icons for Slack, Notion, Trello, etc.)

### 3. **Work / Projects**
- Grid of 3D perspective cards showcasing key projects:
  - Voomi Supply (E-commerce Catalog)
  - Decimalytics (Executive VA / CRM)
  - SSP Residential Renovations (Construction Admin)
  - Block Street Homes (Real Estate VA)
  - Highkey Enterprises (Business Operations)
  - OpenCS AI (AI Platform Support)
- Each card shows: client name, category, year, 5-star rating, and client testimonial quote
- Hover reveals "View Details" with arrow icon

### 4. **Team**
- Horizontal scroll or grid of team member cards
- Members: Taimour A. (Lead), Fahad Bin A., Muhammad F., Umar F., Qasim J., Farhan A., Zeeshan N.
- Each shows: name, badge (Top Rated Plus / Top Rated), 100% Job Success
- No headshots — geometric avatar placeholders with initials

### 5. **Testimonials**
- Auto-scrolling marquee of client quotes with ratings
- Pulled from real reviews in the uploaded data
- Subtle fade-in animations on scroll

### 6. **Footer / CTA**
- Bold "READY TO SCALE?" headline
- Direct "Hire Us on Upwork" link with arrow animation
- Tool logos marquee (Slack, Notion, Trello, Salesforce, GHL, Apollo, etc.)
- Contact information

## Design & Animation Details
- **Background**: `#050505` obsidian dark theme
- **Accent**: Electric Cyan (`oklch(70% 0.2 250)`)
- **Typography**: Font-black display headings with tight tracking, zinc-400 body text
- **3D Cards**: Mouse-tracking perspective tilt using spring physics (framer-motion)
- **Scroll Progress**: Cyan progress bar fixed at top
- **Custom Cursor**: Spring-animated ring with mix-blend-difference
- **Page Transitions**: AnimatePresence with snappy bezier curves
- **Scroll Animations**: Elements fade/slide in on viewport entry
- **Full-screen Navigation Menu**: Overlay menu with scale hover effects

## Tech
- Single React file with framer-motion for all animations
- Lucide icons for UI elements
- Fully responsive (mobile hamburger menu, stacked layouts)

