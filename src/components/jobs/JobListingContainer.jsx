"use client";

import { useState, useMemo, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilter from "./JobsFilter";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function JobListingContainer({ jobs, filters, total }) {
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [categoryFilter, setCategoryFilter] = useState( filters.category || "all",);
  const [typeFilter, setTypeFilter] = useState(filters.type || "all");
  const [remoteFilter, setRemoteFilter] = useState(filters.isRemote || "all");
  

  //! pagination er jonno
  const [page, setPage] = useState(filters.page || 1);
  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems/itemsPerPage);


     const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem =  (page-1) * itemsPerPage + 1;
  const endItem =  Math.min (page * itemsPerPage, totalItems) ;

  //! search filter er jonno
  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchQuery) {
      sp.set("search", searchQuery);
    }
    if (categoryFilter !== "all") {
      sp.set("category", categoryFilter);
    }
    if (typeFilter !== "all") {
      sp.set("type", typeFilter);
    }
    if (remoteFilter !== "all") {
      sp.set("isRemote", remoteFilter);
    }
    if (page) {
      sp.set("page", page);
    }
    console.log("URLSearchParams string:", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, searchQuery, typeFilter, categoryFilter, remoteFilter, page]);

  // const jobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     // Search matching (Title, Company Name, Requirements)
  //     const matchesSearch =
  //       !searchQuery ||
  //       job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job?.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

  //     // Category matching
  //     const matchesCategory =
  //       categoryFilter === 'all' || job?.category === categoryFilter;

  //     // Type matching
  //     const matchesType =
  //       typeFilter === 'all' || job?.type === typeFilter;

  //     // Remote / Workplace matching
  //     const matchesRemote =
  //       remoteFilter === 'all' ||
  //       (remoteFilter === 'remote' && job?.isRemote) ||
  //       (remoteFilter === 'onsite' && !job?.isRemote);

  //     return matchesSearch && matchesCategory && matchesType && matchesRemote;
  //   });
  // }, [jobs, searchQuery, categoryFilter, typeFilter, remoteFilter]);

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
      <div>
        {jobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {jobs.map((job) => (
                <JobCard key={job?._id || job?.title} job={job} />
              ))}
            </div>
            <div className="mt-10">
              <Pagination className="w-full">
                <Pagination.Summary>
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => p - 1)}
                    >
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => setPage(p)}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => p + 1)}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="col-span-full py-16 text-center text-zinc-500">
            No positions match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
