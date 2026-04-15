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

def email(intro, problem, value, page_url, page_label):
    return f'{TOP}<p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">Hi there,</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{intro}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{problem}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">{value}</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:24px">I built ReCapture to fix this. One script tag per location — 60 seconds to install. Every person who starts your form is captured in real time, even if they never hit submit. Enterprise dashboard across all your locations.</p>{CTA}<p style="font-size:14px;line-height:1.7;color:#888;margin-bottom:20px">You can also <a href="{page_url}" style="color:#ff6b35;text-decoration:none">{page_label}</a> or <a href="https://www.userecapture.com/calculator" style="color:#ff6b35;text-decoration:none">run a free ROI estimate</a>.</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:4px">Happy to walk you through it.</p>{SIG}'

MEDSPA = email(
    "I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with med spas and high-ticket wellness businesses across DFW.",
    "Between 60-70% of people who start a consultation or booking form never finish it. They type their name, email, maybe their phone — then they get distracted and close the tab. Nobody shows you the people in between.",
    "For med spas and wellness clinics, the average client is worth $2,800+. Across multiple locations, those invisible leads add up to six figures in lost revenue every year.",
    "https://www.userecapture.com/for-med-spas", "see how it works for med spas")

DENTAL = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I work with dental groups across DFW and kept seeing the same blind spot at every practice.",
    "65% of people who start a patient intake or appointment form never finish it. They type their name, email, maybe insurance info — then they close the tab. Nobody shows you those people.",
    "A single new patient is worth $1,900 over their lifetime. For implant and oral surgery cases, that number jumps to $5,000-40,000. Across your locations, those invisible abandoned forms represent millions in lost revenue.",
    "https://www.userecapture.com/for-dental", "see how it works for dental")

SURGERY = email(
    "I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with plastic surgery and cosmetic practices across DFW.",
    "72% of people who start a consultation form never finish it. They type their name, the procedure they want — then they hesitate and close the tab. Nobody shows you those people.",
    "The average consultation that converts is worth $6,500-15,000. If even 2 of those invisible leads had booked last month, that is $13,000-30,000 in procedures your team never saw.",
    "https://www.userecapture.com/for-plastic-surgery", "see how it works for plastic surgery")

FERTILITY = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I work with specialty medical practices where every consultation form matters.",
    "Between 60-70% of people who start a consultation request form never finish it. For fertility patients who spend weeks researching before filling out that form — losing them at the last second is devastating.",
    "A single IVF cycle is worth $12,000-20,000+. If even 2 of those invisible leads had completed their inquiry last month, that is $24,000-40,000 your practice never saw.",
    "https://www.userecapture.com/calculator", "run a free ROI estimate for your practice")

LASIK = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I work with specialty practices where patients do heavy online research before booking.",
    "LASIK patients are comparison shoppers. They open 5 tabs, start consultation forms on 3, and submit maybe 1. The other 2 practices never knew that patient existed.",
    "At $2,000-4,500 per eye, every abandoned free-consultation form is a $4,000-9,000 patient walking away. Across your locations, that adds up fast.",
    "https://www.userecapture.com/calculator", "run a free ROI estimate for your practice")

DERM = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I work with dermatology practices and multi-location medical groups across DFW.",
    "Between 60-70% of people who start an appointment request or patient intake form never finish it. They type their name, their concern, maybe insurance — then they close the tab. Nobody shows you those people.",
    "For dermatology, each new patient represents $1,500-3,000+ in lifetime value. Across your network, those invisible abandoned forms add up to millions in lost revenue per year.",
    "https://www.userecapture.com/calculator", "run a free ROI estimate for your network")

REALESTATE = email(
    "I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with luxury real estate firms where every lead matters.",
    "Between 60-70% of people who start a home valuation, listing inquiry, or contact form never finish it. They type their name, the property they want — then they close the tab. Nobody shows you those people.",
    "In luxury real estate, a single recaptured buyer inquiry could mean $25,000-75,000+ in commission. If even 1 of those invisible leads had come through last month, it would pay for ReCapture for years.",
    "https://www.userecapture.com/for-luxury-real-estate", "see how it works for luxury real estate")

PROP = email(
    "I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas. I work with property management companies and multifamily operators across DFW.",
    "70% of people who start a leasing inquiry or tour request form never finish it. They type their name, the unit they want — then they move on to the next listing. Nobody shows you those people.",
    "Every abandoned inquiry is a $3,200+ annual lease walking away. Across hundreds of communities, that is tens of millions in lost lease revenue per year.",
    "https://www.userecapture.com/for-property-management", "see how it works for property management")

