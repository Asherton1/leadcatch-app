import subprocess, json, time

API_KEY = "re_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN"

def send(to, subject, html):
    body = json.dumps({"from":"Ash from ReCapture <hello@userecapture.com>","to":to,"reply_to":"asherton.c@me.com","subject":subject,"html":html})
    r = subprocess.run(["curl","-s","-X","POST","https://api.resend.com/emails","-H",f"Authorization: Bearer {API_KEY}","-H","Content-Type: application/json","-d",body], capture_output=True, text=True)
    if '"id"' in r.stdout:
        print(f"SENT: {to} — {subject}")
    else:
        print(f"FAILED: {to} — {r.stdout}")
    time.sleep(2)

SIG = '<div style="margin-top:28px;padding-top:20px;border-top:1px solid #1e1e1e"><p style="margin:0;font-size:14px;font-weight:600;color:#fff">Asherton Chraibi</p><p style="margin:2px 0 0;font-size:13px;color:#666">Founder, ReCapture</p><p style="margin:2px 0 0;font-size:13px;color:#666">Dallas, TX</p><p style="margin:4px 0 0;font-size:13px"><a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">userecapture.com</a></p></div></div>'
CTA = '<div style="text-align:center;margin:28px 0"><a href="https://www.userecapture.com/test-form" style="display:inline-block;background:#ff6b35;color:#fff;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px">See It in Action</a></div>'
TOP = '<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#ccc;padding:36px 32px;border-radius:10px"><div style="margin-bottom:28px"><span style="font-size:18px;font-weight:700;color:#fff">Re</span><span style="font-size:18px;font-weight:700;color:#ff6b35">Capture</span></div>'

def email(intro, problem, value, links):
    return f'{TOP}<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">Hi there,</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{intro}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{problem}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{value}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:24px">I built ReCapture to fix this. One script tag — 60 seconds to install. Every person who starts your form is captured in real time, even if they never hit submit.</p>{CTA}<p style="font-size:14px;line-height:1.7;color:#888;margin-bottom:20px">{links}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:4px">Happy to walk you through it.</p>{SIG}'

LAW = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with law firms across DFW that spend heavily on Google Ads to drive case inquiries.","Here is the problem — between 60-70% of people who start a free consultation form never finish it. They type their name, describe their accident — then they hesitate and close the tab. That lead goes to the next firm on Google.","For personal injury firms, every lost consultation form is a $5,000-50,000+ case walking out the door. At $50-200 per click on Google Ads, you are paying to bring people to your site and then watching them disappear.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate to see how much your forms are costing you</a>.')

BUILDER = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury home builders and real estate developers across DFW.","Between 60-70% of people who start a contact form, floor plan request, or community inquiry never finish it. They type their name, the community they want — then they close the tab. Nobody shows you those people.","For luxury builders, every abandoned inquiry could be a $500,000-2,000,000+ home sale. If even 1 of those invisible leads had come through last month, it changes your quarter.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your communities</a>.')

SENIOR = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with senior living operators and multi-community healthcare businesses.","Between 60-70% of people who start a tour request or inquiry form never finish it. Families research for weeks before finally filling out that form — then they hesitate and close the tab. Nobody shows you those people.","For senior living, every new resident represents $48,000-96,000+ in annual revenue. Across multiple communities, those invisible abandoned forms represent millions in lost occupancy revenue.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your communities</a>.')

contacts = [
    # Law Firms — highest ad spend, highest per-lead value
    ("info@tatelawoffices.com", "you are paying $50-200 per click — and 67% of those leads never submit your form", LAW),
    ("info@maafirm.com", "ReCapture x Anderson Injury — every abandoned consultation is a $5,000-50,000 case walking away", LAW),
    ("info@mullenandmullen.com", "you are paying $50-200 per click — and 67% of those leads never submit your form", LAW),
    ("info@dfwinjurylawyers.com", "every abandoned consultation form is a $5,000-50,000 case walking to the next firm", LAW),
    ("info@witheritelaw.com", "ReCapture x Witherite — every abandoned consultation across DFW, Atlanta, and Chicago is $5K-50K walking away", LAW),
    ("info@grossmanlaw.com", "every abandoned consultation form is a $5,000-50,000 case walking away", LAW),
    ("info@vs-law.com", "ReCapture x Varghese Summersett — recovering invisible consultation leads across 4 offices", LAW),
    ("info@nolanryanlaw.com", "every abandoned free consultation form is a $5,000-50,000 case walking away", LAW),
    # Luxury Home Builders — $500K-2M per lead
    ("info@highlandhomes.com", "ReCapture x Highland Homes — every abandoned floor plan request is a $400K+ home sale walking away", BUILDER),
    ("info@tollbrothers.com", "ReCapture x Toll Brothers — every abandoned community inquiry is a $500K-2M home sale walking away", BUILDER),
    ("info@riversidehomebuilders.com", "every abandoned community inquiry is a home sale walking away", BUILDER),
    ("info@shaddockhomes.com", "every abandoned floor plan request is a $400K+ home sale walking away", BUILDER),
    ("info@southgatehomes.com", "every abandoned community inquiry is a $500K+ home sale walking away", BUILDER),
    ("info@normandyhomes.com", "every abandoned floor plan request is a $400K+ home sale walking away", BUILDER),
    ("info@megatel.com", "ReCapture x Megatel — every abandoned community inquiry across DFW is a home sale walking away", BUILDER),
    # Senior Living — $48K-96K annual per resident
    ("info@civitasseniorliving.com", "ReCapture x Civitas — every abandoned tour request is $48,000-96,000 in annual revenue walking away", SENIOR),
    ("info@seniorlivingspecialists.com", "every abandoned inquiry form is $48,000-96,000 in annual revenue walking away", SENIOR),
    ("info@edgemere.com", "every abandoned tour request is $48,000-96,000 in annual revenue walking away", SENIOR),
    # Bonus — premium DFW businesses from Places search
    ("info@newleafcustomhomes.com", "every abandoned inquiry is a $1M+ custom home walking away", BUILDER),
    ("info@platinumserieshomes.com", "every abandoned inquiry is a multi-million dollar custom home walking away", BUILDER),
]

print(f"Starting WAVE 7 — {len(contacts)} emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 7 complete.")
