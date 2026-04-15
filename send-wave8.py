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

LAW = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with law firms across DFW that invest heavily in Google Ads.","Here is the problem — between 60-70% of people who start a free consultation form never finish it. They type their name, describe their case — then they hesitate and close the tab. That lead goes to the next firm on Google.","For law firms spending $50-200 per click, every lost form is a $5,000-50,000+ case walking out the door. ReCapture shows you every person who started your form, even if they never submitted.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate</a>.')

SURGERY = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with plastic surgery and cosmetic practices across DFW.","72% of people who start a consultation form never finish it. They type their name, the procedure they want — then they hesitate and close the tab. Nobody shows you those people.","The average consultation that converts is worth $6,500-15,000. If even 2 of those invisible leads had booked last month, that is $13,000-30,000 in procedures your team never saw.",'<a href="https://www.userecapture.com/for-plastic-surgery" style="color:#ff6b35;text-decoration:none">See how it works for plastic surgery</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

MEDSPA = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and high-ticket wellness businesses across DFW.","Between 60-70% of people who start a consultation or booking form never finish it. They type their name, email, maybe their phone — then they get distracted and close the tab.","For med spas, the average client is worth $2,800+. Those invisible leads add up to six figures in lost revenue every year.",'<a href="https://www.userecapture.com/for-med-spas" style="color:#ff6b35;text-decoration:none">See how it works for med spas</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

DERM = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with dermatology practices and multi-location medical groups.","Between 60-70% of people who start an appointment request form never finish it. They type their name, their concern, maybe insurance — then they close the tab.","For dermatology, each new patient represents $1,500-3,000+ in lifetime value. Those invisible abandoned forms add up fast.",'<a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">Run a free ROI estimate</a>.')

contacts = [
    # Law Firms — DFW multi-office, high ad spend
    ("info@hargravelaw.com", "you are paying $50-200 per click — and 67% never submit your form", LAW),
    ("info@mcclurelaw.com", "every abandoned consultation form is a $5,000-25,000 case walking away", LAW),
    ("info@vs-law.com", "ReCapture x Varghese Summersett — recovering invisible leads across 4 offices", LAW),
    ("info@owlawyers.com", "every abandoned consultation form is a $5,000-25,000 case walking away", LAW),
    ("info@grinkestewart.com", "every abandoned consultation form is a $5,000-25,000 case walking away", LAW),
    ("info@hernandezlawcenter.com", "every abandoned consultation form is a case walking to the next firm", LAW),
    # Plastic Surgery — Plano/Frisco/McKinney corridor
    ("info@noblecosmetic.com", "72% of your consultation forms never get submitted — across 475+ happy patients", SURGERY),
    ("info@renaissanceplasticsurgery.com", "72% of your consultation forms never get submitted", SURGERY),
    ("info@friscoplasticsurgery.com", "72% of your consultation forms never get submitted", SURGERY),
    ("info@planoplasticsurgery.com", "72% of your consultation forms never get submitted", SURGERY),
    ("info@sculptaesthetic.com", "72% of your consultation forms never get submitted", SURGERY),
    ("info@americaninstitutefps.com", "72% of your consultation forms never get submitted", SURGERY),
    # Med Spa — Plano/Frisco premium corridor
    ("info@bellamedspa.com", "67% of your consultation leads are invisible", MEDSPA),
    ("info@starsleepwellness.com", "67% of your patient intake forms are losing leads — across DFW locations", DERM),
    ("info@dallassleep.com", "67% of your patient intake forms are losing leads", DERM),
    # Dermatology — premium DFW
    ("info@dermatologycenterofdallas.com", "67% of your new patient forms are losing leads", DERM),
    ("info@dallascenterdermatology.com", "67% of your new patient forms are losing leads", DERM),
    ("info@dermatologytreatmentcenter.com", "67% of your new patient forms are losing leads", DERM),
]

print(f"Starting WAVE 8 — {len(contacts)} emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 8 complete.")
