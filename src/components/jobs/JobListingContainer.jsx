'use client';

import { useState, useMemo } from 'react';
import JobCard from "@/components/jobs/JobCard";
import JobFilter from './JobsFilter';


export default function JobListingContainer({ jobs = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [remoteFilter, setRemoteFilter] = useState('all');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search matching (Title, Company Name, Requirements)
      const matchesSearch =
        !searchQuery ||
        job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        categoryFilter === 'all' || job?.category === categoryFilter;

      // Type matching
      const matchesType =
        typeFilter === 'all' || job?.type === typeFilter;

      // Remote / Workplace matching
      const matchesRemote =
        remoteFilter === 'all' ||
        (remoteFilter === 'remote' && job?.isRemote) ||
        (remoteFilter === 'onsite' && !job?.isRemote);

      return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });
  }, [jobs, searchQuery, categoryFilter, typeFilter, remoteFilter]);

  return (
    <div className="space-y-6">
      {/* One-Liner Filter Bar */}
      <JobFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        remoteFilter={remoteFilter}
        setRemoteFilter={setRemoteFilter}
      />

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job?._id || job?.title} job={job} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-zinc-500">
            No positions match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}