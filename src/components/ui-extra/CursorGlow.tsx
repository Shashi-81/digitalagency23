import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full"
      style={{
        background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
