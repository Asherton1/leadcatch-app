import subprocess, json, time

API_KEY = "re_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN"

def send(to, subject, html):
    body = json.dumps({
        "from": "Ash from ReCapture <hello@userecapture.com>",
        "to": to,
        "reply_to": "hello@userecapture.com",
        "subject": subject,
        "html": html,
        "headers": {
            "List-Unsubscribe": "<https://www.userecapture.com/api/unsubscribe>, <mailto:hello@userecapture.com?subject=unsubscribe>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
        }
    })
    r = subprocess.run([
        "curl", "-s", "-X", "POST", "https://api.resend.com/emails",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", body
    ], capture_output=True, text=True)
    if '"id"' in r.stdout:
        print(f"SENT: {to}")
    else:
        print(f"FAILED: {to}  -  {r.stdout}")
    time.sleep(2)

SIG = (
    '<div style="margin-top:28px;padding-top:20px;border-top:1px solid #1e1e1e">'
    '<p style="margin:0;font-size:14px;font-weight:600;color:#fff">Asherton Chraibi</p>'
    '<p style="margin:2px 0 0;font-size:13px;color:#888">Founder, ReCapture</p>'
    '<p style="margin:2px 0 0;font-size:13px;color:#888">Recovering the leads your forms are losing.</p>'
    '<p style="margin:8px 0 0;font-size:13px;color:#666">(888) 606-0630 &mdash; Concierge line</p>'
    '<p style="margin:2px 0 0;font-size:13px"><a href="mailto:hello@userecapture.com" style="color:#ff6b35;text-decoration:none">hello@userecapture.com</a></p>'
    '<p style="margin:2px 0 0;font-size:13px"><a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">www.userecapture.com</a></p>'
    '</div></div>'
)

def PS(company):
    return (
        f'<p style="font-size:13px;line-height:1.7;color:#777;margin:24px 0 0;font-style:italic">'
        f'P.S. If this isn\'t a fit for {company} right now, or you\'d rather route to someone else on your team, happy to redirect &mdash; just reply.'
        f'</p>'
    )

def CTA(href, label):
    return (
        f'<div style="text-align:center;margin:28px 0">'
        f'<a href="https://www.userecapture.com{href}" style="display:inline-block;background:#ff6b35;color:#fff;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px">{label}</a>'
        f'</div>'
    )

TOP = (
    '<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#ccc;padding:36px 32px;border-radius:10px">'
    '<div style="margin-bottom:28px">'
    '<span style="font-size:18px;font-weight:700;color:#fff">Re</span>'
    '<span style="font-size:18px;font-weight:700;color:#ff6b35">Capture</span>'
    '</div>'
)

def P(text):
    return f'<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{text}</p>'

# ─── Dental DSO templates ────────────────────────────────────────────────────

