import {
  Magnifier,
  ChartLine,
  ChartColumn,
  Bookmark,
  LayoutHeaderCursor,
  FileText,
  DatabaseNutHex,
  ArrowUpRight,
} from '@gravity-ui/icons';

const featuresData = [
  {
    id: 1,
    title: 'Smart Search',
    description: 'Find your ideal job with advanced filters.',
    icon: Magnifier,
  },
  {
    id: 2,
    title: 'Salary Insights',
    description: 'Get real salary data to negotiate confidently.',
    icon: ChartLine,
  },
  {
    id: 3,
    title: 'Top Companies',
    description: 'Apply to vetted companies that are hiring.',
    icon: ChartColumn,
  },
  {
    id: 4,
    title: 'Saved Jobs',
    description: 'Manage apps & favorites on your dashboard.',
    icon: Bookmark,
  },
  {
    id: 5,
    title: 'One-Click Apply',
    description: 'Simplify your job applications for an easier process!',
    icon: LayoutHeaderCursor,
  },
  {
    id: 6,
    title: 'Resume Builder',
    description: 'Create professional resumes with modern templates.',
    icon: FileText,
  },
  {
    id: 7,
    title: 'Skill-Based Matching',
    description: 'Discover jobs that match your skills and experience.',
    icon: DatabaseNutHex,
  },
  {
    id: 8,
    title: 'Career Growth Resources',
    description: 'Boost your career with quick interview tips.',
    icon: ArrowUpRight,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0b0c0e] text-white py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-[#5b5bf0] rounded-sm inline-block"></span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7877f6]">
            FEATURES JOB
          </span>
          <span className="w-1.5 h-1.5 bg-[#5b5bf0] rounded-sm inline-block"></span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl font-medium text-center tracking-tight text-white mb-16 leading-tight">
          Everything you need <br /> to succeed
        </h2>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {featuresData.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="flex items-start gap-4">
                {/* Square Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-[#131418] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <IconComponent className="w-6 h-6 text-[#f580e9]" />
                </div>

                {/* Text Content */}
                <div className="pt-0.5">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}