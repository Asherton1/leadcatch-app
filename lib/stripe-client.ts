import { loadStripe, Stripe } from '@stripe/stripe-js'

// Singleton — loadStripe is async and should only be called once
let stripePromise: Promise<Stripe | null> | null = null

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')
  }
  return stripePromise
}

// Fonts to inject into each Stripe iframe so card inputs match Inter
export const STRIPE_FONTS = [
  {
    cssSrc:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
  },
]

// Shared base style applied to all three split card elements
const SPLIT_BASE = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '15px',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#444444' },
      iconColor: '#666666',
    },
    invalid: {
      color: '#f87171',
      iconColor: '#f87171',
    },
  },
} as const

export const CARD_NUMBER_OPTIONS = SPLIT_BASE
export const CARD_EXPIRY_OPTIONS = SPLIT_BASE
export const CARD_CVC_OPTIONS    = SPLIT_BASE