AUTO = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I thought of your dealership group when I came across some data I wanted to share.",
    "74% of people who start a vehicle inquiry form never finish it. They type their name, the model they want — then they close the tab. Nobody shows you those people.",
    "Every serious inquiry that slips through is a deal walking to the next lot. Across your dealerships, even a 5% recovery rate on those invisible leads is hundreds of thousands in additional revenue per year.",
    "https://www.userecapture.com/for-luxury-auto", "see how it works for auto dealerships")

WELLNESS = email(
    "I am Ash — I run a digital marketing consultancy here in Dallas. I work with multi-location wellness and healthcare businesses across DFW.",
    "Between 60-70% of people who start an appointment or intake form never finish it. They type their name, their concern — then they close the tab. Nobody shows you those people.",
    "Each new patient represents $500-5,000+ in lifetime value depending on the service. Across 20, 50, or 150+ locations, those invisible abandoned forms represent massive lost revenue.",
    "https://www.userecapture.com/calculator", "run a free ROI estimate for your network")

contacts = [
    # Med Spas & Wellness
    ("consultations@asfdallas.com", "67% of your consultation leads are invisible — across both locations", MEDSPA),
    ("getwell@formulawellness.com", "67% of your consultation leads are invisible", MEDSPA),
    ("info@ultimateimageskincare.com", "67% of your consultation leads are invisible — across 4 DFW locations", MEDSPA),
    ("hello@clinicconcierge.com", "67% of your patient intake forms are losing leads", MEDSPA),
    ("contact@restore.com", "ReCapture x Restore — recovering invisible leads across 210+ studios", WELLNESS),
    ("guest.services@idealimage.com", "ReCapture x Ideal Image — recovering invisible consultation leads at scale", MEDSPA),
    ("inquiry@sonobello.com", "72% of your body contouring consultations never get submitted", SURGERY),
    # Dental & Oral Surgery
    ("info@bearcreekfamilydentistry.com", "ReCapture x Bear Creek — recovering invisible patient leads across 13 DFW offices", DENTAL),
    ("info@1dentalgrouptx.com", "ReCapture x One Dental — recovering invisible patient leads across 10 locations", DENTAL),
    ("office@oralsurgerytexas.com", "every abandoned implant consultation is $20,000+ walking away", DENTAL),
    ("irving@dfwoms.com", "every abandoned oral surgery consultation is $20,000+ walking away", DENTAL),
    ("contact@dfworalsurgery.com", "every abandoned implant consultation is $20,000+ walking away", DENTAL),
    ("fosa@facialoralsurg.com", "72% of your consultation forms never get submitted", DENTAL),
    ("willowbend@oralsurgerydfw.com", "every abandoned implant consultation is $20,000+ walking away", DENTAL),
    # Fertility & LASIK
    ("info@fertilitytexas.com", "every abandoned IVF consultation form is $20,000+ walking away", FERTILITY),
    ("team@ivfmd.net", "every abandoned fertility consultation is $12,000-20,000 walking away", FERTILITY),
    ("LASIK@LaserCareEye.com", "every abandoned LASIK consultation is $4,000-9,000 walking away", LASIK),
    ("randy@tylock.com", "every abandoned LASIK consultation is $4,000-9,000 walking away", LASIK),
    # Dermatology & Plastic Surgery
    ("michael.pennington@platinumderm.com", "ReCapture x Platinum Derm — recovering invisible patient leads across 20+ locations", DERM),
    ("info@fmcsurgery.com", "72% of your consultation forms never make it to your team", SURGERY),
    # Real Estate
    ("info@daveperrymiller.com", "every abandoned home inquiry form is a $25,000+ commission walking away", REALESTATE),
    ("info@alliebeth.com", "every abandoned listing inquiry is a $25,000+ commission walking away", REALESTATE),
    ("dallas@theagencyre.com", "every abandoned home inquiry form is a $25,000+ commission walking away", REALESTATE),
    # Auto & Property
    ("Scott.Walters@moritzmail.com", "74% of your vehicle inquiry forms go unfinished", AUTO),
    ("Info@HighmarkRes.com", "ReCapture x Highmark — recovering invisible leasing leads across 400+ communities", PROP),
]

print(f"Starting WAVE 4 — {len(contacts)} emails")
print("=" * 50)
for to, subj, html in contacts:
    send(to, subj, html)
print("=" * 50)
print("Wave 4 complete.")
