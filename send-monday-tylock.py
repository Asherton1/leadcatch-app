import requests
import json

RESEND_API_KEY = "re_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN"

def send(to, subject, body):
    response = requests.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
        json={
            "from": "Asherton Chraibi <hello@userecapture.com>",
            "to": [to],
            "subject": subject,
            "text": body,
        }
    )
    result = response.json()
    status = "SENT" if response.status_code == 200 else "FAILED"
    print(f"{status} -> {to} | {result.get('id', result.get('message', 'unknown'))}")

BODY = """Hi Juliette,

Reaching out again on ReCapture — wanted to make sure this didn't get buried.

Quick context: ReCapture captures the patients who start your consultation or appointment request form and leave before submitting. You never see them in your CRM. They don't show up in your analytics. But they were there — typing their name, their email, what they needed — and then gone.

For a practice like Tylock with multiple locations, those invisible drop-offs add up fast. At your patient value, recovering even two or three per month more than pays for the tool.

Takes one script tag to install. No form changes. Works on any website.

Would love to show you a 10-minute demo if you have time this week — happy to work around your schedule.

Asherton Chraibi
Founder, ReCapture
Dallas, TX
userecapture.com"""

contacts = [
    ("juliette@tylock.com", "Following up — ReCapture for Tylock"),
]

print(f"Sending Tylock follow-up...")
print("=" * 50)
for to, subject in contacts:
    send(to, subject, BODY)
print("=" * 50)
print("Done.")
