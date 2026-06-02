
# NexaStudio — Single-Page Agency Site

I'll keep the name **NexaStudio** (clean, memorable, ownable). If you want alternatives later: *Obsidian&Co*, *Halcyon Studio*, *Northbound*.

## Design system (locked to your brief)

- **Background:** obsidian `#0a0a0f` → charcoal `#111118` layered surfaces
- **Surface (glass):** `#15151f` with subtle border `rgba(255,255,255,0.06)`
- **Text:** warm off-white `#f4f1ea` / muted `#a3a3ad`
- **Accent A (primary):** electric cyan `#22e3ff`
- **Accent B:** acid lime `#c6ff3d` for secondary highlights & badges
- **Typography:** Syne (headings, 700/800) + DM Sans (body, 400/500) via Bunny Fonts (privacy-friendly, no Google)
- **Radius:** mixed — pill buttons, 20px glass cards, 0 on full-bleed bands
- **Motion:** Framer Motion for reveals/stagger, magnetic buttons via pointer math, CSS custom cursor glow, IntersectionObserver counters

All tokens go into `src/styles.css` as oklch semantic variables; components use `bg-background`, `text-foreground`, `bg-accent`, etc.

## Architecture

Single route (`src/routes/index.tsx`) with smooth-scroll anchors. Each section is its own component in `src/components/sections/` so the route file stays readable.

```text
src/
  components/
    nav/Navbar.tsx, MobileMenu.tsx
    sections/Hero.tsx, Marquee.tsx, Services.tsx, Work.tsx,
             WhyUs.tsx, Process.tsx, Testimonials.tsx,
             Pricing.tsx, Faq.tsx, CtaBanner.tsx, Contact.tsx
    ui/Footer.tsx, MagneticButton.tsx, GlassCard.tsx,
       CursorGlow.tsx, AnimatedCounter.tsx, RevealOnScroll.tsx
  routes/index.tsx
  styles.css   (tokens + font @imports)
```

## Section build notes

1. **Navbar** — sticky, `backdrop-blur-xl`, glass border-bottom. Logo (wordmark + cyan dot), centered links, right-side "Start a Project →" pill with animated gradient border (conic-gradient mask). Mobile: full-screen overlay with staggered link reveal.
2. **Hero** — 100vh. Animated mesh-gradient background (CSS conic-gradient + slow rotate + blur). Headline split by word with staggered y-fade. Subhead, two CTAs (primary cyan fill, secondary ghost). Floating stats strip on glass pill. Animated scroll cue.
3. **Marquee** — two infinite rows scrolling opposite directions, text-based brand names with cyan separators, edge mask-image fade.
4. **Services** — 3×2 grid of glass cards. Lucide icons (Palette, Code2, Smartphone, Sparkles, TrendingUp, BrainCircuit). Hover: lift + cyan border glow + arrow slide.
5. **Featured Work** — bento layout (1 large left + 2 stacked right). Each tile uses an intentional gradient placeholder (no stock photos), tags as chips, hover overlay with "View Case Study →".
6. **Why Choose Us** — split. Left: editorial headline. Right: 2×2 stat grid with `AnimatedCounter` triggered by IntersectionObserver.
7. **Process** — 5 steps. Desktop: horizontal with animated connecting line that draws on scroll (SVG strokeDashoffset). Mobile: vertical timeline.
8. **Testimonials** — auto-playing carousel (pause on hover), fade transitions, dot controls, initial-avatar fallback, 5-star row in lime.
9. **Pricing** — Monthly/Yearly toggle (yearly applies ×0.8 + "Save 20%" badge). 3 cards, Growth elevated with lime "Most Popular" ribbon. Footnote link for enterprise.
10. **FAQ** — shadcn Accordion, 7 questions (process, timeline, revisions, tech stack, ownership, pricing model, post-launch support).
11. **CTA Banner** — full-bleed, radial cyan glow behind headline, two buttons.
12. **Contact** — left: email/phone/location + social icons (hover lift). Right: form with floating labels (peer-placeholder trick), Zod-validated (name, email, budget select, service select, message). Success state swaps form for animated check (SVG path draw).
13. **Footer** — 4 columns + bottom bar with copyright, privacy, terms, social icons.

## Cross-cutting

- **CursorGlow**: desktop-only (>=`md`), 400px radial cyan glow following pointer with lerp; hidden on touch via `pointer: fine` media query.
- **MagneticButton**: translates child toward pointer within 80px radius.
- **RevealOnScroll**: Framer Motion `whileInView` with `once: true`, stagger children.
- **Smooth scroll**: `html { scroll-behavior: smooth }` + `scroll-margin-top` on section anchors for navbar offset.
- **SEO**: `head()` in route with title, description, og tags. Semantic `<header><main><section><footer>`. Skip link for a11y. All interactive elements keyboard-reachable with visible cyan focus ring.
- **Performance**: no heavy libs beyond framer-motion + lucide-react (already standard). Gradient placeholders mean zero image weight.

## Technical details

- Install: `framer-motion` (lucide-react, zod already present).
- Fonts: `@import` Bunny Fonts in `styles.css` top.
- Tokens added to `:root` in oklch; no `.dark` override needed since dark is default — body gets dark tokens directly.
- Contact form is UI-only (no backend wired); submit simulates success. If you want it to actually email, say the word and I'll add Lovable Cloud + a server function.
- No router changes beyond `index.tsx`; placeholder removed.

## Out of scope (ask if you want them)

- Real case-study subpages (`/work/$slug`)
- Blog
- Backend for contact form / newsletter
- Real client logos & project imagery
