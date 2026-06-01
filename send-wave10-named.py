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
        print(f"SENT: {to}  -  {subject}")
    else:
        print(f"FAILED: {to}  -  {r.stdout}")
    time.sleep(2)

# Locked outreach signature
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

PS = (
    '<p style="font-size:13px;line-height:1.7;color:#777;margin:24px 0 0;font-style:italic">'
    'P.S. If marketing or operations isn\'t your call, would you mind forwarding this to whoever handles it? Appreciate it.'
    '</p>'
)

CTA = (
    '<div style="text-align:center;margin:28px 0">'
    '<a href="https://www.userecapture.com/calculator" style="display:inline-block;background:#ff6b35;color:#fff;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px">See What You Are Missing</a>'
    '</div>'
)

TOP = (
    '<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#ccc;padding:36px 32px;border-radius:10px">'
    '<div style="margin-bottom:28px">'
    '<span style="font-size:18px;font-weight:700;color:#fff">Re</span>'
    '<span style="font-size:18px;font-weight:700;color:#ff6b35">Capture</span>'
    '</div>'
)

def email(salutation, intro, pain, value, links_html):
    return (
        TOP +
        f'<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{salutation}</p>'
        f'<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{intro}</p>'
        f'<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{pain}</p>'
        f'<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{value}</p>'
        '<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:24px">'
        'I built ReCapture to fix this. One script tag &mdash; 60 seconds to install. Every person who starts your form is captured in real time, even if they never hit submit.'
        '</p>'
        + CTA +
        f'<p style="font-size:14px;line-height:1.7;color:#888;margin-bottom:20px">{links_html}</p>'
        '<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:4px">Happy to walk you through it.</p>'
        + PS
        + SIG
    )

# ─── Email bodies ─────────────────────────────────────────────────────────────

AVC = email(
    salutation="Hi Dr. Smith,",
    intro="I am Ash &mdash; I run a digital marketing consultancy in the Harwood District in Dallas, and I built ReCapture for high-ticket service practices.",
    pain="Roughly 64-68% of people who start a LASIK consultation form never finish it. They type their name and procedure interest, then they close the tab and you never knew they were there.",
    value="Each LASIK candidate is worth $4,000-$6,000. Recovering even one or two consultations a month pays for the tool many times over.",
    links_html='<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate</a> or <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">see how it works</a>.'
)

CARTER = email(
    salutation="Hi Dr. Carter,",
    intro="I am Ash &mdash; I run a digital marketing consultancy in the Harwood District in Dallas, and I built ReCapture for high-ticket service practices.",
    pain="Roughly 64-68% of people who start a LASIK consultation form never finish it. They type their name and procedure interest, then they close the tab and you never knew they were there.",
    value="Each LASIK candidate is worth $4,000-$6,000. Recovering even one or two consultations a month pays for the tool many times over.",
    links_html='<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate</a> or <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">see how it works</a>.'
)

VILLAGE = email(
    salutation="Hi Michael,",
    intro="I am Ash &mdash; I run a digital marketing consultancy in the Harwood District in Dallas, and I built ReCapture for high-ticket service practices.",
    pain="65% of people who start a new-patient or appointment form at a dental practice never finish it. They type their name and what they're coming in for, then they close the tab and you never knew.",
    value="The average new patient is worth $1,900 over the first year. Even a handful of recovered patients a month is real money your practice never sees.",
    links_html='<a href="https://www.userecapture.com/for-dental" style="color:#ff6b35;text-decoration:none">See how it works for dental</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.'
)

DRIPBAR = email(
    salutation="Hi Kishore,",
    intro="I am Ash &mdash; I run a digital marketing consultancy in the Harwood District in Dallas, and I built ReCapture for IV wellness and high-ticket service practices.",
    pain="60% of people who start a consultation or booking form never finish it. They type their name and the service they want, then they close the tab and you never knew.",
    value="Even one recovered IV package or recurring client a month is more than the tool costs. Across a year it adds up to real revenue your team never saw.",
    links_html='<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate</a> or <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">see how it works</a>.'
)

# ─── Recipients ───────────────────────────────────────────────────────────────

contacts = [
    ("drsmith@avceyes.com",                          "64% of LASIK consultation forms never get submitted",          AVC),
    ("hcarter@cartereyecenter.com",                  "Every abandoned LASIK consultation is a $4-6K patient walking away",  CARTER),
    ("michael.hardcastle@villagedentaldallas.com",   "65% of new-patient forms never get submitted",                VILLAGE),
    ("kishore.rollakanti@thedripbar.com",            "60% of IV consultation forms never get submitted",            DRIPBAR),
]

print(f"WAVE 10 NAMED — {len(contacts)} verified emails")
print("=" * 50)
for to, subj, _ in contacts:
    print(f"  {to}  |  {subj}")
print("=" * 50)
print("Sending in 5 seconds. Ctrl+C to cancel.")
time.sleep(5)
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Done.")
