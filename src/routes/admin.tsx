import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAllProjects, type ProjectRow } from "@/lib/admin";
import { FolderKanban, PlusCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminHome,
  head: () => ({
    meta: [
      { title: "Admin — Gipsm Technology" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminHome() {
  return (
    <AdminGuard>
      <AdminShell>
        <Overview />
      </AdminShell>
    </AdminGuard>
  );
}

function Overview() {
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);

  useEffect(() => {
    listAllProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  const total = projects?.length ?? 0;
  const published = projects?.filter((p) => p.published).length ?? 0;

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-heading text-3xl">Overview</h1>
          <p className="mt-1 text-sm text-fg/60">Manage your case studies and site content.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
        >
          <PlusCircle className="h-4 w-4" />
          New project
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Projects" value={total} />
        <Stat label="Published" value={published} />
        <Stat label="Drafts" value={total - published} />
      </div>

      <Link
        to="/admin/projects"
        className="flex items-center justify-between rounded-2xl border border-fg/10 bg-fg/5 p-6 transition hover:bg-fg/10"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-fg/10 p-3">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div>
            <div className="font-medium">Manage projects</div>
            <div className="text-sm text-fg/60">Create, edit and publish case studies.</div>
          </div>
        </div>
        <span className="text-fg/50">→</span>
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-fg/10 bg-fg/5 p-5">
      <div className="text-xs uppercase tracking-wider text-fg/50">{label}</div>
      <div className="mt-2 font-heading text-3xl">{value}</div>
    </div>
  );
}
