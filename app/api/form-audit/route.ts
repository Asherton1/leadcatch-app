import { NextRequest, NextResponse } from 'next/server'

const RESEND_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { url, email, dryRun, industryHint } = body as { url: string; email: string; dryRun?: boolean; industryHint?: string }
  if (!url || !email) {
    return NextResponse.json({ error: 'URL and email required' }, { status: 400 })
  }

  try {
    const siteRes = await fetch(url.startsWith('http') ? url : 'https://' + url, {
      headers: { 'User-Agent': 'ReCapture Form Audit Bot/1.0' },
    })
    const html = await siteRes.text()

    const formCount = (html.match(/<form/gi) || []).length
    const inputCount = (html.match(/<input/gi) || []).length
    const textareaCount = (html.match(/<textarea/gi) || []).length
    const selectCount = (html.match(/<select/gi) || []).length
    const totalFields = inputCount + textareaCount + selectCount
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
    let detectedIndustry = 'General Business'
    let industryLeadValue = 1500
    if (/med\s?spa|medspa|botox|filler|aesthetic|laser\s?hair|skin\s?care|hydrafacial|coolsculpt/i.test(html)) {
      detectedIndustry = 'Med Spa'
      industryLeadValue = 2800
    } else if (/dental|dentist|orthodont|invisalign|implant|veneer|crown|root\s?canal|teeth\s?whiten/i.test(html)) {
      detectedIndustry = 'Dental'
      industryLeadValue = 3500
    } else if (/plastic\s?surg|rhinoplast|breast\s?augment|facelift|liposuction|tummy\s?tuck|cosmetic\s?surg/i.test(html)) {
      detectedIndustry = 'Plastic Surgery'
      industryLeadValue = 8500
    } else if (/lasik|ophthalmolog|eye\s?care|cataract|vision\s?correct|prk|refractive/i.test(html)) {
      detectedIndustry = 'LASIK / Eye Care'
      industryLeadValue = 4200
    } else if (/property\s?manage|leasing|apartment|multifamily|tenant|rent|floor\s?plan|move.in/i.test(html)) {
      detectedIndustry = 'Property Management'
      industryLeadValue = 1800
    } else if (/real\s?estate|luxury\s?home|listing|mortgage|realtor|mls|open\s?house|condo/i.test(html)) {
      detectedIndustry = 'Luxury Real Estate'
      industryLeadValue = 15000
    } else if (/fertility|ivf|reproductive|egg\s?freez|embryo|obgyn|ob.gyn/i.test(html)) {
      detectedIndustry = 'Fertility'
      industryLeadValue = 12000
    } else if (/dermatolog|skin\s?cancer|acne|eczema|psoriasis|mohs/i.test(html)) {
      detectedIndustry = 'Dermatology'
      industryLeadValue = 2200
    } else if (/chiropractic|chiropractor|spinal|adjustment|back\s?pain/i.test(html)) {
      detectedIndustry = 'Chiropractic'
      industryLeadValue = 1200
    } else if (/attorney|lawyer|law\s?firm|legal|injury|accident/i.test(html)) {
      detectedIndustry = 'Legal'
      industryLeadValue = 5000
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
    const formStarts = Math.round(monthlyVisitors * 0.15)
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

    const reportHTML = '<div style="background:#0a0a0a;color:#fff;font-family:Inter,Helvetica Neue,Arial,sans-serif;max-width:640px;margin:0 auto;padding:0;">' +
      // HEADER
      '<div style="padding:48px 32px 24px;">' +
        '<div style="margin-bottom:48px;">' +
          '<span style="color:#ff6b35;font-weight:300;font-size:28px;line-height:1;vertical-align:-4px;">+</span>' +
          '<span style="color:#fff;font-weight:800;font-size:18px;margin-left:6px;letter-spacing:-0.01em;">Re</span>' +
          '<span style="color:#ff6b35;font-weight:800;font-size:18px;letter-spacing:-0.01em;">Capture</span>' +
        '</div>' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 16px;">Form Audit</p>' +
        '<h1 style="font-size:32px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin:0 0 16px;color:#fff;">Your audit is ready.</h1>' +
        '<p style="color:#aaa;font-size:15px;line-height:1.6;margin:0;">Prepared for <span style="color:#ff6b35;">' + url + '</span></p>' +
      '</div>' +

      // SCORE
      '<div style="padding:24px 32px 48px;">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 16px;">Form Health Score</p>' +
        '<span style="font-size:72px;font-weight:800;color:' + gradeColor + ';line-height:1;letter-spacing:-0.04em;vertical-align:middle;">' + grade + '</span>' +
        '<span style="color:#888;font-size:14px;vertical-align:middle;margin-left:16px;">' + healthScore + ' / 100</span>' +
      '</div>' +

      // OVERVIEW
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Overview</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Detected Industry</td><td style="color:#ff6b35;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + detectedIndustry + '</td></tr>' +
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
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Revenue at Risk</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Abandonment Rate</td><td style="color:#ef4444;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:700;">' + estAbandonment + '%</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Monthly Leads Lost</td><td style="color:#ef4444;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:700;">' + abandonedLeads + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Est. Monthly Revenue Lost</td><td style="color:#ef4444;font-size:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:800;">$' + monthlyRevenueLost.toLocaleString() + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;">Est. Annual Revenue Lost</td><td style="color:#ef4444;font-size:18px;padding:14px 0;text-align:right;font-weight:800;">$' + yearlyRevenueLost.toLocaleString() + '</td></tr>' +
        '</table>' +
        '<p style="color:#666;font-size:12px;margin:24px 0 0;line-height:1.6;">Based on 500 monthly visitors, 15% form start rate, and $' + industryLeadValue.toLocaleString() + ' avg. ' + detectedIndustry + ' client value. Your actual numbers may be higher.</p>' +
      '</div>' +

      // FINDINGS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Findings</p>' +
        findings.map((f, i) =>
          '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><tr>' +
            '<td style="color:#ff6b35;font-size:11px;font-weight:700;letter-spacing:0.1em;width:32px;vertical-align:top;padding-top:4px;">' + String(i + 1).padStart(2, '0') + '</td>' +
            '<td style="color:#ccc;font-size:14px;line-height:1.7;">' + f + '</td>' +
          '</tr></table>'
        ).join('') +
      '</div>' +

      // TRACKING & ANALYTICS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Tracking &amp; Analytics</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Google Analytics / GTM</td><td style="color:' + (hasGA || hasGTM ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasGA || hasGTM ? 'Detected' : 'Not Found') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Meta / Facebook Pixel</td><td style="color:' + (hasMetaPixel ? '#22c55e' : '#ef4444') + ';font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasMetaPixel ? 'Detected' : 'Not Found') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">CAPTCHA / Bot Protection</td><td style="color:#888;font-size:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;font-weight:600;">' + (hasCaptcha ? 'Yes (adds friction)' : 'None') + '</td></tr>' +
          '<tr><td style="color:#888;font-size:14px;padding:14px 0;">Form Abandonment Tracking</td><td style="color:#ef4444;font-size:14px;padding:14px 0;text-align:right;font-weight:700;">Not Installed</td></tr>' +
        '</table>' +
      '</div>' +

      // INDUSTRY BENCHMARKS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Industry Benchmarks</p>' +
        '<table style="width:100%;border-collapse:collapse;">' +
          '<tr><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Industry</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:center;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Avg Fields</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:center;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Abandon</td><td style="color:#555;font-size:10px;font-weight:700;padding:8px 0 16px;text-align:right;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.06);">Lead Value</td></tr>' +
          industryBenchmarks.map(b => '<tr><td style="color:#ccc;font-size:13px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.industry + '</td><td style="color:#888;font-size:13px;padding:12px 0;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.avgFields + '</td><td style="color:#ef4444;font-size:13px;padding:12px 0;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">' + b.avgAbandonment + '%</td><td style="color:#22c55e;font-size:13px;padding:12px 0;text-align:right;border-bottom:1px solid rgba(255,255,255,0.04);">$' + b.avgLeadValue.toLocaleString() + '</td></tr>').join('') +
        '</table>' +
      '</div>' +

      // RECOMMENDATIONS
      '<div style="padding:40px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 24px;">Recommendations</p>' +
        recommendations.map((r, i) =>
          '<table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><tr>' +
            '<td style="color:#ff6b35;font-size:11px;font-weight:700;letter-spacing:0.1em;width:32px;vertical-align:top;padding-top:4px;">' + String(i + 1).padStart(2, '0') + '</td>' +
            '<td style="color:#ccc;font-size:14px;line-height:1.7;">' + r + '</td>' +
          '</tr></table>'
        ).join('') +
      '</div>' +

      // CLOSING CTA — editorial, no card, no pill button
      '<div style="padding:56px 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#777;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 16px;">Next Step</p>' +
        '<h2 style="color:#fff;font-size:26px;font-weight:700;letter-spacing:-0.02em;margin:0 0 16px;line-height:1.25;">Recover the leads you\'re already paying for.</h2>' +
        '<p style="color:#aaa;font-size:15px;line-height:1.6;margin:0 0 32px;max-width:480px;">One script tag. No form changes. Results inside 48 hours.</p>' +
        '<a href="https://userecapture.com/start-trial" style="color:#fff;font-size:15px;font-weight:600;text-decoration:none;display:inline-block;">' +
          '<span style="color:#ff6b35;margin-right:10px;font-weight:700;">&rarr;</span>Start your free trial' +
        '</a>' +
      '</div>' +

      // FOOTER
      '<div style="padding:32px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<p style="color:#555;font-size:11px;margin:0;letter-spacing:0.02em;line-height:1.6;">ReCapture &nbsp;&middot;&nbsp; <a href="https://userecapture.com" style="color:#888;text-decoration:none;">userecapture.com</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@userecapture.com" style="color:#888;text-decoration:none;">hello@userecapture.com</a> &nbsp;&middot;&nbsp; Dallas, Texas</p>' +
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

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: email,
        scheduled_at: new Date(Date.now() + (Math.floor(Math.random() * 60 + 120) * 60 * 1000)).toISOString(),
        subject: 'Your ReCapture Form Audit Report — ' + url,
        html: reportHTML,
      }),
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
