import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { client_id, webhook_url } = await req.json()
    if (!client_id) return NextResponse.json({ error: 'Missing client_id' }, { status: 400 })

    const { error } = await supabase
      .from('clients')
      .update({ webhook_url: webhook_url || null })
      .eq('id', client_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
