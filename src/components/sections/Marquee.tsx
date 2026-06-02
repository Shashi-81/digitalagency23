const BRANDS = ["Linear", "Vercel", "Stripe", "Figma", "Framer", "Loom", "Notion", "Arc", "Raycast", "Pitch"];

export function Marquee() {
  return (
    <section aria-label="Trusted by" className="py-16 border-y border-border overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
        Trusted by ambitious teams worldwide
      </p>
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-3xl md:text-4xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors whitespace-nowrap">
              {b} <span className="text-primary/40 ml-16">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
