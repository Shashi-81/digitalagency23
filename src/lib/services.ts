export type ServiceFaq = { q: string; a: string };
export type ServicePricing = { tier: string; from: string };
export type ServiceStep = { title: string; window: string; desc: string };
export type ServiceFeature = { icon: string; title: string; desc: string };

export type Service = {
  slug: string;
  short: string; // matches Services section title
  navTitle: string;
  tagline: string;
  seo: { title: string; description: string; keywords: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    badges: string[];
  };
  gradient: string;
  overview: {
    body: string[];
    stats: { value: string; label: string }[];
  };
  features: ServiceFeature[];
  process: ServiceStep[];
  tools: { group: string; items: string[] }[];
  result: { client: string; quote: string };
  pricing: ServicePricing[];
  faqs: ServiceFaq[];
  related: string[]; // slugs
};

const G = {
  cyan: "linear-gradient(135deg, oklch(0.4 0.15 250), oklch(0.86 0.16 215))",
  lime: "linear-gradient(135deg, oklch(0.3 0.08 60), oklch(0.92 0.21 130))",
  violet: "linear-gradient(135deg, oklch(0.2 0.05 300), oklch(0.7 0.18 320))",
  amber: "linear-gradient(135deg, oklch(0.25 0.06 60), oklch(0.85 0.2 60))",
  ocean: "linear-gradient(135deg, oklch(0.18 0.04 240), oklch(0.6 0.18 200))",
  rose: "linear-gradient(135deg, oklch(0.22 0.06 20), oklch(0.78 0.18 20))",
};

