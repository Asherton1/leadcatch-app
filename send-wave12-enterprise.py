import subprocess, json, time, sys

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
    '<p style="margin:8px 0 0;font-size:13px;color:#666">(888) 606-0630 \u2014 Concierge line</p>'
    '<p style="margin:2px 0 0;font-size:13px"><a href="mailto:hello@userecapture.com" style="color:#ff6b35;text-decoration:none">hello@userecapture.com</a></p>'
    '<p style="margin:2px 0 0;font-size:13px"><a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">www.userecapture.com</a></p>'
    '</div></div>'
)

def PS(company):
    return (
        f'<p style="font-size:13px;line-height:1.7;color:#777;margin:24px 0 0;font-style:italic">'
        f"P.S. If this isn't a fit for {company} right now, or you'd rather route to someone else on your team, happy to redirect \u2014 just reply."
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

# ─── Intro selector (Texas flavor for TX-HQ'd, Dallas-specific for Dallas) ──

def get_intro(hq_city_state, vertical):
    base = "form abandonment recovery layer purpose-built for"
    biz = "multi-location dental groups" if vertical == "dental" else "multi-location aesthetic and wellness chains"
    if "Dallas" in hq_city_state:
        return f"I'm Ash, founder of ReCapture. I'm building this from Dallas, just down the road from your HQ \u2014 a {base} {biz}."
    elif " TX" in hq_city_state or hq_city_state.endswith("TX"):
        return f"I'm Ash \u2014 a fellow Texas-based founder building ReCapture, a {base} {biz}."
    else:
        return f"I'm Ash, founder of ReCapture. We're a {base} {biz}."

# ─── Dental DSO templates ────────────────────────────────────────────────────

def dental_marketing(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"The math at {company}'s scale: roughly 60-65% of new-patient form starts never complete. Each one is a $1,900+ patient walking away, and they're invisible in your existing analytics because they never hit submit."
    ) + P(
        f"ReCapture captures them at first keystroke, scores by intent, and triggers a branded recovery email or SMS within 60 seconds. One script tag installs across every site. HIPAA-ready with BAA available."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works for dental") + PS(company) + SIG

def dental_ops(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"We give multi-location dental operations teams visibility on the form leads that vanish before submitting \u2014 the ones that don't appear in your PMS, your CRM, or your reports because they never finished."
    ) + P(
        f"For {company}: roughly 60-65% of new-patient form starts likely abandon before submit. ReCapture catches them at first keystroke and routes them back to your existing flow, with location-tagged dashboards across your network."
    ) + P(
        f"One install, every site, no PMS changes. HIPAA-ready with BAA available."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works") + PS(company) + SIG

def dental_pipeline(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"We surface the form leads your team never sees \u2014 the 60-65% who start a new-patient form, type their name and what they're coming in for, then bounce before submitting."
    ) + P(
        f"For {company}, each recovered patient is roughly $1,900 in first-year value. Across your locations, that's real pipeline you're paying ads to drive but never get to convert."
    ) + P(
        f"ReCapture captures them at first keystroke, scores by intent, and feeds them into your existing systems for follow-up."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-dental", "See how it works") + PS(company) + SIG

def dental_exec(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"I'll be direct: at {company}'s scale, roughly 60-65% of new-patient form starts never complete. Those leads don't exist in your reports because they bounce before submitting. We catch them at first keystroke and route them back to your existing flow, automated and branded."
    ) + P(
        f"Single install across all locations. HIPAA-ready."
    ) + P(
        f"If form abandonment isn't a problem you're actively solving, ignore this \u2014 but I figured the 60% number was worth your 10 minutes."
    ) + CTA("/for-dental", "See how it works") + PS(company) + SIG

# ─── Med spa templates ───────────────────────────────────────────────────────

def medspa_marketing(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"The math at {company}'s scale: roughly 60-67% of consultation-form visitors never submit. They type their name and the treatment they want, then bounce. You're paying ads to drive that traffic and never get to see them."
    ) + P(
        f"ReCapture catches them at first keystroke, scores by intent, and triggers a branded recovery within 60 seconds. One install, every location, centralized dashboard for HQ."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-med-spas", "See how it works for med spas") + PS(company) + SIG

def medspa_ops(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"We give multi-location aesthetic operations teams visibility on the form leads that bounce before submitting \u2014 the ones who never appear in your booking system because they never finished."
    ) + P(
        f"For {company}: roughly 60-67% of consultation-form starts likely abandon before submit. ReCapture catches them at first keystroke and routes them back to your existing flow, with location-tagged dashboards across the chain."
    ) + P(
        f"One install. Every site. Built for chains."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-med-spas", "See how it works") + PS(company) + SIG

def medspa_pipeline(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"We surface the form leads your team never sees \u2014 the 60-67% who start a consultation form, type their name and treatment interest, then bounce before submitting."
    ) + P(
        f"For {company}, each recovered client is worth multiple thousands in first-visit and recurring value."
    ) + P("Worth a 10-minute look next week?") + CTA("/for-med-spas", "See how it works") + PS(company) + SIG

def medspa_exec(first, company, intro):
    return TOP + P(f"Hi {first},") + P(intro) + P(
        f"I'll be direct: at {company}'s scale, roughly 60-67% of consultation-form starts never complete. They type their name and the treatment they want, then bounce \u2014 invisible in your reports."
    ) + P(
        f"We catch them at first keystroke and route them back to your existing flow, automated and branded. Single install, every location."
    ) + P(
        f"If form abandonment isn't a problem you're actively solving, ignore this \u2014 but the 60-67% number tends to be worth 10 minutes."
    ) + CTA("/for-med-spas", "See how it works") + PS(company) + SIG

# ─── Subject lines (REAL em-dash, not HTML entity) ───────────────────────────

def subject(vertical, role, company):
    if vertical == "dental":
        if role == "marketing":
            return f"60% of {company}'s new-patient forms never submit"
        if role == "ops":
            return f"Visibility on the form leads {company} can't see"
        if role == "pipeline":
            return f"Pipeline you can't see \u2014 {company}'s invisible form leads"
        if role == "exec":
            return f"{company}: the 60% of patient forms you never see"
    if vertical == "medspa":
        if role == "marketing":
            return f"60% of {company}'s consultation forms never submit"
        if role == "ops":
            return f"Visibility on the form leads {company} can't see"
        if role == "pipeline":
            return f"Pipeline you can't see \u2014 {company}'s invisible inquiries"
        if role == "exec":
            return f"{company}: the 60% of consultations you never see"
    return f"Quick question about {company}"

# ─── Recipients (29 verified) ───────────────────────────────────────────────
# (email, first, company, hq_city_state, vertical, role)

contacts = [
    # ── Dental DSOs ──
    ("laura.spawn@aspendental.com",                "Laura",    "Aspen Dental",                  "East Syracuse NY", "dental", "ops"),
    ("sroble@heartland.com",                       "Sharon",   "Heartland Dental",              "Effingham IL",     "dental", "ops"),
    ("krogers@heartland.com",                      "Kelsey",   "Heartland Dental",              "Effingham IL",     "dental", "ops"),
    ("klombardo@clearchoice.com",                  "Kym",      "ClearChoice",                   "Englewood CO",     "dental", "marketing"),
    ("kmundson@clearchoice.com",                   "Kimberly", "ClearChoice",                   "Englewood CO",     "dental", "ops"),
    ("alfredo.allende@smilebrands.com",            "Alfredo",  "Smile Brands",                  "Irvine CA",        "dental", "ops"),
    ("julie.nitsche@smilebrands.com",              "Julie",    "Smile Brands",                  "Irvine CA",        "dental", "exec"),
    ("lbaize@specialty1partners.com",              "Landon",   "Specialty1 Partners",           "Houston TX",       "dental", "marketing"),
    ("jclute@specialty1partners.com",              "Jason",    "Specialty1 Partners",           "Houston TX",       "dental", "ops"),
    ("kjatindarya@beaconoralspecialists.com",      "Kapil",    "Beacon Oral Specialists",       "Dallas TX",        "dental", "pipeline"),
    ("bmays@beaconoralspecialists.com",            "Bruce",    "Beacon Oral Specialists",       "Dallas TX",        "dental", "ops"),
    ("ngardner@risasdental.com",                   "Nick",     "Risas Dental",                  "Phoenix AZ",       "dental", "ops"),
    ("krodriguez@mysagedental.com",                "Kayla",    "Sage Dental",                   "Boca Raton FL",    "dental", "marketing"),
    ("mhintzke@mysagedental.com",                  "Melissa",  "Sage Dental",                   "Boca Raton FL",    "dental", "ops"),
    # ── Med spa chains ──
    ("tyler.mabery@laseraway.com",                 "Tyler",    "LaserAway",                     "Beverly Hills CA", "medspa", "marketing"),
    ("miguelr@laseraway.com",                      "Miguel",   "LaserAway",                     "Beverly Hills CA", "medspa", "ops"),
    ("rshay@restore.com",                          "Rachel",   "RestoreHyper Wellness",         "Austin TX",        "medspa", "marketing"),
    ("mronay@restore.com",                         "Mandy",    "RestoreHyper Wellness",         "Austin TX",        "medspa", "ops"),
    ("arno@sevlaser.com",                          "Arno",     "SEV Laser",                     "Los Angeles CA",   "medspa", "marketing"),
    ("sevana@sevlaser.com",                        "Sevana",   "SEV Laser",                     "Los Angeles CA",   "medspa", "exec"),
    ("chris.carey@skinlaundry.com",                "Chris",    "Skin Laundry",                  "Los Angeles CA",   "medspa", "exec"),
    ("cmuniz@skinlaundry.com",                     "Christopher", "Skin Laundry",               "Los Angeles CA",   "medspa", "ops"),
    ("mnguyen@skinlaundry.com",                    "Mimi",     "Skin Laundry",                  "Los Angeles CA",   "medspa", "marketing"),
    ("fsmith@handandstone.com",                    "Fatima",   "Hand & Stone",                  "Trevose PA",       "medspa", "ops"),
    ("sevans@massageheights.com",                  "Shane",    "Massage Heights",               "San Antonio TX",   "medspa", "exec"),
    ("marie.martinez@icryo.com",                   "Marie",    "iCRYO",                         "Houston TX",       "medspa", "marketing"),
    ("jim.ginger@icryo.com",                       "Jim",      "iCRYO",                         "Houston TX",       "medspa", "exec"),
    ("adworak@elase.com",                          "Ariel",    "Elase Medspa",                  "Salt Lake City UT","medspa", "marketing"),
    ("shu@elase.com",                              "Stephanie","Elase Medspa",                  "Salt Lake City UT","medspa", "exec"),
]

def build(first, company, intro, vertical, role):
    fn = {
        ("dental", "marketing"): dental_marketing,
        ("dental", "ops"):       dental_ops,
        ("dental", "pipeline"):  dental_pipeline,
        ("dental", "exec"):      dental_exec,
        ("medspa", "marketing"): medspa_marketing,
        ("medspa", "ops"):       medspa_ops,
        ("medspa", "pipeline"):  medspa_pipeline,
        ("medspa", "exec"):      medspa_exec,
    }[(vertical, role)]
    return fn(first, company, intro)

print("=" * 70)
print(f"WAVE 12 ENTERPRISE \u2014 {len(contacts)} verified named contacts")
print("=" * 70)
tx_count = sum(1 for c in contacts if "TX" in c[3])
print(f"Texas-HQ'd companies getting TX-flavored intro: {tx_count} contacts")
print("=" * 70)
for to, first, company, hq, vertical, role in contacts:
    flag = "  [TX]" if "TX" in hq else ""
    print(f"  {to:48}  |  {role:9}  |  {company}{flag}")
print("=" * 70)
print()
print("To send: type SEND and press Enter.  Anything else aborts.")
print()
confirm = input("Confirm: ").strip()
if confirm != "SEND":
    print("Aborted. Nothing sent.")
    sys.exit(0)

print("=" * 70)
for to, first, company, hq, vertical, role in contacts:
    intro = get_intro(hq, vertical)
    html = build(first, company, intro, vertical, role)
    subj = subject(vertical, role, company)
    send(to, subj, html)
print("=" * 70)
print("Done.")
