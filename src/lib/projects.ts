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
    name: "Fintech Growth Platform",
    cat: "Fintech · Web App",
    tags: ["Design", "Development", "Brand"],
    gradient: "linear-gradient(135deg, oklch(0.4 0.15 250), oklch(0.86 0.16 215))",
    span: "lg:col-span-2 lg:row-span-2 min-h-[420px] lg:min-h-[640px]",
    client: "Concept engagement",
    year: "Example direction",
    industry: "Consumer Fintech",
    services: ["Brand Identity", "Product Design", "Web App Development", "Design System"],
    timeline: "14 weeks",
    summary:
      "A concept direction for a modern personal finance platform that needs clearer positioning, stronger onboarding, and a more confident product experience.",
    challenge:
      "The opportunity is to make complex financial information easier to understand, create a more focused onboarding path, and build trust through every interaction.",
    approach: [
      "Ran a 2-week diagnostic with 18 customer interviews and a full funnel audit.",
      "Rebuilt the visual identity around a confident editorial wordmark and a single high-contrast accent.",
      "Shipped a token-driven design system in Figma + code so the team could move 3× faster post-launch.",
      "Re-architected the onboarding to a 4-step flow with progressive disclosure of advanced features.",
    ],
    outcome:
      "The intended direction is a clearer, more trustworthy product experience with a foundation the team can continue to evolve.",
    metrics: [
      { value: "01", label: "Positioning" },
      { value: "02", label: "Product experience" },
      { value: "03", label: "Design system" },
      { value: "04", label: "Growth foundation" },
    ],
    testimonial: {
      quote: "A clearer digital system that makes the value obvious and the next step easy.",
      author: "Gipsm Technology",
      role: "Example engagement direction",
    },
    gallery: [
      "linear-gradient(135deg, oklch(0.35 0.14 250), oklch(0.78 0.16 215))",
      "linear-gradient(135deg, oklch(0.22 0.05 260), oklch(0.55 0.18 230))",
      "linear-gradient(135deg, oklch(0.85 0.18 200), oklch(0.4 0.12 250))",
    ],
  },
  {
    slug: "atlas-outdoor",
    name: "Outdoor Commerce Brand",
    cat: "E-commerce · Branding",
    tags: ["Branding", "Shopify"],
    gradient: "linear-gradient(135deg, oklch(0.3 0.08 60), oklch(0.92 0.21 130))",
    span: "min-h-[300px]",
    client: "Concept engagement",
    year: "Example direction",
    industry: "Outdoor & Apparel",
    services: ["Brand Identity", "Shopify Plus Build", "Photography Direction", "SEO"],
    timeline: "9 weeks",
    summary:
      "A concept direction for an outdoor commerce brand that wants a stronger identity and a more editorial shopping experience.",
    challenge:
      "The opportunity is to connect brand storytelling, product discovery, merchandising, and a simpler path to purchase.",
    approach: [
      "Crafted a wordmark and visual system grounded in topographic maps and field-journal typography.",
      "Built a headless Shopify Hydrogen storefront with custom PDP storytelling modules.",
      "Implemented bundle-builder UX and a localized checkout for US, CA, EU.",
      "Structured the catalogue and rewrote metadata across the product range for SEO.",
    ],
    outcome:
      "The intended direction is a more distinctive storefront that gives customers confidence from first impression through checkout.",
    metrics: [
      { value: "01", label: "Brand system" },
      { value: "02", label: "Commerce experience" },
      { value: "03", label: "Product storytelling" },
      { value: "04", label: "Search foundation" },
    ],
    testimonial: {
      quote: "A considered commerce experience that makes the brand easier to trust.",
      author: "Gipsm Technology",
      role: "Example engagement direction",
    },
    gallery: [
      "linear-gradient(135deg, oklch(0.25 0.06 60), oklch(0.85 0.2 130))",
      "linear-gradient(135deg, oklch(0.6 0.12 90), oklch(0.3 0.08 60))",
      "linear-gradient(135deg, oklch(0.92 0.21 130), oklch(0.45 0.1 80))",
    ],
  },
  {
    slug: "cipher-ai",
    name: "Enterprise AI Platform",
    cat: "SaaS · AI Platform",
    tags: ["Product", "AI"],
    gradient: "linear-gradient(135deg, oklch(0.2 0.05 300), oklch(0.7 0.18 320))",
    span: "min-h-[300px]",
    client: "Concept engagement",
    year: "Example direction",
    industry: "Enterprise AI / DevTools",
    services: ["Product Design", "Marketing Site", "Brand System"],
    timeline: "11 weeks",
    summary:
      "A concept direction for an AI platform that needs enterprise-ready positioning, a credible marketing presence, and a clearer product story.",
    challenge:
      "The opportunity is to translate technical depth into a confident story that helps decision-makers understand the product and its value.",
    approach: [
      "Repositioned around a single high-stakes promise: 'Catch the prompt before it costs you.'",
      "Designed a confident, monochrome-with-violet identity that reads as enterprise-grade.",
      "Shipped a marketing site optimized for sales enablement, with embedded demo and ROI calculator.",
      "Designed the v2 product dashboard alongside their engineering team.",
    ],
    outcome:
      "The intended direction is a sharper enterprise presence that supports sales conversations and makes a complex product easier to evaluate.",
    metrics: [
      { value: "01", label: "Enterprise positioning" },
      { value: "02", label: "Sales enablement" },
      { value: "03", label: "Product narrative" },
      { value: "04", label: "Interface direction" },
    ],
    testimonial: {
      quote: "A stronger product story that helps the right audience understand what matters.",
      author: "Gipsm Technology",
      role: "Example engagement direction",
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
