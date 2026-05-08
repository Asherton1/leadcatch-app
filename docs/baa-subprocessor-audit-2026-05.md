# BAA Subprocessor Audit — Internal Playbook
**Date:** May 8, 2026
**Auditor:** Asherton Chraibi
**Status:** Reference document — NOT public. Activation playbook for first healthcare deal.

---

## How to use this document

When a healthcare prospect signs an Enterprise contract, this is your activation roadmap. Estimated timeline: **7-14 days** from signed agreement to first compliant deployment.

Activation order matters. Follow the sequence below.

---

## Vendor Summary

| Vendor | BAA | Required Tier | Monthly Cost (HIPAA) | Activation Path |
|--------|-----|---------------|----------------------|-----------------|
| Supabase | Yes | Team Plan + HIPAA add-on | $799-949 | https://forms.supabase.com/hipaa2 |
| Vercel | Yes | Pro Plan + HIPAA add-on | $370 | Pro dashboard self-serve |
| Resend | **No BAA** | N/A | N/A | **REPLACE — Paubox, AWS SES, or Postmark** |
| Twilio | Yes | Security Edition + HIPAA fee | $417-1,250 | Sales call required |
| Retell AI | Yes | Pay-as-you-go (any tier) | $0 incremental | https://click-agreements.retellai.com |

**Combined fixed monthly HIPAA infrastructure: $1,586 - $2,569/mo** (excluding Resend replacement).

**With Resend replacement (Paubox mid-tier): ~$1,800 - $2,800/mo**

---

## Activation Sequence (Day 1 to Day 14)

### Day 1-2: Customer signs Enterprise contract
- Confirm Enterprise pricing covers HIPAA infrastructure with margin (recommended floor: $2,997/mo per healthcare customer)
- Customer provides: business name, address, technical contact, legal contact for BAA
- Send your standard BAA template for their legal review

### Day 3-5: Activate vendor BAAs (in this order)
1. **Retell AI** (fastest) → self-sign at click-agreements.retellai.com
2. **Vercel** → Pro dashboard → Settings → Billing → HIPAA add-on
3. **Supabase** → submit HIPAA add-on request, upgrade to Team Plan
4. **Email vendor (Paubox/AWS SES/Postmark)** → execute BAA, switch transactional email
5. **Twilio** → schedule sales call, request Security Edition + HIPAA addendum

### Day 6-10: Configuration + testing
- Migrate customer's Supabase project to HIPAA-eligible org
- Configure Point-in-Time Recovery, MFA enforcement, network restrictions
- Test full lead flow end-to-end through HIPAA-eligible stack
- Audit log review

### Day 11-14: Customer onboarding
- Customer signs ReCapture BAA
- Deploy tracker on customer site
- First lead flows through HIPAA-eligible infrastructure

---

## Vendor 1 — Supabase

| Field | Value |
|-------|-------|
| BAA Available | Yes |
| Required Plan | Team Plan minimum ($599/mo) |
| HIPAA Add-On | $200-350/mo on top of Team plan (sources differ) |
| Total Monthly | $799-949/mo |
| Execute via | https://forms.supabase.com/hipaa2 |
| Coverage | Database, auth, storage |
| Excludes | Edge Functions, Fly Postgres |
| Certifications | SOC 2 Type II, ISO 27001 |
| Activation time | 2-3 business days after request |

**Restrictions:**
- Pro plan ($25/mo) does NOT support BAA — must upgrade to Team
- Edge Functions cannot be used with PHI
- PHI cannot be stored in public Storage buckets
- Project transfers to non-HIPAA orgs are blocked
- MFA must be enforced org-wide
- Point-in-Time Recovery required (small compute add-on)

**Strategic flag:** First healthcare customer takes Supabase from $25 to $800/mo. Enterprise pricing must support this.

---

## Vendor 2 — Vercel

| Field | Value |
|-------|-------|
| BAA Available | Yes |
| Required Plan | Pro plan with HIPAA add-on (NEW — used to be Enterprise-only) |
| Pro Plan Cost | $20/seat/month |
| HIPAA Add-On | $350/month |
| Total Monthly | $370/mo |
| Execute via | Pro dashboard → Settings → Billing → HIPAA add-on |
| Coverage | Edge Network, Functions, Edge Config, KV storage, build pipeline, env vars, Static IPs |
| Certifications | SOC 2, HIPAA |
| Activation time | Same-day (self-serve) |

**Notes:**
- Vercel Secure Compute (Enterprise-only) recommended for highest-sensitivity workloads but not strictly required
- HIPAA BAA covers entire global infrastructure (multi-region)
- Annual HIPAA audit conducted by Vercel
- Self-serve activation in dashboard — no sales call required

---

## Vendor 3 — Resend (REPLACEMENT REQUIRED)

| Field | Value |
|-------|-------|
| BAA Available | **No** |
| Status | **Cannot serve healthcare customers** |

**Replacement options (in order of recommendation for ReCapture):**

### Option A: Paubox (fastest activation)
- **Cost:** $99-499/mo depending on volume tier
- **BAA:** Included with all paid plans
- **Activation time:** Same-day, self-serve
- **Pros:** Drop-in API replacement for transactional email, healthcare-native
- **Cons:** More expensive than Resend at scale

