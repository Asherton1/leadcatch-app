'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AdminCheckResult {
  loading: boolean
  isAdmin: boolean
  email: string | null
}

/**
 * Hook to check if the current logged-in user is an admin.
 * Reads from clients.is_admin column. Replaces hardcoded email checks.
 *
 * Usage:
 *   const { loading, isAdmin } = useIsAdmin()
 *   if (loading) return <Spinner />
 *   if (!isAdmin) return <AccessDenied />
 */
export function useIsAdmin(): AdminCheckResult {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const check = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.email) {
          setLoading(false)
          return
        }
        setEmail(user.email)

        const { data, error } = await supabase
          .from('clients')
          .select('is_admin')
          .eq('email', user.email)
          .maybeSingle()

        if (error) {
          console.error('[useIsAdmin] DB error:', error)
        } else if (data?.is_admin) {
          setIsAdmin(true)
        }
      } catch (err) {
        console.error('[useIsAdmin] check failed:', err)
      } finally {
        setLoading(false)
      }
    }
    check()
  }, [])

  return { loading, isAdmin, email }
}
