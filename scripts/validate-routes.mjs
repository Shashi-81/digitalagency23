#!/usr/bin/env node
/**
 * Build-time route validator.
 *
 * Guarantees no 404s slip in by checking:
 *   1. Every `<Link to="/services/$slug" params={{ slug: "..." }}>` references
 *      a slug present in src/lib/services.ts.
 *   2. Every `<Link to="/work/$slug" params={{ slug: "..." }}>` references
 *      a slug present in src/lib/projects.ts.
 *   3. Every static `<Link to="/..."> ` (and `navigate({ to: "/..." })`) path
 *      matches a real route file under src/routes/.
 *   4. Every service's `related: [...]` entry references an existing slug.
 *
 * Exits non-zero (failing the build) if any check fails.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const ROUTES_DIR = join(SRC, "routes");

const errors = [];
const err = (msg) => errors.push(msg);

// ---------- 1. Collect known routes from src/routes/ ----------
function collectRoutes() {
  const staticRoutes = new Set(["/"]);
  const dynamicRoutes = []; // [{ pattern: RegExp, raw: string }]
  for (const name of readdirSync(ROUTES_DIR)) {
    if (name.startsWith("_") || name === "README.md") continue;
    const full = join(ROUTES_DIR, name);
    if (statSync(full).isDirectory()) continue;
    // strip extension
    const base = name.replace(/\.(t|j)sx?$/, "");
    if (base === "index") continue;
    // sitemap[.]xml etc. — escape-bracket pattern
    const cleaned = base.replace(/\[\.\]/g, ".");
    // dot-separated → slash
    const segs = cleaned.split(".");
    const urlParts = segs.map((s) => (s === "index" ? "" : s));
    const path = "/" + urlParts.filter(Boolean).join("/");
    if (path.includes("$")) {
      const pattern = new RegExp(
        "^" + path.replace(/\$[a-zA-Z]+/g, "[^/]+") + "$",
      );
      dynamicRoutes.push({ pattern, raw: path });
    } else {
      staticRoutes.add(path);
    }
  }
  return { staticRoutes, dynamicRoutes };
}

// ---------- 2. Collect slugs from data files ----------
function collectSlugs(file) {
  const txt = readFileSync(join(SRC, file), "utf8");
  return new Set([...txt.matchAll(/slug:\s*["']([a-z0-9-]+)["']/g)].map((m) => m[1]));
}

const serviceSlugs = collectSlugs("lib/services.ts");
const projectSlugs = collectSlugs("lib/projects.ts");

if (serviceSlugs.size === 0) err("No service slugs found in src/lib/services.ts");
if (projectSlugs.size === 0) err("No project slugs found in src/lib/projects.ts");

// ---------- 3. Validate `related: [...]` in services.ts ----------
{
  const txt = readFileSync(join(SRC, "lib/services.ts"), "utf8");
  const re = /related:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(txt))) {
    const refs = [...m[1].matchAll(/["']([a-z0-9-]+)["']/g)].map((x) => x[1]);
    for (const r of refs) {
      if (!serviceSlugs.has(r)) {
        err(`services.ts: related slug "${r}" does not match any service.`);
      }
    }
  }
}

// ---------- 4. Walk src/ for Link / navigate references ----------
function walk(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const full = join(dir, n);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(n)) out.push(full);
  }
  return out;
}

const { staticRoutes, dynamicRoutes } = collectRoutes();
const matchesRoute = (p) => {
  // Strip hash and trailing slash
  const path = p.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (staticRoutes.has(path)) return true;
  return dynamicRoutes.some((d) => d.pattern.test(path));
};

const files = walk(SRC);
const linkParamRe =
  /to=["'](\/[^"']*\$[a-zA-Z]+[^"']*)["'][^>]*params=\{\{\s*([a-zA-Z]+):\s*["']([a-z0-9-]+)["']/g;
const staticToRe = /(?:to=|to:\s*)["'](\/[A-Za-z0-9/_\-#?$]*)["']/g;

for (const f of files) {
  if (f.includes("routeTree.gen")) continue;
  const txt = readFileSync(f, "utf8");
  const rel = relative(ROOT, f);

  // Dynamic Link with literal slug param
  for (const m of txt.matchAll(linkParamRe)) {
    const [, to, , slug] = m;
    if (to.startsWith("/services/") && !serviceSlugs.has(slug)) {
      err(`${rel}: Link to ${to} uses unknown service slug "${slug}".`);
    }
    if (to.startsWith("/work/") && !projectSlugs.has(slug)) {
      err(`${rel}: Link to ${to} uses unknown project slug "${slug}".`);
    }
  }

  // Static `to="/..."` paths
  for (const m of txt.matchAll(staticToRe)) {
    const to = m[1];
    if (to.includes("$")) continue; // dynamic, handled above
    if (!matchesRoute(to)) {
      err(`${rel}: Link/navigate to "${to}" has no matching route file.`);
    }
  }
}

// ---------- Report ----------
if (errors.length) {
  console.error("\n✖ Route validation failed:\n");
  for (const e of errors) console.error("  - " + e);
  console.error(`\n${errors.length} error(s).\n`);
  process.exit(1);
}
console.log(
  `✓ Routes OK — ${serviceSlugs.size} service slugs, ${projectSlugs.size} project slugs, ${staticRoutes.size} static + ${dynamicRoutes.length} dynamic routes.`,
);
