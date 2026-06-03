import { useEffect, useRef, useState } from "react";
import { Counter } from "../ui-extra/Counter";
import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const STATS = [
  { value: 312, suffix: "%", label: "Avg. conversion lift", sub: "across shipped redesigns" },
  { value: 48, suffix: "M+", prefix: "$", label: "Raised by our clients", sub: "post-launch, last 24 months" },
  { value: 210, suffix: "+", label: "Products launched", sub: "from seed to Series C" },
  { value: 2.1, suffix: "s", label: "Avg. LCP shipped", sub: "core web vitals, p75", decimals: 1 },
] as const;

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
                {"prefix" in s && s.prefix && <span className="text-primary">{s.prefix}</span>}
                <span className="text-gradient">
                  {"decimals" in s && s.decimals ? (
                    <DecimalCounter to={s.value} decimals={s.decimals} />
                  ) : (
                    <Counter to={s.value} />
                  )}
                  {s.suffix}
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

function DecimalCounter({ to, decimals, duration = 1800 }: { to: number; decimals: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}
