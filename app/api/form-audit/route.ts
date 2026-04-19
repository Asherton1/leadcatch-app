import { NextRequest, NextResponse } from 'next/server'

const RESEND_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { url, email } = body as { url: string; email: string }
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

    const avgLeadValue = 1500
    const monthlyVisitors = 500
    const formStarts = Math.round(monthlyVisitors * 0.15)
    const abandonedLeads = Math.round(formStarts * (estAbandonment / 100))
    const monthlyRevenueLost = abandonedLeads * avgLeadValue
    const yearlyRevenueLost = monthlyRevenueLost * 12

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

    const reportHTML = '<div style="background:#0a0a0a;color:#fff;font-family:Helvetica Neue,Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">' +
      '<div style="padding:40px 32px;border-bottom:2px solid #ff6b35;">' +
        '<div style="margin-bottom:24px;"><span style="color:#ff6b35;font-weight:800;font-size:18px;">[</span><span style="color:#ff6b35;font-size:8px;vertical-align:middle;">&#9679;</span><span style="color:#ff6b35;font-weight:800;font-size:18px;">]</span><span style="color:#fff;font-weight:700;font-size:16px;margin-left:6px;">Re</span><span style="color:#ff6b35;font-weight:700;font-size:16px;">Capture</span></div>' +
        '<h1 style="font-size:24px;font-weight:800;margin:0 0 8px;line-height:1.3;">Your Form Audit Report</h1>' +
        '<p style="color:#888;font-size:14px;margin:0;">Prepared for <strong style="color:#ff6b35;">' + url + '</strong></p>' +
      '</div>' +
      '<div style="padding:32px;">' +
        '<div style="background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:24px;margin-bottom:24px;">' +
          '<h2 style="color:#ff6b35;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Overview</h2>' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Forms Detected</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:600;">' + formCount + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Total Form Fields</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:600;">' + totalFields + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Form Builder</td><td style="color:#fff;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:600;">' + formBuilder + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Mobile Optimized</td><td style="color:' + (hasMobileViewport ? '#22c55e' : '#ef4444') + ';font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:600;">' + (hasMobileViewport ? 'Yes' : 'No') + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">HTTPS Secured</td><td style="color:' + (isHTTPS ? '#22c55e' : '#ef4444') + ';font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:600;">' + (isHTTPS ? 'Yes' : 'No') + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;">Field Count Risk</td><td style="color:' + (fieldRisk === 'low' ? '#22c55e' : fieldRisk === 'medium' ? '#f59e0b' : '#ef4444') + ';font-size:13px;padding:8px 0;text-align:right;font-weight:600;">' + fieldScore + '</td></tr>' +
          '</table>' +
        '</div>' +
        '<div style="background:#111;border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:24px;margin-bottom:24px;">' +
          '<h2 style="color:#ef4444;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Revenue at Risk</h2>' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Est. Abandonment Rate</td><td style="color:#ef4444;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:700;">' + estAbandonment + '%</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Est. Monthly Leads Lost</td><td style="color:#ef4444;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:700;">' + abandonedLeads + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;border-bottom:1px solid #1e1e1e;">Est. Monthly Revenue Lost</td><td style="color:#ef4444;font-size:16px;padding:8px 0;border-bottom:1px solid #1e1e1e;text-align:right;font-weight:800;">$' + monthlyRevenueLost.toLocaleString() + '</td></tr>' +
            '<tr><td style="color:#888;font-size:13px;padding:8px 0;">Est. Annual Revenue Lost</td><td style="color:#ef4444;font-size:16px;padding:8px 0;text-align:right;font-weight:800;">$' + yearlyRevenueLost.toLocaleString() + '</td></tr>' +
          '</table>' +
          '<p style="color:#666;font-size:11px;margin:12px 0 0;line-height:1.5;">Based on 500 monthly visitors, 15% form start rate, and $1,500 avg. client value. Your actual numbers may be higher.</p>' +
        '</div>' +
        '<div style="background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:24px;margin-bottom:24px;">' +
          '<h2 style="color:#ff6b35;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Findings</h2>' +
          findings.map(f => '<p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 8px;padding-left:16px;border-left:2px solid #1e1e1e;">' + f + '</p>').join('') +
        '</div>' +
        '<div style="background:#111;border:1px solid rgba(34,197,94,0.2);border-radius:12px;padding:24px;margin-bottom:32px;">' +
          '<h2 style="color:#22c55e;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Recommendations</h2>' +
          recommendations.map(r => '<p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 8px;padding-left:16px;border-left:2px solid rgba(34,197,94,0.2);">' + r + '</p>').join('') +
        '</div>' +
        '<div style="background:#ff6b35;border-radius:10px;padding:24px;text-align:center;">' +
          '<h2 style="color:#fff;font-size:18px;font-weight:700;margin:0 0 8px;">Start Recovering Lost Leads Today</h2>' +
          '<p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0 0 16px;">One script tag. No form changes. Results in 48 hours.</p>' +
          '<a href="https://userecapture.com/start-trial" style="display:inline-block;background:#fff;color:#ff6b35;font-weight:700;font-size:14px;padding:12px 32px;border-radius:6px;text-decoration:none;">Start Your Free Trial</a>' +
        '</div>' +
      '</div>' +
      '<div style="padding:24px 32px;border-top:1px solid #1e1e1e;text-align:center;">' +
        '<p style="color:#444;font-size:11px;margin:0;">ReCapture | userecapture.com | hello@userecapture.com | Dallas, Texas</p>' +
      '</div>' +
    '</div>'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: email,
        subject: 'Your Form Audit Report — ' + url,
        html: reportHTML,
      }),
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + RESEND_KEY },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: 'asherton.c@me.com',
        subject: 'New Form Audit Request — ' + url,
        html: '<p><strong>URL:</strong> ' + url + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Fields:</strong> ' + totalFields + '</p><p><strong>Est. abandonment:</strong> ' + estAbandonment + '%</p><p><strong>Monthly revenue at risk:</strong> $' + monthlyRevenueLost.toLocaleString() + '</p>',
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Form audit error:', err)
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 })
  }
}
