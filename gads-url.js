#!/usr/bin/env node
// Prints the Google Ads scheduled-import URL for each active client.
// The client pastes their URL into Google Ads under
// Goals > Conversions > Uploads > Schedules.
//
// The URL is a credential: anyone holding it can read that client's
// gclids. Rotating UNSUBSCRIBE_SECRET invalidates every URL at once.
//
//   node gads-url.js            all active clients
//   node gads-url.js ESD        clients whose name matches, case-insensitive

const fs = require('fs')
const { createHmac } = require('crypto')

const env = Object.fromEntries(
  fs.readFileSync(__dirname + '/.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]
    })
)

const SECRET = env.GADS_FEED_SECRET
const BASE = env.NEXT_PUBLIC_BASE_URL || 'https://www.userecapture.com'
const filter = (process.argv[2] || '').toLowerCase()

if (!SECRET) {
  console.error('GADS_FEED_SECRET not found in .env.local')
  process.exit(1)
}

;(async () => {
  const res = await fetch(
    `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients?select=id,name,active,google_conversion_action_name&active=eq.true&order=name`,
    { headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` } }
  )
  if (!res.ok) {
    console.error('Supabase query failed:', res.status, await res.text())
    process.exit(1)
  }
  const clients = await res.json()
  const matched = clients.filter(c => !filter || c.name.toLowerCase().includes(filter))

  if (!matched.length) {
    console.log('No active clients matched.')
    return
  }

  for (const c of matched) {
    const token = createHmac('sha256', SECRET).update(`gads:${c.id}`).digest('hex').slice(0, 32)
    console.log('\n' + c.name)
    console.log('  conversion action name: ' + (c.google_conversion_action_name || 'NOT SET -- file will be empty until this is filled in'))
    console.log('  ' + `${BASE}/api/conversions/google?c=${c.id}&t=${token}`)
  }
  console.log('')
})()
