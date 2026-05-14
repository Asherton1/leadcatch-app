#!/usr/bin/env python3
"""Adds forwarding PS to ReCapture outreach templates."""

import sys
from pathlib import Path

ROOT = Path('.')
ADMIN_FILE = ROOT / 'app/api/admin/outreach/route.ts'
CRON_FILE = ROOT / 'app/api/cron/outreach-queue/route.ts'

if not ADMIN_FILE.exists() or not CRON_FILE.exists():
    print('ERROR: Run from /Users/mac/leadcatch-app')
    sys.exit(1)

# Patch 1: admin/outreach/route.ts (Day 0)
admin_content = ADMIN_FILE.read_text()
if 'FORWARDING_PS_HTML' in admin_content:
    print(f'Already patched: {ADMIN_FILE}')
else:
    admin_marker = '// Merge tags\nconst COMPANY_FALLBACK'
    admin_addition = (
        '// Forwarding PS appended to every Day 0 cold outreach body.\n'
        "// The {company} merge tag gets substituted by mergeTags() below with\n"
        '// the vertical-aware fallback (your practice / your team / your dealership).\n'
        'const FORWARDING_PS_HTML = `<p style="color: #888; font-size: 13px; '
        "font-style: italic; margin-top: 28px; line-height: 1.5;\">"
        "P.S. If you're not the right person at {company}, a quick forward to "
        "whoever handles your website or marketing would mean a lot. Thanks "
        "either way.</p>`\n\n"
        '// Merge tags\nconst COMPANY_FALLBACK'
    )
    assert admin_content.count(admin_marker) == 1, 'admin anchor 1 not unique'
    admin_content = admin_content.replace(admin_marker, admin_addition)

    old_body_line = 'const personalizedBody = mergeTags(body_html, tagContext)'
    new_body_line = 'const personalizedBody = mergeTags(body_html + FORWARDING_PS_HTML, tagContext)'
    assert admin_content.count(old_body_line) == 1, 'admin anchor 2 not unique'
    admin_content = admin_content.replace(old_body_line, new_body_line)

    ADMIN_FILE.write_text(admin_content)
    print(f'Patched: {ADMIN_FILE}')

# Patch 2: cron/outreach-queue/route.ts (Day 4 + Day 10)
cron_content = CRON_FILE.read_text()
if 'function psHtml' in cron_content:
    print(f'Already patched: {CRON_FILE}')
else:
    sig_close_marker = '<a href="https://userecapture.com" style="color: #ff6b35;">www.userecapture.com</a></p>`'
    sig_close_replacement = (
        sig_close_marker
        + '\n\n'
        + '// Forwarding PS for Day 4 + Day 10 follow-ups.\n'
        + 'function psHtml(company: string | null | undefined): string {\n'
        + "  const c = company || 'your team'\n"
        + '  return `<p style="color: #888; font-size: 13px; font-style: italic; '
        + 'margin-top: 28px; line-height: 1.5;">'
        + "P.S. If you're not the right person at ${c}, a quick forward to "
        + 'whoever handles your website or marketing would mean a lot. '
        + 'Thanks either way.</p>`\n'
        + '}'
    )
    assert cron_content.count(sig_close_marker) == 1, 'cron anchor 1 not unique'
    cron_content = cron_content.replace(sig_close_marker, sig_close_replacement)

    old_template_close = '${SIGNATURE_HTML}\n</div>`'
    new_template_close = '${SIGNATURE_HTML}\n${psHtml(company)}\n</div>`'
    count = cron_content.count(old_template_close)
    print(f'Updating {count} template blocks (expect 14)')
    assert count >= 12, f'Expected 12+ template blocks, found {count}'
    cron_content = cron_content.replace(old_template_close, new_template_close)

    CRON_FILE.write_text(cron_content)
    print(f'Patched: {CRON_FILE}')

print('Done.')
