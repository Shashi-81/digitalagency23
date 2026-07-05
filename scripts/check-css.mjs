#!/usr/bin/env node
/**
 * CSS build/transform pre-check.
 *
 * Catches the class of errors that cause `GET /src/styles.css` to 500 in dev
 * (blank screen), BEFORE the dev server starts. Runs Lightning CSS's real
 * filesystem-based bundler against src/styles.css — the same resolver Tailwind
 * v4 uses — and also lints for the most common footguns with clearer messages.
 *
 * Exits non-zero with a human-readable explanation on failure.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CSS = join(ROOT, "src/styles.css");

const errors = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(CSS)) {
  console.error(`✖ CSS check: src/styles.css not found at ${CSS}`);
  process.exit(1);
}

const src = readFileSync(CSS, "utf8");

// ---------- 1. Lint: remote @import URLs (Lightning CSS can't fetch them) ----------
const importRe = /^[ \t]*@import\s+(?:url\()?["']([^"')]+)["']\)?\s*;?/gm;
const imports = [];
for (const m of src.matchAll(importRe)) imports.push({ spec: m[1], index: m.index ?? 0 });

for (const { spec } of imports) {
  if (/^https?:\/\//i.test(spec)) {
    fail(
      `Remote @import in src/styles.css: "${spec}"\n` +
        `    Lightning CSS resolves @import from the filesystem, not the network.\n` +
        `    Load remote stylesheets/fonts via a <link> tag in src/routes/__root.tsx head().`,
    );
  }
}

// ---------- 2. Lint: bare package @imports must resolve in node_modules ----------
for (const { spec } of imports) {
  if (/^https?:\/\//i.test(spec)) continue;
  if (spec.startsWith(".") || spec.startsWith("/")) continue;
  if (spec === "tailwindcss") continue;
  const pkgName = spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
  const pkgDir = join(ROOT, "node_modules", pkgName);
  if (!existsSync(pkgDir)) {
    fail(
      `@import "${spec}" in src/styles.css references package "${pkgName}", ` +
        `but it is not installed.\n` +
        `    Run: bun add ${pkgName}\n` +
        `    (Or remove the @import if unused.)`,
    );
  }
}

// ---------- 3. Real transform via Tailwind v4 compiler (same pipeline Vite uses) ----------
try {
  const { compile } = await import("@tailwindcss/node");
  const compiler = await compile(src, {
    base: dirname(CSS),
    from: CSS,
    loadStylesheet: async (id, base) => {
      // Delegate to Tailwind's default resolution by throwing a clear error only
      // for the cases we know produce blank screens.
      if (/^https?:\/\//i.test(id)) {
        throw new Error(
          `Remote @import "${id}" — load via <link> in src/routes/__root.tsx head() instead.`,
        );
      }
      // Fall back to filesystem read for relative/package imports.
      const { readFile } = await import("node:fs/promises");
      const { createRequire } = await import("node:module");
      let resolved;
      if (id.startsWith(".") || id.startsWith("/")) {
        resolved = resolve(base, id);
      } else {
        resolved = createRequire(join(base, "_")).resolve(id);
      }
      return { base: dirname(resolved), content: await readFile(resolved, "utf8") };
    },
    loadModule: async () => {
      throw new Error("loadModule not supported in pre-check");
    },
  });
  compiler.build([]);
} catch (e) {
  fail(
    `Tailwind/Lightning CSS failed to transform src/styles.css:\n` +
      `    ${(e?.message ?? String(e)).split("\n").join("\n    ")}`,
  );
}


// ---------- Report ----------
if (errors.length) {
  console.error("\n✖ CSS pre-check failed — the dev server would return 500 for /src/styles.css:\n");
  for (const e of errors) console.error("  - " + e + "\n");
  console.error(`${errors.length} error(s). Fix these before starting dev.\n`);
  process.exit(1);
}

console.log(`✓ CSS OK — src/styles.css transforms cleanly (${imports.length} @import(s)).`);
