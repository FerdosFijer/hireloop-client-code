import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon / Illustration */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-lg shadow-red-500/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest text-red-400 uppercase">
            Error 403
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Access Denied
          </h1>
          <p className="text-sm text-slate-400">
            You don't have permission to access this page. Please check your account role or log in with an authorized account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Go to Home
          </Link>

          <Link
            href="/auth/signin"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}