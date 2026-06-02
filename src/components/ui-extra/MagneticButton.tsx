import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "lime";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: Variant;
  asChildHref?: string;
}

export function MagneticButton({ children, variant = "primary", className, asChildHref, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const styles = {
    primary: "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-5px_var(--primary)]",
    ghost: "bg-transparent text-foreground border border-border hover:border-primary/60 hover:text-primary",
    lime: "bg-lime text-lime-foreground hover:shadow-[0_0_40px_-5px_var(--lime)]",
  }[variant];

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-shadow duration-300 will-change-transform",
        styles,
        className,
      )}
    >
      {children}
    </motion.span>
  );

  if (asChildHref) {
    return (
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
        <a href={asChildHref}>{inner}</a>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button {...rest}>{inner}</button>
    </div>
  );
}
