export type Project = {
  slug: string;
  name: string;
  cat: string;
  tags: string[];
  gradient: string;
  span: string;
  // Detail
  client: string;
  year: string;
  industry: string;
  services: string[];
  timeline: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
  gallery: string[]; // gradient strings reused as visual blocks
};

export const PROJECTS: Project[] = [
  {
    slug: "helio-finance",
    name: "Helio Finance",
    cat: "Fintech · Web App",
    tags: ["Design", "Development", "Brand"],
    gradient: "linear-gradient(135deg, oklch(0.4 0.15 250), oklch(0.86 0.16 215))",
    span: "lg:col-span-2 lg:row-span-2 min-h-[420px] lg:min-h-[640px]",
    client: "Helio Finance",
    year: "2025",
    industry: "Consumer Fintech",
    services: ["Brand Identity", "Product Design", "Web App Development", "Design System"],
    timeline: "14 weeks",
    summary:
      "A complete rebrand and product overhaul for a next-generation personal finance platform serving over 200,000 users across North America.",
    challenge:
      "Helio's legacy interface buried critical insights three taps deep. Activation hovered at 21%, churn at month two was steep, and the brand felt indistinguishable from every other neo-bank in the App Store.",
    approach: [
      "Ran a 2-week diagnostic with 18 customer interviews and a full funnel audit.",
      "Rebuilt the visual identity around a confident editorial wordmark and a single high-contrast accent.",
      "Shipped a token-driven design system in Figma + code so the team could move 3× faster post-launch.",
      "Re-architected the onboarding to a 4-step flow with progressive disclosure of advanced features.",
    ],
    outcome:
      "Activation jumped from 21% to 58% inside the first month. Day-30 retention climbed by 41%, and the new brand earned coverage in TechCrunch and The Verge.",
    metrics: [
      { value: "+176%", label: "Activation rate" },
      { value: "+41%", label: "D30 retention" },
      { value: "1.8s", label: "LCP, p75" },
      { value: "$12M", label: "Series B closed post-launch" },
    ],
    testimonial: {
      quote:
        "NexaStudio didn't redesign our product — they rebuilt our growth engine. We onboarded more users in the first 30 days post-launch than we did the previous quarter combined.",
      author: "Maya Chen",
      role: "VP Product, Helio Finance",
    },
    gallery: [
      "linear-gradient(135deg, oklch(0.35 0.14 250), oklch(0.78 0.16 215))",
      "linear-gradient(135deg, oklch(0.22 0.05 260), oklch(0.55 0.18 230))",
      "linear-gradient(135deg, oklch(0.85 0.18 200), oklch(0.4 0.12 250))",
    ],
  },
  {
    slug: "atlas-outdoor",
    name: "Atlas Outdoor",
    cat: "E-commerce · Branding",
    tags: ["Branding", "Shopify"],
    gradient: "linear-gradient(135deg, oklch(0.3 0.08 60), oklch(0.92 0.21 130))",
    span: "min-h-[300px]",
    client: "Atlas Outdoor Co.",
    year: "2024",
    industry: "Outdoor & Apparel",
    services: ["Brand Identity", "Shopify Plus Build", "Photography Direction", "SEO"],
    timeline: "9 weeks",
    summary:
      "A heritage-meets-modern rebrand and headless Shopify build for a fast-growing direct-to-consumer outdoor brand.",
    challenge:
      "Atlas was outgrowing a templated Shopify theme that couldn't keep up with editorial storytelling, custom bundles, or international shipping logic. Conversion was stuck at 1.4%.",
    approach: [
      "Crafted a wordmark and visual system grounded in topographic maps and field-journal typography.",
      "Built a headless Shopify Hydrogen storefront with custom PDP storytelling modules.",
      "Implemented bundle-builder UX and a localized checkout for US, CA, EU.",
      "Migrated 1,200 SKUs and rewrote metadata across the catalogue for SEO.",
    ],
    outcome:
      "Conversion rate doubled within 60 days of launch, AOV climbed 34%, and organic traffic grew 2.1× year over year.",
    metrics: [
      { value: "2.0×", label: "Conversion rate" },
      { value: "+34%", label: "Average order value" },
      { value: "2.1×", label: "Organic traffic YoY" },
      { value: "98", label: "Lighthouse score" },
    ],
    testimonial: {
      quote:
        "Every detail feels considered — from the typography down to the checkout micro-copy. Our customers tell us the site is the reason they trust the brand.",
      author: "Jordan Reyes",
      role: "Founder, Atlas Outdoor",
    },
    gallery: [
      "linear-gradient(135deg, oklch(0.25 0.06 60), oklch(0.85 0.2 130))",
      "linear-gradient(135deg, oklch(0.6 0.12 90), oklch(0.3 0.08 60))",
      "linear-gradient(135deg, oklch(0.92 0.21 130), oklch(0.45 0.1 80))",
    ],
  },
  {
    slug: "cipher-ai",
    name: "Cipher AI",
    cat: "SaaS · AI Platform",
    tags: ["Product", "AI"],
    gradient: "linear-gradient(135deg, oklch(0.2 0.05 300), oklch(0.7 0.18 320))",
    span: "min-h-[300px]",
    client: "Cipher AI",
    year: "2025",
    industry: "Enterprise AI / DevTools",
    services: ["Product Design", "Marketing Site", "Brand System"],
    timeline: "11 weeks",
    summary:
      "Positioning, brand, marketing site, and core product UI for an AI security platform launching to Fortune 500 buyers.",
    challenge:
      "Cipher was technically deep but visually invisible — the team needed a brand and marketing site that could earn meetings with CISOs at 24 hours' notice.",
    approach: [
      "Repositioned around a single high-stakes promise: 'Catch the prompt before it costs you.'",
      "Designed a confident, monochrome-with-violet identity that reads as enterprise-grade.",
      "Shipped a marketing site optimized for sales enablement, with embedded demo and ROI calculator.",
      "Designed the v2 product dashboard alongside their engineering team.",
    ],
    outcome:
      "Inbound demo requests grew 6×, the sales team closed 3 enterprise pilots in the first month, and the company raised a $9M seed extension.",
    metrics: [
      { value: "6×", label: "Inbound demos" },
      { value: "3", label: "Enterprise pilots in 30 days" },
      { value: "$9M", label: "Seed extension raised" },
      { value: "94", label: "Brand recall (internal study)" },
    ],
    testimonial: {
      quote:
        "We went from 'who?' to a credible enterprise vendor in under three months. The brand carries the room before our reps say a word.",
      author: "Dev Patel",
      role: "Co-founder & CEO, Cipher AI",
    },
    gallery: [
      "linear-gradient(135deg, oklch(0.18 0.04 300), oklch(0.65 0.2 320))",
      "linear-gradient(135deg, oklch(0.3 0.08 280), oklch(0.55 0.16 310))",
      "linear-gradient(135deg, oklch(0.7 0.18 320), oklch(0.22 0.05 290))",
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
