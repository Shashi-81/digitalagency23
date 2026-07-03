import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject, emptyDraft } from "@/lib/admin";

export const Route = createFileRoute("/admin/projects/new")({
  component: NewProjectPage,
  head: () => ({
    meta: [
      { title: "New project · Admin — NexaStudio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function NewProjectPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <NewProject />
      </AdminShell>
    </AdminGuard>
  );
}

function NewProject() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-fg/50">
        <Link to="/admin/projects" className="hover:text-fg">Projects</Link>
        <span>/</span>
        <span className="text-fg">New</span>
      </div>
      <h1 className="font-heading text-3xl">Create project</h1>
      <ProjectForm
        initial={emptyDraft()}
        submitting={submitting}
        submitLabel="Create project"
        onSubmit={async (draft) => {
          setSubmitting(true);
          try {
            const row = await createProject(draft);
            navigate({ to: "/admin/projects/$slug", params: { slug: row.slug } });
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </div>
  );
}
