
# SEO Implementation for NexaStudio

Single-page site (one route `/`), so SEO work concentrates on the root + index route, plus a sitemap and robots file.

## 1. Root defaults (`src/routes/__root.tsx`)

Replace the generic "Lovable App" meta with sitewide defaults:
- `og:type: website`
- `og:site_name: NexaStudio`
- `twitter:card: summary_large_image`
- Theme color, favicon link
- Sitewide JSON-LD `Organization` + `WebSite` (with `SearchAction` omitted since no search)

No canonical here (leaf-only rule). No `og:image` here (leaf-only rule).

## 2. Index route (`src/routes/index.tsx`)

Expand `head()`:
- Keep current `title` / `description`
- Add `og:url` = `/`, `twitter:title`, `twitter:description`
- Add `<link rel="canonical" href="/">`
- Add `og:image` = generated hero share image (`/og-image.jpg`, 1200×630)
- Add JSON-LD `ProfessionalService` (agency schema) with name, description, serviceType list, areaServed, plus a `FAQPage` block built from the same questions used in the FAQ section

## 3. OG share image

Generate one premium 1200×630 image at `public/og-image.jpg` — dark obsidian background, "NexaStudio" wordmark + tagline "Digital experiences that convert", cyan/lime accent. Referenced as absolute-path `/og-image.jpg` in og:image / twitter:image.

## 4. Sitemap (`src/routes/sitemap[.]xml.ts`)

Server route returning XML with single entry for `/`. `BASE_URL = ""` (relative) with TODO comment — no project domain set yet.

## 5. Robots (`public/robots.txt`)

```
User-agent: *
Allow: /
```

No `Sitemap:` directive (no domain yet).

## 6. Semantic HTML check

Quick pass on section components to ensure single `<h1>` (Hero), `<h2>` for section titles, and `aria-label` on the nav — most likely already correct from initial build; fix only if needed.

## Out of scope

- Per-section routes (site is intentionally single-page)
- Real backend for structured data beyond what's in markup
- `og:image` variants per section (single page = single share image)
