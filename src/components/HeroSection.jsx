"use client";

import { Button, Input } from "@heroui/react";
import { Magnifier, MapPin, ArrowUpRight } from "@gravity-ui/icons";

const trendingJobs = [
  "Product Designer",
  "AI Engineer",
  "DevOps Engineer",
  "Frontend Developer",
  "Data Scientist",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[400px] w-full overflow-hidden bg-[#050507] px-4 py-20 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#5546ff]/20 blur-[120px] sm:h-[650px] sm:w-[650px]" />

      {/* Secondary glow */}
      <div className="pointer-events-none absolute left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#7c3aed]/10 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[0px] w-full max-w-6xl flex-col items-center justify-center text-center mt-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7166ff]/20 bg-[#7166ff]/10 px-4 py-2 text-xs font-medium text-[#aaa3ff] shadow-[0_0_30px_rgba(113,102,255,0.08)] sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b82ff] shadow-[0_0_10px_#8b82ff]" />
          <span>50,000+ new jobs this month</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Find Your{" "}
          <span className="bg-gradient-to-r from-[#8d84ff] via-[#b2aaff] to-[#7166ff] bg-clip-text text-transparent">
            Dream Job
          </span>{" "}
          Today
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-sm leading-6 text-white/50 sm:text-base sm:leading-7 lg:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role —
          faster.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#111113]/80 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:rounded-full sm:p-2">
          <div className="relative flex w-full items-center">
            <span className="pointer-events-none absolute left-4 z-10 flex items-center justify-center">
              <Magnifier className="h-4 w-4 text-white/40" />
            </span>
            <Input
              aria-label="Job title, skill or company"
              placeholder="Job title, skill or company"
              className="h-12 w-full pl-11 pr-4 text-sm text-white placeholder:text-white/35 rounded-xl bg-white/[0.04] border border-white/[0.06] shadow-none hover:bg-white/[0.06] focus:bg-white/[0.06] outline-none transition-colors sm:rounded-full"
            />
          </div>

          <div className="relative flex w-full items-center">
            <span className="pointer-events-none absolute left-4 z-10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white/40" />
            </span>
            <Input
              aria-label="Location or Remote"
              placeholder="Location or Remote"
              className="h-12 w-full pl-11 pr-4 text-sm text-white placeholder:text-white/35 rounded-xl bg-white/[0.04] border border-white/[0.06] shadow-none hover:bg-white/[0.06] focus:bg-white/[0.06] outline-none transition-colors sm:rounded-full"
            />
          </div>

          <Button
            size="lg"
            className="h-12 w-full rounded-xl bg-[#6658ff] px-8 font-medium text-white shadow-[0_0_25px_rgba(102,88,255,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#7568ff] hover:shadow-[0_0_35px_rgba(102,88,255,0.4)] sm:w-auto sm:rounded-full"
          >
            <Magnifier className="h-4 w-4 mr-1" />
            Search Jobs
          </Button>
        </div>

        {/* Trending */}
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <span className="text-xs font-medium text-white/35">
            Trending positions
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {trendingJobs.map((job) => (
              <button
                key={job}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/55 transition-all duration-300 hover:border-[#7166ff]/40 hover:bg-[#7166ff]/10 hover:text-[#aaa3ff]"
              >
                {job}
              </button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 sm:gap-10">
          <span>✓ Verified companies</span>
          <span>✓ Curated opportunities</span>
          <span>✓ Remote & onsite roles</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;