import { Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, FolderKanban, ExternalLink } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban, exact: false },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-24 md:px-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-24 space-y-1">
            <div className="mb-6 font-heading text-xl">Admin</div>
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active ? "bg-fg/10 text-fg" : "text-fg/60 hover:bg-fg/5 hover:text-fg"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
            <div className="my-4 h-px bg-fg/10" />
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg/60 hover:bg-fg/5 hover:text-fg"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-fg/60 hover:bg-fg/5 hover:text-fg"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
