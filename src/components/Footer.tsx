import { Link } from "@tanstack/react-router";
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <a href="#home" className="flex items-center gap-2 font-display text-2xl font-bold">
            Nexa<span className="text-primary">Studio</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            A digital studio building brands, products, and growth systems that move the needle.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            { label: "UI/UX Design", to: "/services/$slug", params: { slug: "ui-ux-design" } },
            { label: "Web Development", to: "/services/$slug", params: { slug: "web-development" } },
            { label: "Brand Identity", to: "/services/$slug", params: { slug: "brand-identity" } },
            { label: "SEO & Marketing", to: "/services/$slug", params: { slug: "seo-digital-marketing" } },
            { label: "AI & Automation", to: "/services/$slug", params: { slug: "ai-integration" } },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Hire Us", to: "/hire-us" },
            { label: "Resources", to: "/resources" },
            { label: "Work", href: "/#work" },
            { label: "Process", href: "/#process" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Contact", href: "/#contact" },
          ]}
        />

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-5">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Quarterly notes on craft, taste and the studio.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input id="newsletter-email" type="email" placeholder="you@company.com" className="flex-1 bg-transparent border border-border rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary outline-none" />
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_20px_-5px_var(--primary)] transition-shadow" aria-label="Subscribe">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-6 flex gap-2">
            {[
              { I: Twitter, label: "Twitter" },
              { I: Linkedin, label: "LinkedIn" },
              { I: Github, label: "GitHub" },
              { I: Instagram, label: "Instagram" },
            ].map(({ I, label }) => (
              <a key={label} href="#" aria-label={label} className="h-9 w-9 inline-flex items-center justify-center rounded-full glass hover:text-primary transition-colors">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-6 mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} NexaStudio. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms-of-service" className="hover:text-foreground">Terms</Link>
          <Link to="/cookie-policy" className="hover:text-foreground">Cookies</Link>
          <Link to="/refund-policy" className="hover:text-foreground">Refunds</Link>
        </div>
      </div>
    </footer>
  );
}

type FooterLink =
  | { label: string; to: string; params?: Record<string, string>; href?: never }
  | { label: string; href: string; to?: never; params?: never };

const FooterCol = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div>
    <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-5">{title}</h4>
    <ul className="space-y-3 text-sm">
      {links.map((l) =>
        "to" in l && l.to ? (
          <li key={l.label}>
            <Link
              to={l.to}
              params={l.params as never}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ) : (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          </li>
        ),
      )}
    </ul>
  </div>
);
