import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../ui-extra/Reveal";

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "VP Product", co: "Helio Finance", q: "NexaStudio rebuilt our onboarding and tripled activation in a quarter. They operate like a part of the team — only sharper." },
  { name: "Marcus Reid", role: "Founder", co: "Atlas Outdoor", q: "The brand they delivered finally matched our ambition. Wholesale partners noticed within weeks." },
  { name: "Priya Anand", role: "CTO", co: "Cipher AI", q: "Senior engineering, design taste, and product instincts in one room. We extended the contract twice." },
  { name: "Daniel Okonkwo", role: "Head of Growth", co: "Northwind", q: "The most thoughtful partner we've worked with. They challenged us, then shipped." },
  { name: "Emily Vasquez", role: "CEO", co: "Loom Labs", q: "Sites and apps that feel alive. Conversion improvements paid for the engagement in two months." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center">— Testimonials</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-center leading-[1.02] mb-16">
            Words from <span className="text-gradient">partners.</span>
          </h2>
        </Reveal>

        <div
          className="relative glass rounded-3xl p-10 md:p-14 min-h-[340px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-lime text-lime" />
                ))}
              </div>
              <p className="font-display text-2xl md:text-3xl leading-snug">"{t.q}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-lime flex items-center justify-center font-display font-bold text-primary-foreground">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role} · {t.co}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button onClick={() => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="h-9 w-9 rounded-full glass inline-flex items-center justify-center hover:text-primary" aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setI((p) => (p + 1) % TESTIMONIALS.length)} className="h-9 w-9 rounded-full glass inline-flex items-center justify-center hover:text-primary" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
