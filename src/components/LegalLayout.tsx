import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ArrowUp, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import type { LegalDoc } from "@/lib/legal";

export function LegalLayout({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [doc]);

  return (
    <div className="relative">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-36 pb-12 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground">Home</Link>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li>
                  <span className="text-muted-foreground">Legal</span>
                </li>
                <ChevronRight className="h-3 w-3" />
                <li className="text-foreground">{doc.title}</li>
              </ol>
            </nav>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-primary">— Legal</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              {doc.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{doc.intro}</p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              Last updated: <span className="text-foreground font-medium">{doc.lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
            {/* TOC */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                  On this page
                </p>
                <ol className="space-y-1.5 text-sm">
                  {doc.sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block rounded-lg px-3 py-2 transition-colors ${
                          active === s.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface"
                        }`}
                      >
                        <span className="tabular-nums opacity-60 mr-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Content */}
            <article className="lg:col-span-9 max-w-3xl">
              {doc.sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 mb-16 last:mb-0"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    {s.title}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {s.highlight && (
                    <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold text-primary">Important: </span>
                        {s.highlight}
                      </p>
                    </div>
                  )}
                  {s.subsections?.map((sub) => (
                    <div key={sub.title} className="mt-6">
                      <h3 className="font-display text-xl font-bold mb-3">{sub.title}</h3>
                      <div className="space-y-3 text-muted-foreground leading-relaxed">
                        {sub.body.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ))}

              {/* Legal contact card */}
              <div className="mt-20 rounded-2xl glass p-7">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 inline-flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">Questions about this page?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Reach our legal team — we reply within one business day.
                    </p>
                    <a
                      href="mailto:legal@nexastudio.com"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      legal@nexastudio.com
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCta />

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 md:bottom-8 right-6 z-40 h-11 w-11 inline-flex items-center justify-center rounded-full glass hover:border-primary/60 hover:text-primary transition-colors active:scale-95"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
