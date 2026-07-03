import { useState } from "react";
import type { ProjectDraft, Metric, Testimonial } from "@/lib/admin";

type Props = {
  initial: ProjectDraft;
  submitting?: boolean;
  submitLabel?: string;
  onSubmit: (draft: ProjectDraft) => Promise<void> | void;
};

const inputCls =
  "w-full rounded-lg border border-fg/15 bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg/30 focus:border-fg/40 focus:outline-none";
const labelCls = "block text-xs font-medium uppercase tracking-wider text-fg/50";

const listToText = (arr: string[]) => arr.join("\n");
const textToList = (t: string) =>
  t
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export function ProjectForm({ initial, onSubmit, submitting, submitLabel = "Save" }: Props) {
  const [draft, setDraft] = useState<ProjectDraft>(initial);
  const [metricsText, setMetricsText] = useState(
    JSON.stringify(draft.metrics ?? [], null, 2),
  );
  const [testimonial, setTestimonial] = useState<Testimonial>(draft.testimonial);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectDraft>(k: K, v: ProjectDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let metrics: Metric[];
    try {
      const parsed = JSON.parse(metricsText || "[]");
      if (!Array.isArray(parsed)) throw new Error("Metrics must be a JSON array.");
      metrics = parsed;
    } catch (err) {
      setError(`Metrics JSON invalid: ${err instanceof Error ? err.message : "parse error"}`);
      return;
    }

    const t = testimonial;
    const cleanTestimonial: Testimonial =
      t && (t.quote || t.author || t.role)
        ? { quote: t.quote ?? "", author: t.author ?? "", role: t.role ?? "" }
        : null;

    try {
      await onSubmit({ ...draft, metrics, testimonial: cleanTestimonial });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Slug</label>
          <input
            className={inputCls}
            value={draft.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
            placeholder="helio-finance"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Name</label>
          <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <input className={inputCls} value={draft.cat} onChange={(e) => set("cat", e.target.value)} required placeholder="Fintech · Web App" />
        </div>
        <div>
          <label className={labelCls}>Client</label>
          <input className={inputCls} value={draft.client} onChange={(e) => set("client", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Year</label>
          <input className={inputCls} value={draft.year} onChange={(e) => set("year", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Industry</label>
          <input className={inputCls} value={draft.industry} onChange={(e) => set("industry", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Timeline</label>
          <input className={inputCls} value={draft.timeline} onChange={(e) => set("timeline", e.target.value)} required placeholder="12 weeks" />
        </div>
        <div>
          <label className={labelCls}>Sort order</label>
          <input
            type="number"
            className={inputCls}
            value={draft.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <label className={labelCls}>Summary</label>
          <textarea rows={3} className={inputCls} value={draft.summary} onChange={(e) => set("summary", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Challenge</label>
          <textarea rows={4} className={inputCls} value={draft.challenge} onChange={(e) => set("challenge", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Outcome</label>
          <textarea rows={3} className={inputCls} value={draft.outcome} onChange={(e) => set("outcome", e.target.value)} required />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Tags (one per line)</label>
          <textarea rows={4} className={inputCls} value={listToText(draft.tags)} onChange={(e) => set("tags", textToList(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Services (one per line)</label>
          <textarea rows={4} className={inputCls} value={listToText(draft.services)} onChange={(e) => set("services", textToList(e.target.value))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Approach (one bullet per line)</label>
          <textarea rows={5} className={inputCls} value={listToText(draft.approach)} onChange={(e) => set("approach", textToList(e.target.value))} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Card gradient (CSS)</label>
          <input className={inputCls} value={draft.gradient} onChange={(e) => set("gradient", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Grid span classes</label>
          <input className={inputCls} value={draft.span} onChange={(e) => set("span", e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Gallery gradients (one per line)</label>
          <textarea rows={4} className={inputCls} value={listToText(draft.gallery)} onChange={(e) => set("gallery", textToList(e.target.value))} />
        </div>
      </section>

      <section>
        <label className={labelCls}>Metrics (JSON array of {"{ value, label }"})</label>
        <textarea rows={6} className={`${inputCls} font-mono text-xs`} value={metricsText} onChange={(e) => setMetricsText(e.target.value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <div className={labelCls}>Testimonial</div>
        </div>
        <div className="md:col-span-3">
          <textarea
            rows={3}
            className={inputCls}
            placeholder="Quote"
            value={testimonial?.quote ?? ""}
            onChange={(e) => setTestimonial({ quote: e.target.value, author: testimonial?.author ?? "", role: testimonial?.role ?? "" })}
          />
        </div>
        <input className={inputCls} placeholder="Author" value={testimonial?.author ?? ""} onChange={(e) => setTestimonial({ quote: testimonial?.quote ?? "", author: e.target.value, role: testimonial?.role ?? "" })} />
        <input className={`${inputCls} md:col-span-2`} placeholder="Role" value={testimonial?.role ?? ""} onChange={(e) => setTestimonial({ quote: testimonial?.quote ?? "", author: testimonial?.author ?? "", role: e.target.value })} />
      </section>

      <section className="flex items-center justify-between border-t border-fg/10 pt-6">
        <label className="flex items-center gap-2 text-sm text-fg/70">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => set("published", e.target.checked)}
            className="h-4 w-4"
          />
          Published (visible on the public site)
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
      </section>
    </form>
  );
}
