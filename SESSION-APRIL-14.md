# RECAPTURE BUILD SESSION — April 13-14, 2026

## COMPLETED THIS SESSION

### Site Features Built
- **Live Demo page rewrite** — real-time dashboard shows prospect data as they type (split layout, form left, dashboard right)
- **ROI Estimator** — interactive calculator at /calculator with industry data, ad spend comparison, sourced stats from Baymard/Zuko/Contentsquare
- **6 industry landing pages** — /for-luxury-real-estate, /for-luxury-auto, /for-plastic-surgery, /for-property-management, /for-med-spas, /for-dental
- **Dashboard mockups** on all 6 industry pages with industry-specific fake lead data
- **Industries section on homepage** — 3x2 grid desktop, animated accordion mobile
- **Compare page mobile** — stacked feature cards instead of horizontal scrolling table
- **Comparison table updated** — added ROI Estimator, Interactive Live Demo, Revenue-at-risk dashboard rows
- **ScrollReveal animations** — fade-in on scroll across all pages (CSS IntersectionObserver)
- **Admin dashboard rebuilt** — inline dropdown expansion, search, activity feed, trial warnings, copy buttons, mobile responsive
- **Admin link** in client dashboard (asherton.c@me.com only)
- **Test client report endpoint** — /api/test-client-report for previewing client emails
- **Test mode on weekly report** — ?test=true redirects all emails to admin only
- **Google Analytics 4** — G-132TK8H7D9 wired into layout.tsx via Next.js Script

### Site Fixes
- Logo unified as PNG image across all pages (nav + footer)
- Nav active underline fixed for Pricing
- Duplicate footer removed from About page
- Insights page hero redesigned (centered, matches site pattern)
- Compare page spacing fixed
- Blog.css .logo-accent font-size conflict resolved
- Global nav/logo CSS in globals.css
- All accordions default closed on mobile
- Accordion numbers/icons always orange for uniform styling
- Industries accordion hidden on desktop, shown on mobile
- Hamburger menu animated slide-down with blur backdrop
- Industry pages mobile responsive (stacked grids, full-width CTAs)
- Testimonial names: Richie to Richard, Dave to David, Mike to Michael
- Comped accounts excluded from MRR (admin dashboard + cron report)
- Canonical URLs updated to www.userecapture.com
- Sitemap updated with www URLs + all new pages
- SPF record fixed — added include:send.resend.com
- Footer + nav uniform across all pages with ROI Estimator + industry links
- ROI Calculator renamed to ROI Estimator everywhere

### Outreach Status
- 76 total emails sent in April
- 58 delivered, 0 opened (deliverability issue — SPF was missing Resend)
- SPF FIXED on April 14 at 9:15am CST — emails should land in inbox now
- 16 bounced addresses identified and flagged
- Re-send batch of 25 contacts pending (delivered but never opened)
- New DFW targets being researched

### Bounced/Dead Addresses (REMOVE FROM ALL LISTS)
- tracy@summitapm.com
- Lenny@noelmanagement.com
- info@vivwellness.com
- a.cox@bellairemultifamily.com
- info@embermedspadallas.com
- mjarutowicz@decadental.com
- znutani@decadental.com
- media@vitalycmedspa.com (suppressed)

### Re-send List (25 contacts — delivered but 0 opens due to SPF issue)
1. luxedental@gmail.com
2. luxedentalvp@gmail.com
3. sales@earthmotorcars.com
4. info@enlightenmd.com
5. Hello@Sanjivamedspa.com
6. info@secretmedspa.com
7. Info@thescienceofbeautydallas.com
8. hello@glo30.com
9. dallas@hiatusspa.com
10. info@starwoodmedspa.com
11. info@totalmedsolutions.com
12. info@northtexasps.com
13. info@mintdentistry.com
14. info@thrivedentist.com
15. contact@billingsleyco.com
16. marketing@anterra.com
17. info@cafcapital.com
18. info@bodyloungeparkcities.com
19. contact@elevatemedicalspa.com
20. info@omnisculptmd.com
21. corporate@lumapm.com
22. info@compassmf.com
23. ccanava@decadental.com
24. info@myidealdental.com
25. sahmed@decadental.com

## PENDING
1. Build and send re-send emails (lightweight branded, new subject lines)
2. Research and send new DFW target batch
3. Friday blog post — due April 17
4. Verify SPF propagation (test email to Gmail)
5. Dashboard mobile tweaks (admin + client)
6. Demo form dedicated API key (still using Clear PH)
