import Link from 'next/link';
import JobCard from '../jobs/JobCard';


export default function JobDiscoverySection({ jobs = [] }) {
  // Safe fallback to showcase cards matching the image layout if no data is passed
  const displayJobs = jobs.length > 0 ? jobs : Array(6).fill({});

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm inline-block"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Smart Job Discovery
          </span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm inline-block"></span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-medium text-center tracking-tight text-white mb-12 leading-tight">
          The roles you would never <br /> find by searching
        </h2>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full place-items-center">
          {displayJobs.slice(0, 6).map((job, idx) => (
            <JobCard key={job._id || idx} job={job} />
          ))}
        </div>

        {/* View All Button */}
        <Link
          href="/jobs"
          className="bg-white text-black font-medium text-sm px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors shadow-sm"
        >
          View all job open
        </Link>

      </div>
    </section>
  );
}