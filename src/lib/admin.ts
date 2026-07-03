import { supabase } from "@/integrations/supabase/client";

export type Metric = { value: string; label: string };
export type Testimonial = { quote: string; author: string; role: string } | null;

export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  cat: string;
  tags: string[];
  gradient: string;
  span: string;
  client: string;
  year: string;
  industry: string;
  services: string[];
  timeline: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: Metric[];
  testimonial: Testimonial;
  gallery: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectDraft = Omit<ProjectRow, "id" | "created_at" | "updated_at">;

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export async function listAllProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as ProjectRow[];
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as ProjectRow) ?? null;
}

export async function createProject(draft: ProjectDraft): Promise<ProjectRow> {
  const { data, error } = await supabase
    .from("projects")
    .insert(draft as never)
    .select("*")
    .single();
  if (error) throw error;
  return data as unknown as ProjectRow;
}

export async function updateProject(id: string, patch: Partial<ProjectDraft>): Promise<ProjectRow> {
  const { data, error } = await supabase
    .from("projects")
    .update(patch as never)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as unknown as ProjectRow;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export function emptyDraft(): ProjectDraft {
  return {
    slug: "",
    name: "",
    cat: "",
    tags: [],
    gradient: "linear-gradient(135deg, oklch(0.3 0.1 260), oklch(0.75 0.16 220))",
    span: "min-h-[300px]",
    client: "",
    year: String(new Date().getFullYear()),
    industry: "",
    services: [],
    timeline: "",
    summary: "",
    challenge: "",
    approach: [],
    outcome: "",
    metrics: [],
    testimonial: null,
    gallery: [],
    published: true,
    sort_order: 100,
  };
}
