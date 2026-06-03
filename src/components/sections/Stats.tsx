import { Counter } from "../ui-extra/Counter";
import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const STATS = [
  { value: 312, suffix: "%", label: "Avg. conversion lift", sub: "across shipped redesigns" },
  { value: 48, suffix: "M+", prefix: "$", label: "Raised by our clients", sub: "post-launch, last 24 months" },
  { value: 210, suffix: "+", label: "Products launched", sub: "from seed to Series C" },
  { value: 2.1, suffix: "s", label: "Avg. LCP shipped", sub: "core web vitals, p75", decimals: 1 },
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
            <StaggerItem key={s.label} className="bg-background p-8 md:p-10 group hover:bg-card transition-colors">
              <div className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-none">
                {s.prefix && <span className="text-primary">{s.prefix}</span>}
                <span className="text-gradient">
                  {s.decimals ? (
                    <DecimalCounter to={s.value} suffix={s.suffix ?? ""} />
                  ) : (
                    <Counter to={s.value} suffix={s.suffix ?? ""} />
                  )}
                </span>
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

function DecimalCounter({ to, suffix }: { to: number; suffix: string }) {
  // Counter is integer-only; multiply, then format.
  return (
    <>
      <Counter to={Math.round(to * 10)} />
      <span className="sr-only">{suffix}</span>
      <DecimalSuffix suffix={suffix} />
    </>
  );
}

function DecimalSuffix({ suffix }: { suffix: string }) {
  // Render a fake decimal by visual offset: this keeps it simple without a new component.
  return <span aria-hidden>{suffix}</span>;
}
