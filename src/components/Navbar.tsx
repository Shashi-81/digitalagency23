import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services";

type NavItem = {
  label: string;
  to?: string;
  hash?: string;
  children?: { label: string; to: string; params?: Record<string, string>; desc?: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Services",
    children: SERVICES.map((s) => ({
      label: s.navTitle,
      to: "/services/$slug",
      params: { slug: s.slug },
      desc: s.tagline,
    })),
  },
  { label: "Work", to: "/", hash: "work" },
  { label: "Process", to: "/", hash: "process" },
  { label: "Pricing", to: "/", hash: "pricing" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const closeMenus = () => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  const scrollToHash = (hash: string) => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (to?: string, hash?: string) => (e: React.MouseEvent) => {
    closeMenus();
    if (!hash) return;
    // Same-page hash: prevent router re-render, just smooth-scroll.
    if (to === "/" && pathname === "/") {
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", `#${hash}`);
      return;
    }
    // Cross-route hash: let router navigate, then scroll once mounted.
    if (to === "/" && pathname !== "/") {
      window.setTimeout(() => scrollToHash(hash), 260);
    }
  };


  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2.5" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={`flex items-center justify-between rounded-full pl-5 pr-2 py-2 transition-all duration-500 ${
              scrolled
                ? "glass border border-border/60 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
                : "border border-transparent"
            }`}
          >
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight shrink-0"
            >
              Nexa<span className="text-primary">Studio</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            </Link>

            <ul className="hidden lg:flex items-center gap-0.5">
              {NAV.map((item) => {
                if (item.children) {
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        aria-expanded={servicesOpen}
                      >
                        {item.label}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[520px]"
                          >
                            <div className="glass border border-border/60 rounded-2xl p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
                              <div className="grid grid-cols-2 gap-1">
                                {item.children.map((c) => (
                                  <Link
                                    key={c.label}
                                    to={c.to}
                                    params={c.params as any}
                                    onClick={closeMenus}
                                    className="group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 hover:bg-foreground/5 transition-colors"
                                    activeProps={{ className: "bg-foreground/5" }}
                                  >
                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                      {c.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                      {c.desc}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <Link
                                to="/"
                                hash="services"
                                onClick={handleNav("/", "services")}
                                className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                              >
                                All services overview
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }
                const isActive = item.to && !item.hash && pathname === item.to;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to!}
                      hash={item.hash}
                      onClick={handleNav(item.to, item.hash)}
                      className={`px-4 py-2 text-sm transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

            </ul>

            <div className="flex items-center gap-2">
              <Link
                to="/hire-us"
                onClick={closeMenus}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground pl-5 pr-4 py-2.5 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
              >
                Start a Project <ArrowUpRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full glass border border-border/60 active:scale-95 transition-transform"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/40 z-10">
              <Link to="/" onClick={() => setOpen(false)} className="font-display text-xl font-bold">
                Nexa<span className="text-primary">Studio</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="h-11 w-11 inline-flex items-center justify-center rounded-full glass border border-border/60 active:scale-95 transition-transform"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pt-8 pb-32">
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                    className="border-b border-border/40"
                  >
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="w-full flex items-center justify-between py-4 font-display text-3xl font-bold"
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-6 w-6 text-muted-foreground transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              {item.children.map((c) => (
                                <li key={c.label}>
                                  <Link
                                    to={c.to}
                                    params={c.params as any}
                                    onClick={closeMenus}
                                    className="flex items-center justify-between py-3 pl-4 text-lg text-muted-foreground hover:text-primary"
                                  >
                                    {c.label}
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.to!}
                        hash={item.hash}
                        onClick={handleNav(item.to, item.hash)}
                        className="block py-4 font-display text-3xl font-bold hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <Link
                to="/hire-us"
                onClick={closeMenus}
                className="mt-10 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-base font-medium"
              >
                Start a Project <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
