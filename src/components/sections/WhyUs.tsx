import { Compass, Layers3, MessagesSquare, TrendingUp } from "lucide-react";
import { Reveal } from "../ui-extra/Reveal";

const STATS = [
  { icon: Compass, label: "Business-first strategy" },
  { icon: Layers3, label: "Connected digital systems" },
  { icon: TrendingUp, label: "Performance-minded design" },
  { icon: MessagesSquare, label: "Clear, close collaboration" },
];

export function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Why Gipsm Technology</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold leading-[1.02]">
            We obsess over outcomes, <span className="text-gradient">not deliverables.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg">
            Most agencies sell hours. We sell results. Every engagement starts with the business outcome and works backward — from positioning, to product, to pipeline.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <s.icon className="h-6 w-6 text-primary mb-6" strokeWidth={1.5} />
                <p className="font-display text-xl font-bold tracking-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
