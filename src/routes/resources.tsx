import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mail, FileText, Palette, Search, ClipboardList, Check } from "lucide-react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";

const TITLE = "Free Resources — UI Kits, SEO & Brand Templates | NexaStudio";
const DESCRIPTION =
  "Hand-picked free tools and templates for founders: UI kit, SEO checklist, brand guide template, and a project brief template.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/resources" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const RESOURCES = [
  {
    id: "ui-kit",
    icon: Palette,
    title: "NexaStudio UI Kit",
    desc: "120+ Figma components, dark-first, fully tokenized. Use for landing pages, dashboards, and product UIs.",
    file: "/resources/nexa-ui-kit.fig",
  },
  {
    id: "seo-checklist",
    icon: Search,
    title: "SEO Launch Checklist",
    desc: "47-point checklist covering technical SEO, on-page, schema, and Core Web Vitals before you ship.",
    file: "/resources/seo-checklist.pdf",
  },
  {
    id: "brand-guide",
    icon: FileText,
    title: "Brand Guide Template",
    desc: "A clean, editable brand-book template covering identity, voice, colour, typography, and usage rules.",
    file: "/resources/brand-guide-template.fig",
  },
  {
    id: "project-brief",
    icon: ClipboardList,
    title: "Project Brief Template",
    desc: "The exact one-pager we use to scope new engagements. Save weeks of back-and-forth with stakeholders.",
    file: "/resources/project-brief.docx",
  },
];

const emailSchema = z.string().trim().email().max(255);

function Resources() {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [error, setError] = useState<string | null>(null);

  const open = (id: string) => {
    if (unlocked[id]) {
      window.open(RESOURCES.find((r) => r.id === id)?.file ?? "#", "_blank");
      return;
    }
    setActive(id);
    setError(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // bot
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError("Please enter a valid email.");
      return;
    }
    if (active) {
      setUnlocked((u) => ({ ...u, [active]: true }));
      const res = RESOURCES.find((r) => r.id === active);
      if (res) window.open(res.file, "_blank");
      setActive(null);
      setEmail("");
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <main>
        <section className="pt-36 pb-16 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">— Free Resources</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] max-w-4xl">
                Free tools & templates for <span className="text-gradient">founders.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Hand-crafted templates we use every day. Drop your email and get instant access — no spam, unsubscribe any time.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <StaggerGroup className="grid md:grid-cols-2 gap-5">
              {RESOURCES.map((r) => (
                <StaggerItem key={r.id}>
                  <article className="h-full rounded-2xl glass p-7 flex flex-col">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 inline-flex items-center justify-center shrink-0">
                        <r.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold mb-2">{r.title}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => open(r.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
                      >
                        {unlocked[r.id] ? (
                          <>
                            <Check className="h-4 w-4" /> Download again
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" /> Download
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Email gate modal */}
        {active && (
          <div
            className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div
              className="w-full max-w-md rounded-3xl glass p-7"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gate-title"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 inline-flex items-center justify-center mb-5">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 id="gate-title" className="font-display text-2xl font-bold mb-2">
                Enter your email to unlock
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                We'll email the file link instantly. No spam, ever — unsubscribe with one click.
              </p>
              <form onSubmit={submit} className="space-y-3" noValidate>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                <label htmlFor="res-email" className="sr-only">Email</label>
                <input
                  id="res-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border border-border rounded-full px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary outline-none"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
                >
                  <Download className="h-4 w-4" /> Send me the file
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
              </form>
            </div>
          </div>
        )}

        <section className="py-20 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </section>
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
