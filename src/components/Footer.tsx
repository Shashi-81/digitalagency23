import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <a href="#home" className="flex items-center gap-2">
            <img src="/images/gipsmlo.png" alt="Gipsm Technology" className="h-14 w-auto object-contain" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            One partner for strategy, design, websites, growth, automation, and digital performance.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            { label: "UI/UX Design", to: "/services/$slug", params: { slug: "ui-ux-design" } },
            { label: "Web Development", to: "/services/$slug", params: { slug: "web-development" } },
            { label: "Mobile Apps", to: "/services/$slug", params: { slug: "mobile-app-development" } },
            { label: "Brand Identity", to: "/services/$slug", params: { slug: "brand-identity" } },
            { label: "SEO & Marketing", to: "/services/$slug", params: { slug: "seo-digital-marketing" } },
            { label: "AI & Automation", to: "/services/$slug", params: { slug: "ai-integration" } },
            { label: "Performance Marketing", to: "/services/$slug", params: { slug: "performance-marketing" } },
            { label: "Marketing Automation", to: "/services/$slug", params: { slug: "marketing-automation" } },
            { label: "Content Production", to: "/services/$slug", params: { slug: "content-production" } },
          ]}
        />

        <FooterCol
          title="Company"
          links={[
            { label: "Hire Us", to: "/hire-us" },
            { label: "Resources", to: "/resources" },
            { label: "Process", href: "/#process" },
            { label: "Contact", href: "/#contact" },
          ]}
        />

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-5">Start a conversation</h4>
          <p className="text-sm text-muted-foreground mb-4">Tell us what you are building, changing, or preparing to launch.</p>
          <a
            href="mailto:hello@gipsmtechnology.co"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
          >
            hello@gipsmtechnology.co <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-6 mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Gipsm Technology. All rights reserved.</p>
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
