import { getCompanyJobs } from "@/lib/api/jobs";
import { AlertDialog, Button, Table, Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruiterJobs = async () => {
    const company = await getLoggedInRecruiterCompany()
    const jobs = await getCompanyJobs(company._id) || [];

  return (
    <div className="w-full px-4 sm:px-8 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-default-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Manage Posted Jobs
          </h1>
          <p className="text-sm text-default-500">
            View, edit, and manage all active job postings for {company._id}.
          </p>
        </div>
        <Chip variant="flat" color="primary" size="md">
          {jobs?.length || 0} Total Listings
        </Chip>
      </div>

      {/* Full Width Table Section */}
      <Table 
        aria-label="Company jobs list" 
        className="w-full shadow-sm border rounded-xl border-default-100"
      >
        <Table.ScrollContainer>
          <Table.Content className="w-full min-w-[900px] table-fixed">
            <Table.Header>
              <Table.Column isRowHeader className="w-[28%]">Job Title</Table.Column>
              <Table.Column className="w-[20%]">Type / Category</Table.Column>
              <Table.Column className="w-[18%]">Location</Table.Column>
              <Table.Column className="w-[14%]">Deadline</Table.Column>
              <Table.Column className="w-[10%]">Status</Table.Column>
              <Table.Column className="w-[10%] text-center">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {jobs.map((job, ind) => (
                <Table.Row key={job._id} className="hover:bg-default-50 transition-colors">
                  <Table.Cell className="font-semibold text-foreground py-4">
                   {ind+1} . {job.title}
                  </Table.Cell>
                  <Table.Cell className="py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-default-700">{job.type}</span>
                      <span className="text-xs text-default-400">{job.category}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-sm text-default-600 py-4">
                    {job.location || (job.isRemote ? "Remote" : "N/A")} 
                  </Table.Cell>
                  <Table.Cell className="text-sm text-default-600 py-4">
                    {job.deadline}
                  </Table.Cell>
                  <Table.Cell className="py-4 ">
                    <Chip 
                      size="sm"
                      variant="flat"
                      color={
                        job.status === "active" || job.status === "open"
                          ? "success"
                          : job.status === "Closed"
                          ? "danger"
                          : "default"
                      }
                    >
                      {job.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Details Icon Button */}
                      <Tooltip content="View Details">
                        <Link href={`/jobs/${job._id}`}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            aria-label="View Details"
                          >
                            <Eye className="w-4 h-4 text-default-600" />
                          </Button>
                        </Link>
                      </Tooltip>

                      {/* Edit Icon Button */}
                      <Tooltip content="Edit Job">
                        <Link href={`/jobs/${job._id}/edit`}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            aria-label="Edit Job"
                          >
                            <Edit3 className="w-4 h-4 text-default-600" />
                          </Button>
                        </Link>
                      </Tooltip>

                      {/* Delete Icon Button with Modal */}
                      <AlertDialog>
                        <Tooltip content="Delete Job">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            aria-label="Delete Job"
                          >
                            <Trash2 className="w-4 h-4 text-danger" />
                          </Button>
                        </Tooltip>

                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-md">
                              <AlertDialog.CloseTrigger />
                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                  Delete Job Posting?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                <p className="text-sm text-default-600">
                                  This will permanently delete{" "}
                                  <strong className="text-foreground">{job.title}</strong> and remove all associated candidate data. This action cannot be undone.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                  Cancel
                                </Button>
                                <Button slot="close" variant="danger">
                                  Confirm Delete
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;