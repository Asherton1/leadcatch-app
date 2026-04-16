import requests

RESEND_API_KEY = "re_FdNcsnxT_9ZA3oDGrQjsNcP73GaMw3DSN"

def send(to, first_name, subject):
    body = f"""Hi {first_name},

Quick question — are your GHL clients losing leads from their contact forms?

GoHighLevel captures everything after someone submits. But 60-70% of visitors who start a form never submit. They type their name, their email, maybe their service interest — then close the tab. GHL never sees them. Your client never knows they existed.

ReCapture fills that gap. One script tag on any website — WordPress, Webflow, custom HTML, GHL sites — and every partial form entry gets captured in real time. Name, email, phone, what they were looking for. Your client gets a dashboard with every abandoned lead and their estimated dollar value. ReCapture also sends branded recovery emails automatically on your client's behalf.

For an agency managing 10+ clients in dental, med spa, real estate, or property management — this is a deliverable nobody else is offering.

We built a full breakdown specifically for GHL agencies: userecapture.com/for-gohighlevel

Happy to walk you through it if it sounds interesting.

Asherton Chraibi
Founder, ReCapture
Dallas, TX
userecapture.com"""

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

# ADD GHL AGENCY CONTACTS HERE BEFORE SENDING
# Format: ("email@agency.com", "FirstName", "Subject line")
contacts = [
    # POPULATE MONDAY MORNING WITH VERIFIED GHL AGENCY CONTACTS
]

print(f"Starting GHL Agency outreach — {len(contacts)} emails")
print("=" * 50)
for to, first_name, subject in contacts:
    send(to, first_name, "The leads your GHL clients don't know they're losing")
print("=" * 50)
print("Done.")
