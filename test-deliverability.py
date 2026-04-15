import subprocess, json

API_KEY = "re_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN"

# Plain text version - no HTML template, no branding
plain_html = '''<div style="font-family:-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#333">
<p>Hi there,</p>
<p>I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas.</p>
<p>I wanted to reach out because I work with luxury businesses across DFW that rely on form submissions to generate leads. The problem is, between 60-70% of people who start filling out a form never finish it. They type their name, maybe their email — then they close the tab.</p>
<p>I built a tool called ReCapture that captures every person who starts your form in real time, even if they never hit submit. One script tag, 60 seconds to install.</p>
<p>Would love to show you how it works — takes 2 minutes: <a href="https://www.userecapture.com/test-form">userecapture.com/test-form</a></p>
<p>Happy to walk you through it.</p>
<p>Ash<br>Founder, ReCapture<br>Dallas, TX<br><a href="https://www.userecapture.com">userecapture.com</a></p>
</div>'''

# Branded HTML version - what we've been sending
branded_html = '''<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#ccc;padding:36px 32px;border-radius:10px"><div style="margin-bottom:28px"><span style="font-size:18px;font-weight:700;color:#fff">Re</span><span style="font-size:18px;font-weight:700;color:#ff6b35">Capture</span></div><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">Hi there,</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">I am Ash — I run a digital marketing consultancy here in the Harwood District in Dallas.</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">I wanted to reach out because I work with luxury businesses across DFW that rely on form submissions to generate leads. The problem is, between 60-70% of people who start filling out a form never finish it.</p><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:20px">I built ReCapture to fix this. One script tag — 60 seconds to install. Every person who starts your form is captured in real time, even if they never hit submit.</p><div style="text-align:center;margin:28px 0"><a href="https://www.userecapture.com/test-form" style="display:inline-block;background:#ff6b35;color:#fff;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px">See It in Action</a></div><p style="font-size:15px;line-height:1.7;color:#bbb;margin-bottom:4px">Happy to walk you through it.</p><div style="margin-top:28px;padding-top:20px;border-top:1px solid #1e1e1e"><p style="margin:0;font-size:14px;font-weight:600;color:#fff">Asherton Chraibi</p><p style="margin:2px 0 0;font-size:13px;color:#666">Founder, ReCapture</p><p style="margin:2px 0 0;font-size:13px;color:#666">Dallas, TX</p><p style="margin:4px 0 0;font-size:13px"><a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none">userecapture.com</a></p></div></div>'''

def send(to, subject, html):
    body = json.dumps({"from":"Ash from ReCapture <hello@userecapture.com>","to":to,"reply_to":"asherton.c@me.com","subject":subject,"html":html})
    r = subprocess.run(["curl","-s","-X","POST","https://api.resend.com/emails","-H",f"Authorization: Bearer {API_KEY}","-H","Content-Type: application/json","-d",body], capture_output=True, text=True)
    if '"id"' in r.stdout:
        print(f"SENT: {subject}")
    else:
        print(f"FAILED: {r.stdout}")

# Send both versions so you can compare
send("Abbydame2005@gmail.com", "TEST A — plain text version", plain_html)
send("Abbydame2005@gmail.com", "TEST B — branded HTML version", branded_html)

print("\nDone. Check Gmail inbox, promotions tab, and spam folder.")
print("Tell me where each one landed.")