def dental_marketing(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We're a form abandonment recovery layer purpose-built for multi-location dental groups &mdash; we capture the leads your forms lose, across every practice, in one dashboard."
    ) + P(
        f"The math at {company}'s scale: roughly 60-65% of new-patient form starts never complete. Each one is a $1,900+ patient walking away, and they're invisible in your existing analytics because they never hit submit."
    ) + P(
        f"ReCapture captures them at first keystroke, scores by intent, and triggers a branded recovery email or SMS within 60 seconds. One script tag installs across every site. HIPAA-ready with BAA available for groups that need it."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works for dental") + PS(company) + SIG

def dental_ops(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We give multi-location dental operations teams visibility on the form leads that vanish before submitting &mdash; the ones that don't appear in your PMS, your CRM, or your reports because they never finished."
    ) + P(
        f"For {company}: roughly 60-65% of new-patient form starts likely abandon before submit. ReCapture catches them at first keystroke and routes them back to your existing flow, with location-tagged dashboards across your network."
    ) + P(
        f"One install, every site, no PMS changes. HIPAA-ready with BAA available."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works") + PS(company) + SIG

def dental_pipeline(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We surface the form leads your team never sees &mdash; the 60-65% who start a new-patient form, type their name and what they're coming in for, then bounce before submitting."
    ) + P(
        f"For {company}, each recovered patient is roughly $1,900 in first-year value. Across your locations, that's real pipeline you're paying ads to drive but never get to convert."
    ) + P(
        f"ReCapture captures them at first keystroke, scores by intent, and feeds them into your existing systems for follow-up."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works") + PS(company) + SIG

# ─── Med spa templates ───────────────────────────────────────────────────────

def medspa_marketing(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We're a form abandonment recovery layer purpose-built for multi-location aesthetic and wellness chains &mdash; we capture the leads your booking and consultation forms lose, across every location, in one dashboard."
    ) + P(
        f"The math at {company}'s scale: roughly 60-67% of consultation-form visitors never submit. They type their name and the treatment they want, then bounce. You're paying ads to drive that traffic and never get to see them."
    ) + P(
        f"ReCapture catches them at first keystroke, scores by intent, and triggers a branded recovery within 60 seconds. One install, every location, centralized dashboard for HQ."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-med-spas", "See how it works for med spas") + PS(company) + SIG

def medspa_ops(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We give multi-location aesthetic operations teams visibility on the form leads that bounce before submitting &mdash; the ones who never appear in your booking system because they never finished."
    ) + P(
        f"For {company}: roughly 60-67% of consultation-form starts likely abandon before submit. ReCapture catches them at first keystroke and routes them back to your existing flow, with location-tagged dashboards across the chain."
    ) + P(
        f"One install. Every site. Built for chains."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-med-spas", "See how it works") + PS(company) + SIG

def medspa_pipeline(first, company):
    return TOP + P(f"Hi {first},") + P(
        f"I'm Ash, founder of ReCapture. We surface the form leads your team never sees &mdash; the 60-67% who start a consultation form, type their name and treatment interest, then bounce before submitting."
    ) + P(
        f"For {company}, each recovered client is worth multiple thousands in first-visit and recurring value. ReCapture catches them at first keystroke, scores by intent, and routes high-intent abandonments to your team for instant follow-up."
    ) + P(
        f"Worth a 10-minute look next week?"
    ) + CTA("/for-med-spas", "See how it works") + PS(company) + SIG

# ─── Subject lines ───────────────────────────────────────────────────────────

def subject(vertical, role, company):
    if vertical == "dental":
        if role == "marketing":
            return f"60% of {company}'s new-patient forms never submit"
        if role == "ops":
            return f"Visibility on the form leads {company} can't see"
        if role == "pipeline":
            return f"Pipeline you can't see &mdash; {company}'s invisible form leads"
    if vertical == "medspa":
        if role == "marketing":
            return f"60% of {company}'s consultation forms never submit"
        if role == "ops":
            return f"Visibility on the form leads {company} can't see"
        if role == "pipeline":
            return f"Pipeline you can't see &mdash; {company}'s invisible inquiries"
    return f"Quick question about {company}"

# ─── Recipients ──────────────────────────────────────────────────────────────
# (email, first_name, company, vertical, role)

contacts = [
    # Dental DSOs
    ("cmalen@mb2dental.com",                       "Chris",    "MB2 Dental",                       "dental", "pipeline"),
    ("tjones@mb2dental.com",                       "Teresa",   "MB2 Dental",                       "dental", "ops"),
    ("jon.kaufman@smiledoctors.com",               "Jonathan", "Smile Doctors",                    "dental", "marketing"),
    ("jordan.martin@smiledoctors.com",             "Jordan",   "Smile Doctors",                    "dental", "marketing"),
    ("megan.chicatelli@affordablecare.com",        "Megan",    "Affordable Care",                  "dental", "marketing"),
    ("karol.twilla@affordablecare.com",            "Karol",    "Affordable Care",                  "dental", "ops"),
    ("stackk@nadentalgroup.com",                   "Kelly",    "North American Dental Group",      "dental", "marketing"),
    ("loebm@nadentalgroup.com",                    "Mary",     "North American Dental Group",      "dental", "ops"),
    # Med spa
    ("kelly.anderson@viomedspa.com",               "Kelly",    "VIO Med Spa",                      "medspa", "marketing"),
    ("jczeisler@skinspirit.com",                   "Jen",      "SkinSpirit",                       "medspa", "marketing"),
    ("kyugoff@skinspirit.com",                     "Karena",   "SkinSpirit",                       "medspa", "ops"),
    ("deborah.mcginn@idealimage.com",              "Deborah",  "Ideal Image",                      "medspa", "marketing"),
    ("gary.courtney@idealimage.com",               "Gary",     "Ideal Image",                      "medspa", "pipeline"),
]

def build(first, company, vertical, role):
    fn = {
        ("dental", "marketing"): dental_marketing,
        ("dental", "ops"):       dental_ops,
        ("dental", "pipeline"):  dental_pipeline,
        ("medspa", "marketing"): medspa_marketing,
        ("medspa", "ops"):       medspa_ops,
        ("medspa", "pipeline"):  medspa_pipeline,
    }[(vertical, role)]
    return fn(first, company)

print(f"WAVE 11 ENTERPRISE — {len(contacts)} verified named contacts")
print("=" * 60)
for to, first, company, vertical, role in contacts:
    print(f"  {to:42}  |  {role:9}  |  {company}")
print("=" * 60)
print("Sending in 6 seconds. Ctrl+C to cancel.")
time.sleep(6)
print("=" * 60)
for to, first, company, vertical, role in contacts:
    html = build(first, company, vertical, role)
    subj = subject(vertical, role, company)
    send(to, subj, html)
print("=" * 60)
print("Done.")
