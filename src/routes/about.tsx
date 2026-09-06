import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Gauge, Layers3, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";

const TITLE = "About Gipsm Technology | Digital Growth Agency";
const DESCRIPTION =
  "Learn how Gipsm Technology helps businesses grow with strategy, branding, websites, paid media, automation, and performance-driven digital execution.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Gauge,
    title: "Strategy-first execution",
    desc: "We start with business goals, audience friction, and measurable outcomes before choosing tactics or design systems.",
  },
  {
    icon: Layers3,
    title: "One integrated partner",
    desc: "Brand, website, product, content, paid growth, and automation are all connected so momentum compounds across the funnel.",
  },
  {
    icon: Users,
    title: "Transparent collaboration",
    desc: "You get clear timelines, live updates, and a simple process that keeps teams aligned without the usual agency chaos.",
  },
  {
    icon: Sparkles,
    title: "Design with performance in mind",
    desc: "Every page, flow, and campaign is crafted to improve trust, clarity, and conversion — not just aesthetics.",
  },
];

const PILLARS = [
  "Business-first strategy and positioning",
  "Modern design and product thinking",
  "SEO, content, and growth systems",
  "Paid acquisition and conversion optimization",
  "Website development and performance engineering",
  "Automation and reporting for long-term scale",
];

function AboutPage() {
  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 mesh-bg opacity-60 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">— About Gipsm Technology</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] max-w-5xl">
                We help businesses turn <span className="text-gradient">digital complexity into growth.</span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                Gipsm Technology is a modern digital growth partner for businesses that need more than a pretty website. We combine strategy, creative execution, technical implementation, and measurable marketing to help brands become clearer, faster, and easier to trust.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/hire-us"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/ui-ux-design"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary/60 hover:text-primary transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Who we are</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05]">
                A focused team building <span className="text-gradient">the digital engine behind business growth.</span>
              </h2>
            </Reveal>

            <Reveal>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  We work with startups, service businesses, founders, and growing brands that need a stronger digital presence, better customer journeys, and more reliable lead generation.
                </p>
                <p>
                  Our work blends business thinking with creative execution, helping teams clarify their message, improve their digital experience, and turn attention into measurable action.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— What we believe</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05]">
                Growth happens when <span className="text-gradient">positioning, product, and performance work together.</span>
              </h2>
            </Reveal>

            <StaggerGroup className="mt-16 grid md:grid-cols-2 gap-5">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title}>
                  <article className="h-full rounded-3xl glass p-7">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{desc}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Our approach</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05]">
                The digital services businesses actually need, <span className="text-gradient">built around a clear roadmap.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((item) => (
                <Reveal key={item}>
                  <div className="rounded-2xl border border-border bg-card/80 p-5 flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-primary shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
