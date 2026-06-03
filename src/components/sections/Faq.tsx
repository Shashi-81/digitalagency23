import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "../ui-extra/Reveal";
import { FAQS } from "@/lib/faqs";

export function Faq() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center">— FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-center leading-[1.02] mb-16">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 glass rounded-2xl px-6 data-[state=open]:border-primary/40">
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