export const SERVICES: Service[] = [
  {
    slug: "ui-ux-design",
    short: "UI/UX Design",
    navTitle: "UI/UX Design",
    tagline: "User-centered design that converts.",
    seo: {
      title: "UI/UX Design Services | User-Centered Digital Design — NexaStudio",
      description:
        "Transform your product with world-class UI/UX design. We create intuitive, beautiful, and conversion-optimized interfaces for web and mobile apps.",
      keywords:
        "UI UX design agency, user interface design, user experience design, product design, app design, Figma design agency",
    },
    hero: {
      eyebrow: "— UI/UX Design",
      headline: "Design that users love &",
      headlineAccent: "businesses trust.",
      sub: "We craft pixel-perfect, human-centered digital experiences that reduce churn, boost engagement, and make your product unforgettable.",
      badges: ["⭐ 4.9 Rated", "🎨 150+ Designs Delivered", "⚡ 7-Day First Draft"],
    },
    gradient: G.cyan,
    overview: {
      body: [
        "Great design isn't just about looking good — it's about solving real problems elegantly. Our UI/UX designers combine deep user psychology, data-driven insights, and pixel-perfect craft to build interfaces that convert visitors into loyal customers.",
        "Whether you're launching a new product, redesigning an existing app, or building a design system from scratch — we bring clarity, consistency, and creativity to every screen.",
      ],
      stats: [
        { value: "300+", label: "Screens Designed" },
        { value: "+40%", label: "Avg. Retention Lift" },
        { value: "98%", label: "Client Satisfaction" },
      ],
    },
    features: [
      { icon: "🔍", title: "User Research & Personas", desc: "Deep interviews, surveys, competitor analysis, user journey mapping." },
      { icon: "🗺️", title: "Information Architecture", desc: "Sitemap, content hierarchy, user flow diagrams, card sorting." },
      { icon: "✏️", title: "Wireframing & Prototyping", desc: "Low-fi to high-fi wireframes, clickable Figma prototypes." },
      { icon: "🎨", title: "Visual UI Design", desc: "Full color UI, typography system, iconography, responsive layouts." },
      { icon: "🧩", title: "Design System Creation", desc: "Component library, tokens, Storybook-ready, scalable guidelines." },
      { icon: "🧪", title: "Usability Testing", desc: "Heatmaps, A/B testing, session recordings, iteration reports." },
      { icon: "📱", title: "Responsive Design", desc: "Mobile-first, tablet, desktop — pixel-perfect across all breakpoints." },
      { icon: "🤝", title: "Developer Handoff", desc: "Annotated specs, Figma Dev Mode exports, organized asset packages." },
    ],
    process: [
      { title: "Discovery Call", window: "Day 1–2", desc: "Goals, users, brand and competitors mapped in a working session." },
      { title: "Research & Audit", window: "Day 3–5", desc: "UX audit, heatmaps and user interviews to surface real friction." },
      { title: "Wireframes", window: "Day 6–10", desc: "Flows, sitemaps, low-fi layouts validated before pixels." },
      { title: "UI Design", window: "Day 11–20", desc: "High-fidelity screens and a design system ready to scale." },
      { title: "Handoff & Support", window: "Day 21+", desc: "Dev specs, revisions and QA support as you ship." },
    ],
    tools: [
      { group: "Design", items: ["Figma", "Adobe XD", "Principle", "InVision"] },
      { group: "Research", items: ["Maze", "Hotjar", "Miro", "Notion"] },
      { group: "Handoff", items: ["Figma Dev Mode", "Zeplin", "Lottie"] },
    ],
    result: {
      client: "TechFlow SaaS",
      quote:
        "After redesigning their onboarding flow, TechFlow SaaS saw a 67% drop in drop-off and a 3× lift in trial-to-paid conversions within 60 days.",
    },
    pricing: [
      { tier: "Starter UI Package", from: "$1,500" },
      { tier: "Full Product Design", from: "$4,000" },
      { tier: "Design System", from: "$3,000" },
    ],
    faqs: [
      { q: "How long does a UI/UX design project take?", a: "Typical projects range from 2–8 weeks depending on scope. A simple landing page takes 1 week; a full SaaS product design takes 6–10 weeks." },
      { q: "Do you design for both web and mobile?", a: "Yes — we design fully responsive interfaces for web, iOS and Android, following platform-specific guidelines." },
      { q: "What files will I receive?", a: "Organized Figma source files, exported assets (SVG, PNG, PDF), a component library, and a full developer handoff document." },
      { q: "Can you redesign my existing product?", a: "Absolutely. We start with a UX audit to identify pain points, then redesign strategically — keeping what works, fixing what doesn't." },
      { q: "Do you do user testing?", a: "Yes. We use Maze, Hotjar and moderated sessions to validate designs before development begins." },
      { q: "Will my developer be able to implement the designs?", a: "Every handoff includes annotated specs, spacing guides and a Figma Dev Mode link so developers have everything they need." },
    ],
    related: ["web-development", "brand-identity"],
  },
  {
    slug: "web-development",
    short: "Web Development",
    navTitle: "Web Development",
    tagline: "Fast, scalable, conversion-ready web builds.",
    seo: {
      title: "Web Development Services | Custom Websites & Web Apps — NexaStudio",
      description:
        "Custom web development using React, Next.js and Node.js. We build fast, scalable, SEO-ready websites and web applications that drive real business results.",
      keywords:
        "web development agency, custom website development, Next.js developer, React development, full stack web development, web app development",
    },
    hero: {
      eyebrow: "— Web Development",
      headline: "Websites that work as hard as",
      headlineAccent: "you do.",
      sub: "From lightning-fast marketing sites to complex web applications — we engineer digital products that are fast, scalable and built to grow with your business.",
      badges: ["⚡ 95+ Lighthouse", "🛡️ Secure by Default", "🚀 Edge-Deployed"],
    },
    gradient: G.ocean,
    overview: {
      body: [
        "We don't just write code — we engineer digital products. Every website we build is optimized for speed, SEO, security and conversions from day one. Our full-stack team works in modern frameworks like Next.js, React and Node.js to deliver solutions that are maintainable, scalable and future-proof.",
        "Whether it's a stunning marketing site, a complex SaaS platform or a customer portal — we've built it before, and we'll build it better.",
      ],
      stats: [
        { value: "1.1s", label: "Avg. LCP, p75" },
        { value: "98", label: "Avg. Lighthouse" },
        { value: "120+", label: "Builds Shipped" },
      ],
    },
    features: [
      { icon: "🏗️", title: "Custom Web Development", desc: "Hand-coded, no templates, pixel-perfect implementation." },
      { icon: "⚡", title: "Performance Optimization", desc: "95+ Lighthouse, Core Web Vitals, CDN, image pipeline." },
      { icon: "🔍", title: "On-Page SEO Setup", desc: "Meta tags, schema markup, sitemap, robots, canonicals." },
      { icon: "🔐", title: "Security Hardening", desc: "SSL, CSRF, input sanitization, rate limiting, headers." },
      { icon: "📊", title: "Analytics Integration", desc: "GA4, Tag Manager, conversion tracking, heatmaps." },
      { icon: "🔌", title: "API Development", desc: "REST/GraphQL APIs, Stripe, HubSpot and third-party integrations." },
      { icon: "🖥️", title: "CMS Integration", desc: "Sanity, Contentful, WordPress, Strapi — easy editing." },
      { icon: "🚀", title: "Deployment & DevOps", desc: "CI/CD, Vercel/AWS deployment, staging environments." },
    ],
    process: [
      { title: "Discovery & Planning", window: "Week 1", desc: "Requirements, sitemap, tech stack selection." },
      { title: "Design Integration", window: "Week 2", desc: "Figma to code, component architecture, tokens." },
      { title: "Core Development", window: "Week 3–5", desc: "Frontend, backend, APIs and database wired up." },
      { title: "Testing & QA", window: "Week 6", desc: "Cross-browser, mobile, performance, security." },
      { title: "Launch & Handover", window: "Week 7", desc: "Deployment, training and documentation." },
    ],
    tools: [
      { group: "Frontend", items: ["React", "Next.js", "TanStack Start", "TypeScript", "Tailwind", "Framer Motion"] },
      { group: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
      { group: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase"] },
      { group: "Hosting", items: ["AWS", "Vercel", "Netlify", "Cloudflare"] },
      { group: "CMS", items: ["Sanity", "Contentful", "Strapi", "WordPress"] },
    ],
    result: {
      client: "UrbanCart",
      quote:
        "We rebuilt UrbanCart's e-commerce platform from scratch — load time dropped from 8.2s to 1.1s, resulting in a 43% increase in completed checkouts within the first month.",
    },
    pricing: [
      { tier: "Landing Page", from: "$800" },
      { tier: "Business Website (5–10 pages)", from: "$2,500" },
      { tier: "Web Application / SaaS", from: "$8,000" },
      { tier: "E-commerce Store", from: "$3,500" },
    ],
    faqs: [
      { q: "How long to build a website?", a: "Landing pages: 1–2 weeks. Business websites: 3–5 weeks. Web apps: 8–16 weeks." },
      { q: "Will my site be mobile-friendly?", a: "Every site is built mobile-first — tested on 20+ devices and browsers." },
      { q: "Do you provide hosting?", a: "We set up and configure hosting on your preferred platform (Vercel, AWS, DigitalOcean). We can also manage it ongoing." },
      { q: "Can I update content myself?", a: "Yes — we integrate a headless CMS so you can update text, images and pages without touching code." },
      { q: "Will my website rank on Google?", a: "We implement full technical SEO: fast load times, structured data, semantic HTML, meta tags and sitemaps — the best foundation to rank." },
      { q: "What happens after launch?", a: "We provide 30 days of free bug fixes post-launch, plus optional monthly maintenance packages." },
    ],
    related: ["ui-ux-design", "seo-digital-marketing"],
  },
  {
    slug: "mobile-app-development",
    short: "Mobile App Development",
    navTitle: "Mobile Apps",
    tagline: "iOS & Android apps users love.",
    seo: {
      title: "Mobile App Development | iOS & Android Apps — NexaStudio",
      description:
        "Custom iOS and Android app development. We build high-performance, user-loved mobile apps using React Native and Flutter for startups and enterprises.",
      keywords:
        "mobile app development, iOS app development, Android app development, React Native agency, Flutter development, cross-platform app development",
    },
    hero: {
      eyebrow: "— Mobile App Development",
      headline: "Mobile apps that users",
      headlineAccent: "can't put down.",
      sub: "We build high-performance iOS and Android applications — from MVP to enterprise scale — with obsessive attention to UX, speed and reliability.",
      badges: ["📱 iOS + Android", "⭐ 4.8★ Avg. Store Rating", "🔄 Cross-Platform"],
    },
    gradient: G.violet,
    overview: {
      body: [
        "Whether you're testing a new idea or scaling to millions, we build mobile apps engineered for performance, retention and rave reviews. From offline-first architecture to App Store optimization, every layer is designed to win.",
        "One senior team across design, frontend, backend and DevOps means zero handoff friction — and a faster path from prototype to listing.",
      ],
      stats: [
        { value: "4.8★", label: "Avg. Store Rating" },
        { value: "60 fps", label: "Smooth UI Target" },
        { value: "30+", label: "Apps Shipped" },
      ],
    },
    features: [
      { icon: "📱", title: "Cross-Platform Development", desc: "React Native / Flutter for iOS + Android from one codebase." },
      { icon: "🍎", title: "Native iOS", desc: "Swift, SwiftUI for maximum Apple platform performance." },
      { icon: "🤖", title: "Native Android", desc: "Kotlin and Jetpack Compose for Google Play." },
      { icon: "🔔", title: "Push Notifications", desc: "Firebase Cloud Messaging, local notifications, rich media." },
      { icon: "💳", title: "In-App Purchases", desc: "Stripe, RevenueCat, App Store / Play Store billing." },
      { icon: "🗺️", title: "Maps & Location", desc: "Google Maps, Mapbox, GPS tracking, geofencing." },
      { icon: "🔐", title: "Biometric Auth", desc: "Face ID, Touch ID, fingerprint login, OAuth." },
      { icon: "☁️", title: "Backend & API", desc: "REST APIs, real-time sync, offline-first architecture." },
    ],
    process: [
      { title: "Product Scoping", window: "Week 1", desc: "Features, platform and MVP defined together." },
      { title: "UX/UI Design", window: "Week 2–3", desc: "Wireframes, prototype and native design patterns." },
      { title: "Development Sprint", window: "Week 4–10", desc: "Agile 2-week sprints with daily updates." },
      { title: "QA & Beta Testing", window: "Week 11", desc: "Device testing, TestFlight and Play Store beta." },
      { title: "App Store Launch", window: "Week 12", desc: "Submission, ASO and launch support." },
    ],
    tools: [
      { group: "Frameworks", items: ["React Native", "Flutter", "Expo", "Swift", "Kotlin"] },
      { group: "Backend", items: ["Firebase", "Supabase", "GraphQL", "REST"] },
      { group: "Services", items: ["Stripe", "RevenueCat", "OneSignal", "Sentry"] },
    ],
    result: {
      client: "FitTrack",
      quote:
        "FitTrack hit 10,000 downloads in the first 3 weeks post-launch with a 4.8★ App Store rating — achieved through rigorous UX testing and performance optimization.",
    },
    pricing: [
      { tier: "MVP App (1 platform)", from: "$6,000" },
      { tier: "Cross-Platform App", from: "$10,000" },
      { tier: "Enterprise App", from: "$25,000" },
    ],
    faqs: [
      { q: "iOS or Android first?", a: "We recommend cross-platform (React Native/Flutter) to launch on both simultaneously, saving cost and time." },
      { q: "How long does app development take?", a: "MVP: 8–12 weeks. Full-featured app: 16–24 weeks." },
      { q: "Will you submit to App Store / Play Store?", a: "Yes — we handle the full submission process, screenshots, descriptions and ASO." },
      { q: "Do you provide post-launch support?", a: "Yes — we offer maintenance packages covering bug fixes, OS updates and new features." },
      { q: "Can you build the backend too?", a: "Absolutely — we provide full-stack development including APIs, databases and admin dashboards." },
    ],
    related: ["ui-ux-design", "ai-integration"],
  },
  {
    slug: "brand-identity",
    short: "Brand & Design Systems",
    navTitle: "Brand Identity",
    tagline: "Brand identities that command attention.",
    seo: {
      title: "Brand Identity Design | Logo & Design Systems — NexaStudio",
      description:
        "Build a brand that commands attention. We create strategic brand identities — logo, colors, typography and complete design systems for modern businesses.",
      keywords:
        "brand identity design, logo design agency, brand design, visual identity, design system, brand guidelines",
    },
    hero: {
      eyebrow: "— Brand Identity",
      headline: "Your brand is your first impression —",
      headlineAccent: "make it unforgettable.",
      sub: "We build strategic brand identities that communicate who you are, earn instant trust and scale beautifully across every touchpoint.",
      badges: ["✍️ Strategy First", "🎨 3 Logo Directions", "📦 Full Asset Pack"],
    },
    gradient: G.amber,
    overview: {
      body: [
        "A brand isn't a logo — it's the entire feeling someone gets when they encounter your company. We design brand systems that are strategic, distinctive and engineered to scale across every surface.",
        "From positioning to packaging, you'll leave with a system that earns trust before a single word is read.",
      ],
      stats: [
        { value: "60+", label: "Brands Built" },
        { value: "3", label: "Logo Directions" },
        { value: "100%", label: "Ownership Transfer" },
      ],
    },
    features: [
      { icon: "🔍", title: "Brand Strategy & Positioning", desc: "Mission, vision, values, personas, competitive audit." },
      { icon: "✏️", title: "Logo Design", desc: "Wordmark, lettermark, icon mark, responsive logo system." },
      { icon: "🎨", title: "Color System", desc: "Primary, secondary, neutral palettes with WCAG-compliant contrast." },
      { icon: "📝", title: "Typography System", desc: "Heading, body, accent fonts with a clear usage hierarchy." },
      { icon: "🧩", title: "Brand Guidelines Doc", desc: "40–60 page PDF with do's, don'ts and usage rules." },
      { icon: "📦", title: "Asset Package", desc: "SVG, PNG, EPS, PDF — light and dark versions." },
      { icon: "🖥️", title: "Digital Design System", desc: "Figma component library, design tokens, coded CSS variables." },
      { icon: "📱", title: "Brand Applications", desc: "Business cards, email signature, social templates, pitch deck." },
    ],
    process: [
      { title: "Brand Discovery", window: "Day 1–3", desc: "Workshop, questionnaire and moodboard." },
      { title: "Strategy", window: "Day 4–6", desc: "Positioning, personality and tone of voice." },
      { title: "Concept Design", window: "Day 7–14", desc: "Three distinct logo directions and color exploration." },
      { title: "Refinement", window: "Day 15–20", desc: "Selected direction refined into a full system." },
      { title: "Delivery", window: "Day 21–25", desc: "Guidelines doc, asset package and final files." },
    ],
    tools: [
      { group: "Design", items: ["Figma", "Illustrator", "Photoshop", "After Effects"] },
      { group: "Strategy", items: ["Miro", "Notion", "Brandpad"] },
    ],
    result: {
      client: "Luminary Finance",
      quote:
        "After rebranding with NexaStudio, Luminary Finance raised $800K seed funding within 45 days — investors cited the professional brand presence as a key trust signal.",
    },
    pricing: [
      { tier: "Logo Only", from: "$500" },
      { tier: "Brand Identity", from: "$2,000" },
      { tier: "Full Brand + Design System", from: "$5,000" },
    ],
    faqs: [
      { q: "How many logo concepts will I receive?", a: "You receive 3 distinct directions. After choosing one, we refine it through 2 revision rounds." },
      { q: "What file formats do I get?", a: "SVG, PNG (transparent), EPS, PDF — in color, black, white, and dark/light variants." },
      { q: "Do I own the final logo?", a: "100% — full commercial rights transfer upon final payment." },
      { q: "Can you redesign my existing brand?", a: "Yes. We start with a brand audit and can evolve or completely reimagine your identity." },
    ],
    related: ["ui-ux-design", "web-development"],
  },
  {
    slug: "seo-digital-marketing",
    short: "SEO & Digital Marketing",
    navTitle: "SEO & Marketing",
    tagline: "Search-led growth, wired to revenue.",
    seo: {
      title: "SEO & Digital Marketing Services | Grow Organic Traffic — NexaStudio",
      description:
        "Data-driven SEO and digital marketing that grows your organic traffic, generates qualified leads and delivers measurable ROI. No vanity metrics — just real results.",
      keywords:
        "SEO agency, digital marketing services, search engine optimization, content marketing, Google Ads, social media marketing, local SEO",
    },
    hero: {
      eyebrow: "— SEO & Digital Marketing",
      headline: "Be found. Be chosen. Be ahead of",
      headlineAccent: "your competition.",
      sub: "We build data-driven SEO and marketing strategies that bring the right people to your business — and convert them into paying customers.",
      badges: ["📈 ROI-Focused", "🥇 Top-3 Rankings", "🧠 In-House Writers"],
    },
    gradient: G.lime,
    overview: {
      body: [
        "Marketing without measurement is guesswork. We build full-funnel SEO and growth systems that move the metrics your CFO actually cares about — pipeline, CAC, and revenue.",
        "From technical audits to content engines and paid search, every channel is connected to the next so growth compounds rather than leaks.",
      ],
      stats: [
        { value: "2,250%", label: "Best Traffic Growth" },
        { value: "$180K", label: "New Pipeline / Client" },
        { value: "<6mo", label: "To Top-3 Rankings" },
      ],
    },
    features: [
      { icon: "🔍", title: "Technical SEO Audit", desc: "Site speed, crawlability, Core Web Vitals, indexing, schema." },
      { icon: "📝", title: "Content Strategy & SEO Writing", desc: "Keyword research, topic clusters, blog posts, landing pages." },
      { icon: "🔗", title: "Link Building", desc: "White-hat outreach, digital PR, guest posts, authority backlinks." },
      { icon: "📍", title: "Local SEO", desc: "Google Business Profile, NAP consistency, map pack ranking." },
      { icon: "📊", title: "Google Ads (PPC)", desc: "Search, Display, Shopping campaigns with ROI-focused bidding." },
      { icon: "📱", title: "Social Media Marketing", desc: "Content calendar, creative posts, community management." },
      { icon: "📧", title: "Email Marketing", desc: "Campaigns, automations, drip sequences, Klaviyo/Mailchimp." },
      { icon: "📈", title: "Analytics & Reporting", desc: "Monthly SEO reports, GA4 dashboards, rank tracking, ROI." },
    ],
    process: [
      { title: "Audit & Research", window: "Week 1–2", desc: "Technical audit, competitor gap analysis, keyword mapping." },
      { title: "Strategy", window: "Week 3", desc: "A 90-day roadmap, content calendar and quick wins." },
      { title: "On-Page Optimization", window: "Week 4–6", desc: "Fix technical issues, optimize existing pages." },
      { title: "Content & Links", window: "Month 2–3", desc: "Publish content and start link-building outreach." },
      { title: "Review & Scale", window: "Monthly", desc: "Report, iterate and double down on what works." },
    ],
    tools: [
      { group: "SEO", items: ["Ahrefs", "SEMrush", "Screaming Frog", "Search Console"] },
      { group: "Analytics", items: ["GA4", "Hotjar", "Looker Studio"] },
      { group: "Email & CRM", items: ["Klaviyo", "Mailchimp", "HubSpot"] },
      { group: "Ads & Social", items: ["Google Ads", "Meta Ads", "Buffer"] },
    ],
    result: {
      client: "TechSpark",
      quote:
        "In 6 months, NexaStudio grew TechSpark's organic traffic from 2,000 to 47,000 monthly visits — a 2,250% increase — generating $180K in new pipeline from SEO alone.",
    },
    pricing: [
      { tier: "SEO Starter (Local/Small)", from: "$800/mo" },
      { tier: "SEO Growth (SMB)", from: "$1,800/mo" },
      { tier: "Full Digital Marketing", from: "$3,500/mo" },
      { tier: "One-time SEO Audit", from: "$500" },
    ],
    faqs: [
      { q: "How long before I see SEO results?", a: "Typically 3–6 months for measurable organic growth. Technical fixes and quick wins can show results in 4–8 weeks." },
      { q: "Do you guarantee first-page rankings?", a: "No ethical SEO agency can guarantee rankings — but we have a proven track record of delivering top-3 positions for target keywords within 6 months." },
      { q: "What's the difference between SEO and PPC?", a: "SEO is long-term organic traffic (free per click, builds over time). PPC is immediate paid traffic. We recommend both for full-funnel coverage." },
      { q: "How do you measure success?", a: "Rankings, organic traffic, leads generated, cost per acquisition and revenue — never vanity metrics like raw impressions." },
      { q: "Do you write the content too?", a: "Yes — our in-house SEO writers create keyword-optimized, engaging content. You review and approve before publishing." },
    ],
    related: ["web-development", "ai-integration"],
  },
  {
    slug: "ai-integration",
    short: "AI Integration & Automation",
    navTitle: "AI Integration",
    tagline: "Production-ready AI for real businesses.",
    seo: {
      title: "AI Integration & Automation Services | Build AI-Powered Products — NexaStudio",
      description:
        "Integrate AI into your business — chatbots, automation workflows, LLM-powered apps and custom AI tools built with OpenAI, Claude and more.",
      keywords:
        "AI integration services, AI automation, ChatGPT integration, LLM development, AI chatbot development, business automation, AI-powered app",
    },
    hero: {
      eyebrow: "— AI Integration",
      headline: "Put AI to work for your business —",
      headlineAccent: "before your competitors do.",
      sub: "We build practical, production-ready AI integrations — from intelligent chatbots to full automation pipelines — that save time, cut costs and open new revenue streams.",
      badges: ["🧠 Model-Agnostic", "🛡️ RAG + Guardrails", "⚡ Ship in Weeks"],
    },
    gradient: G.rose,
    overview: {
      body: [
        "Most AI projects fail because they're built as demos, not products. We design and ship AI features that hold up under real-world data, real users and real cost constraints — with monitoring, evals and guardrails built in.",
        "We're model-agnostic and pragmatic. The right tool for the job, integrated cleanly into the systems you already run.",
      ],
      stats: [
        { value: "200+", label: "Hrs Saved / Client / Mo" },
        { value: "30×", label: "Faster Doc Review" },
        { value: "<7 days", label: "First Working Prototype" },
      ],
    },
    features: [
      { icon: "🤖", title: "AI Chatbot Development", desc: "Custom GPT-4/Claude chatbots trained on your data, embedded anywhere." },
      { icon: "⚡", title: "Workflow Automation", desc: "Connect CRM, email, Slack, Sheets — eliminate manual tasks." },
      { icon: "🧠", title: "LLM-Powered Features", desc: "AI search, smart recommendations, summaries, content generation." },
      { icon: "📄", title: "Document AI", desc: "PDF parsing, contract analysis, invoice extraction, knowledge Q&A." },
      { icon: "🎯", title: "AI Personalization", desc: "Dynamic content, personalized journeys, smart recommendations." },
      { icon: "🔊", title: "Voice AI", desc: "Voice assistants, transcription, speech-to-text (Whisper API)." },
      { icon: "🖼️", title: "Image & Vision AI", desc: "Product photo enhancement, visual search, classification." },
      { icon: "📊", title: "Predictive Analytics", desc: "Churn prediction, demand forecasting, anomaly detection." },
    ],
    process: [
      { title: "AI Opportunity Audit", window: "Day 1–3", desc: "Identify highest-ROI automation opportunities in your business." },
      { title: "Proof of Concept", window: "Day 4–10", desc: "Build a working prototype to validate the idea." },
      { title: "Integration Build", window: "Week 2–5", desc: "Full development, API connections and data pipeline." },
      { title: "Testing & Fine-tuning", window: "Week 6", desc: "Accuracy testing, edge cases and safety guardrails." },
      { title: "Deploy & Monitor", window: "Week 7+", desc: "Launch, dashboards and ongoing optimization." },
    ],
    tools: [
      { group: "Models", items: ["OpenAI GPT-4o", "Anthropic Claude", "Gemini", "Whisper", "DALL·E"] },
      { group: "Frameworks", items: ["LangChain", "LlamaIndex", "FastAPI", "Hugging Face"] },
      { group: "Vector DBs", items: ["Pinecone", "Weaviate", "Supabase pgvector"] },
      { group: "Automation", items: ["Zapier", "Make.com", "n8n"] },
    ],
    result: {
      client: "LegalEase",
      quote:
        "We built an AI document processing system for LegalEase that reduced contract review time from 4 hours to 8 minutes per document — saving the team 200+ hours per month.",
    },
    pricing: [
      { tier: "AI Chatbot", from: "$1,500" },
      { tier: "Automation Workflows", from: "$1,000" },
      { tier: "Custom LLM Feature", from: "$3,000" },
      { tier: "Full AI Integration Project", from: "$8,000" },
    ],
    faqs: [
      { q: "Do I need technical knowledge to use AI tools you build?", a: "No — we build admin dashboards and simple interfaces so your team can manage everything without coding." },
      { q: "Is my data safe when using AI APIs?", a: "Yes — we implement data anonymization, use enterprise API tiers with no training on your data, and sign NDAs." },
      { q: "Can you integrate AI into my existing website/app?", a: "Absolutely — we integrate via API into any existing platform, CMS or app without a full rebuild." },
      { q: "What AI models do you use?", a: "We're model-agnostic — we choose the best model (GPT-4o, Claude, Gemini) based on your use case, cost and performance requirements." },
      { q: "How do you prevent AI hallucinations?", a: "We use RAG (Retrieval Augmented Generation), grounding prompts, output validation layers and human-in-the-loop checks for critical workflows." },
    ],
    related: ["web-development", "mobile-app-development"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getRelatedServices = (slug: string) => {
  const svc = getService(slug);
  if (!svc) return [];
  return svc.related.map(getService).filter(Boolean) as Service[];
};
