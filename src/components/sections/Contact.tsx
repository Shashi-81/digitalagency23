import { useState } from "react";
import {
  Mail, Phone, MapPin, Check, ArrowUpRight, ArrowRight, ArrowLeft,
  Twitter, Linkedin, Github, Instagram, Calendar, Rocket, Paintbrush, Code2, Layers, HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Reveal } from "../ui-extra/Reveal";

const PROJECT_TYPES = [
  { id: "brand", label: "Brand & Identity", icon: Paintbrush },
  { id: "web", label: "Website", icon: Layers },
  { id: "product", label: "Product / App", icon: Code2 },
  { id: "launch", label: "Full launch", icon: Rocket },
  { id: "other", label: "Not sure yet", icon: HelpCircle },
] as const;

const BUDGETS = ["< $10k", "$10k – $25k", "$25k – $75k", "$75k – $150k", "$150k+"] as const;
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"] as const;

const schema = z.object({
  projectType: z.string().min(1, "Pick a project type"),
  budget: z.string().min(1, "Pick a budget"),
  timeline: z.string().min(1, "Pick a timeline"),
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

type FormState = z.infer<typeof schema>;

const TOTAL_STEPS = 3;

export function Contact() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>({
    projectType: "", budget: "", timeline: "", name: "", email: "", company: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!data.projectType) errs.projectType = "Pick a project type";
      if (!data.budget) errs.budget = "Pick a budget";
    }
    if (s === 1) {
      if (!data.timeline) errs.timeline = "Pick a timeline";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16">
        {/* LEFT */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Contact</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold leading-[1.02]">
            Let's make <span className="text-gradient">it real.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Tell us about the work. We reply within one business day with next steps — or an honest no.
          </p>

          {/* Book a call card */}
          <a
            href="https://cal.com/nexastudio/intro"
            target="_blank"
            rel="noreferrer"
            className="mt-10 group block rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="h-12 w-12 rounded-xl bg-primary/10 inline-flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold">Prefer to talk?</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Book a 20-minute intro call. No deck, no pitch — just a real conversation.
                </p>
              </div>
            </div>
          </a>

          <ul className="mt-10 space-y-5">
            <Info icon={Mail} label="hello@nexastudio.co" />
            <Info icon={Phone} label="+1 (415) 555-0142" />
            <Info icon={MapPin} label="Brooklyn, NY · Remote-first" />
          </ul>

          <div className="mt-10 flex gap-3">
            {[Twitter, Linkedin, Github, Instagram].map((I, i) => (
              <a key={i} href="#" aria-label="Social" className="h-11 w-11 inline-flex items-center justify-center rounded-full glass hover:text-primary hover:-translate-y-1 transition-all">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* RIGHT — multi-step form */}
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-10 relative min-h-[620px]">
            {sent ? (
              <SuccessState data={data} />
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col h-full min-h-[560px]">
                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === step ? "w-10 bg-primary" : i < step ? "w-6 bg-primary/60" : "w-6 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Step {step + 1} of {TOTAL_STEPS}
                  </span>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      {step === 0 && (
                        <Step title="What are you building?" subtitle="Pick what fits closest. We'll refine on the call.">
                          <div className="grid sm:grid-cols-2 gap-3">
                            {PROJECT_TYPES.map((p) => {
                              const I = p.icon;
                              const active = data.projectType === p.id;
                              return (
                                <button
                                  type="button"
                                  key={p.id}
                                  onClick={() => set("projectType", p.id)}
                                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                                    active
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/40"
                                  }`}
                                >
                                  <I className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                                  <span className="font-medium text-sm">{p.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.projectType && <p className="mt-3 text-xs text-destructive">{errors.projectType}</p>}

                          <div className="mt-8">
                            <p className="text-sm font-medium mb-3">Budget range</p>
                            <div className="flex flex-wrap gap-2">
                              {BUDGETS.map((b) => (
                                <Chip key={b} active={data.budget === b} onClick={() => set("budget", b)}>{b}</Chip>
                              ))}
                            </div>
                            {errors.budget && <p className="mt-3 text-xs text-destructive">{errors.budget}</p>}
                          </div>
                        </Step>
                      )}

                      {step === 1 && (
                        <Step title="When do you need to ship?" subtitle="We'll let you know honestly if we can fit it in.">
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map((t) => (
                              <Chip key={t} active={data.timeline === t} onClick={() => set("timeline", t)}>{t}</Chip>
                            ))}
                          </div>
                          {errors.timeline && <p className="mt-3 text-xs text-destructive">{errors.timeline}</p>}

                          <div className="mt-10 rounded-2xl border border-border p-5 bg-background/40">
                            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Your brief so far</p>
                            <p className="text-sm text-muted-foreground">
                              <span className="text-foreground font-medium">{labelFor(data.projectType, PROJECT_TYPES) || "—"}</span>
                              {" · "}<span className="text-foreground font-medium">{data.budget || "—"}</span>
                            </p>
                          </div>
                        </Step>
                      )}

                      {step === 2 && (
                        <Step title="A few details about you." subtitle="So we know who's on the other end.">
                          <div className="space-y-5">
                            <Field id="name" label="Your name" error={errors.name}>
                              <input id="name" value={data.name} onChange={(e) => set("name", e.target.value)} type="text" className={FIELD} />
                            </Field>
                            <Field id="email" label="Email address" error={errors.email}>
                              <input id="email" value={data.email} onChange={(e) => set("email", e.target.value)} type="email" className={FIELD} />
                            </Field>
                            <Field id="company" label="Company (optional)" error={errors.company}>
                              <input id="company" value={data.company} onChange={(e) => set("company", e.target.value)} type="text" className={FIELD} />
                            </Field>
                            <Field id="message" label="Tell us about the project" error={errors.message}>
                              <textarea id="message" value={data.message} onChange={(e) => set("message", e.target.value)} rows={4} className={FIELD + " resize-none"} />
                            </Field>
                          </div>
                        </Step>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  {step < TOTAL_STEPS - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"
                    >
                      Send brief <ArrowUpRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FIELD =
  "peer w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none pt-6 pb-2 placeholder-transparent transition-colors";
const LABEL =
  "absolute left-0 top-2 text-xs text-muted-foreground transition-all";

function labelFor(id: string, list: ReadonlyArray<{ id: string; label: string }>) {
  return list.find((x) => x.id === id)?.label ?? "";
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition-all ${
        active ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Info({ icon: I, label }: { icon: typeof Mail; label: string }) {
  return (
    <li className="flex items-center gap-4">
      <span className="h-11 w-11 inline-flex items-center justify-center rounded-full glass">
        <I className="h-4 w-4 text-primary" />
      </span>
      <span className="text-foreground/90">{label}</span>
    </li>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <label htmlFor={id} className={LABEL}>{label}</label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SuccessState({ data }: { data: FormState }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
      <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <h3 className="font-display text-3xl font-bold">Brief received{data.name ? `, ${data.name.split(" ")[0]}` : ""}.</h3>
      <p className="mt-3 text-muted-foreground max-w-sm">
        We'll review it and reply within one business day. In the meantime, feel free to book a call.
      </p>
      <a
        href="https://cal.com/nexastudio/intro"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
      >
        <Calendar className="h-4 w-4" /> Book a 20-min call
      </a>
    </div>
  );
}
