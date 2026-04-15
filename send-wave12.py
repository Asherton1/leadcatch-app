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

RE = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury real estate developments and brokerages across DFW.","Between 60-70% of people who start an inquiry form, request a showing, or schedule a tour never finish it. They type their name, the property they want — then they close the tab.","For luxury real estate, every abandoned inquiry could be a $1,000,000+ transaction walking away. If even one of those invisible leads had come through last month, it changes your quarter.",'<a href="https://www.userecapture.com/for-luxury-real-estate" style="color:#ff6b35;text-decoration:none">See how it works for luxury real estate</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

MS = email("I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and aesthetic practices across DFW.","Between 60-70% of people who start a consultation or booking form never finish it. They type their name, the treatment they want — then they close the tab.","The average med spa client is worth $2,800+. Across multiple locations, those invisible leads add up to six figures in lost revenue every year.",'<a href="https://www.userecapture.com/for-med-spas" style="color:#ff6b35;text-decoration:none">See how it works for med spas</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.')

contacts = [
    ("info@jmjdev.com", "every abandoned inquiry on a Mandarin Oriental residence is a $1M+ sale walking away", RE),
    ("info@alliebeth.com", "recovering invisible leads across DFW's highest-end listings — Allie Beth Allman", RE),
    ("manager@enlightenmd.com", "67% of your luxury consultation forms never get submitted — Enlighten MD", MS),
    ("prestonroyal@skinspirit.com", "67% of your consultation forms never get submitted — SkinSpirit Preston Royal", MS),
    ("westvillage@skinspirit.com", "67% of your consultation forms never get submitted — SkinSpirit West Village", MS),
    ("leftbank@skinspirit.com", "67% of your consultation forms never get submitted — SkinSpirit Fort Worth", MS),
]

print(f"WAVE 12 — {len(contacts)} verified emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 12 complete.")
