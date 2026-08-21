import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/lib/api/application';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  } 

  if (user.role !== 'seeker') {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-zinc-950 text-white">
        <div className="max-w-md p-8 border border-zinc-800 bg-zinc-900/50 rounded-2xl backdrop-blur">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
          </p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById (user?.plan || 'seeker_free')
  // console.log(plan1);
  
  //! instead of plan line amra uporer line ta use korbo db theke data antesi
  /* const plan = {
    name: 'Free',
    maxApplicationsPerMonth: 3,
  }; */

  const job = await getJobById(id);
  const applicationCount = applications?.length || 0;
  const limitReached = applicationCount >= plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Usage & Plan Info Card */}
        <div className="p-6 border border-zinc-800 bg-zinc-900/60 rounded-2xl backdrop-blur flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {plan.name} Plan
              </span>
            </div>
            <p className="text-lg font-medium mt-2">
              You have applied so far:{' '}
              <span className={limitReached ? 'text-red-400 font-bold' : 'text-blue-400 font-bold'}>
                {applicationCount}
              </span>{' '}
              / {plan.maxApplicationsPerMonth}
            </p>
          </div>

          {limitReached && (
            <Link
              href="/plans"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-900 bg-white hover:bg-zinc-200 rounded-xl transition duration-150 whitespace-nowrap"
            >
              Upgrade Plan
            </Link>
          )}
        </div>

        {/* Dynamic State: Application Form or Limit Alert */}
        {!limitReached ? (
          <JobApply applicant={user} job={job} />
        ) : (
          <div className="p-8 border border-red-900/30 bg-red-950/10 rounded-2xl text-center space-y-3">
            <h3 className="text-xl font-semibold text-red-400">Application Limit Reached</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              You have reached your monthly application limit on the <span className="text-white font-medium">{plan.name}</span> plan. Upgrade your subscription to continue applying.
            </p>
            <div className="pt-2">
              <Link
                href="/plans"
                className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition"
              >
                View Upgrade Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;