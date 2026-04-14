import json
import time
import urllib.request

API_KEY = 're_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN'

contacts = [
    {"to": "luxedental@gmail.com", "name": "Luxe Dental", "subject": "67% of your form leads are invisible", "industry": "dental"},
    {"to": "luxedentalvp@gmail.com", "name": "Luxe Dental", "subject": "67% of your form leads are invisible", "industry": "dental"},
    {"to": "info@enlightenmd.com", "name": "Enlighten MD", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "Hello@Sanjivamedspa.com", "name": "Sanjiva Med Spa", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@secretmedspa.com", "name": "Its A Secret Med Spa", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "Info@thescienceofbeautydallas.com", "name": "The Science of Beauty", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "hello@glo30.com", "name": "GLO30", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "dallas@hiatusspa.com", "name": "Hiatus Spa", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@starwoodmedspa.com", "name": "Starwood Med Spa", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@totalmedsolutions.com", "name": "Total Med Solutions", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@bodyloungeparkcities.com", "name": "Body Lounge", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "contact@elevatemedicalspa.com", "name": "Elevate Medical Spa", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@omnisculptmd.com", "name": "OMNI SCULPT MD", "subject": "67% of your consultation leads are invisible", "industry": "medspa"},
    {"to": "info@mintdentistry.com", "name": "MINT Dentistry", "subject": "quick question about your patient intake forms", "industry": "dental"},
    {"to": "info@thrivedentist.com", "name": "Thrive Dental", "subject": "quick question about your patient intake forms", "industry": "dental"},
    {"to": "info@northtexasps.com", "name": "North Texas Plastic Surgery", "subject": "72% of consultations never make it to your team", "industry": "plasticsurgery"},
    {"to": "sales@earthmotorcars.com", "name": "Earth Motorcars", "subject": "thought of Earth Motorcars when I saw this", "industry": "auto"},
    {"to": "contact@billingsleyco.com", "name": "Billingsley Company", "subject": "your leasing forms are losing prospects", "industry": "property"},
    {"to": "marketing@anterra.com", "name": "Anterra Management", "subject": "your leasing forms are losing prospects", "industry": "property"},
    {"to": "info@cafcapital.com", "name": "CAF Management", "subject": "your leasing forms are losing prospects", "industry": "property"},
    {"to": "corporate@lumapm.com", "name": "LUMA Residential", "subject": "your leasing forms are losing prospects", "industry": "property"},
    {"to": "info@compassmf.com", "name": "Compass Multifamily", "subject": "your leasing forms are losing prospects", "industry": "property"},
    {"to": "ccanava@decadental.com", "name": "DECA Dental", "subject": "following up — 200+ locations, one blind spot", "industry": "dental"},
    {"to": "info@myidealdental.com", "name": "Ideal Dental", "subject": "following up — 200+ locations, one blind spot", "industry": "dental"},
    {"to": "sahmed@decadental.com", "name": "DECA Dental", "subject": "following up — 200+ locations, one blind spot", "industry": "dental"},
]

pages = {
    "medspa": "https://www.userecapture.com/for-med-spas",
    "dental": "https://www.userecapture.com/for-dental",
    "plasticsurgery": "https://www.userecapture.com/for-plastic-surgery",
    "auto": "https://www.userecapture.com/for-luxury-auto",
    "property": "https://www.userecapture.com/for-property-management",
}

lines = {
    "medspa": "For med spas, the average client is worth $2,800. If even 5 of those invisible leads had converted last month, that would be $14,000 in revenue your practice never saw.",
    "dental": "For dental practices, a single new patient is worth $1,900 over their lifetime. If even 3 of those invisible leads had booked last month, that would be $5,700 your front desk never knew about.",
    "plasticsurgery": "For plastic surgery practices, the average consultation that converts is worth $6,500. If even 2 of those invisible leads had booked, that would be $13,000 in procedures your team never saw.",
    "auto": "For luxury auto, every serious inquiry that slips through is an $8,500+ deal walking to the next lot. If even 1 of those invisible leads had come in last month, it would have more than paid for itself.",
    "property": "For property management, every abandoned leasing inquiry is a $3,200+ annual lease walking to the next listing. Across your portfolio, that adds up to hundreds of thousands in lost lease revenue per year.",
}

def build_email(c):
    page = pages[c["industry"]]
    line = lines[c["industry"]]
    return f'''<div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0a; color: #ccc; padding: 36px 32px; border-radius: 10px;">
  <div style="margin-bottom: 28px;">
    <span style="font-size: 18px; font-weight: 700; color: #fff;">Re</span><span style="font-size: 18px; font-weight: 700; color: #ff6b35;">Capture</span>
  </div>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 20px;">Hi there,</p>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 20px;">I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I have spent the last 10+ years managing ad campaigns for businesses like {c["name"]}, and I kept seeing the same problem everywhere.</p>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 20px;">Between 60% and 70% of people who start a contact form on your website never finish it. They type their name, their email, maybe their phone number — then they get distracted and close the tab. Your analytics show the page view. Your CRM shows the submission. But nobody shows you the people in between.</p>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 20px;">{line}</p>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 24px;">I built ReCapture to fix this. One script tag on your website — takes 60 seconds to install. From that moment, every person who starts your form is captured in real time, even if they never hit submit. You see their name, email, phone, and the estimated dollar value of that lead. Follow up manually or let ReCapture send recovery emails on your behalf.</p>
  <div style="text-align: center; margin: 28px 0;">
    <a href="https://www.userecapture.com/test-form" style="display: inline-block; background: #ff6b35; color: #fff; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">See It in Action — Live Demo</a>
  </div>
  <p style="font-size: 14px; line-height: 1.7; color: #888; margin-bottom: 20px;">You can also <a href="{page}" style="color: #ff6b35; text-decoration: none;">see how ReCapture works for your industry</a>, or <a href="https://www.userecapture.com/calculator" style="color: #ff6b35; text-decoration: none;">run a free ROI estimate</a> to see how much your forms might be costing you.</p>
  <p style="font-size: 15px; line-height: 1.7; color: #bbb; margin-bottom: 4px;">Happy to walk you through it if you are interested.</p>
  <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1e1e1e;">
    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #fff;">Asherton Chraibi</p>
    <p style="margin: 2px 0 0; font-size: 13px; color: #666;">Founder, ReCapture</p>
    <p style="margin: 2px 0 0; font-size: 13px; color: #666;">Dallas, TX</p>
    <p style="margin: 4px 0 0; font-size: 13px;"><a href="https://www.userecapture.com" style="color: #ff6b35; text-decoration: none;">userecapture.com</a></p>
  </div>
</div>'''

sent = 0
failed = 0
print(f"Starting batch — {len(contacts)} emails")
for c in contacts:
    html = build_email(c)
    body = json.dumps({
        "from": "Ash from ReCapture <hello@userecapture.com>",
        "to": c["to"],
        "reply_to": "asherton.c@me.com",
        "subject": c["subject"],
        "html": html,
    }).encode()
    req = urllib.request.Request("https://api.resend.com/emails", data=body, headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    })
    try:
        resp = urllib.request.urlopen(req)
        sent += 1
        print(f"SENT: {c['to']} — {c['subject']}")
    except Exception as e:
        failed += 1
        print(f"FAILED: {c['to']} — {e}")
    time.sleep(2)

print(f"\nDone. Sent: {sent}, Failed: {failed}")
