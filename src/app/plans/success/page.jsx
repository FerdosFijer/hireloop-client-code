import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createSubscription } from '@/lib/actions/subscriptions';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details, line_items, amount_total, currency, metadata } = session;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    const subsInfo = {
      email: customer_details?.email,
      planId: metadata.planId
    }
    const result = await createSubscription(subsInfo);
    console.log(result);
    
    const formattedAmount = (amount_total / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: currency ? currency.toUpperCase() : 'USD',
    });

    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Animated Checkmark Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-sm text-zinc-400">
              Thank you for your purchase. Your account has been updated.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 space-y-3 text-sm mb-6">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Billed to</span>
              <span className="font-medium text-zinc-200 truncate max-w-[200px]">
                {customer_details?.email}
              </span>
            </div>

            {line_items?.data?.[0]?.description && (
              <div className="flex justify-between items-center text-zinc-400">
                <span>Plan Purchased</span>
                <span className="font-medium text-zinc-200">
                  {line_items.data[0].description}
                </span>
              </div>
            )}

            <div className="border-t border-zinc-800/60 pt-3 flex justify-between items-center font-semibold text-white">
              <span>Total Paid</span>
              <span className="text-emerald-400 text-base">{formattedAmount}</span>
            </div>
          </div>

          {/* Help Notice */}
          <p className="text-xs text-center text-zinc-500 mb-8 leading-relaxed">
            A receipt has been sent to{' '}
            <span className="text-zinc-400 font-medium">{customer_details?.email}</span>.
            If you have questions, contact{' '}
            <a
              href="mailto:orders@example.com"
              className="text-blue-400 hover:underline transition"
            >
              orders@example.com
            </a>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/jobs"
              className="w-full py-2.5 px-4 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-sm"
            >
              Explore Jobs
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 px-4 text-center text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition"
            >
              Go to Home
            </Link>
          </div>

        </div>
      </div>
    );
  }
}