import { Palette, Code2, Smartphone, Sparkles, TrendingUp, BrainCircuit, Target, MessageCircle, Clapperboard, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const SERVICES = [
  { slug: "ui-ux-design", icon: Palette, title: "UI/UX Design", desc: "Research-led interfaces that make products clearer, smoother, and easier to buy from." },
  { slug: "web-development", icon: Code2, title: "Web Development", desc: "Fast, secure, conversion-ready websites and web apps built for growth and scale." },
  { slug: "mobile-app-development", icon: Smartphone, title: "Mobile App Development", desc: "Cross-platform experiences for iOS and Android that feel polished and reliable." },
  { slug: "brand-identity", icon: Sparkles, title: "Brand & Design Systems", desc: "Positioning, identity, and visual systems that help businesses stand out with consistency." },
  { slug: "seo-digital-marketing", icon: TrendingUp, title: "SEO & Digital Marketing", desc: "Organic traffic, content strategy, and growth systems designed to generate qualified demand." },
  { slug: "ai-integration", icon: BrainCircuit, title: "AI Integration & Automation", desc: "Operational workflows and AI-powered experiences that reduce friction and increase productivity." },
  { slug: "performance-marketing", icon: Target, title: "Performance Marketing", desc: "Google, Meta, and paid acquisition campaigns optimized for measurable ROI, not vanity clicks." },
  { slug: "marketing-automation", icon: MessageCircle, title: "Marketing Automation", desc: "Lifecycle journeys, CRM workflows, and WhatsApp/email systems that move prospects faster." },
  { slug: "content-production", icon: Clapperboard, title: "Content Production", desc: "Video, motion, and creative production that supports brand trust and conversion across channels." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Services</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold max-w-3xl leading-[1.02]">
            Everything you need, <span className="text-gradient">under one roof.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Nine tightly-integrated practices. One senior team. Zero handoffs to agencies that don't talk to each other.
          </p>
        </Reveal>


        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block h-full rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_var(--primary)] overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <s.icon className="h-8 w-8 text-primary mb-8" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
