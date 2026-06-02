import { ArrowUpRight, Calendar } from "lucide-react";
import { Reveal } from "../ui-extra/Reveal";
import { MagneticButton } from "../ui-extra/MagneticButton";

export function CtaBanner() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 md:px-16 py-20 md:py-28 text-center">
            <div className="absolute inset-0 mesh-bg opacity-60 blur-3xl" aria-hidden />
            <div className="relative">
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">
                Ready to build <span className="text-gradient">something great?</span>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
                We take on a handful of partners each quarter. If your work fits, we'll move fast.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <MagneticButton asChildHref="#contact" variant="primary">
                  Start a Project <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton asChildHref="#contact" variant="ghost">
                  <Calendar className="h-4 w-4" /> Schedule a Call
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
