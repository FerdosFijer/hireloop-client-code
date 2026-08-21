import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID ={
    'seeker_pro' : 'price_1U6RDORoMxeLwtzUp7klGVG6',
    'seeker_premium':'price_1U6SdlRoMxeLwtzUuaBpFgny',
    'recruiter_growth': 'price_1U6SekRoMxeLwtzUBPZbpK0M',
    'recruiter_enterprise': 'price_1U6SfQRoMxeLwtzU281SVm1L'
}