### Option B: AWS SES (lowest cost)
- **Cost:** $0.10 per 1,000 emails (essentially free at low volume)
- **BAA:** AWS Business Associate Addendum required, separate from SES
- **Activation time:** 3-5 days (BAA execution + verification)
- **Pros:** Cheapest at scale, ironclad infrastructure
- **Cons:** More setup work, requires AWS account + IAM configuration

### Option C: Postmark (middle ground)
- **Cost:** $50-200/mo on Pro plan
- **BAA:** Available on Pro plan
- **Activation time:** 1-2 business days
- **Pros:** Good deliverability, simpler than AWS SES
- **Cons:** Still requires plan upgrade and switchover work

**Recommendation for first healthcare deal:** Start with Paubox for speed, evaluate AWS SES once you have 3+ healthcare customers and volume justifies the engineering investment.

---

## Vendor 4 — Twilio

| Field | Value |
|-------|-------|
| BAA Available | Yes (called Business Associate Addendum) |
| Required Plan | Security Edition or Enterprise Edition |
| HIPAA Compliance Fee | $5,000-15,000/year (negotiable 50% with 2-yr commitment) |
| Estimated Monthly | $417-1,250/mo (HIPAA fee only, on top of usage) |
| Execute via | Account manager / Twilio sales team |
| Coverage | Programmable SMS, Voice, MMS, SIP, Runtime tools |
| Certifications | HIPAA, SOC 2, ISO 27001 |
| Activation time | 5-10 days (sales call + edition upgrade + BAA execution) |

**Restrictions:**
- Pay-as-you-go accounts are NOT eligible — must upgrade to Security or Enterprise Edition
- HIPAA fee is in addition to per-message and per-minute usage charges
- Sales call required for execution
- Customer must architect workflow per "Architecting for HIPAA on Twilio" guide

**Negotiation note:** Vendr data shows HIPAA fees often negotiated 50% down with 2-year commitment. Get competitive quotes from Telnyx and Bandwidth before committing.

---

## Vendor 5 — Retell AI

| Field | Value |
|-------|-------|
| BAA Available | Yes |
| Required Plan | Pay-as-you-go (any plan) |
| HIPAA Add-On Cost | $0 (built into pay-as-you-go pricing) |
| Estimated Monthly | $0 incremental (standard usage rates only) |
| Execute via | https://click-agreements.retellai.com (self-signing portal) |
| Coverage | Voice AI agents, call recordings, transcripts, telephony layer |
| Certifications | HIPAA, GDPR, SOC 2 Type 1 & Type 2 |
| Activation time | Same-day (self-signing) |

**Notes:**
- Most customer-friendly HIPAA path in the stack — self-signing portal, no sales call, no minimum tier
- Customer-managed encryption keys available for added control
- Recommended: configure 30-day audio purge in retention policy
- Active sub-processors: AWS, Deepgram, OpenAI (each have own BAAs in place)

---

## Pricing Strategy for Healthcare Enterprise Tier

### Cost basis (mid-range estimates)
- Supabase: $850/mo
- Vercel: $370/mo
- Twilio: $625/mo (HIPAA fee, mid-range, before usage)
- Retell: $0 incremental
- Email replacement (Paubox mid-tier): $250/mo
- **Total fixed infrastructure: ~$2,095/mo**

### Recommended Enterprise pricing for healthcare
- **Floor: $2,997/mo per customer** (1.4x cost coverage)
- **Target: $3,997-4,997/mo per customer** (2x cost coverage, healthy margin)
- **Custom Enterprise: $5,000+/mo for multi-location practices, custom integrations**

### Volume thresholds
- 1 healthcare customer at $2,997/mo: thin margin, infrastructure is paid but no profit
- 3 healthcare customers at $3,997/mo: $11,991/mo MRR vs ~$2,500 cost = healthy ~$9,500/mo gross
- 10 healthcare customers at $3,997/mo: $39,970/mo MRR vs ~$3,500 cost = strong ~$36,500/mo gross

### Sales conversation framing
> "Our HIPAA-ready architecture is built into ReCapture across all plans. BAAs are activated for Enterprise customers upon signed commitment, with full deployment within 7-14 days. Healthcare deployments start at $2,997/mo for a single location, scaling based on lead volume and integration complexity."

---

## Action Items (When First Healthcare Prospect Engages Seriously)

1. Pull this document for reference
2. Send standard BAA template (live at /baa) to prospect for legal review
3. Quote Enterprise pricing per the strategy above
4. On signed contract: execute the activation sequence (Day 1-14 above)
5. Update /trust subprocessor list to reflect activated BAAs

---

## When to Refresh This Document

- When any vendor announces HIPAA tier changes
- When ReCapture activates first BAA (move from "ready" to "activated")
- After every new healthcare deal (record activation actuals vs estimates)
- Annual review (BAA renewal cycles)

---

*Last updated: May 8, 2026*
*Next review: November 8, 2026 (or upon first healthcare contract)*
