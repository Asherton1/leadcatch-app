// Replaced by /api/send-recovery
import { NextResponse } from 'next/server'
export function POST() {
  return NextResponse.json(
    { error: 'This endpoint has moved to /api/send-recovery' },
    { status: 410 }
  )
}
