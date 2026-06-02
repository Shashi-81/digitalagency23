import { ArrowDown, ArrowUpRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui-extra/MagneticButton";

export function Hero() {
  const title1 = "We Build Digital".split(" ");
  const title2 = "Experiences That Convert".split(" ");

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Mesh BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-bg animate-mesh opacity-70 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          Now booking Q3 2026
        </motion.div>

        <h1 className="font-display font-bold text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight">
          <span className="block">
            {title1.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em] overflow-hidden"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block text-gradient">
            {title2.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
        >
          A full-stack design & development studio engineering brands, products, and growth systems that move the needle — not just the cursor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" asChildHref="#work">
            See Our Work <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost" asChildHref="#contact">
            <PlayCircle className="h-4 w-4" /> Book Free Call
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-16 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 glass rounded-full px-8 py-4 text-sm"
        >
          <Stat n="150+" l="Projects Shipped" />
          <Divider />
          <Stat n="$2M+" l="Revenue Generated" />
          <Divider />
          <Stat n="98%" l="Client Retention" />
        </motion.div>
      </div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        Scroll
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}

const Stat = ({ n, l }: { n: string; l: string }) => (
  <span className="flex items-baseline gap-2">
    <span className="font-display font-bold text-foreground text-base">{n}</span>
    <span className="text-muted-foreground">{l}</span>
  </span>
);
const Divider = () => <span className="hidden sm:inline-block h-3 w-px bg-border" />;
