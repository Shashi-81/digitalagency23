import { Reveal, StaggerGroup, StaggerItem } from "../ui-extra/Reveal";

const STEPS = [
  { n: "01", t: "Discovery", d: "Deep workshops to map goals, users, and constraints." },
  { n: "02", t: "Strategy", d: "Positioning, IA, and a measurable success roadmap." },
  { n: "03", t: "Design", d: "Brand, UI and prototypes refined to pixel & pulse." },
  { n: "04", t: "Development", d: "Production engineering with daily previews." },
  { n: "05", t: "Launch", d: "Ship, measure, iterate. Partnership doesn't end here." },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Process</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] max-w-3xl">
            A process built for <span className="text-gradient">momentum.</span>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          {/* connecting line desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative">
                  <div className="hidden lg:block absolute -top-1 left-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
                  <div className="font-display text-sm text-primary font-bold mb-4 mt-6 lg:mt-10 tracking-widest">{s.n}</div>
                  <h3 className="font-display text-2xl font-bold mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
