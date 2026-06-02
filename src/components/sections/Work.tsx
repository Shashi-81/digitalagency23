import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui-extra/Reveal";

const PROJECTS = [
  {
    name: "Helio Finance",
    cat: "Fintech · Web App",
    tags: ["Design", "Development", "Brand"],
    gradient: "linear-gradient(135deg, oklch(0.4 0.15 250), oklch(0.86 0.16 215))",
    span: "lg:col-span-2 lg:row-span-2 min-h-[420px] lg:min-h-[640px]",
  },
  {
    name: "Atlas Outdoor",
    cat: "E-commerce · Branding",
    tags: ["Branding", "Shopify"],
    gradient: "linear-gradient(135deg, oklch(0.3 0.08 60), oklch(0.92 0.21 130))",
    span: "min-h-[300px]",
  },
  {
    name: "Cipher AI",
    cat: "SaaS · AI Platform",
    tags: ["Product", "AI"],
    gradient: "linear-gradient(135deg, oklch(0.2 0.05 300), oklch(0.7 0.18 320))",
    span: "min-h-[300px]",
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Selected Work</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">
                Recent <span className="text-gradient">case studies.</span>
              </h2>
            </div>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              View all work <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <Reveal key={p.name} className={p.span}>
              <a
                href="#contact"
                className="group block h-full rounded-3xl overflow-hidden relative border border-border"
                style={{ background: p.gradient }}
              >
                {/* texture */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, black 0%, transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm" />

                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-background/40 backdrop-blur-md border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2">{p.cat}</p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold">{p.name}</h3>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View case study <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
