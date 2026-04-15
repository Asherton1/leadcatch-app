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

APT = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury apartment communities and property management groups across DFW.","Between 60-70% of people who start a leasing inquiry or tour request never finish it. They type their name, move-in date, floor plan preference — then they close the tab and tour the next community down the road.","Each signed lease represents $3,200+ in monthly revenue. Every abandoned form is a resident you paid to attract but never got to tour.",'<a href="https://www.userecapture.com/for-property-management" style="color:#ff6b35;text-decoration:none">See how it works for apartments</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

MEDSPA = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and aesthetic practices across DFW.","Between 60-70% of people who start a consultation or booking form never finish it. They type their name, the treatment they want — then they close the tab.","The average med spa client is worth $2,800+. Those invisible leads add up to six figures in lost revenue every year.",'<a href="https://www.userecapture.com/for-med-spas" style="color:#ff6b35;text-decoration:none">See how it works for med spas</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

DENTAL = email("I am Ash — I run a digital marketing consultancy here in Dallas. I work with cosmetic and implant dental practices across DFW.","65% of people who start a new patient or consultation form never finish it. They type their name, insurance info — then they close the tab.","For cosmetic and implant cases, each consultation that converts is worth $5,000-15,000+. Every abandoned form is real revenue walking away.",'<a href="https://www.userecapture.com/for-dental" style="color:#ff6b35;text-decoration:none">See how it works for dental</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

AUTO = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury and exotic auto dealers across DFW.","Between 60-70% of people who start a financing application, trade-in form, or inquiry never finish it. They type their name, the car they want — then they close the tab and browse the next dealer.","Every abandoned form could be an $8,500+ deal walking to a competitor. For exotic and luxury inventory, that number jumps to $50,000-200,000+.",'<a href="https://www.userecapture.com/for-luxury-auto" style="color:#ff6b35;text-decoration:none">See how it works for luxury auto</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

contacts = [
    # Luxury Apartments — Frisco/Plano premium corridor
    ("leasing@twelvecowboysway.com", "every abandoned tour request is a $3,200+/mo lease walking to the next high-rise", APT),
    ("info@instratalegacywest.com", "every abandoned leasing inquiry is a $3,200+/mo resident walking away", APT),
    ("info@mirrafrisco.com", "every abandoned tour request is a resident walking to the next community", APT),
    ("info@avalonfrisco.com", "every abandoned leasing inquiry across your Frisco communities is revenue walking away", APT),
    ("info@thekathrynfrisco.com", "every abandoned tour request is a $3,200+/mo lease walking away", APT),
    ("info@cortlandpreston.com", "every abandoned leasing inquiry is a resident walking to the next community", APT),
    # Med Spas — Southlake/Keller/Colleyville premium
    ("info@refinesouthlake.com", "67% of your consultation forms never get submitted", MEDSPA),
    ("info@vitalycmedspa.com", "67% of your consultation forms never get submitted — across your Southlake location", MEDSPA),
    ("info@medreinsouthlake.com", "67% of your consultation forms never get submitted", MEDSPA),
    ("info@skinhealthymedspa.com", "67% of your consultation forms never get submitted", MEDSPA),
    ("info@elasecolleyville.com", "67% of your consultation forms never get submitted", MEDSPA),
    # Cosmetic Dental — Frisco/Plano implant corridor
    ("info@aestheticgeneraldentistry.com", "65% of your implant consultation forms never get submitted — across 429+ happy patients", DENTAL),
    ("info@stonebriarsmiledesign.com", "65% of your consultation forms never get submitted", DENTAL),
    ("info@millenniumsmiles.com", "65% of your implant consultation forms never get submitted", DENTAL),
    ("info@basshallperio.com", "65% of your consultation forms never get submitted — across 945+ happy patients", DENTAL),
    ("info@westfriscodental.com", "65% of your consultation forms never get submitted", DENTAL),
    # Luxury Auto — Plano/Frisco/Richardson
    ("info@lamborghinidallas.com", "every abandoned inquiry is a $200,000+ deal walking to the next dealer", AUTO),
    ("info@ecarone.com", "every abandoned financing or inquiry form is an $8,500+ deal walking away — across 2,300+ customers", AUTO),
    ("info@autosofdallas.com", "every abandoned inquiry form is an $8,500+ deal walking away — across 5,500+ customers", AUTO),
    ("info@onelegacymotors.com", "every abandoned inquiry is an $8,500+ deal walking to the next dealer", AUTO),
    ("info@hilinedfw.com", "every abandoned inquiry is an $8,500+ deal walking to the next dealer", AUTO),
    ("info@passportmotors.com", "every abandoned inquiry is an $8,500+ deal walking to the next dealer", AUTO),
]

print(f"Starting WAVE 9 — {len(contacts)} emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 9 complete.")
