import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Check, Shield, Clock, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";
import { Contact } from "@/components/sections/Contact";

const TITLE = "Hire Us — Build Something Amazing with NexaStudio";
const DESCRIPTION =
  "Ready to start a project? Get a free quote in 24 hours. Senior team, fixed-fee proposals, money-back guarantee.";

export const Route = createFileRoute("/hire-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/hire-us" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/hire-us" }],
  }),
  component: HireUs,
});

const STEPS = [
  { n: "01", title: "Share your brief", desc: "Fill the form or book a call. We respond within 24 hours with relevant questions." },
  { n: "02", title: "Get a tailored proposal", desc: "Fixed-fee, milestone-based proposal with scope, timeline, and a senior team lined up." },
  { n: "03", title: "Kick off in days, not months", desc: "Sign, deposit, and we start. Weekly demos, async updates, transparent progress." },
];

const PRICING_HINTS = [
  { tier: "Brand Identity", from: "$6k" },
  { tier: "Marketing Website", from: "$12k" },
  { tier: "Product Design", from: "$18k" },
  { tier: "Full Web App", from: "$40k" },
];

function HireUs() {
  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 mesh-bg opacity-60 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">— Hire NexaStudio</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] max-w-5xl">
                Let's build something <span className="text-gradient">amazing together.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A senior, full-stack team ready to design, build, and ship your next product. Get a free, fixed-fee quote in 24 hours.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
                >
                  Start a Project <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://cal.com/nexastudio/intro"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary/60 hover:text-primary transition-colors"
                >
                  <Calendar className="h-4 w-4" /> Book a Call
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl">
                {[
                  { I: Clock, label: "Reply in 24h", sub: "Every business day" },
                  { I: Shield, label: "NDA on request", sub: "Always confidential" },
                  { I: RotateCcw, label: "Money-back", sub: "7-day no-questions" },
                ].map(({ I, label, sub }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl glass p-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 inline-flex items-center justify-center shrink-0">
                      <I className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Process</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-16">
                Three steps to <span className="text-gradient">kickoff.</span>
              </h2>
            </Reveal>
            <StaggerGroup className="grid md:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <StaggerItem key={s.n}>
                  <article className="h-full rounded-2xl glass p-7">
                    <p className="font-display text-4xl font-bold text-gradient mb-4 tabular-nums">{s.n}</p>
                    <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Pricing snapshot */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Starting from</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-4">
                Transparent <span className="text-gradient">pricing.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-16">
                Every project is custom-scoped. Below are typical starting points — your exact quote comes back within 24 hours.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRICING_HINTS.map((p) => (
                <Reveal key={p.tier}>
                  <article className="h-full rounded-2xl glass p-7">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">From</p>
                    <div className="font-display text-4xl font-bold text-gradient mb-4">{p.from}</div>
                    <h3 className="font-display text-lg font-medium">{p.tier}</h3>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Calendly placeholder + Contact form */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="rounded-2xl glass p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">— Prefer to talk?</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">Book a 20-min intro call directly.</h3>
                  <p className="mt-2 text-muted-foreground text-sm flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> No prep needed
                    <Check className="h-4 w-4 text-primary ml-4" /> No sales pitch
                  </p>
                </div>
                <a
                  href="https://cal.com/nexastudio/intro"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow shrink-0"
                >
                  <Calendar className="h-4 w-4" /> Open Calendar
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact form (re-use main section) */}
        <Contact />

        {/* Bottom link back */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
