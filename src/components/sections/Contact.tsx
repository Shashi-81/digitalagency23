import { useState } from "react";
import { Mail, Phone, MapPin, Check, ArrowUpRight, Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { z } from "zod";
import { Reveal } from "../ui-extra/Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  budget: z.string().min(1, "Pick a budget"),
  service: z.string().min(1, "Pick a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const FIELD =
  "peer w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none pt-6 pb-2 placeholder-transparent transition-colors";
const LABEL =
  "absolute left-0 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground/70 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
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
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">— Contact</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold leading-[1.02]">
            Let's make <span className="text-gradient">it real.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Tell us about the work. We reply within one business day with next steps — or an honest no.
          </p>

          <ul className="mt-12 space-y-5">
            <Info icon={Mail} label="hello@nexastudio.co" />
            <Info icon={Phone} label="+1 (415) 555-0142" />
            <Info icon={MapPin} label="Brooklyn, NY · Remote-first" />
          </ul>

          <div className="mt-12 flex gap-3">
            {[Twitter, Linkedin, Github, Instagram].map((I, i) => (
              <a key={i} href="#" aria-label="Social" className="h-11 w-11 inline-flex items-center justify-center rounded-full glass hover:text-primary hover:-translate-y-1 transition-all">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-10 relative min-h-[560px]">
            {sent ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-3xl font-bold">Message received.</h3>
                <p className="mt-3 text-muted-foreground max-w-sm">We'll be in touch within one business day. Excited to hear from you.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-7" noValidate>
                <Field id="name" label="Your name" error={errors.name}>
                  <input id="name" name="name" type="text" placeholder=" " className={FIELD} />
                </Field>
                <Field id="email" label="Email address" error={errors.email}>
                  <input id="email" name="email" type="email" placeholder=" " className={FIELD} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-7">
                  <Field id="budget" label="Budget" error={errors.budget}>
                    <select id="budget" name="budget" defaultValue="" className={FIELD}>
                      <option value="" disabled> </option>
                      {["< $10k", "$10k – $25k", "$25k – $75k", "$75k+"].map((o) => (
                        <option key={o} value={o} className="bg-background">{o}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="service" label="Service" error={errors.service}>
                    <select id="service" name="service" defaultValue="" className={FIELD}>
                      <option value="" disabled> </option>
                      {["Design", "Development", "Brand", "Full build", "Not sure"].map((o) => (
                        <option key={o} value={o} className="bg-background">{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field id="message" label="Tell us about your project" error={errors.message}>
                  <textarea id="message" name="message" rows={4} placeholder=" " className={FIELD + " resize-none"} />
                </Field>

                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-sm font-medium hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow">
                  Send message <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
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
      {children}
      <label htmlFor={id} className={LABEL}>{label}</label>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
