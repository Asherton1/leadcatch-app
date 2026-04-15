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
    return f'{TOP}<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">Hi there,</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{intro}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{problem}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{value}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:24px">I built ReCapture to fix this. One script tag per location — 60 seconds to install. Every person who starts your form is captured in real time, even if they never hit submit. Enterprise dashboard across all your locations.</p>{CTA}<p style="font-size:14px;line-height:1.7;color:#888;margin-bottom:20px">{links}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:4px">Happy to walk you through it.</p>{SIG}'

DERM = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with dermatology practices and multi-location medical groups.","Between 60-70% of people who start an appointment request or new patient form never finish it. They type their name, their concern, maybe insurance — then they close the tab. Nobody shows you those people.","For dermatology and cosmetic practices, each new patient represents $1,500-3,000+ in lifetime value. Across 20 locations, those invisible abandoned forms add up to millions in lost revenue per year.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your network</a>.')

WELLNESS = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with multi-location wellness and healthcare businesses across DFW.","Between 60-70% of people who start a booking or membership form never finish it. They type their name, pick a service — then they close the tab. Nobody shows you those people.","Each new client represents $500-5,000+ in lifetime value depending on the service. Across your locations, those invisible abandoned forms represent massive lost revenue.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your network</a>.')

HAIR = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with specialty medical practices where every consultation matters.","Between 60-70% of people who start a hair transplant consultation form never finish it. They research for months, finally start the form — then they hesitate and close the tab. Nobody shows you those people.","Hair transplant procedures average $8,000-15,000+. If even 2 of those invisible leads had completed their inquiry last month, that is $16,000-30,000 your practice never saw.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your practice</a>.')

DENTAL = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with dental practices across DFW where every new patient matters.","65% of people who start an appointment or new patient form never finish it. They type their name, maybe insurance info — then they close the tab. Nobody shows you those people.","A single new patient is worth $1,900 over their lifetime. For cosmetic cases like veneers and implants, that number jumps to $5,000-15,000. Every abandoned form is real revenue walking away.",'<a href="https://www.userecapture.com/for-dental" style="color:#ff6b35;text-decoration:none">See how it works for dental</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

MEDSPA = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and high-ticket wellness businesses across DFW.","Between 60-70% of people who start a consultation or booking form never finish it. They type their name, email, maybe their phone — then they get distracted and close the tab. Nobody shows you those people.","For med spas and wellness clinics, the average client is worth $2,800+. Across multiple locations, those invisible leads add up to six figures in lost revenue every year.",'<a href="https://www.userecapture.com/for-med-spas" style="color:#ff6b35;text-decoration:none">See how it works for med spas</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

URGENT = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with multi-location healthcare businesses across DFW.","Between 60-70% of people who start an online check-in or appointment form never finish it. They type their name, their symptoms — then they close the tab and walk into the competitor down the street.","Across 30+ DFW locations, even a small recovery rate on those invisible form starts represents thousands of additional patients per year.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your network</a>.')

VET = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with multi-location healthcare businesses across DFW.","Between 60-70% of people who start a new patient registration or appointment form never finish it. They type their pet's name, their concern — then they close the tab. Nobody shows you those people.","Each new client represents $2,000-5,000+ in lifetime value. Across 90+ locations, those invisible abandoned forms add up to millions in lost revenue per year.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate for your network</a>.')

contacts = [
    # Dermatology — enterprise
    ("appointments@westlakedermatology.com", "ReCapture x Westlake Derm — recovering invisible patient leads across 20 Texas locations", DERM),
    # Hair Restoration — $8K-15K per procedure
    ("info@bosley.com", "ReCapture x Bosley — every abandoned consultation is $8,000-15,000 walking away", HAIR),
    ("info@maximhairrestoration.com", "every abandoned hair transplant consultation is $8,000-15,000 walking away", HAIR),
    ("info@advancedhairtx.com", "every abandoned hair transplant consultation is $8,000-15,000 walking away", HAIR),
    # IV Therapy & Wellness — multi-location chains
    ("info@hydrateivbar.com", "ReCapture x Hydrate IV Bar — recovering invisible booking leads across DFW locations", WELLNESS),
    ("hello@thrivedripspa.com", "ReCapture x ThrIVe — recovering invisible booking leads across Texas locations", WELLNESS),
    ("info@primeivhydration.com", "ReCapture x Prime IV — recovering invisible membership leads across DFW", WELLNESS),
    ("info@ivnutrition.com", "67% of your booking forms are losing clients", WELLNESS),
    # Urgent Care — massive chains with DFW presence
    ("info@carenow.com", "ReCapture x CareNow — recovering invisible patient check-ins across 30+ DFW locations", URGENT),
    ("feedback@texashealth.org", "ReCapture x Texas Health Breeze — recovering invisible patient leads across 10+ DFW locations", URGENT),
    # Vet — national chains with DFW
    ("info@goodvets.com", "ReCapture x GoodVets — recovering invisible new patient leads across 90+ locations", VET),
    ("hello@modernanimal.com", "67% of your new patient forms are losing clients", VET),
    # Medspa — owner operated premium
    ("info@bellamedspallas.com", "67% of your consultation leads are invisible", MEDSPA),
    ("info@wellmedspallas.com", "67% of your consultation leads are invisible", MEDSPA),
    ("info@elevatemedicalspa.com", "67% of your consultation leads are invisible", MEDSPA),
    # Dental — premium Southlake/Colleyville corridor
    ("info@huckabeedental.com", "65% of your new patient forms go unfinished — across 1,600+ happy patients", DENTAL),
    ("info@masondental.com", "65% of your new patient forms go unfinished", DENTAL),
    ("info@100dental.com", "65% of your new patient forms go unfinished", DENTAL),
    ("info@davincidentistry.com", "65% of your new patient forms go unfinished", DENTAL),
    # Medspa — Dallas area premium
    ("info@relivehealth.com", "ReCapture x Relive Health — recovering invisible leads across your locations", WELLNESS),
    ("info@wellabsmedspa.com", "67% of your consultation leads are invisible", MEDSPA),
    ("info@dallasdermpartners.com", "67% of your patient intake forms are losing leads", DERM),
    ("info@dallascenterdermatology.com", "67% of your patient intake forms are losing leads", DERM),
    ("info@dallasdermaesthetics.com", "67% of your new patient forms are losing leads", DERM),
    ("info@gameday.co", "67% of your consultation leads are invisible — across your DFW locations", WELLNESS),
]

print(f"Starting WAVE 6 — {len(contacts)} emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 6 complete.")
