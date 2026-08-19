import { getJobById } from '@/lib/api/jobs';
import Link from 'next/link';
import { 
  Pin, 
  Calendar, 
  CircleDollar, 
  Briefcase, 
  ArrowLeft, 
  Check, 
  Bookmark,
  Globe
} from '@gravity-ui/icons';

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Job Position Not Found</h1>
        <Link 
          href="/jobs" 
          className="inline-flex items-center gap-2 text-sm text-sky-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </Link>
      </main>
    );
  }

  // Safe formatting helpers
  const formatSalary = (val) => (val ? Number(val).toLocaleString() : null);
  
  const formatDeadline = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Convert newline-separated strings into arrays for clean bullet list rendering
  const parseMultiline = (text) => 
    text ? text.split('\n').filter((item) => item.trim().length > 0) : [];

  const responsibilitiesList = parseMultiline(job.responsibilities);
  const requirementsList = parseMultiline(job.requirements);
  const benefitsList = parseMultiline(job.benefits);

  const minSal = formatSalary(job.minSalary);
  const maxSal = formatSalary(job.maxSalary);

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        {/* Top Header Card */}
        <div className="bg-[#12141d] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.companyName || 'Company'} logo`}
                className="w-14 h-14 rounded-xl object-cover bg-black/50 border border-white/10"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-300 border border-white/10">
                {job.companyName ? job.companyName.charAt(0).toUpperCase() : 'C'}
              </div>
            )}

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {job.title || 'Untitled Position'}
              </h1>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                <span>{job.companyName || 'Company Unspecified'}</span>
                {job.status === 'active' && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Active Hiring
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-xl bg-[#1e202c] border border-white/10 text-zinc-300 hover:text-white transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <Link
              href={`/jobs/${id}/apply`}
              className="px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-sky-400 hover:text-white transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#12141d] border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase block mb-1 flex items-center gap-1.5">
              <CircleDollar className="w-3.5 h-3.5 text-sky-400" />
              Salary Range
            </span>
            <p className="text-sm font-bold text-white">
              {(minSal || maxSal)
                ? `${job.currency || 'USD'} $${minSal} - $${maxSal}`
                : 'Competitive'}
            </p>
          </div>

          <div className="bg-[#12141d] border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase block mb-1 flex items-center gap-1.5">
              <Pin className="w-3.5 h-3.5 text-sky-400" />
              Location
            </span>
            <p className="text-sm font-bold text-white">
              {job.location || 'N/A'} {job.isRemote ? '(Remote)' : ''}
            </p>
          </div>

          <div className="bg-[#12141d] border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase block mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              Job Type
            </span>
            <p className="text-sm font-bold text-white capitalize">
              {job.type || 'Full-time'}
            </p>
          </div>

          <div className="bg-[#12141d] border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              Deadline
            </span>
            <p className="text-sm font-bold text-white">
              {formatDeadline(job.deadline)}
            </p>
          </div>
        </div>

        {/* Main Content Body (Main Column + Sidebar Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Responsibilities */}
            {responsibilitiesList.length > 0 && (
              <div className="bg-[#12141d] border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white">Responsibilities</h2>
                <ul className="space-y-3">
                  {responsibilitiesList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {requirementsList.length > 0 && (
              <div className="bg-[#12141d] border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white">Requirements</h2>
                <ul className="space-y-3">
                  {requirementsList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefitsList.length > 0 && (
              <div className="bg-[#12141d] border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white">Benefits & Perks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefitsList.map((item, index) => (
                    <div key={index} className="bg-[#1e202c] border border-white/5 p-3 rounded-xl flex items-center gap-2.5 text-xs text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="h-fit">
            <div className="bg-[#12141d] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                Company Overview
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-medium mb-1">Company Name</span>
                  <span className="text-white text-sm font-medium">{job.companyName}</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-medium mb-1">Category</span>
                  <span className="text-white text-sm font-medium capitalize">{job.category?.replace('-', ' ')}</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-medium mb-1">Workplace Policy</span>
                  <span className="text-white text-sm font-medium">{job.isRemote ? 'Remote Allowed' : 'On-Site'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/jobs/${id}/apply`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-sky-400 text-slate-950 hover:text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-lg shadow-sky-500/10"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}