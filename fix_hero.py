#!/usr/bin/env python3
"""
Hero refinement (run once from the repo root /Users/mac/leadcatch-app):
  1. Remove the redundant hero subhead paragraph in app/page.tsx
  2. Remove the duplicate GSAP hero-entrance timeline in
     app/components/GSAPAnimations.tsx (it conflicts with the CSS entrance)

Safety: each edit asserts its exact target exists first. If a target isn't
found, the script aborts and writes NOTHING — your files stay as they were.
"""
import pathlib

# ── Edit 1: remove the redundant hero subhead paragraph ──────────────────
page = pathlib.Path("app/page.tsx")
ps = page.read_text()

platform_line = (
    "            <p className=\"hero-platform-line hero-animate-delay\" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>\n"
    "              Form abandonment is the start. ReCapture is building the recovery layer for high-ticket service businesses.\n"
    "            </p>\n"
)
assert platform_line in ps, "Edit 1 FAILED: hero subhead paragraph not found — nothing changed."
ps = ps.replace(platform_line, "")
page.write_text(ps)
print("Edit 1 OK  -> removed redundant hero subhead paragraph (app/page.tsx)")

# ── Edit 2: remove the duplicate GSAP hero-entrance timeline ─────────────
gsapf = pathlib.Path("app/components/GSAPAnimations.tsx")
gs = gsapf.read_text()

hero_tl = """      // ── Hero entrance — cinematic stagger ──
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .fromTo('.hero h1',
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.cta-group',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo('.dashboard-video-wrap',
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
          '-=0.3'
        )

"""
replacement = "      // Hero entrance is handled by CSS (.hero-animate*) — GSAP duplicate removed to stop double-animation\n\n"
assert hero_tl in gs, "Edit 2 FAILED: GSAP hero timeline block not found — nothing changed."
gs = gs.replace(hero_tl, replacement)
gsapf.write_text(gs)
print("Edit 2 OK  -> removed duplicate GSAP hero timeline (app/components/GSAPAnimations.tsx)")

print("\nBoth edits applied. Next: npm run build")
