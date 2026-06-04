import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui-extra/Reveal";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";
import { getProject, getNextProject, PROJECTS, type Project } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — Case Study | NexaStudio` : "Case Study | NexaStudio";
    const description = p?.summary ?? "Selected work by NexaStudio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: p.name,
                headline: `${p.name} — ${p.cat}`,
                description: p.summary,
                creator: { "@type": "Organization", name: "NexaStudio" },
                about: p.industry,
                keywords: p.services.join(", "),
                datePublished: p.year,
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
        <h1 className="font-display text-5xl font-bold mb-4">Case study not found</h1>
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
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData() as { project: Project; next: Project };
  const p = project;

  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10"
              >
                <ArrowLeft className="h-4 w-4" /> All work
              </Link>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— {p.cat}</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] mb-8 max-w-5xl">
                {p.name}<span className="text-primary">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                {p.summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                {[
                  { k: "Client", v: p.client },
                  { k: "Year", v: p.year },
                  { k: "Industry", v: p.industry },
                  { k: "Timeline", v: p.timeline },
                ].map((item) => (
                  <div key={item.k} className="bg-background p-6">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.k}</dt>
                    <dd className="mt-2 font-medium text-foreground">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Cover */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div
                className="aspect-[16/9] w-full rounded-3xl border border-border overflow-hidden relative"
                style={{ background: p.gradient }}
              >
                <div
                  className="absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, black 0%, transparent 50%)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-20 border-y border-border">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">— Outcomes</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 max-w-2xl">
                The <span className="text-gradient">numbers.</span>
              </h2>
            </Reveal>
            <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {p.metrics.map((m) => (
                <StaggerItem key={m.label} className="rounded-2xl border border-border p-6 bg-card">
                  <div className="font-display text-4xl md:text-5xl font-bold text-gradient">{m.value}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{m.label}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Challenge / Approach / Outcome */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-4">
              <div className="sticky top-32">
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">— Services</p>
                <ul className="space-y-2">
                  {p.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-foreground">
                      <Check className="h-4 w-4 text-primary" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-16">
              <Reveal>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">The challenge</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{p.challenge}</p>
              </Reveal>

              <Reveal>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">Our approach</h3>
                <ol className="space-y-5">
                  {p.approach.map((a, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-display text-2xl font-bold text-primary tabular-nums w-10 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-lg text-muted-foreground leading-relaxed pt-1">{a}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">The outcome</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{p.outcome}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <StaggerGroup className="grid md:grid-cols-3 gap-5">
              {p.gallery.map((g, i) => (
                <StaggerItem key={i}>
                  <div
                    className="aspect-[4/5] rounded-2xl border border-border overflow-hidden relative"
                    style={{ background: g }}
                  >
                    <div
                      className="absolute inset-0 opacity-20 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, black 0%, transparent 50%)",
                      }}
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Testimonial */}
        {p.testimonial && (
          <section className="py-24 border-y border-border">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-6">— What they said</p>
                <blockquote className="font-display text-2xl md:text-4xl font-medium leading-snug">
                  &ldquo;{p.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-8 text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{p.testimonial.author}</span> · {p.testimonial.role}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Next project */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                className="group block rounded-3xl overflow-hidden border border-border relative aspect-[21/9]"
                style={{ background: next.gradient }}
              >
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/80">— Next case study</p>
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2">{next.cat}</p>
                      <h2 className="font-display text-4xl md:text-6xl font-bold">{next.name}</h2>
                    </div>
                    <span className="inline-flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Have a project like <span className="text-gradient">{p.name}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Tell us what you're building. We reply within one business day.
              </p>
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Surface known slugs for the sitemap / future static hints
export const _projectSlugs = PROJECTS.map((p) => p.slug);
