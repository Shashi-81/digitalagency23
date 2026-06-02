import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className={`mx-auto max-w-7xl px-6`}>
          <nav
            className={`flex items-center justify-between rounded-full px-5 py-3 transition-all ${
              scrolled ? "glass" : ""
            }`}
          >
            <a href="#home" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
              Nexa<span className="text-primary">Studio</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl font-bold">Nexa<span className="text-primary">Studio</span></span>
              <button onClick={() => setOpen(false)} className="h-10 w-10 inline-flex items-center justify-center rounded-full glass" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col items-start gap-6 px-8 mt-12">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="font-display text-5xl font-bold hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
