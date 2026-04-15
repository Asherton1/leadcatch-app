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

RE = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury real estate developments and high-rise residences across DFW.","Between 60-70% of people who start an inquiry form, schedule a tour, or request pricing never finish it. They type their name, floor plan interest, maybe their budget — then they close the tab.","For luxury residences, every abandoned inquiry could be a $1,000,000+ sale or a $4,000+/mo lease walking away. If even one of those invisible leads had come through last month, it changes your quarter.",'<a href="https://www.userecapture.com/for-luxury-real-estate" style="color:#ff6b35;text-decoration:none">See how it works for luxury real estate</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

MS = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and aesthetic practices across DFW.","Between 60-70% of people who start a consultation or booking form never finish it. They type their name, the treatment they want — then they close the tab.","The average med spa client is worth $2,800+. Those invisible leads add up to six figures in lost revenue every year.",'<a href="https://www.userecapture.com/for-med-spas" style="color:#ff6b35;text-decoration:none">See how it works for med spas</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

PS = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with plastic surgery and cosmetic practices across DFW.","72% of people who start a consultation form never finish it. They type their name, the procedure they want — then they hesitate and close the tab.","The average consultation that converts is worth $6,500-15,000. If even 2 of those invisible leads had booked last month, that is $13,000-30,000 in procedures your team never saw.",'<a href="https://www.userecapture.com/for-plastic-surgery" style="color:#ff6b35;text-decoration:none">See how it works for plastic surgery</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

APT = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury apartment communities and property management groups across DFW.","Between 60-70% of people who start a leasing inquiry or tour request never finish it. They type their name, move-in date, floor plan preference — then they close the tab.","Each signed lease represents $3,200+ in monthly revenue. Every abandoned form is a resident you paid to attract but never got to tour.",'<a href="https://www.userecapture.com/for-property-management" style="color:#ff6b35;text-decoration:none">See how it works for apartments</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

contacts = [
    ("info@hallartsresidences.com", "every abandoned inquiry on a $1M+ residence is a sale walking away — Hall Arts", RE),
    ("info@museumtowerdallas.com", "every abandoned inquiry is a $1.35M+ sale walking away — Museum Tower", RE),
    ("ilene.christ@compass.com", "recovering invisible leads on $1M+ Museum Tower residences", RE),
    ("jyoung@harwoodinc.com", "recovering invisible leads across the Harwood District — Bleu Ciel and beyond", RE),
    ("info@2811Maple.com", "every abandoned leasing inquiry is a $4,000-19,000/mo lease walking away — 2811 Maple", APT),
    ("ascentvp@greystar.com", "every abandoned tour request is a $2,000+/mo lease walking away — Ascent Victory Park", APT),
    ("info@refine-medspa.com", "67% of your Southlake consultation forms never get submitted", MS),
    ("info@medreinhealth.com", "67% of your consultation forms never get submitted — Medrein Health", MS),
    ("info@sculptcenter.com", "72% of your consultation forms never get submitted — Sculpt Aesthetic", PS),
    ("info@kensmartmd.com", "72% of your consultation forms never get submitted — Dr. Smart", PS),
    ("info@noblecosmeticsurgery.com", "72% of your consultation forms never get submitted — Noble Cosmetic", PS),
    ("info@coxcosmeticsurgery.com", "72% of your consultation forms never get submitted — Cox Cosmetic Surgery", PS),
    ("info@drkerner.com", "72% of your consultation forms never get submitted — Dr. Kerner", PS),
]

print(f"WAVE 10 — {len(contacts)} verified emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 10 complete.")
