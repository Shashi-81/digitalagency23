import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "../ui-extra/Reveal";

const FAQS = [
  { q: "How long does a typical project take?", a: "Most marketing sites ship in 3–6 weeks. Product builds run 8–16 weeks depending on scope. We share a week-by-week plan before kickoff." },
  { q: "What's your design and development process?", a: "Discovery → Strategy → Design → Development → Launch. You get weekly demos, daily Slack access, and a shared roadmap so nothing surprises you." },
  { q: "How many revisions are included?", a: "Two structured revision rounds per phase, plus rolling feedback in async. We've never had a client max it out — the process keeps us aligned early." },
  { q: "What tech stack do you use?", a: "React (Next.js / TanStack Start), TypeScript, Tailwind, Postgres, Supabase, and edge runtimes. We pick boring, fast, well-maintained tools." },
  { q: "Do you own the work after launch?", a: "Completely. You get full source, repos, design files, and ownership of every account. No vendor lock-in, ever." },
  { q: "Do you offer ongoing retainers?", a: "Yes. Most clients continue with a Growth retainer for iteration, experiments, and new surface area after launch." },
  { q: "Can you work with our existing team?", a: "Absolutely. We embed alongside in-house design, product and engineering — leading, advising, or supporting depending on what you need." },
];

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
