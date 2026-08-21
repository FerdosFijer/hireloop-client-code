'use client';

import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
import { submitApplication } from '@/lib/actions/Application';

const JobApply = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resumeUrl: '',
    coverLetterNote: '',
    portfolioUrl: '',
    linkedinUrl: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    const applicationPayload = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyName: job?.companyName,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      status:'applied',
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    console.log('Application Submitted:', applicationPayload);
    const res = await submitApplication(applicationPayload);
    if(res.insertedId){
        alert('Application submitted successfully');
        setFormData({resumeUrl: '', portfolioUrl:'', linkedinUrl:'',coverLetterNote:''})
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 my-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Apply for {job?.title || 'this Position'}
        </h2>
        {applicant?.name && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Applying as <span className="font-semibold">{applicant.name}</span> ({applicant.email})
          </p>
        )}
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200">
          <h3 className="font-semibold text-lg">Application Sent!</h3>
          <p className="text-sm mt-1">
            Thank you for applying to <span className="font-medium">{job?.title}</span>. We will review your application soon.
          </p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Resume Link (Required) */}
          <TextField isRequired name="resumeUrl" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Resume Link (Google Drive / Dropbox)
            </Label>
            <Input
              type="url"
              placeholder="https://drive.google.com/file/d/..."
              value={formData.resumeUrl}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Description className="text-xs text-zinc-500 dark:text-zinc-400">
              Ensure view permissions are set to &quot;Anyone with the link&quot;.
            </Description>
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Portfolio / Website URL (Optional) */}
          <TextField name="portfolioUrl" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Portfolio / Website URL <span className="text-zinc-400 font-normal">(Optional)</span>
            </Label>
            <Input
              type="url"
              placeholder="https://yourportfolio.com"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* LinkedIn Profile (Optional) */}
          <TextField name="linkedinUrl" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              LinkedIn Profile <span className="text-zinc-400 font-normal">(Optional)</span>
            </Label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Brief Note / Cover Note (Optional) */}
          <TextField name="coverLetterNote" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Note to Hiring Team <span className="text-zinc-400 font-normal">(Optional)</span>
            </Label>
            <Input
              placeholder="A brief introduction or anything you'd like us to know..."
              value={formData.coverLetterNote}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Description className="text-xs text-zinc-500 dark:text-zinc-400">
              Keep it under 300 characters.
            </Description>
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              type="reset"
              onClick={() =>
                setFormData({
                  resumeUrl: '',
                  coverLetterNote: '',
                  portfolioUrl: '',
                  linkedinUrl: '',
                })
              }
              className="px-4 py-2 text-sm rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
            >
              Apply Now
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default JobApply;