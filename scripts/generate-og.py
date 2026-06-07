#!/usr/bin/env python3
"""Generate 1200x630 branded OG images for every page."""
import os, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (15, 17, 23)
INK = (245, 245, 250)
MUTED = (160, 170, 185)
PRIMARY = (90, 216, 230)       # cyan
PRIMARY_DEEP = (40, 140, 170)
ACCENT = (200, 255, 120)       # lime hint

OUT_DIR = "public/og"
os.makedirs(OUT_DIR, exist_ok=True)

def load_font(weight, size):
    candidates = {
        "bold": [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
        ],
        "regular": [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/dejavu/DejaVuSans.ttf",
        ],
        "mono": [
            "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
            "/usr/share/fonts/dejavu/DejaVuSansMono-Bold.ttf",
        ],
    }
    for p in candidates[weight]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def radial_blob(size, color, alpha=180):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for r in range(size // 2, 0, -2):
        a = int(alpha * (1 - r / (size / 2)) ** 2)
        d.ellipse([size//2 - r, size//2 - r, size//2 + r, size//2 + r],
                  fill=(*color, a))
    return img.filter(ImageFilter.GaussianBlur(20))

def base_canvas():
    img = Image.new("RGB", (W, H), BG)
    # Mesh gradient blobs
    b1 = radial_blob(900, PRIMARY, 90)
    b2 = radial_blob(700, PRIMARY_DEEP, 120)
    b3 = radial_blob(500, ACCENT, 50)
    img.paste(b1, (-200, -300), b1)
    img.paste(b2, (700, 300), b2)
    img.paste(b3, (900, -150), b3)

    # Subtle grid
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 60):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
    for y in range(0, H, 60):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 8))
    img.paste(grid, (0, 0), grid)

    # Vignette
    vg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vg)
    for i in range(120):
        a = int(180 * (i / 120) ** 2)
        vd.rectangle([i, i, W - i, H - i], outline=(0, 0, 0, max(0, 8 - i // 15)))
    img.paste(vg, (0, 0), vg)
    return img

def wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=font) <= max_w:
            cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def draw_brand(draw):
    f_mark = load_font("bold", 26)
    f_tag = load_font("mono", 18)
    # Logo dot
    draw.ellipse([72, 70, 92, 90], fill=PRIMARY)
    draw.text((104, 66), "NexaStudio", font=f_mark, fill=INK)
    # corner tag
    tag = "nexastudio.com"
    tw = draw.textlength(tag, font=f_tag)
    draw.text((W - 72 - tw, 73), tag, font=f_tag, fill=MUTED)

def draw_footer(draw, kicker, meta):
    f_kick = load_font("mono", 18)
    f_meta = load_font("regular", 18)
    draw.text((72, H - 90), kicker.upper(), font=f_kick, fill=PRIMARY)
    draw.text((72, H - 60), meta, font=f_meta, fill=MUTED)
    # bottom accent line
    draw.rectangle([72, H - 110, 72 + 60, H - 106], fill=PRIMARY)

def render(filename, eyebrow, title, subtitle, kicker="NexaStudio", meta="Digital experiences that convert"):
    img = base_canvas()
    d = ImageDraw.Draw(img)
    draw_brand(d)

    f_eye = load_font("mono", 20)
    f_title = load_font("bold", 92)
    f_title_sm = load_font("bold", 76)
    f_sub = load_font("regular", 28)

    # eyebrow
    d.text((72, 200), f"— {eyebrow.upper()}", font=f_eye, fill=PRIMARY)

    # title (auto fit)
    title_font = f_title
    lines = wrap(d, title, title_font, W - 144)
    if len(lines) > 2:
        title_font = f_title_sm
        lines = wrap(d, title, title_font, W - 144)
    y = 240
    for ln in lines[:3]:
        d.text((72, y), ln, font=title_font, fill=INK)
        y += title_font.size + 6

    # subtitle
    sub_lines = wrap(d, subtitle, f_sub, W - 200)
    y += 18
    for ln in sub_lines[:2]:
        d.text((72, y), ln, font=f_sub, fill=MUTED)
        y += 36

    draw_footer(d, kicker, meta)
    out = os.path.join(OUT_DIR, filename)
    img.save(out, "JPEG", quality=88, optimize=True)
    print(f"  → {out}")

# ---- Pages ----
PAGES = [
    ("default.jpg", "Studio", "Digital experiences that convert.", "Brand, product, and growth for ambitious teams.", "NexaStudio", "nexastudio.com"),
    ("home.jpg", "Studio", "Digital experiences that convert.", "Full-stack design & development for ambitious teams.", "NexaStudio", "Brand · Product · Growth"),
    ("hire-us.jpg", "Engagements", "Let's build something great.", "Project, retainer & advisory engagements — limited slots per quarter.", "Hire Us", "Reply within 24h · Worldwide"),
    ("resources.jpg", "Free Resources", "Playbooks, templates & guides.", "Battle-tested resources from our work with funded startups.", "Resources", "Free downloads"),
    ("thank-you.jpg", "Message received", "Thanks — we'll be in touch.", "A senior strategist personally reviews every brief within 24 hours.", "Thank You", "We reply within 24h"),
    ("privacy-policy.jpg", "Legal", "Privacy Policy", "How we collect, use, and protect your personal data. GDPR & CCPA compliant.", "Privacy", "Last updated: Jan 2025"),
    ("terms-of-service.jpg", "Legal", "Terms of Service", "The terms that govern your use of our website and services.", "Terms", "Last updated: Jan 2025"),
    ("cookie-policy.jpg", "Legal", "Cookie Policy", "How we use cookies and similar technologies on our website.", "Cookies", "Last updated: Jan 2025"),
    ("refund-policy.jpg", "Legal", "Refund Policy", "When refunds are available and how to request one.", "Refunds", "Last updated: Jan 2025"),
]

# Services
SERVICES = [
    ("ui-ux-design", "UI/UX Design", "User-centered design that converts."),
    ("web-development", "Web Development", "Fast, scalable, conversion-ready web builds."),
    ("mobile-app-development", "Mobile App Development", "iOS & Android apps users love."),
    ("brand-identity", "Brand & Design Systems", "Brand identities that command attention."),
    ("seo-digital-marketing", "SEO & Digital Marketing", "Search-led growth, wired to revenue."),
    ("ai-integration", "AI Integration & Automation", "Production-ready AI for real businesses."),
]

# Projects
PROJECTS = [
    ("helio-finance", "Helio Finance", "Fintech platform reimagined for retail traders."),
    ("atlas-outdoor", "Atlas Outdoor Co.", "DTC outdoor brand with a 3.4× revenue lift."),
    ("cipher-ai", "Cipher AI", "AI workspace with sub-second response times."),
]

print("Generating OG images…")
for args in PAGES:
    render(*args)

for slug, title, tag in SERVICES:
    render(f"services-{slug}.jpg", "Service", title, tag, "Service", "Pricing & timelines inside")

for slug, client, tag in PROJECTS:
    render(f"work-{slug}.jpg", "Case Study", client, tag, "Case Study", "View the full project")

print("Done.")
