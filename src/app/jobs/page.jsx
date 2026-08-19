import JobCard from "@/components/jobs/JobCard";
import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = (await getJobs()) || [];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header / Stats */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Available Positions
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Discover your next engineering challenge
            </p>
          </div>
          <span className="text-sm font-medium text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Total Jobs: {jobs.length}
          </span>
        </div>

        {/* Interactive Search & Filter Grid Wrapper */}
        <JobListingContainer jobs={jobs} />
      </div>
    </main>
  );
}


