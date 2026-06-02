import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui-extra/Reveal";

const TIERS = [
  {
    name: "Starter",
    monthly: 4500,
    desc: "For founders shipping their first polished launch.",
    features: ["Landing page or marketing site", "Brand mini-system", "Up to 5 unique sections", "2 rounds of revisions", "Launch in 3–4 weeks"],
  },
  {
    name: "Growth",
    monthly: 12000,
    desc: "For teams scaling product, brand and pipeline together.",
    features: ["Full product or marketing site", "Design system & components", "CMS + integrations", "Performance & SEO audit", "Ongoing retainer option"],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    desc: "Custom engagements for complex product orgs.",
    features: ["Dedicated senior team", "Multi-quarter roadmap", "Design ops & tooling", "Embedded engineering", "Priority SLAs"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center">— Pricing</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-center leading-[1.02]">
            Clear scopes. <span className="text-gradient">Honest numbers.</span>
          </h2>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setYearly((y) => !y)}
              className={`relative h-7 w-14 rounded-full transition-colors ${yearly ? "bg-primary" : "bg-secondary"}`}
              aria-label="Toggle billing period"
            >
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-background transition-all ${yearly ? "left-8" : "left-1"}`} />
            </button>
            <span className={`text-sm flex items-center gap-2 ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-lime text-lime-foreground font-medium">Save 20%</span>
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5 mt-16 items-stretch">
          {TIERS.map((t) => {
            const price = t.monthly == null ? null : Math.round(yearly ? t.monthly * 0.8 : t.monthly);
            return (
              <Reveal key={t.name}>
                <div
                  className={`relative h-full rounded-3xl p-8 transition-all ${
                    t.popular
                      ? "bg-surface border-2 border-primary/60 glow-cyan lg:-translate-y-4"
                      : "glass"
                  }`}
                >
                  {t.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-lime text-lime-foreground px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 min-h-[2.5rem]">{t.desc}</p>

                  <div className="mt-6 mb-8">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-5xl font-bold">${price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </div>
                    ) : (
                      <div className="font-display text-5xl font-bold">Let's talk</div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground/85">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                      t.popular ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_-5px_var(--primary)]" : "border border-border hover:border-primary/60 hover:text-primary"
                    }`}
                  >
                    Get started <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Need something custom? <a href="#contact" className="text-primary hover:underline">Let's talk →</a>
        </p>
      </div>
    </section>
  );
}
