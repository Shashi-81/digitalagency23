import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { isCurrentUserAdmin } from "@/lib/admin";
import { Loader2, ShieldAlert } from "lucide-react";

type State = "loading" | "unauth" | "not-admin" | "ok";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!active) return;
      if (!session) {
        setState("unauth");
        return;
      }
      setEmail(session.user.email ?? null);
      const admin = await isCurrentUserAdmin();
      if (!active) return;
      setState(admin ? "ok" : "not-admin");
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-fg/60">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (state === "unauth") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-fg/50" />
        <h1 className="font-heading text-2xl">Admin sign-in required</h1>
        <p className="text-fg/60">You need to sign in to manage projects.</p>
        <button
          onClick={() => navigate({ to: "/auth", search: { redirect: "/admin" } as never })}
          className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg hover:opacity-90"
        >
          Sign in
        </button>
      </div>
    );
  }

  if (state === "not-admin") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-fg/50" />
        <h1 className="font-heading text-2xl">Not authorized</h1>
        <p className="text-fg/60">
          Signed in as <span className="text-fg">{email}</span>, but this account doesn't have the
          <span className="font-mono"> admin </span>role.
        </p>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
            }}
            className="rounded-full border border-fg/20 px-5 py-2 text-sm hover:bg-fg/5"
          >
            Sign out
          </button>
          <Link to="/" className="rounded-full bg-fg px-5 py-2 text-sm text-bg hover:opacity-90">
            Back to site
          </Link>
        </div>
        <p className="mt-4 max-w-sm text-xs text-fg/40">
          Grant admin access by inserting your user id into <span className="font-mono">public.user_roles</span> with
          role <span className="font-mono">admin</span> from the backend.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
