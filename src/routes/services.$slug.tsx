import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Calendar, Check, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { getService, getRelatedServices, SERVICES, type Service } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service, related: getRelatedServices(params.slug) };
  },
  head: ({ params, loaderData }) => {
    const s = loaderData?.service;
    const title = s?.seo.title ?? "Services | NexaStudio";
    const description = s?.seo.description ?? "Services by NexaStudio.";
    const url = `/services/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: s?.seo.keywords ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: s
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                serviceType: s.short,
                name: s.short,
                description: s.seo.description,
                provider: { "@type": "Organization", name: "NexaStudio" },
                areaServed: "Worldwide",
                url,
                offers: s.pricing.map((p) => ({
                  "@type": "Offer",
                  name: p.tier,
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    price: p.from.replace(/[^0-9]/g, ""),
                    priceCurrency: "USD",
                  },
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: s.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Services", item: "/#services" },
                  { "@type": "ListItem", position: 3, name: s.short, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">— 404</p>
        <h1 className="font-display text-5xl font-bold mb-4">Service not found</h1>
        <Link to="/" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Something went wrong.</h1>
        <button onClick={reset} className="text-primary hover:underline">Try again</button>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service, related } = Route.useLoaderData() as { service: Service; related: Service[] };
  const s = service;

  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 blur-3xl"
            style={{ background: s.gradient }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-background/60" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Home</Link></li>
                <ChevronRight className="h-3 w-3" />
                <li><Link to="/" hash="services" className="hover:text-foreground">Services</Link></li>
                <ChevronRight className="h-3 w-3" />
                <li className="text-foreground">{s.short}</li>
              </ol>
            </nav>

            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">{s.hero.eyebrow}</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] max-w-5xl">
                {s.hero.headline}{" "}
                <span className="text-gradient">{s.hero.headlineAccent}</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {s.hero.sub}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {s.hero.badges.map((b) => (
                  <span key={b} className="rounded-full glass px-4 py-2 text-sm">{b}</span>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
                >
                  Get a Free Quote <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://cal.com/nexastudio/intro"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary/60 hover:text-primary transition-colors"
                >
                  <Calendar className="h-4 w-4" /> Book a Call
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Overview</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-8">
                {s.tagline}
              </h2>
              {s.overview.body.map((p, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-5">{p}</p>
              ))}
            </Reveal>
            <div className="lg:col-span-5 grid sm:grid-cols-1 gap-4">
              {s.overview.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="rounded-2xl glass p-7">
                    <div className="font-display text-5xl font-bold text-gradient">{stat.value}</div>
                    <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— What's included</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-16">
                Everything you get, <span className="text-gradient">end-to-end.</span>
              </h2>
            </Reveal>
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {s.features.map((f) => (
                <StaggerItem key={f.title}>
                  <article className="group h-full rounded-2xl glass p-6 hover:-translate-y-1 hover:border-primary/40 transition-all duration-500">
                    <div className="text-3xl mb-5">{f.icon}</div>
                    <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Process</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-16">
                A clear path <span className="text-gradient">from kickoff to launch.</span>
              </h2>
            </Reveal>
            <ol className="space-y-4">
              {s.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <li className="grid md:grid-cols-12 gap-6 rounded-2xl glass p-6 md:p-8 hover:border-primary/40 transition-colors">
                    <div className="md:col-span-1">
                      <span className="font-display text-3xl font-bold text-primary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">{step.window}</p>
                      <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="md:col-span-8 text-muted-foreground leading-relaxed pt-1">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Tools / Tech */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Tools & Tech</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-16">
                Best-in-class tools. <span className="text-gradient">No compromises.</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {s.tools.map((g) => (
                <Reveal key={g.group}>
                  <div className="rounded-2xl glass p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">{g.group}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((t) => (
                        <span key={t} className="rounded-full bg-surface border border-border px-3 py-1.5 text-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Result / Case study snippet */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-6 text-center">— Real Results</p>
              <blockquote className="font-display text-2xl md:text-4xl font-medium leading-snug text-center">
                &ldquo;{s.result.quote}&rdquo;
              </blockquote>
              <p className="mt-8 text-sm text-muted-foreground text-center">
                <span className="text-foreground font-medium">{s.result.client}</span> · NexaStudio Client
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Pricing</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05] mb-4">
                Transparent <span className="text-gradient">starting points.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-16">
                Every project is custom-scoped. These are starting prices — get a precise quote in 24 hours.
              </p>
            </Reveal>
            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {s.pricing.map((p) => (
                <StaggerItem key={p.tier}>
                  <article className="h-full rounded-2xl glass p-7 hover:border-primary/40 transition-colors">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">From</p>
                    <div className="font-display text-4xl font-bold text-gradient mb-4">{p.from}</div>
                    <h3 className="font-display text-lg font-medium">{p.tier}</h3>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <div className="mt-10 text-center">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Get a free custom quote <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center">— FAQ</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-center leading-[1.05] mb-16">
                Questions, <span className="text-gradient">answered.</span>
              </h2>
            </Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="space-y-3">
                {s.faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-0 glass rounded-2xl px-6 data-[state=open]:border-primary/40"
                  >
                    <AccordionTrigger className="text-left font-display text-lg hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="py-24 border-t border-border">
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Related services</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">
                  Keep <span className="text-gradient">exploring.</span>
                </h2>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Reveal key={r.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: r.slug }}
                      className="group block h-full rounded-2xl glass p-7 hover:-translate-y-1 hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
                    >
                      <div
                        className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
                        style={{ background: r.gradient }}
                      />
                      <p className="relative text-xs uppercase tracking-[0.2em] text-primary mb-3">Service</p>
                      <h3 className="relative font-display text-2xl font-bold mb-2">{r.short}</h3>
                      <p className="relative text-sm text-muted-foreground mb-6">{r.tagline}</p>
                      <span className="relative inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-primary">
                        Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA banner */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 md:px-16 py-20 md:py-24 text-center">
                <div className="absolute inset-0 mesh-bg opacity-60 blur-3xl" aria-hidden />
                <div className="relative">
                  <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                    Ready to start your <span className="text-gradient">{s.short.toLowerCase()}</span> project?
                  </h2>
                  <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
                    Tell us what you're building. We reply within one business day.
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/"
                      hash="contact"
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
                    >
                      Start a Project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="https://cal.com/nexastudio/intro"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary/60 hover:text-primary transition-colors"
                    >
                      <Calendar className="h-4 w-4" /> Schedule a Call
                    </a>
                  </div>
                  <div className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Reply within 1 business day</span>
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> NDA on request</span>
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Fixed-fee proposals</span>
                  </div>
                </div>
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

export const _serviceSlugs = SERVICES.map((s) => s.slug);
