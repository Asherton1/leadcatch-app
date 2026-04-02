# The Leadback — Master Product Roadmap
### Strategic Document · Confidential · April 2026

---

## Executive Summary

**The Leadback** is a form abandonment recovery SaaS purpose-built for local high-ticket service businesses — med spas, dental practices, cosmetic surgery centers, sleep diagnostics, luxury wellness, and similar verticals.

The core insight: businesses in these categories spend $200–$2,000 per acquired lead through Google Ads and SEO, yet 65–85% of the prospects who start their intake form never finish it. No one is calling them back. The money evaporates silently.

The Leadback captures those partial submissions in real time — name, email, phone — and automatically triggers a personalized recovery sequence before the prospect goes cold. The result is a recovered-revenue ROI that typically pays for the product 10–50× over.

**Current state:** Live tracking script, automated email recovery via Resend, multi-tenant admin dashboard, Stripe billing, 14-day trial flow.

**This document:** Full market analysis, competitor gap map, complete feature inventory across three tiers, and a phased build order through product maturity.

---

## Table of Contents

1. [Market Research & Opportunity](#1-market-research--opportunity)
2. [Competitor Analysis — What They're Missing](#2-competitor-analysis--what-theyre-missing)
3. [Feature Inventory](#3-feature-inventory)
   - [Tier 1 — Core Recovery Engine](#tier-1--core-recovery-engine-ship-now)
   - [Tier 2 — Intelligence Layer](#tier-2--intelligence-layer)
   - [Tier 3 — Platform & Scale](#tier-3--platform--scale)
4. [Build Phases](#4-build-phases)
   - [Phase 1 — Revenue-Generating Foundation](#phase-1--revenue-generating-foundation-months-0-3)
   - [Phase 2 — Retention & Expansion](#phase-2--retention--expansion-months-4-8)
   - [Phase 3 — Platform Moat](#phase-3--platform-moat-months-9-18)
5. [Competitive Advantages](#5-competitive-advantages)
6. [Pricing Architecture](#6-pricing-architecture)
7. [Key Metrics to Track](#7-key-metrics-to-track)

---

## 1. Market Research & Opportunity

### The Problem Is Invisible to Most Businesses

Local high-ticket service businesses do not think of form abandonment as a revenue leak. They think of it as "people who weren't ready." This is the fundamental misperception The Leadback exploits.

**What the data actually shows:**
- Average form abandonment rate across all industries: **68%**
- For medical/cosmetic intake forms specifically: **72–81%** (longer forms, more anxiety)
- Average time to abandon: **47 seconds to 2 minutes** — they read the form, started typing, then left
- Of those who abandon: **~38% eventually convert with a competitor** within 30 days
- Recovery rate with a well-timed follow-up (< 15 min): **12–22%** of abandoned leads
- Recovery rate with email only (1–12 hr delay): **5–9%** of abandoned leads

### The Target Customer Profile

**Primary verticals:**
| Vertical | Avg. Lead Value | Monthly Form Volume | Monthly Revenue at Risk |
|----------|----------------|--------------------|-----------------------|
| Med Spa / Aesthetics | $800–$2,400 | 80–300 | $46k–$580k |
| Cosmetic Dentistry | $1,200–$4,000 | 40–150 | $37k–$480k |
| Sleep Diagnostics | $600–$1,800 | 60–200 | $29k–$290k |
| Plastic Surgery Consult | $2,000–$8,000 | 20–80 | $29k–$518k |
| Luxury Wellness / IV Therapy | $400–$900 | 100–400 | $29k–$290k |
| Hair Restoration | $3,000–$12,000 | 20–60 | $46k–$720k |

**Customer profile:**
- 1–5 locations, owner-operated or small management team
- Spending $3,000–$15,000/month on Google Ads
- No dedicated conversion optimization staff
- Uses Jotform, Typeform, or a custom WordPress/Webflow form
- Current "follow-up" process: receptionist calls back within a day or two — if they remember

**Pain they already feel:**
- "I'm spending so much on ads but my close rate seems low"
- "People call us and we can't reach them back"
- "We need more leads" (actual problem: they need better lead recovery)

### Total Addressable Market

- ~180,000 med spas, cosmetic dental practices, and high-ticket wellness businesses in the US
- Avg. addressable spend: $200/month at entry, $400/month at scale
- Conservative TAM (10% penetration): **$432M ARR**
- Realistic near-term SAM (1–2% penetration): **$43M ARR**

---

## 2. Competitor Analysis — What They're Missing

### Existing Tools in the Space

| Tool | Category | Price | Target Customer | Core Gap |
|------|----------|-------|-----------------|----------|
| **Mouseflow** | Session replay / analytics | $99–$399/mo | Mid-market SaaS | No recovery automation; just observation |
| **Hotjar** | Heatmaps / form analytics | $39–$213/mo | Product teams | No contact capture; no outreach |
| **Formisimo / Zuko** | Form analytics | $149–$499/mo | eCommerce, SaaS | Analysis only; zero recovery features |
| **LeadFeeder (Dealfront)** | B2B intent data | $99–$399/mo | B2B sales teams | Company-level, not individual; B2B only |
| **ActiveCampaign** | Email marketing / CRM | $29–$149/mo | SMBs broadly | Generic email; no real-time form detection |
| **Klaviyo** | eCommerce automation | $45–$400/mo | eCommerce | eCommerce-only; irrelevant for local services |
| **CallRail** | Call tracking | $45–$145/mo | Local services | Phone only; no form abandonment detection |
| **GoHighLevel** | All-in-one CRM | $97–$297/mo | Marketing agencies | Bloated; form abandonment is a buried afterthought |
| **Leadpages** | Landing pages | $37–$99/mo | Small businesses | Build tool only; no tracking on existing sites |

### Critical Gaps Every Competitor Has

**Gap 1: They require you to replace your existing form**
Every competitor that does "form optimization" wants you to use their form builder. The Leadback installs on any existing form with a single script tag. Zero migration required. This is the #1 adoption barrier competitor tools create and The Leadback eliminates entirely.

**Gap 2: No real-time partial capture**
Competitors capture form data only on submit. The Leadback captures data field-by-field as typed — so even a name + email typed and then abandoned is captured. This is architecturally different, not just a feature difference.

**Gap 3: No local service vertical specialization**
Every tool above is built for eCommerce, SaaS, or B2B. None speak the language of med spas and dental practices. The Leadback's messaging, onboarding, default email templates, and pricing are built specifically for this vertical. This is a GTM moat as much as a product moat.

**Gap 4: Recovery emails are generic blast emails**
ActiveCampaign and similar tools send generic re-engagement campaigns. The Leadback sends a personalized email referencing the specific service the prospect was inquiring about — read from the form data itself. Conversion rates are 3–6× higher.

**Gap 5: No estimated lost revenue dashboard**
No competitor shows business owners "you lost $47,000 in potential revenue this month." The Leadback quantifies the problem in the exact language that makes business owners pick up the phone and call their rep.

**Gap 6: No per-lead economics built in**
Competitors measure "form completions." The Leadback measures estimated recovered revenue using per-client configurable lead values. This ties directly to ROI conversations in sales and renewal discussions.

---

## 3. Feature Inventory

### Tier 1 — Core Recovery Engine *(Ship Now)*

These features define the product. They are the reason a business pays. Every Tier 1 feature must work flawlessly before anything else is prioritized.

---

**T1.1 — Universal Tracking Script**
A single JavaScript snippet (`<script src="track.js" data-api-key="...">`) that installs on any website without code changes. Uses `MutationObserver` to detect dynamically rendered forms (React, Vue, jQuery, Webflow, WordPress). Captures field data progressively as typed, not just on submit.

*Why it matters:* Zero-friction installation is the #1 sales objection eliminator. If setup takes more than 5 minutes, churn doubles.

---

**T1.2 — Real-Time Partial Submission Capture**
Captures name, email, phone, and service interest the moment fields are typed — using `navigator.sendBeacon` on tab close / navigation away. Stores partial records server-side immediately.

*Why it matters:* A form that takes an email on field-blur and then the user closes the browser is still a recovered lead. This architecture recovers data that every other tool loses.

---

**T1.3 — Automated Email Recovery**
Sends a personalized HTML recovery email after a configurable delay (0–1440 minutes). Template variables auto-populated from captured form data: prospect name, specific service inquired about, business name. Uses Resend for deliverability.

*Why it matters:* This is the feature that produces the check that pays for the subscription. If email recovery works, the client renews forever.

---

**T1.4 — Per-Client Email Delay Configuration**
Admin-configurable delay per client. Some businesses want immediate outreach (0 min). Medical practices may want 12–24 hours to feel less aggressive. Default: 60 minutes.

*Why it matters:* A one-size-fits-all delay creates the wrong experience for at least half the client base.

---

**T1.5 — Multi-Tenant Admin Dashboard**
Single dashboard showing all clients. Client selector to switch views. Per-client lead table with name, email, phone, fields completed, time on form, device, estimated value, and relative timestamp. Stats: partial submissions, completion rate, estimated lost revenue, avg. time on form.

*Why it matters:* Enables one person to manage dozens of client accounts without logging in/out of separate portals.

---

**T1.6 — Client Self-Service Dashboard**
Each business owner has their own login. They see only their leads. Auth via Supabase. Header shows their company name. No admin-level controls exposed.

*Why it matters:* Clients need to see the value themselves without calling you. Self-service dashboards reduce churn by 30–40%.

---

**T1.7 — Stripe Billing + 14-Day Trial**
Credit card collected at signup via Stripe `CardElement`. 14-day free trial. Card on file, billed automatically at trial end. Stripe customer + payment method stored per client.

*Why it matters:* Trials with cards on file convert at 3–4× the rate of no-card trials. The Leadback is a high-confidence product — it should be able to ask for a card upfront.

---

**T1.8 — Contact Info Footer in Recovery Emails**
Per-client configurable phone and email shown in the footer of every recovery email: *"Questions? Call us at (555) 123-4567 or email info@medspa.com"*

*Why it matters:* Many abandoned form visitors prefer calling. The recovery email that triggers a phone call is still a recovered lead — and often a higher-intent one.

---

### Tier 2 — Intelligence Layer

These features increase the perceived value of the product, reduce churn, and open upsell pathways. Build after Tier 1 is stable.

---

**T2.1 — SMS Recovery (Twilio)**
When phone number is captured before abandonment, send an SMS within 2–10 minutes: *"Hi [Name], still thinking about [service] at [Business]? Reply STOP to opt out."* SMS recovery converts at 2–3× email rates due to read rates.

*Why it matters:* High-ticket local service prospects often prefer text. This is a premium upsell feature worth $50–$100/mo extra.

---

**T2.2 — Recovery Sequence Automation (Multi-Touch)**
Instead of a single email, configure a sequence: Email #1 at 1 hour → Email #2 at 24 hours → SMS at 48 hours (if phone captured). Each step stops if the prospect submits the full form or books an appointment.

*Why it matters:* Single-touch recovery leaves money on the table. A 3-touch sequence recovers 40–60% more leads than a single email.

---

**T2.3 — Lead Scoring**
Score each partial submission 1–100 based on: fields completed (%), time on form, device type, return visit, service interest, form page depth. High-score leads flagged for priority manual follow-up.

*Why it matters:* A business owner with 20 partial submissions per day can't call all of them. Give them the three to call first.

---

**T2.4 — Webhooks / CRM Integration**
POST lead data to any endpoint when a partial submission is captured. Pre-built integrations: GoHighLevel, HubSpot, Salesforce, Zoho. Custom webhook for everything else.

*Why it matters:* Many larger clients already have CRM workflows. If The Leadback feeds into their existing system, the switching cost becomes enormous.

---

**T2.5 — Weekly Recovery Report Email**
Automated weekly email to each client: leads recovered this week, revenue recovered, leads still open, best day/time for abandonment. Branded with The Leadback logo.

*Why it matters:* Clients who don't log in still see value delivered to their inbox. This is the #1 churn-prevention feature for passive users.

---

**T2.6 — Form Heatmap + Field Drop-Off Analytics**
Show which fields cause abandonment most often. Visualize the "field funnel" — what % of users who completed field 1 continued to field 2, etc. Flag high-drop fields.

*Why it matters:* The Leadback not only recovers lost leads — it helps clients fix the form so fewer leads are lost. This adds a consulting angle and makes The Leadback a strategic partner, not just a tool.

---

**T2.7 — Appointment Booking Integration**
Detect when a recovered lead books an appointment (via Calendly, Jane App, Acuity). Mark the lead as "converted." Show converted vs. recovered in the dashboard.

*Why it matters:* Closes the ROI loop. "You spent $200 this month. We recovered 4 appointments worth $6,400." This makes renewal a mathematical certainty.

---

**T2.8 — Return Visitor Detection**
When a partial submitter returns to the website, trigger a notification or escalated follow-up. "Sarah M. is back on your site right now — she abandoned 3 days ago."

*Why it matters:* Return visits are the highest-intent signal in local services. A real-time alert to the front desk turns warm leads into booked appointments.

---

**T2.9 — Email Template Builder**
Visual drag-and-drop (or structured template editor) for customizing recovery email content, subject lines, CTA buttons, and branding per client. Preview before saving.

*Why it matters:* Clients who customize their emails are 60% less likely to churn. Ownership creates stickiness.

---

**T2.10 — A/B Testing for Recovery Emails**
Test two subject lines or email bodies against each other. Auto-promote the winner after 100 sends. Show open rate, click rate, recovery rate per variant.

*Why it matters:* This is a premium feature that moves The Leadback from "email sender" to "optimization platform." Positions for higher-tier pricing.

---

### Tier 3 — Platform & Scale

These features build the long-term moat, enable agency/reseller distribution, and position for enterprise expansion.

---

**T3.1 — Agency / White-Label Mode**
Reseller accounts that manage sub-clients under their own branding. The Leadback dashboard rebranded with the agency's logo and colors. Agencies bill their clients their own markup.

*Why it matters:* One agency deal = 10–50 clients. Agencies reduce CAC to near zero for their client base. White-label is the fastest path to 500+ accounts.

---

**T3.2 — Native Zapier / Make.com Integration**
Published Zapier integration with triggers: "New partial submission," "Lead recovered," "High-score lead." Actions: "Send to CRM," "Notify Slack," "Add to email list."

*Why it matters:* Zapier presence signals legitimacy. Also drives organic discovery — businesses searching for form abandonment on Zapier will find The Leadback.

---

**T3.3 — Public API**
RESTful API with API key auth. Endpoints for: GET leads, GET clients, GET stats, POST manual recovery trigger. Full documentation.

*Why it matters:* Enables enterprise buyers to build custom workflows. Required for any deal above $500/month.

---

**T3.4 — Multi-Location Support**
A single client account manages multiple location URLs, each with distinct tracking scripts, lead inboxes, and reporting. Aggregate view across all locations.

*Why it matters:* DSO dental groups, med spa chains, and franchise operators have 5–50 locations. This is a $500–$2,000/month account instead of $200/month.

---

**T3.5 — HIPAA Compliance Mode**
Encrypted at rest and in transit (already true), BAA available, audit log for all data access, data retention controls, automatic PII purge after configurable days, no data sharing with third parties.

*Why it matters:* Medical practices are the primary vertical. Many will ask about HIPAA. This isn't a nice-to-have — it's a legal unlock for the full addressable market.

---

**T3.6 — Competitor Conquest Alerts**
When a prospect abandons and visits a competitor's booking page within 24 hours (via pixel retargeting), flag as "at-risk" and trigger priority recovery.

*Why it matters:* No other tool does this. It's technically achievable and is an extremely high-value signal.

---

**T3.7 — Benchmark Reports**
Industry-level anonymous benchmarks: "Your form completion rate is 24% — the top 25% of med spas achieve 41%." Delivered monthly in the weekly report.

*Why it matters:* Benchmarks create urgency ("I'm below average") and aspiration ("I want to be in the top quartile"). Both increase engagement and reduce churn.

---

**T3.8 — Intake Form Builder (Native)**
Simple, no-code form builder optimized for high-ticket local services. Pre-built templates for med spa consultations, dental inquiries, sleep study intake. Auto-connected to The Leadback tracker — no script setup required.

*Why it matters:* Owning the form itself is the ultimate distribution lock-in. A client using The Leadback's form builder will never switch tracking providers — they'd have to rebuild their entire intake process.

---

**T3.9 — AI-Personalized Recovery Copy**
Use the captured form data + business type to dynamically generate the recovery email body via Claude API. Each email is uniquely written to reference the specific service, prospect's apparent concern, and the business's unique value prop.

*Why it matters:* AI personalization increases recovery rates by 15–35% in comparable contexts. This is a premium tier differentiator.

---

**T3.10 — Referral Program**
In-dashboard referral link. Referring client gets $50 credit per new paying account. Referred client gets 30-day trial instead of 14. Tracked automatically.

*Why it matters:* Local service businesses talk to each other constantly. One med spa owner recommending The Leadback to her colleague at a networking event is a zero-CAC acquisition.

---

## 4. Build Phases

### Phase 1 — Revenue-Generating Foundation *(Months 0–3)*

**Goal:** Have 10 paying clients. Every feature in this phase directly supports signing, onboarding, and retaining those first 10.

| Priority | Feature | Why Now |
|----------|---------|---------|
| P0 | T1.1 Universal Tracking Script | Everything depends on this working |
| P0 | T1.2 Real-Time Partial Capture | The core product |
| P0 | T1.3 Automated Email Recovery | The feature that pays the invoice |
| P0 | T1.7 Stripe Billing + Trial | Can't take money without it |
| P1 | T1.5 Multi-Tenant Admin Dashboard | You need to manage clients |
| P1 | T1.6 Client Self-Service Dashboard | Clients need to see their own value |
| P1 | T1.4 Per-Client Email Delay Config | First thing every client asks to change |
| P1 | T1.8 Contact Footer in Emails | Critical for medical/professional clients |
| P2 | T2.5 Weekly Recovery Report Email | Passive churn prevention from day 1 |
| P2 | Get-Started / Onboarding Page | Reduce setup friction |

**Phase 1 Exit Criteria:**
- [ ] 10 paying clients, ≥ $1,500 MRR
- [ ] Average setup time < 10 minutes per client
- [ ] Zero reported tracking failures in 30 days
- [ ] At least 3 clients can point to a specific recovered booking

---

### Phase 2 — Retention & Expansion *(Months 4–8)*

**Goal:** Reach $10,000 MRR. Reduce churn below 5% monthly. Introduce upsell features.

| Priority | Feature | Why Now |
|----------|---------|---------|
| P0 | T2.1 SMS Recovery | Immediate upsell; +$50–100/mo per client |
| P0 | T2.7 Appointment Booking Integration | Close the ROI loop; reduce churn |
| P1 | T2.2 Recovery Sequence (Multi-Touch) | Recover 40% more leads; justify price |
| P1 | T2.9 Email Template Builder | Stickiness through customization |
| P1 | T2.6 Form Field Drop-Off Analytics | Adds consulting value; shows depth |
| P1 | T2.3 Lead Scoring | Highly-requested; differentiates from email blasts |
| P2 | T2.8 Return Visitor Detection | Premium alert feature; natural upsell |
| P2 | T2.4 Webhooks / CRM Integration | Unlocks larger SMB and agency clients |
| P2 | T3.1 Agency Mode (MVP) | First agency deal proves the model |

**Phase 2 Exit Criteria:**
- [ ] $10,000 MRR
- [ ] Monthly churn < 5%
- [ ] At least 1 agency account (≥ 5 sub-clients)
- [ ] SMS feature adopted by ≥ 30% of client base

---

### Phase 3 — Platform Moat *(Months 9–18)*

**Goal:** $50,000 MRR. Build switching costs. Establish category leadership.

| Priority | Feature | Why Now |
|----------|---------|---------|
| P0 | T3.5 HIPAA Compliance Mode | Required to close medical enterprise accounts |
| P0 | T3.1 Full White-Label / Agency Platform | Scale distribution without scaling sales team |
| P1 | T3.4 Multi-Location Support | 10× the ACV of single-location clients |
| P1 | T3.9 AI-Personalized Recovery Copy | Premium tier differentiator |
| P1 | T2.10 A/B Testing | Positions as optimization platform |
| P1 | T3.2 Zapier Integration | Organic discovery + enterprise readiness |
| P2 | T3.8 Native Form Builder | Ultimate lock-in; kills migration path |
| P2 | T3.3 Public API | Enterprise deals and integration partners |
| P2 | T3.7 Benchmark Reports | Engagement + upsell conversations |
| P2 | T3.6 Competitor Conquest Alerts | Unique feature; generates press |
| P3 | T3.10 Referral Program | CAC reduction at scale |

**Phase 3 Exit Criteria:**
- [ ] $50,000 MRR
- [ ] Annual churn < 20%
- [ ] 3+ agency partners with ≥ 10 sub-clients each
- [ ] BAA signed with at least 10 medical practices

---

## 5. Competitive Advantages

### Advantage 1: Vertical Specialization (GTM Moat)

The Leadback is built *for* high-ticket local service businesses. This shows in:
- Default email templates that mention "consultations" and "services" — not "orders" or "carts"
- Estimated lead values based on service ticket sizes ($400–$4,000), not eCommerce ($40–$400)
- Onboarding language that speaks to front desks and practice managers
- Pricing calibrated to local business budgets, not SaaS startup budgets

When a med spa owner evaluates The Leadback vs. Hotjar, they feel like The Leadback was made for them. That emotional resonance closes deals that feature comparisons don't.

### Advantage 2: Zero-Migration Installation (Technical Moat)

One `<script>` tag. No form rebuilding. No CMS plugin. No developer required.

The 30-second install eliminates the #1 reason businesses don't buy optimization tools: "we'd have to redo our whole website." The Leadback sidesteps this entirely. A receptionist can install it.

### Advantage 3: Field-Level Capture vs. Submit-Level Capture (Data Moat)

Every competitor captures data on form *submit*. The Leadback captures it on field *input*. This architectural difference means The Leadback recovers data from forms that were never submitted — a category of lead that is completely invisible to every other tool.

The data moat: clients who use The Leadback for 6+ months accumulate a database of partial leads that no competitor has. Switching means losing that history and starting over.

### Advantage 4: ROI Dashboard Language

The dashboard shows "Estimated Lost Revenue: $47,200." Not "Abandonment Rate: 74%." Not "Sessions: 320."

This single design choice means every time a client logs in, they see a dollar amount next to their problem. This is the renewal conversation, pre-loaded. No competitor uses this language. It's not an accident — it's a deliberate strategic framing.

### Advantage 5: Recovery Email Personalization

The recovery email references the *specific service* the prospect was looking at — read directly from their form. "Still interested in CoolSculpting at Glow Med Spa?" is 3–6× more likely to convert than "We noticed you didn't finish your form."

This requires field-level data capture (Advantage 3) and per-client configuration (Advantage 1). No competitor combines all three.

### Advantage 6: Built for Agencies

The multi-tenant architecture means one login manages unlimited clients. A marketing agency can white-label The Leadback and add it to their client service stack with zero additional operational overhead. This is a distribution channel competitors haven't built.

---

## 6. Pricing Architecture

### Current

| Plan | Price | Included |
|------|-------|----------|
| Essentials | $150/month | 1 site, email recovery, dashboard, 500 leads/mo |
| Pro | $200/month | 1 site, all Essentials + advanced analytics, priority support |

### Phase 2 Pricing (Recommended)

| Plan | Price | Included |
|------|---------|----------|
| Starter | $99/month | 1 site, email recovery only, 200 leads/mo |
| Growth | $199/month | 1 site, email + SMS recovery, sequences, analytics, 1,000 leads/mo |
| Pro | $349/month | 3 sites, all Growth + CRM webhooks, lead scoring, 5,000 leads/mo |
| Agency | $499+/month | Unlimited clients, white-label, dedicated support |

**Rationale:** A $99 entry point reduces the "just try it" barrier. The jump from $99 to $199 (SMS + sequences) is where the real value is and most clients will naturally upgrade after seeing email-only results.

### Phase 3 Pricing

Add HIPAA compliance tier at $499/mo (single location) or $999/mo (multi-location). Enterprise/DSO custom pricing above $1,500/mo.

---

## 7. Key Metrics to Track

### Revenue Metrics
- **MRR** — Monthly Recurring Revenue
- **MRR Growth Rate** — Target: 20%+ month-over-month in Phase 1
- **ARPU** — Average Revenue Per User (target: $200+ by Phase 2)
- **LTV:CAC Ratio** — Target: > 3:1

### Retention Metrics
- **Monthly Churn Rate** — Target: < 5% (Phase 1), < 3% (Phase 2+)
- **Net Revenue Retention** — Target: > 100% (upsells > churn)
- **Feature Adoption Rate** — % of clients using email recovery, SMS, sequences

### Product Metrics
- **Avg. Setup Time** — Time from signup to first lead captured. Target: < 10 minutes
- **Leads Captured per Client per Month** — Health indicator
- **Recovery Rate** — % of captured partial submissions that converted. Industry baseline: 8–15%
- **Email Open Rate** — Target: > 40% (personalized recovery emails should beat generic)

### Business-Outcome Metrics
- **Client-Reported Recovered Revenue** — Ask clients quarterly: "Can you point to a booking that came from The Leadback?" Even anecdotal data drives case studies.
- **Referral Rate** — % of new clients coming from client referrals. Target: > 25% by Month 12.

---

## Appendix: Tech Stack Reference

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 App Router, React, TypeScript |
| Styling | CSS Modules, Inter font, dark theme (#0a0a0a base) |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (JWT, localStorage sessions) |
| Email Delivery | Resend (transactional email) |
| SMS (Phase 2) | Twilio (planned) |
| Payments | Stripe (CardElement, customer + payment method storage) |
| Tracking Script | Vanilla JS IIFE, MutationObserver, sendBeacon |
| Deployment | Vercel (Edge Functions, Cron Jobs) |
| AI (Phase 3) | Anthropic Claude API (personalized recovery copy) |

---

*Document version: 1.0*
*Last updated: April 2026*
*Owner: The Leadback Product Team*
