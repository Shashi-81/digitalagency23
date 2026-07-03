import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteProject, listAllProjects, type ProjectRow } from "@/lib/admin";
import { ExternalLink, Loader2, Pencil, PlusCircle, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects · Admin — NexaStudio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function ProjectsPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <ProjectsTable />
      </AdminShell>
    </AdminGuard>
  );
}

function ProjectsTable() {
  const [rows, setRows] = useState<ProjectRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setRows(null);
    listAllProjects().then(setRows).catch((e) => {
      setRows([]);
      setErr(e instanceof Error ? e.message : "Failed to load");
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (row: ProjectRow) => {
    if (!confirm(`Delete "${row.name}"? This cannot be undone.`)) return;
    setDeletingId(row.id);
    try {
      await deleteProject(row.id);
      setRows((r) => r?.filter((x) => x.id !== row.id) ?? null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-heading text-3xl">Projects</h1>
          <p className="mt-1 text-sm text-fg/60">All case studies, published or not.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
        >
          <PlusCircle className="h-4 w-4" />
          New project
        </Link>
      </header>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{err}</div>
      )}

      <div className="overflow-hidden rounded-2xl border border-fg/10">
        {rows === null ? (
          <div className="flex items-center justify-center gap-2 p-10 text-fg/60">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-fg/60">No projects yet. Create your first case study.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-fg/5 text-xs uppercase tracking-wider text-fg/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fg/10">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-fg/[.03]">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-fg/50">/{r.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-fg/70">{r.client}</td>
                  <td className="px-4 py-3 text-fg/70">{r.year}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        r.published ? "bg-emerald-500/15 text-emerald-300" : "bg-fg/10 text-fg/60"
                      }`}
                    >
                      {r.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {r.published && (
                        <Link
                          to="/work/$slug"
                          params={{ slug: r.slug }}
                          target="_blank"
                          className="rounded-md p-2 text-fg/60 hover:bg-fg/10 hover:text-fg"
                          title="View live"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        to="/admin/projects/$slug"
                        params={{ slug: r.slug }}
                        className="rounded-md p-2 text-fg/60 hover:bg-fg/10 hover:text-fg"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        disabled={deletingId === r.id}
                        onClick={() => handleDelete(r)}
                        className="rounded-md p-2 text-fg/60 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-40"
                        title="Delete"
                      >
                        {deletingId === r.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
