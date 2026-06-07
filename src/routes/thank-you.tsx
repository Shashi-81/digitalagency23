import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MessageSquare, Sparkles, ArrowLeft, Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Reveal } from "@/components/ui-extra/Reveal";

const TITLE = "Thank you — NexaStudio";
const DESCRIPTION = "We received your message and will get back to you within 24 hours.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/thank-you" },
      { property: "og:image", content: "/og/thank-you.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Thank you from NexaStudio — Message received. A senior strategist will reply within 24 hours." },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/thank-you.jpg" },
      { name: "twitter:image:alt", content: "Thank you from NexaStudio — Message received. A senior strategist will reply within 24 hours." },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYou,
});

const STEPS = [
  { icon: MessageSquare, title: "We read your brief", desc: "A senior strategist personally reviews every message — no bots." },
  { icon: Sparkles, title: "Tailored response", desc: "We come back with relevant next steps, references, and a few sharp questions." },
  { icon: Clock, title: "Quick call (optional)", desc: "If it's a fit, we schedule a 20-min intro to go deeper." },
];

function ThankYou() {
  return (
    <div className="relative">
      <Navbar />
      <main className="pt-36 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 inline-flex items-center justify-center mb-8">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Message received</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              We got your <span className="text-gradient">message.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Thanks for reaching out. We reply to every enquiry personally — usually within 24 hours on business days.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              Expected response: <span className="text-foreground font-medium">Within 24 hours</span>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-20 grid md:grid-cols-3 gap-5 text-left">
              {STEPS.map((s, i) => (
                <article key={s.title} className="rounded-2xl glass p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 tabular-nums">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <s.icon className="h-7 w-7 text-foreground mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-16">
              <p className="text-sm text-muted-foreground mb-4">Follow along while you wait:</p>
              <div className="flex justify-center gap-3">
                {[
                  { I: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { I: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { I: Github, href: "https://github.com", label: "GitHub" },
                  { I: Instagram, href: "https://instagram.com", label: "Instagram" },
                ].map(({ I, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="h-11 w-11 inline-flex items-center justify-center rounded-full glass hover:text-primary hover:border-primary/60 transition-colors"
                  >
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}
