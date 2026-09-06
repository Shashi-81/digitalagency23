import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, ChartNoAxesCombined, GraduationCap, HeartPulse, House, ShoppingBag, Sparkles, Store, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";

const TITLE = "Solutions for Growing Businesses | Gipsm Technology";
const DESCRIPTION =
  "Explore digital growth solutions for startups, businesses, e-commerce brands, and service teams. Gipsm Technology helps brands scale through strategy, design, marketing, and digital execution.";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

const SOLUTIONS = [
  { icon: Users, title: "Startups & founders", desc: "Launch faster with positioning, product design, landing pages, and growth systems that support traction." },
  { icon: Building2, title: "Service businesses", desc: "Turn expertise into demand with clearer positioning, site conversion, and conversion-focused lead generation." },
  { icon: ShoppingBag, title: "E-commerce brands", desc: "Improve conversion, merchandising, retention, and campaign performance across the customer journey." },
  { icon: GraduationCap, title: "Education & training", desc: "Build trust with better information architecture, lead funnels, and enrollment-first experiences." },
  { icon: HeartPulse, title: "Healthcare & clinics", desc: "Create credibility and patient trust with conversion-focused brand and digital experience design." },
  { icon: House, title: "Real estate & property", desc: "Present properties with polished visuals, stronger lead capture, and more effective digital campaigns." },
  { icon: Sparkles, title: "Professional services", desc: "Position your expertise, simplify your offer, and improve conversion from first click to qualified consultation." },
  { icon: ChartNoAxesCombined, title: "Corporate growth teams", desc: "Support brand, website, analytics, automation, and performance campaigns from a single strategic partner." },
];

function SolutionsPage() {
  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 mesh-bg opacity-60 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">— Solutions</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] max-w-5xl">
                Built for businesses that need <span className="text-gradient">clarity, momentum, and measurable growth.</span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                Whether you're launching a new offer, redesigning your website, or scaling lead generation, Gipsm Technology creates the digital systems that help your business perform better online.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Common growth challenges</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-4xl leading-[1.05]">
                We solve the problems that hold digital growth back — <span className="text-gradient">from positioning to performance.</span>
              </h2>
            </Reveal>

            <StaggerGroup className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {SOLUTIONS.map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title}>
                  <article className="h-full rounded-3xl glass p-6">
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
          <div className="mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Ready to grow?</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                Let’s build the next chapter of your <span className="text-gradient">digital presence.</span>
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/hire-us"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
                >
                  Book a Discovery Call <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  hash="services"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary/60 hover:text-primary transition-colors"
                >
                  View Services
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
