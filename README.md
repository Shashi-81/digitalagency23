# Gipsm Technology Agency

Build a world-class digital services agency website called "Gipsm Technology" (or suggest a better name). This is a full-stack design + development agency offering services to startups and enterprises. The site must be visually stunning, conversion-focused, and feel like a top-tier agency like Awwwards-winning studios.

---

🎨 DESIGN DIRECTION

- Aesthetic: Dark luxury meets futuristic editorial — deep charcoal/obsidian backgrounds, electric cyan/lime accent, warm off-white text

- Typography: Use Clash Display or Syne for headings (bold, editorial), DM Sans or Cabinet Grotesk for body — import from Google Fonts or Bunny Fonts

- Motion: Smooth scroll reveals, staggered text animations on load, magnetic hover effects on buttons, parallax hero background, cursor glow effect on desktop

- Layout: Asymmetric grid, full-bleed sections, overlapping elements, floating cards with glassmorphism

- NO purple gradients on white. NO Inter/Roboto. NO generic SaaS look.

---

📄 PAGES & SECTIONS (Single Page with smooth scroll anchors)

1. NAVBAR

- Sticky, blur-backdrop glassmorphism navbar

- Logo left, nav links center (Home, Services, Work, Process, Pricing, Contact)

- CTA button right: "Start a Project →" with animated border

- Mobile: hamburger menu with full-screen overlay animation

2. HERO SECTION

- Full-screen, dark background with animated mesh gradient or particle canvas

- Bold headline (split into two lines, large 80–100px): "We Build Digital Experiences That Convert"

- Subheadline: short punchy line about results

- Two CTAs: Primary "See Our Work" + Secondary "Book Free Call"

- Floating stats row below: "150+ Projects | $2M+ Revenue Generated | 98% Client Retention"

- Subtle scroll indicator animation

3. MARQUEE / TRUSTED BY

- Infinite horizontal scrolling logo strip: "Trusted by brands like…"

- Use placeholder SVG company logos or text names

4. SERVICES SECTION

- Section title with eyebrow label

- 6 service cards in a 3x2 grid (hover: card lifts, accent color border glows):

  • UI/UX Design

  • Web Development

  • Mobile App Development

  • Brand Identity & Design Systems

  • SEO & Digital Marketing

  • AI Integration & Automation

- Each card: icon, title, 2-line description, "Learn More →" link

5. FEATURED WORK / PORTFOLIO

- Full-width section title

- 3 large project cards in masonry/bento grid layout

- Each card: project image (use high-quality placeholder/gradient), project name, tags (Design, Dev, Branding), hover reveals overlay with "View Case Study →"

- "View All Work →" button below

6. WHY CHOOSE US

- Split layout: left = bold headline + paragraph, right = 4 icon + stat items

- Stats: "8+ Years Experience | 200+ Happy Clients | 50+ Awards | 24/7 Support"

- Animated counter numbers when scrolled into view

7. HOW WE WORK (Process)

- Timeline/step layout (horizontal on desktop, vertical on mobile)

- 5 steps: Discovery → Strategy → Design → Development → Launch

- Each step has number, title, short description

- Connecting animated line between steps

8. TESTIMONIALS

- Dark card carousel/slider (auto-play + manual dots)

- 4–5 testimonials: client avatar (initial avatar fallback), name, role, company, star rating, quote

- Smooth fade or slide transition

9. PRICING SECTION

- 3 pricing tiers: Starter / Growth / Enterprise

- Highlighted "Most Popular" badge on Growth

- Each tier: price, feature list with checkmarks, CTA button

- Toggle: Monthly / Yearly (yearly shows 20% off badge)

- Note: "Custom enterprise? Let's talk →"

10. FAQ SECTION

- Accordion-style, 6–8 common questions

- Smooth open/close animation

- Questions about process, timeline, revisions, tech stack, etc.

11. CTA BANNER

- Full-width dark section with gradient accent

- Bold headline: "Ready to Build Something Great?"

- Subtext + two buttons: "Start a Project" and "Schedule a Call"

12. CONTACT SECTION

- Two-column: left = contact info (email, phone, location, social icons), right = contact form

- Form fields: Name, Email, Budget (dropdown), Service (dropdown), Message, Submit button

- Form has floating label animation

- On submit: success state with checkmark animation

13. FOOTER

- 4-column layout: Logo + tagline | Services links | Company links | Newsletter signup

- Bottom bar: copyright, privacy policy, terms

- Social icons with hover animation

---

⚙️ TECHNICAL REQUIREMENTS

- React + Tailwind CSS (or vanilla HTML/CSS/JS if React not available)

- Fully responsive: mobile, tablet, desktop

- Smooth scroll behavior (scroll-smooth)

- All animations using Framer Motion (if React) or pure CSS/JS transitions

- Dark theme default, no light mode toggle needed

- Accessible: proper aria labels, keyboard navigation, focus states

- Fast: lazy-load images, no heavy libraries unless needed

- SEO: proper semantic HTML5 tags (header, main, section, footer), meta description placeholder

---

🧩 COMPONENT DETAILS

- Buttons: Rounded pill or sharp rectangle with animated fill-on-hover, arrow icon

- Cards: Dark glass surface (#1a1a2e or similar), subtle border, box-shadow glow on hover

- Section spacing: generous padding (py-24 or 6rem minimum)

- Icons: Use Lucide React or Heroicons

- Images: Use gradient placeholder divs if no real images — make them look intentional

---

🏆 QUALITY BAR

This should look like it could win an Awwwards Site of the Day. Every section should feel intentional, polished, and premium. The kind of site that makes a visitor say "I need to hire these people." No generic, no cookie-cutter. Bold, memorable, conversion-optimized.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://digitalagency23.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cc89a927-6d63-4f36-9229-03f50b307d62).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
