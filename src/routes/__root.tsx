import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const popular = [
    { to: "/", label: "Home" },
    { to: "/hire-us", label: "Hire Us" },
    { to: "/resources", label: "Free Resources" },
  ] as const;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, oklch(0.6 0.18 200 / 0.4), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Error 404</p>
        <h1 className="font-display text-7xl md:text-9xl font-bold leading-none tracking-tight">
          4<span className="text-primary">0</span>4
        </h1>
        <h2 className="mt-6 font-display text-2xl md:text-3xl font-bold">
          Looks like this page took a vacation.
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground">
          The link might be broken, or the page has moved. Try one of these instead:
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const q = String(data.get("q") ?? "").trim();
            if (q) window.location.href = `/?q=${encodeURIComponent(q)}`;
          }}
          className="mt-8 mx-auto flex max-w-md gap-2"
        >
          <label htmlFor="404-search" className="sr-only">Search</label>
          <input
            id="404-search"
            name="q"
            placeholder="Search the site…"
            className="flex-1 bg-transparent border border-border rounded-full px-5 py-3 text-sm placeholder:text-muted-foreground focus:border-primary outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Popular pages</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {popular.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="inline-flex items-center rounded-full glass px-4 py-2 text-sm hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "NexaStudio" },
      { name: "theme-color", content: "#0a0a0f" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NexaStudio" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "NexaStudio is a full-stack digital agency website showcasing design and development services for startups and enterprises." },
      { property: "og:description", content: "NexaStudio is a full-stack digital agency website showcasing design and development services for startups and enterprises." },
      { name: "twitter:description", content: "NexaStudio is a full-stack digital agency website showcasing design and development services for startups and enterprises." },
      { property: "og:image", content: "/og/home.jpg" },
      { name: "twitter:image", content: "/og/home.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.bunny.net" },
      {
        rel: "stylesheet",
        href: "https://fonts.bunny.net/css?family=syne:700,800|dm-sans:400,500,600",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NexaStudio",
          url: "/",
          logo: "/og-image.jpg",
          description:
            "A full-stack design & development studio building brands, products, and growth systems for ambitious teams.",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
