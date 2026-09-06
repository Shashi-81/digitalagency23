import { useEffect, useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Mobile-only sticky CTA bar. Shows after user scrolls past the hero,
 * hides when the contact section is in view (no need to nag once they're there).
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.6;

      const contact = document.getElementById("contact");
      let inContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        inContact = r.top < window.innerHeight * 0.7;
      }
      setVisible(past && !inContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 pointer-events-none"
        >
          <div className="pointer-events-auto glass rounded-full flex items-center gap-2 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            <a
              href="#contact"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 min-h-[44px] text-sm font-medium active:scale-[0.98] transition-transform"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://cal.com/gipsmtechnology/intro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a call"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface min-h-[44px] min-w-[44px] px-3 text-foreground active:scale-[0.98] transition-transform"
            >
              <Calendar className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
