import { getApplicationsByApplicant } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicant(user.id);

  // Helper to format ISO dates to relative time
  const formatAppliedDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week(s) ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#161C28] p-1 rounded-xl border border-slate-800 flex items-center text-xs font-medium">
              <button className="px-4 py-1.5 rounded-lg bg-slate-800 text-white shadow-sm">
                Active
              </button>
              <button className="px-4 py-1.5 text-slate-400 hover:text-slate-200 transition">
                Archived
              </button>
            </div>

            <button className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#111622] border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-xs font-medium text-slate-400">Total Applied</p>
            <p className="text-2xl md:text-3xl font-bold mt-2">{jobs?.length || 0}</p>
          </div>
          <div className="bg-[#111622] border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-xs font-medium text-slate-400">Shortlisted</p>
            <p className="text-2xl md:text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-[#111622] border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-xs font-medium text-slate-400">Interviews</p>
            <p className="text-2xl md:text-3xl font-bold mt-2 text-amber-500">0</p>
          </div>
          <div className="bg-[#111622] border border-slate-800/80 p-5 rounded-2xl">
            <p className="text-xs font-medium text-slate-400">Success Rate</p>
            <p className="text-2xl md:text-3xl font-bold mt-2 text-emerald-500">0%</p>
          </div>
        </div>

        {/* Applications Table Card */}
        <div className="bg-[#111622] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Job Title</th>
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6">Applied</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-sm">
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id.toString()} className="hover:bg-slate-800/30 transition-colors">
                      {/* Job Title & Meta */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center font-bold text-slate-300 text-sm shrink-0">
                            {job.companyName ? job.companyName.charAt(0).toUpperCase() : 'J'}
                          </div>
                          <div>
                            <p className="font-semibold text-white hover:text-indigo-400 transition cursor-pointer">
                              {job.jobTitle}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Full-time • Remote
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Company Name */}
                      <td className="py-4 px-6 font-medium text-slate-300">
                        {job.companyName}
                      </td>

                      {/* Applied Relative Time */}
                      <td className="py-4 px-6 text-slate-400">
                        {formatAppliedDate(job.submittedAt || job.createdAt)}
                      </td>

                      {/* Application Status Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                          Applied
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <Link 
                          href={`/dashboard/seeker/jobs/${job.jobId}`} 
                          className="text-xs font-semibold text-slate-300 hover:text-white hover:underline transition"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 text-sm">
                      No applications found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationsPage;