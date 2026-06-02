import { Palette, Code2, Smartphone, Sparkles, TrendingUp, BrainCircuit, ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const SERVICES = [
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces that feel obvious — guided by research, not opinion." },
  { icon: Code2, title: "Web Development", desc: "Production-grade React, edge-rendered and impossibly fast." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feeling cross-platform apps your users won't put down." },
  { icon: Sparkles, title: "Brand & Design Systems", desc: "Identity, typography, and token systems built to scale." },
  { icon: TrendingUp, title: "SEO & Digital Marketing", desc: "Content, performance and search wired to revenue." },
  { icon: BrainCircuit, title: "AI Integration & Automation", desc: "LLM features, agents, and workflows that compound." },
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
            Six tightly-integrated practices. One senior team. Zero handoffs to agencies that don't talk to each other.
          </p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <article className="group relative h-full rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_var(--primary)] overflow-hidden">
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <s.icon className="h-8 w-8 text-primary mb-8" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
