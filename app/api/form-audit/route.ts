import { NextRequest, NextResponse } from 'next/server'

const RESEND_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { url, email, name, dryRun, industryHint, delay } = body as { url: string; email: string; name?: string; dryRun?: boolean; industryHint?: string; delay?: boolean }
  if (!url || !email) {
    return NextResponse.json({ error: 'URL and email required' }, { status: 400 })
  }

  try {
    const siteRes = await fetch(url.startsWith('http') ? url : 'https://' + url, {
      headers: { 'User-Agent': 'ReCapture Form Audit Bot/1.0' },
    })
    const html = await siteRes.text()

    const formCount = (html.match(/<form/gi) || []).length
    // Count only FILLABLE fields. Exclude hidden/submit/button/checkbox/radio/
    // search so search boxes, newsletter inputs and tracking fields don't
    // inflate the count (this is what made a portfolio site read as 42 fields).
    const skipTypes = new Set(['hidden', 'submit', 'button', 'reset', 'image', 'checkbox', 'radio', 'search'])
    const inputTags = html.match(/<input[^>]*>/gi) || []
    let inputCount = 0
    for (const tag of inputTags) {
      const tm = tag.match(/type=["']?([a-zA-Z]+)/i)
      const t = tm ? tm[1].toLowerCase() : 'text'
      if (!skipTypes.has(t)) inputCount++
    }
    const textareaCount = (html.match(/<textarea/gi) || []).length
    const selectCount = (html.match(/<select/gi) || []).length
    // Use the LARGEST single form (the primary lead form), not the sum of
    // every form on the page. Summing made multi-form sites (contact +
    // newsletter + quote) read as one oversized form.
    const totalFields = (() => {
      const skip = new Set(['hidden','submit','button','reset','image','checkbox','radio','search'])
      const countIn = (chunk: string): number => {
        let n = 0
        for (const tag of (chunk.match(/<input[^>]*>/gi) || [])) {
          const tm = tag.match(/type=["']?([a-zA-Z]+)/i)
          if (!skip.has((tm ? tm[1] : 'text').toLowerCase())) n++
        }
        n += (chunk.match(/<textarea/gi) || []).length
        n += (chunk.match(/<select/gi) || []).length
        return n
      }
      const forms = html.match(/<form[\s\S]*?<\/form>/gi) || []
      if (forms.length === 0) return inputCount + textareaCount + selectCount
      let max = 0
      for (const f of forms) { const c = countIn(f); if (c > max) max = c }
      return max
    })()
    const hasTypeform = /typeform/i.test(html)
    const hasHubspot = /hubspot|hs-form/i.test(html)
    const hasJotform = /jotform/i.test(html)
    const hasGravity = /gform|gravity/i.test(html)
    const hasWPForms = /wpforms/i.test(html)
    const hasContactForm7 = /wpcf7/i.test(html)
    const hasMobileViewport = /viewport.*width=device-width/i.test(html)
    const hasGTM = /googletagmanager|gtag/i.test(html)
    const hasGA = /google-analytics|gtag|G-/i.test(html)
    const hasMetaPixel = /fbq|facebook.*pixel|meta.*pixel/i.test(html)
    const isHTTPS = url.startsWith('https') || siteRes.url.startsWith('https')
    const hasCaptcha = /recaptcha|hcaptcha|turnstile/i.test(html)

    let formBuilder = 'Custom/Native HTML'
    if (hasTypeform) formBuilder = 'Typeform (iFrame)'
    else if (hasHubspot) formBuilder = 'HubSpot Forms'
    else if (hasJotform) formBuilder = 'Jotform'
    else if (hasGravity) formBuilder = 'Gravity Forms'
    else if (hasWPForms) formBuilder = 'WPForms'
    else if (hasContactForm7) formBuilder = 'Contact Form 7'

    const fieldScore = totalFields <= 4 ? 'Good' : totalFields <= 7 ? 'Moderate' : 'High Risk'
    const fieldRisk = totalFields <= 4 ? 'low' : totalFields <= 7 ? 'medium' : 'high'
    let estAbandonment = 45
    if (totalFields <= 3) estAbandonment = 35
    else if (totalFields <= 5) estAbandonment = 50
    else if (totalFields <= 7) estAbandonment = 62
    else if (totalFields <= 10) estAbandonment = 72
    else estAbandonment = 80


    // Auto-detect industry from site content
    const htmlLower = html.toLowerCase()
    // Auto-detect industry from HIGH-SIGNAL fields only (title, meta,
    // headings) rather than the whole page, then SCORE matches. This stops
    // stray body words from forcing a wrong industry (e.g. an agency that
    // mentions 'property' for its clients). No strong match -> General Business.
    const extractSignal = (raw: string): string => {
      const parts: string[] = []
      const grab = (re: RegExp) => { const x = raw.match(re); if (x && x[1]) parts.push(x[1]) }
      grab(/<title[^>]*>([\s\S]*?)<\/title>/i)
      grab(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      grab(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
      grab(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
      const heads = raw.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi) || []
      for (const h of heads.slice(0, 8)) parts.push(h.replace(/<[^>]+>/g, ' '))
      return parts.join(' ').toLowerCase().replace(/\s+/g, ' ')
    }
    const signal = extractSignal(html)

    const INDUSTRY_RULES: Array<{ name: string; value: number; patterns: RegExp[] }> = [
      { name: 'Plastic Surgery', value: 8500, patterns: [/plastic surg/, /rhinoplast/, /breast augment/, /facelift/, /liposuction/, /tummy tuck/, /cosmetic surg/] },
      { name: 'Fertility', value: 12000, patterns: [/fertility/, /\bivf\b/, /reproductive/, /egg freez/, /embryo transfer/] },
      { name: 'Luxury Real Estate', value: 15000, patterns: [/real estate/, /luxury home/, /\bmls\b/, /open house/, /realtor/, /luxury condo/] },
      { name: 'LASIK / Eye Care', value: 4200, patterns: [/lasik/, /ophthalmolog/, /eye care/, /cataract/, /vision correct/, /\bprk\b/, /refractive/] },
      { name: 'Dental', value: 3500, patterns: [/dental/, /dentist/, /orthodont/, /invisalign/, /veneer/, /teeth whiten/, /dental implant/] },
      { name: 'Med Spa', value: 2800, patterns: [/med spa/, /medspa/, /botox/, /dermal filler/, /laser hair/, /hydrafacial/, /coolsculpt/, /aesthetic clinic/] },
      { name: 'Dermatology', value: 2200, patterns: [/dermatolog/, /skin cancer/, /\bacne\b/, /eczema/, /psoriasis/, /\bmohs\b/] },
      { name: 'Property Management', value: 1800, patterns: [/property manage/, /\bleasing\b/, /apartment/, /multifamily/, /\btenant/, /floor plan/] },
      { name: 'Legal', value: 5000, patterns: [/\battorney/, /\blawyer/, /law firm/, /personal injury/] },
      { name: 'Chiropractic', value: 1200, patterns: [/chiropract/, /spinal decompress/, /back pain relief/] },
    ]

    let detectedIndustry = 'General Business'
    let industryLeadValue = 1500
    let bestScore = 0
    for (const rule of INDUSTRY_RULES) {
      let score = 0
      for (const p of rule.patterns) { if (p.test(signal)) score++ }
      if (score > bestScore) { bestScore = score; detectedIndustry = rule.name; industryLeadValue = rule.value }
    }
    if (bestScore === 0) { detectedIndustry = 'General Business'; industryLeadValue = 1500 }

    // ---- AI classification (Claude Haiku) ----
    // Tries Claude first so ANY business type is recognized, not just the
    // hand-coded list above. On missing key / failure / bad JSON it silently
    // keeps the keyword result. Skipped when an explicit industryHint is given.
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (!industryHint && anthropicKey && signal.replace(/\s/g, '').length >= 40) {
      try {
        const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 100,
            temperature: 0,
            messages: [{
              role: 'user',
              content: 'You are identifying what a business actually does, from its website text below. Return ONLY a JSON object and nothing else.\n\nFirst, read the text and name the business INDUSTRY accurately and specifically, based on what they truly do. Style of answer: "Breast Ultrasound Screening", "Wedding Photographer", "HVAC Repair", "Med Spa". Do NOT force the business into any preset list. Name what it actually is, even if it is not a category below.\n\nThen set leadValue = the average gross dollar value of ONE new customer for that industry. Use the following ONLY as dollar calibration reference points, NEVER as a menu of industries to choose from: Med Spa ~2800, Dental ~3500, Plastic Surgery ~8500, Eye Care or LASIK ~4200, Luxury Real Estate ~15000, Fertility ~12000, Dermatology ~2200, Property Management ~1800, Legal ~5000, Chiropractic ~1200, Luxury Auto ~7500, general small business ~1500. Pick a dollar number that fits the actual business you named.\n\nReturn exactly this shape and nothing else: {"industry":"<the accurate industry you identified>","leadValue":<integer dollars>}\n\nWebsite text:\n' + signal.slice(0, 1500),
            }],
          }),
        })
        if (aiRes.ok) {
          const aiData = await aiRes.json()
          const aiText: string = aiData?.content?.[0]?.text || ''
          const aiParsed = JSON.parse(aiText.replace(/```json|```/g, '').trim())
          if (aiParsed && typeof aiParsed.industry === 'string' && typeof aiParsed.leadValue === 'number') {
            detectedIndustry = aiParsed.industry
            industryLeadValue = Math.max(500, Math.min(Math.round(aiParsed.leadValue), 50000))
          }
        }
      } catch {
        // keep keyword fallback silently
      }
    }



    // Override auto-detection with industryHint if provided
    if (industryHint) {
      const hint = industryHint.toLowerCase().trim()
      const mapping: Array<[string, string, number]> = [
        ['plastic surg', 'Plastic Surgery', 8500],
        ['cosmetic surg', 'Plastic Surgery', 8500],
        ['med spa', 'Med Spa', 2800],
        ['medspa', 'Med Spa', 2800],
        ['lasik', 'LASIK / Eye Care', 4200],
        ['eye care', 'LASIK / Eye Care', 4200],
        ['fertility', 'Fertility', 12000],
        ['ivf', 'Fertility', 12000],
        ['dental', 'Dental', 3500],
        ['dentist', 'Dental', 3500],
        ['dermatolog', 'Dermatology', 2200],
        ['property', 'Property Management', 1800],
        ['multifamily', 'Property Management', 1800],
        ['leasing', 'Property Management', 1800],
        ['luxury real estate', 'Luxury Real Estate', 15000],
        ['real estate', 'Luxury Real Estate', 15000],
        ['chiro', 'Chiropractic', 1200],
        ['legal', 'Legal', 5000],
        ['attorney', 'Legal', 5000],
        ['lawyer', 'Legal', 5000],
        ['healthcare', 'General Business', 1500],
      ]
      for (const [key, industry, value] of mapping) {
        if (hint.includes(key)) {
          detectedIndustry = industry
          industryLeadValue = value
          break
        }
      }
    }

    const avgLeadValue = industryLeadValue
        const monthlyVisitors = 500
    const formStarts = Math.round(monthlyVisitors * 0.06)
    const abandonedLeads = Math.round(formStarts * (estAbandonment / 100))
    const monthlyRevenueLost = abandonedLeads * avgLeadValue
    const yearlyRevenueLost = monthlyRevenueLost * 12

    // Form Health Score (A-F)
    let healthScore = 100
    if (totalFields > 7) healthScore -= 25
    else if (totalFields > 4) healthScore -= 10
    if (!hasMobileViewport) healthScore -= 20
    if (!isHTTPS) healthScore -= 25
    if (!hasGTM && !hasGA) healthScore -= 15
    if (hasCaptcha) healthScore -= 10
    if (formCount === 0) healthScore -= 5
    const grade = healthScore >= 90 ? 'A' : healthScore >= 80 ? 'B' : healthScore >= 70 ? 'C+' : healthScore >= 60 ? 'C' : healthScore >= 50 ? 'D' : 'F'
    const gradeColor = healthScore >= 80 ? '#22c55e' : healthScore >= 60 ? '#f59e0b' : '#ef4444'

    // Industry benchmarks
    const industryBenchmarks = [
      { industry: 'Med Spas', avgFields: 5, avgAbandonment: 67, avgLeadValue: 2800 },
      { industry: 'Cosmetic Dental', avgFields: 6, avgAbandonment: 65, avgLeadValue: 3500 },
      { industry: 'Plastic Surgery', avgFields: 7, avgAbandonment: 72, avgLeadValue: 8500 },
      { industry: 'Property Management', avgFields: 8, avgAbandonment: 70, avgLeadValue: 1800 },
      { industry: 'Luxury Real Estate', avgFields: 6, avgAbandonment: 71, avgLeadValue: 15000 },
      { industry: 'LASIK / Eye Care', avgFields: 6, avgAbandonment: 68, avgLeadValue: 4200 },
    ]

    const findings: string[] = []
    const recommendations: string[] = []

    if (totalFields > 7) {
      findings.push('Your form has ' + totalFields + ' fields. Research shows each field beyond 4 increases abandonment by 5-10%.')
      recommendations.push('Reduce form fields to 4-5 essentials: name, email, phone, and service interest.')
    } else if (totalFields > 4) {
      findings.push('Your form has ' + totalFields + ' fields, slightly above the optimal 3-4 field range.')
      recommendations.push('Consider removing optional fields to reduce friction.')
    } else if (totalFields > 0) {
      findings.push('Your form has ' + totalFields + ' fields, within the optimal range for conversion.')
    }

    if (!hasMobileViewport) {
      findings.push('No mobile viewport detected. Your forms may not render properly on mobile devices where 60%+ of traffic originates.')
      recommendations.push('Add a mobile viewport meta tag and test forms on mobile devices.')
    }

    if (formCount === 0) {
      findings.push('No standard HTML forms detected. You may be using an embedded form builder.')
      if (hasTypeform || hasHubspot || hasJotform) {
        findings.push('Detected embedded form: ' + formBuilder + '. iFrame forms are harder to track for abandonment.')
      }
    }

    if (!hasGTM && !hasGA) {
      findings.push('No Google Analytics or Tag Manager detected. You have zero visibility into form interactions.')
      recommendations.push('Install Google Analytics 4 with form tracking events.')
    }

    if (!hasMetaPixel) {
      recommendations.push('Add Meta Pixel for retargeting visitors who abandon your forms.')
    }

    if (hasCaptcha) {
      findings.push('CAPTCHA detected. This adds friction and can increase abandonment by 10-15%.')
      recommendations.push('Consider invisible reCAPTCHA v3 to reduce friction.')
    }

    if (!isHTTPS) {
      findings.push('Site is not using HTTPS. This triggers browser security warnings and reduces trust.')
      recommendations.push('Install an SSL certificate immediately.')
    }

    recommendations.push('Install ReCapture to capture partial form data in real time, even when visitors abandon without submitting.')

    const personName = (typeof name === 'string' && name.trim()) ? name.trim() : ''
    const greeting = personName ? 'Hi ' + personName : 'Hi there'
    const gradeStatus = healthScore >= 90 ? 'Excellent' : healthScore >= 80 ? 'Strong' : healthScore >= 70 ? 'Above average' : healthScore >= 60 ? 'Room to grow' : healthScore >= 50 ? 'Needs work' : 'Critical'
    const gradeContext = healthScore >= 90 ? 'Top tier' : healthScore >= 80 ? 'Above average' : healthScore >= 70 ? 'Industry standard' : healthScore >= 60 ? 'Below average' : healthScore >= 50 ? 'Bottom quartile' : 'Significant risk'
    const gradeDescription = healthScore >= 90
      ? 'Your forms are well-configured for capture. Minor opportunities remain to recover the leads who don&rsquo;t make it through the final submit.'
      : healthScore >= 80
      ? 'Your forms are solid but missing the recovery layer that catches the visitors who type and don&rsquo;t submit.'
      : healthScore >= 70
      ? 'Your forms work, but meaningful revenue is leaving through abandonment.'
      : healthScore >= 60
      ? 'Your forms have gaps. Most of your form starters never become leads.'
      : healthScore >= 50
      ? 'Your forms are losing significant revenue. The recovery opportunity here is substantial.'
      : 'Your forms are bleeding revenue. Most visitors who start typing never convert and you have no visibility into them.'

    const reportHTML = '<div style="background:#0a0a0a;color:#fff;font-family:Inter,Helvetica Neue,Arial,sans-serif;max-width:640px;margin:0 auto;padding:0;">' +
      // HEADER
      '<div style="padding:48px 32px 24px;">' +
        '<div style="margin-bottom:48px;">' +
          '<span style="color:#ff6b35;font-weight:300;font-size:28px;line-height:1;vertical-align:-4px;">+</span>' +
          '<span style="color:#fff;font-weight:800;font-size:18px;margin-left:6px;letter-spacing:-0.01em;">Re</span>' +
          '<span style="color:#ff6b35;font-weight:800;font-size:18px;letter-spacing:-0.01em;">Capture</span>' +
        '</div>' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 16px;">Form Audit</p>' +
        '<h1 style="font-size:32px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin:0 0 12px;color:#fff;">' + greeting + ', your audit is ready.</h1>' +
        '<p style="color:#aaa;font-size:15px;line-height:1.6;margin:0;">Prepared for <span style="color:#ff6b35;">' + url + '</span></p>' +
      '</div>' +

      // SCORE — with life
      '<div style="padding:24px 32px 48px;">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Form Health Score</p>' +
        '<table style="border-collapse:collapse;margin-bottom:28px;"><tr>' +
          '<td style="vertical-align:middle;padding-right:28px;">' +
            '<span style="font-size:96px;font-weight:800;color:' + gradeColor + ';line-height:0.9;letter-spacing:-0.05em;">' + grade + '</span>' +
          '</td>' +
          '<td style="vertical-align:middle;border-left:1px solid rgba(255,255,255,0.08);padding-left:28px;">' +
            '<p style="color:' + gradeColor + ';font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 8px;">' + gradeStatus + '</p>' +
            '<p style="color:#fff;font-size:22px;font-weight:700;margin:0 0 4px;letter-spacing:-0.02em;">' + healthScore + ' <span style="color:#666;font-weight:400;">/ 100</span></p>' +
            '<p style="color:#888;font-size:12px;margin:0;">' + gradeContext + '</p>' +
          '</td>' +
        '</tr></table>' +
        '<div style="height:3px;background:rgba(255,255,255,0.06);margin-bottom:20px;">' +
          '<div style="height:3px;background:' + gradeColor + ';width:' + healthScore + '%;"></div>' +
        '</div>' +
        '<p style="color:#aaa;font-size:14px;line-height:1.6;margin:0;max-width:520px;">' + gradeDescription + '</p>' +
      '</div>' +

      // OVERVIEW
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Overview</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Detected Industry</td><td style="color:#fff;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + detectedIndustry + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Avg. Lead Value (' + detectedIndustry + ')</td><td style="color:#22c55e;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">$' + industryLeadValue.toLocaleString() + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Forms Detected</td><td style="color:#fff;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + formCount + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Total Form Fields</td><td style="color:#fff;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + totalFields + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Form Builder</td><td style="color:#fff;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + formBuilder + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Mobile Optimized</td><td style="color:' + (hasMobileViewport ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasMobileViewport ? 'Yes' : 'No') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">HTTPS Secured</td><td style="color:' + (isHTTPS ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (isHTTPS ? 'Yes' : 'No') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;">Field Count Risk</td><td style="color:' + (fieldRisk === 'low' ? '#22c55e' : fieldRisk === 'medium' ? '#f59e0b' : '#ef4444') + ';font-size:14px;padding:14px 0;text-align:right;font-weight:600;">' + fieldScore + '</td></tr>' +
        '</table>' +
      '</div>' +

      // REVENUE AT RISK
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Revenue at Risk</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Abandonment Rate</td><td style="color:#ef4444;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:700;">' + estAbandonment + '%</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Monthly Leads Lost</td><td style="color:#ef4444;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:700;">' + abandonedLeads + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Monthly Revenue Lost</td><td style="color:#ef4444;font-size:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:800;">$' + monthlyRevenueLost.toLocaleString() + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;">Est. Annual Revenue Lost</td><td style="color:#ef4444;font-size:18px;padding:14px 0;text-align:right;font-weight:800;">$' + yearlyRevenueLost.toLocaleString() + '</td></tr>' +
        '</table>' +
        '<p style="color:#666;font-size:12px;margin:24px 0 0;line-height:1.6;">Based on 500 monthly visitors, 6% form start rate, and $' + industryLeadValue.toLocaleString() + ' avg. ' + detectedIndustry + ' client value. Your actual numbers may be higher.</p>' +
      '</div>' +

      // FINDINGS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Findings</p>' +
        findings.map((f, i) =>
          '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><tr>' +
            '<td style="color:#ff6b35;font-size:11px;font-weight:700;letter-spacing:0.1em;width:32px;vertical-align:top;padding-top:4px;">' + String(i + 1).padStart(2, '0') + '</td>' +
            '<td style="color:#ccc;font-size:14px;line-height:1.7;">' + f + '</td>' +
          '</tr></table>'
        ).join('') +
      '</div>' +

      // TRACKING & ANALYTICS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Tracking &amp; Analytics</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Google Analytics / GTM</td><td style="color:' + (hasGA || hasGTM ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasGA || hasGTM ? 'Detected' : 'Not Found') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Meta / Facebook Pixel</td><td style="color:' + (hasMetaPixel ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasMetaPixel ? 'Detected' : 'Not Found') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">CAPTCHA / Bot Protection</td><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasCaptcha ? 'Yes (adds friction)' : 'None') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;">Form Abandonment Tracking</td><td style="color:#ef4444;font-size:14px;padding:14px 0;text-align:right;font-weight:700;">Not Installed</td></tr>' +
        '</table>' +
      '</div>' +

      // INDUSTRY BENCHMARKS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Industry Benchmarks</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Industry</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:center;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Avg Fields</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:center;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Abandon</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:right;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Lead Value</td></tr>' +
          industryBenchmarks.map(b => '<tr><td style="color:#ccc;font-size:13px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.industry + '</td><td style="color:#888;font-size:13px;padding:12px 0;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.avgFields + '</td><td style="color:#ef4444;font-size:13px;padding:12px 0;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.avgAbandonment + '%</td><td style="color:#22c55e;font-size:13px;padding:12px 0;text-align:right;border-bottom:1px solid rgba(255,255,255,0.04);">$' + b.avgLeadValue.toLocaleString() + '</td></tr>').join('') +
        '</table>' +
      '</div>' +

      // RECOMMENDATIONS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Recommendations</p>' +
        recommendations.map((r, i) =>
          '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><tr>' +
            '<td style="color:#ff6b35;font-size:11px;font-weight:700;letter-spacing:0.1em;width:32px;vertical-align:top;padding-top:4px;">' + String(i + 1).padStart(2, '0') + '</td>' +
            '<td style="color:#ccc;font-size:14px;line-height:1.7;">' + r + '</td>' +
          '</tr></table>'
        ).join('') +
      '</div>' +

      // FROM ASHERTON — personal note + CTA + full signature
      '<div style="padding:56px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#ff6b35;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">From Asherton</p>' +
        '<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px;max-width:520px;">A few months back I was a marketing consultant watching high-value leads slip through forms every week. I built ReCapture to fix that. If the numbers in your audit feel familiar &mdash; let&rsquo;s recover them.</p>' +
        '<p style="color:#aaa;font-size:14px;line-height:1.6;margin:0 0 32px;">One script tag. No form changes. Results inside 48 hours.</p>' +
        '<a href="https://userecapture.com/start-trial" style="color:#ff6b35;font-size:15px;font-weight:600;text-decoration:none;display:inline-block;margin-bottom:24px;">' +
          '<span style="margin-right:10px;font-weight:700;">&rarr;</span>Start your free trial' +
        '</a>' +
        '<p style="color:#888;font-size:13px;line-height:1.6;margin:0 0 40px;">Or just reply to this email and I&rsquo;ll set you up manually.</p>' +
        // Signature
        '<div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">' +
          '<p style="color:#fff;font-size:14px;font-weight:700;margin:0 0 4px;">Asherton Chraibi</p>' +
          '<p style="font-size:13px;margin:0 0 4px;">' +
            '<span style="color:#fff;">Founder, </span>' +
            '<span style="color:#ff6b35;font-weight:300;font-size:17px;line-height:1;vertical-align:-2px;">+</span>' +
            '<span style="color:#fff;font-weight:700;letter-spacing:-0.01em;margin-left:4px;">Re</span>' +
            '<span style="color:#ff6b35;font-weight:700;letter-spacing:-0.01em;">Capture</span>' +
          '</p>' +
          '<p style="color:#888;font-size:12px;margin:0 0 14px;">Recovering the leads your forms are losing.</p>' +
          '<p style="color:#ccc;font-size:13px;margin:0 0 4px;">(888) 606-0630 <span style="color:#666;">&mdash; Concierge line</span></p>' +
          '<p style="font-size:13px;margin:0 0 4px;"><a href="mailto:hello@userecapture.com" style="color:#ccc;text-decoration:none;">hello@userecapture.com</a></p>' +
          '<p style="font-size:13px;margin:0;"><a href="https://userecapture.com" style="color:#ccc;text-decoration:none;">www.userecapture.com</a></p>' +
        '</div>' +
      '</div>' +

      // FOOTER — matches site
      '<div style="padding:48px 32px 32px;border-top:1px solid rgba(255,255,255,0.06);background:#080808;">' +
        // Brand block
        '<div style="margin-bottom:32px;">' +
          '<div style="margin-bottom:12px;">' +
            '<span style="color:#ff6b35;font-weight:300;font-size:22px;line-height:1;vertical-align:-3px;">+</span>' +
            '<span style="color:#fff;font-weight:800;font-size:15px;margin-left:5px;letter-spacing:-0.01em;">Re</span>' +
            '<span style="color:#ff6b35;font-weight:800;font-size:15px;letter-spacing:-0.01em;">Capture</span>' +
          '</div>' +
          '<p style="color:#888;font-size:13px;line-height:1.6;margin:0;max-width:380px;">The recovery layer for high-ticket service businesses.<br>Capture every lead. Recover lost revenue.</p>' +
        '</div>' +
        '<div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>' +
        // Link grid
        '<table style="width:100%;border-collapse:collapse;margin-bottom:32px;"><tr style="vertical-align:top;">' +
          '<td style="width:33%;padding-right:16px;">' +
            '<p style="color:#777;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;margin:0 0 14px;">Product</p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/pricing" style="color:#aaa;font-size:13px;text-decoration:none;">Pricing</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/how-it-works" style="color:#aaa;font-size:13px;text-decoration:none;">How It Works</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/integrations" style="color:#aaa;font-size:13px;text-decoration:none;">Integrations</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/why-us" style="color:#aaa;font-size:13px;text-decoration:none;">Why Us</a></p>' +
            '<p style="margin:0;"><a href="https://userecapture.com/docs/api" style="color:#aaa;font-size:13px;text-decoration:none;">API Docs</a></p>' +
          '</td>' +
          '<td style="width:33%;padding-right:16px;">' +
            '<p style="color:#777;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;margin:0 0 14px;">Company</p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/about" style="color:#aaa;font-size:13px;text-decoration:none;">About</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/blog" style="color:#aaa;font-size:13px;text-decoration:none;">Insights</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/partners" style="color:#aaa;font-size:13px;text-decoration:none;">Partners</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/contact" style="color:#aaa;font-size:13px;text-decoration:none;">Contact</a></p>' +
            '<p style="margin:0;"><a href="https://userecapture.com/start-trial" style="color:#aaa;font-size:13px;text-decoration:none;">Start Trial</a></p>' +
          '</td>' +
          '<td style="width:33%;">' +
            '<p style="color:#777;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;margin:0 0 14px;">Trust &amp; Legal</p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/trust" style="color:#aaa;font-size:13px;text-decoration:none;">Trust &amp; Compliance</a></p>' +
            '<p style="margin:0 0 8px;"><a href="https://userecapture.com/baa" style="color:#aaa;font-size:13px;text-decoration:none;">HIPAA BAA</a></p>' +
            '<p style="margin:0;"><a href="https://userecapture.com/legal/client-privacy-template" style="color:#aaa;font-size:13px;text-decoration:none;">Privacy Template</a></p>' +
          '</td>' +
        '</tr></table>' +
        // Trust badge + copyright
        '<div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">' +
          '<table style="width:100%;border-collapse:collapse;"><tr>' +
            '<td style="vertical-align:middle;">' +
              '<span style="color:#22c55e;font-size:13px;font-weight:600;">&#9679;</span>' +
              '<span style="color:#aaa;font-size:13px;margin-left:6px;">HIPAA Compliant</span>' +
              '<span style="color:#444;padding:0 10px;">&middot;</span>' +
              '<a href="https://userecapture.com/baa" style="color:#888;font-size:13px;text-decoration:none;">BAA Available</a>' +
            '</td>' +
            '<td style="vertical-align:middle;text-align:right;">' +
              '<span style="color:#555;font-size:11px;">&copy; 2026 ReCapture &middot; Dallas, TX</span>' +
            '</td>' +
          '</tr></table>' +
        '</div>' +
      '</div>' +
    '</div>'
    // Dry run: return computed data without sending any emails
    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        detectedIndustry,
        grade,
        healthScore,
        totalFields,
        estAbandonment,
        monthlyRevenueLost,
        yearlyRevenueLost,
      })
    }

    // Build recipient payload. Send immediately by default (website form
    // requests + tests want it now). Only delay 2-3hr when delay:true is
    // passed — used for cold outreach so audits don't look bot-blasted.
    const recipientPayload: Record<string, unknown> = {
      from: 'ReCapture <hello@userecapture.com>',
      to: email,
      subject: 'Your ReCapture Form Audit Report — ' + url,
      html: reportHTML,
    }
    if (delay) {
      recipientPayload.scheduled_at = new Date(Date.now() + (Math.floor(Math.random() * 60 + 120) * 60 * 1000)).toISOString()
    }
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
      body: JSON.stringify(recipientPayload),
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: 'hello@userecapture.com',
        subject: 'New Form Audit Request — ' + url,
        html: '<p><strong>URL:</strong> ' + url + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Industry:</strong> ' + detectedIndustry + '</p><p><strong>Grade:</strong> ' + grade + ' (' + healthScore + '/100)</p><p><strong>Fields:</strong> ' + totalFields + '</p><p><strong>Est. abandonment:</strong> ' + estAbandonment + '%</p><p><strong>Monthly revenue at risk:</strong> $' + monthlyRevenueLost.toLocaleString() + '</p><p><strong>Annual revenue at risk:</strong> $' + yearlyRevenueLost.toLocaleString() + '</p>',
      }),
    })

    return NextResponse.json({
      success: true,
      detectedIndustry,
      grade,
      healthScore,
      totalFields,
      estAbandonment,
      monthlyRevenueLost,
      yearlyRevenueLost,
    })
  } catch (err) {
    console.error('Form audit error:', err)
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 })
  }
}
