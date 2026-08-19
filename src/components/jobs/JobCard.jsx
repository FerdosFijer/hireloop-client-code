import Link from 'next/link';
import { Card } from '@heroui/react';
import { Pin, ArrowRight, CircleDollar, Calendar } from '@gravity-ui/icons';

export default function JobCard({ job }) {
  // Safe extraction with fallback values
  const {
    _id ,
    title = 'Untitled Position',
    companyName = 'Company',
    companyLogo = '',
    type = 'Full-time',
    location = 'Location Unavailable',
    isRemote = false,
    minSalary = null,
    maxSalary = null,
    currency = 'USD',
    deadline = null,
    responsibilities = '',
  } = job || {};

  // Salary formatting helper
  const formatSalary = (val) => {
    if (!val) return null;
    const num = Number(val);
    return isNaN(num) ? val : num.toLocaleString();
  };

  // Safe Date formatting helper
  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formattedDeadline = formatDeadline(deadline);
  const formattedMin = formatSalary(minSalary);
  const formattedMax = formatSalary(maxSalary);

  return (
    <Card className="max-w-sm w-full bg-[#12141d] text-white rounded-2xl p-4 shadow-xl border border-white/5 flex flex-col justify-between">
      <Card.Header className="flex flex-col items-start gap-4 pb-2 p-0">
        {/* Company Logo & Name */}
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-10 h-10 rounded-lg object-cover bg-black/40 border border-white/10"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-zinc-400">
              {companyName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm font-medium text-zinc-300">
            {companyName}
          </span>
        </div>

        {/* Title & Type */}
        <div>
          <Card.Title className="text-2xl font-bold text-white tracking-tight leading-tight">
            {title}
          </Card.Title>
          <Card.Description className="text-xs text-zinc-400 capitalize mt-1">
            {type} • {isRemote ? 'Remote' : 'On-site'}
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="py-4 space-y-4 p-0">
        {/* Visual Pill Badges */}
        <div className="flex flex-wrap gap-2">
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 bg-[#1e202c] px-3 py-1.5 rounded-full text-xs text-zinc-200">
            <Pin className="text-pink-400 w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {location}
              {isRemote && location.toLowerCase() !== 'remote' ? ', Remote' : ''}
            </span>
          </div>

          {/* Deadline Badge */}
          {formattedDeadline && (
            <div className="flex items-center gap-1.5 bg-[#1e202c] px-3 py-1.5 rounded-full text-xs text-zinc-200">
              <Calendar className="text-pink-400 w-3.5 h-3.5 flex-shrink-0" />
              <span>Expires {formattedDeadline}</span>
            </div>
          )}

          {/* Salary Badge */}
          {(formattedMin || formattedMax) && (
            <div className="flex items-center gap-1.5 bg-[#1e202c] px-3 py-1.5 rounded-full text-xs text-zinc-200">
              <CircleDollar className="text-pink-400 w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {currency}{' '}
                {formattedMin && formattedMax
                  ? `${formattedMin} - ${formattedMax}`
                  : formattedMin || formattedMax}{' '}
                / mo
              </span>
            </div>
          )}
        </div>

        {/* Shortened Responsibilities summary */}
        {responsibilities && (
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {responsibilities.replace(/\n/g, ' ')}
          </p>
        )}
      </Card.Content>

      <Card.Footer className="pt-2 p-0">
        <Link
          href={_id ? `/jobs/${_id}` : '#'}
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-pink-400 transition-colors py-1 group"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
}