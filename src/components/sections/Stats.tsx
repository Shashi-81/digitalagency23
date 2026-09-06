import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const STATS = [
  { value: "01", label: "Strategy", sub: "Clear positioning and a practical growth roadmap" },
  { value: "02", label: "Experience", sub: "Brand and digital journeys built for trust" },
  { value: "03", label: "Execution", sub: "Websites, campaigns, content, and automation" },
  { value: "04", label: "Momentum", sub: "A system your team can keep improving" },
];

export function Stats() {
  return (
    <section aria-label="Results" className="relative py-24 border-y border-border">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 text-center">
            — Results, not adjectives
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-14 max-w-2xl mx-auto leading-tight">
            Outcomes our partners <span className="text-gradient">actually ship.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden">
          {STATS.map((s) => (
            <StaggerItem
              key={s.label}
              className="bg-background p-8 md:p-10 hover:bg-card transition-colors"
            >
              <div className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-none">
                <span className="text-gradient">{s.value}</span>
              </div>
              <p className="mt-5 font-medium text-foreground">{s.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
