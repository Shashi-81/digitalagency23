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

// ---------- 2. Lint: @import must come before other rules ----------
// Find first non-@import, non-@charset, non-@layer-statement, non-comment/whitespace rule.
const stripped = src.replace(/\/\*[\s\S]*?\*\//g, "");
const lines = stripped.split("\n");
let sawNonImport = false;
let firstNonImportLine = 0;
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (!t) continue;
  if (t.startsWith("@import") || t.startsWith("@charset")) {
    if (sawNonImport) {
      fail(
        `@import on line ${i + 1} of src/styles.css appears after a non-@import rule ` +
          `(first was line ${firstNonImportLine + 1}).\n` +
          `    Lightning CSS requires all @import rules at the top of the file.`,
      );
      break;
    }
    continue;
  }
  // @layer without a block is a statement and is allowed before @import? No — Lightning is strict.
  // Anything else counts as "other rule".
  if (!sawNonImport) {
    sawNonImport = true;
    firstNonImportLine = i;
  }
}

// ---------- 3. Lint: bare package @imports must resolve in node_modules ----------
for (const { spec } of imports) {
  if (/^https?:\/\//i.test(spec)) continue;
  if (spec.startsWith(".") || spec.startsWith("/")) continue; // relative/absolute path
  if (spec === "tailwindcss") continue; // handled by the tailwind vite plugin
  // Try to resolve package (support scoped, subpath, or bare)
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

// ---------- 4. Real transform via Lightning CSS ----------
try {
  const { bundle } = await import("lightningcss");
  const { createRequire } = await import("node:module");
  bundle({
    filename: CSS,
    minify: false,
    resolver: {
      resolve(specifier, from) {
        if (specifier.startsWith(".") || specifier.startsWith("/")) {
          return resolve(dirname(from), specifier);
        }
        try {
          return createRequire(from).resolve(specifier);
        } catch {
          // Fall back to node_modules/<pkg> — we already linted existence above.
          return join(ROOT, "node_modules", specifier);
        }
      },
    },
  });
} catch (e) {
  // Lightning throws with { loc: { line, column, filename } } for parse errors
  const loc = e?.loc ? ` at ${e.loc.filename}:${e.loc.line}:${e.loc.column}` : "";
  fail(
    `Lightning CSS failed to transform src/styles.css${loc}\n` +
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
