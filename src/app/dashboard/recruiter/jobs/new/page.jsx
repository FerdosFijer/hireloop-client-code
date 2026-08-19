'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Fieldset, TextField, Select, FieldError, Input, Label, Switch, Button, ListBox, toast  } from '@heroui/react';
import { createJob } from '@/lib/actions/jobs';

const MOCK_COMPANY = { name: 'Acme Corp', isApproved: true, plan: 'Growth', activeJobsCount: 4 };
const PLAN_LIMITS = { Free: 3, Growth: 10, Enterprise: 50 };

export default function NewJobPostPage() {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [company] = useState(MOCK_COMPANY);

  const planLimit = PLAN_LIMITS[company.plan] || 3;
  const canPostJob = company.isApproved && company.activeJobsCount < planLimit;
  const remainingPosts = Math.max(0, planLimit - company.activeJobsCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!canPostJob) {
      setErrorMsg('Posting limit reached or company pending approval.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const jobData = {
      ...data,
      location: isRemote ? 'Remote' : data.location,
      isRemote,
      companyId: company.name,
      status: 'active',
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    const res = await createJob(jobData);
    console.log(res);
    
    if(res.insertedId){
      toast.success("Job posted successfullly!");
      e.target.reset();
      setIsRemote(false);
      router.push("/dashboard/recruiter/jobs")
    }
    
  };

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-100 p-4 md:p-8 flex justify-center items-start"> 
      <div className="w-full max-w-3xl bg-[#18181b] border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl">
        <div className="mb-6 border-b border-zinc-800 pb-5">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Post a New Job</h1>
          <p className="text-zinc-400 text-sm mt-1">Fill in the details below to publish a new job opening for your company.</p>
        </div>

        {/* Company & Plan Limits Banner */}
        <div className="mb-8 p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{company.name}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                {company.plan} Plan
              </span>
              {company.isApproved ? (
                <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                  Approved
                </span>
              ) : (
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                  Pending Approval
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Active postings: <span className="text-zinc-200 font-medium">{company.activeJobsCount}</span> / {planLimit}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className={`text-xs font-medium ${canPostJob ? 'text-emerald-400' : 'text-rose-400'}`}>
              {canPostJob ? `${remainingPosts} slot(s) remaining` : 'Limit reached or pending'}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-md">
            {errorMsg}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-8">
          <Fieldset className="space-y-5">
            <legend className="text-base font-medium text-zinc-200 mb-2">Job Information</legend>
            
            <TextField required className="w-full">
              <Label className="text-sm font-medium text-zinc-300">Job Title</Label>
              <Input name="title" placeholder="e.g. Senior Frontend Developer" className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors" />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select required name="category" className="w-full" placeholder="Select Category">
                <Label className="text-sm font-medium text-zinc-300">Job Category</Label>
                <Select.Trigger className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-md text-white shadow-xl p-1">
                  <ListBox>
                    <ListBox.Item id="engineering" textValue="Software Engineering">
                      Software Engineering
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="design" textValue="Design & Creative">
                      Design & Creative
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="marketing" textValue="Marketing & Sales">
                      Marketing & Sales
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="product" textValue="Product Management">
                      Product Management
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="customer_support" textValue="Customer Support">
                      Customer Support
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </Select>

              <Select required name="type" className="w-full" placeholder="Select Type">
                <Label className="text-sm font-medium text-zinc-300">Job Type</Label>
                <Select.Trigger className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-md text-white shadow-xl p-1">
                  <ListBox>
                    <ListBox.Item id="full_time" textValue="Full-time">
                      Full-time
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="part_time" textValue="Part-time">
                      Part-time
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="contract" textValue="Contract">
                      Contract
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="internship" textValue="Internship">
                      Internship
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField required className="w-full">
                <Label className="text-sm font-medium text-zinc-300">Min Salary</Label>
                <Input name="minSalary" type="number" placeholder="e.g. 60000" className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField required className="w-full">
                <Label className="text-sm font-medium text-zinc-300">Max Salary</Label>
                <Input name="maxSalary" type="number" placeholder="e.g. 90000" className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <Select required name="currency" className="w-full" placeholder="Select Currency">
                <Label className="text-sm font-medium text-zinc-300">Currency</Label>
                <Select.Trigger className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-md text-white shadow-xl p-1">
                  <ListBox>
                    <ListBox.Item id="USD" textValue="USD ($)">
                      USD ($)
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="EUR" textValue="EUR (€)">
                      EUR (€)
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="GBP" textValue="GBP (£)">
                      GBP (£)
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="CAD" textValue="CAD ($)">
                      CAD ($)
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-300">Location</Label>
                <Switch
                  isSelected={isRemote}
                  onChange={setIsRemote}
                  aria-label="Remote position"
                >
                  <Switch.Content className="flex items-center gap-2">
                    <Switch.Control className="border border-zinc-700">
                      <Switch.Thumb />
                    </Switch.Control>
                    <span className="text-xs text-zinc-400">Remote Only</span>
                  </Switch.Content>
                </Switch>
              </div>

              {!isRemote && (
                <TextField required={!isRemote} className="w-full">
                  <Input name="location" placeholder="e.g. San Francisco, CA" className="bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors" />
                  <FieldError className="text-xs text-rose-400 mt-1" />
                </TextField>
              )}
            </div>

            <TextField required className="w-full">
              <Label className="text-sm font-medium text-zinc-300">Application Deadline</Label>
              <Input name="deadline" type="date" className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md px-3 py-2 text-sm w-full outline-none transition-colors text-zinc-300" />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>
          </Fieldset>

          <hr className="border-zinc-800" />

          <Fieldset className="space-y-5">
            <legend className="text-base font-medium text-zinc-200 mb-2">Job Description & Details</legend>

            <TextField required className="w-full">
              <Label className="text-sm font-medium text-zinc-300">Responsibilities</Label>
              <Input name="responsibilities" placeholder="List key duties and expectations..." className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md p-3 text-sm w-full outline-none transition-colors" />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

            <TextField required className="w-full">
              <Label className="text-sm font-medium text-zinc-300">Requirements & Qualifications</Label>
              <Input name="requirements" placeholder="List required skills, experience, education..." className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md p-3 text-sm w-full outline-none transition-colors" />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>

            <TextField className="w-full">
              <Label className="text-sm font-medium text-zinc-300">Benefits & Perks (Optional)</Label>
              <Input name="benefits" placeholder="Health insurance, 401(k), remote setup stipend..." className="mt-1 bg-zinc-900/70 border border-zinc-800 focus:border-zinc-500 text-white rounded-md p-3 text-sm w-full outline-none transition-colors" />
              <FieldError className="text-xs text-rose-400 mt-1" />
            </TextField>
          </Fieldset>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <Button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white bg-transparent rounded-md transition-colors">
              Cancel
            </Button>
            <Button type="submit" isDisabled={!canPostJob} className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${canPostJob ? 'bg-white text-black hover:bg-zinc-200 shadow-sm' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>
              Publish Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}