import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectBySlug, updateProject, type ProjectRow } from "@/lib/admin";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/projects/$slug")({
  component: EditProjectPage,
  head: () => ({
    meta: [
      { title: "Edit project · Admin — NexaStudio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function EditProjectPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <EditProject />
      </AdminShell>
    </AdminGuard>
  );
}

function EditProject() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState<ProjectRow | null | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProjectBySlug(slug).then(setRow).catch(() => setRow(null));
  }, [slug]);

  if (row === undefined) {
    return (
      <div className="flex items-center justify-center gap-2 p-10 text-fg/60">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    );
  }
  if (row === null) {
    return (
      <div className="space-y-4">
        <div className="text-fg/60">Project not found.</div>
        <Link to="/admin/projects" className="text-sm underline">Back to projects</Link>
      </div>
    );
  }

  const { id, created_at, updated_at, ...draft } = row;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-fg/50">
        <Link to="/admin/projects" className="hover:text-fg">Projects</Link>
        <span>/</span>
        <span className="text-fg">{row.name}</span>
      </div>
      <div className="flex items-end justify-between">
        <h1 className="font-heading text-3xl">Edit project</h1>
        {row.published && (
          <Link
            to="/work/$slug"
            params={{ slug: row.slug }}
            target="_blank"
            className="text-sm text-fg/60 hover:text-fg"
          >
            View live ↗
          </Link>
        )}
      </div>
      <ProjectForm
        initial={draft}
        submitting={submitting}
        submitLabel="Save changes"
        onSubmit={async (patch) => {
          setSubmitting(true);
          try {
            const updated = await updateProject(id, patch);
            if (updated.slug !== slug) {
              navigate({ to: "/admin/projects/$slug", params: { slug: updated.slug }, replace: true });
            } else {
              setRow(updated);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </div>
  );
}
