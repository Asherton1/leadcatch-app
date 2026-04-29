import { createClient } from '@supabase/supabase-js'

// Server-side admin client — uses SERVICE_ROLE key.
// BYPASSES Row-Level Security. Use ONLY in API routes (app/api/**).
// NEVER import this in client components or pages.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
