"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

const plansData = {
  seekers: [
    {
      id: "seeker_free",
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Ideal for getting started and exploring options.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile customization",
        "Email job alerts",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "seeker_pro",
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for active job seekers looking for better reach.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application status tracking",
        "Salary insights & analytics",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      id: "seeker_premium",
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Maximum visibility and priority treatment.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost to recruiters",
        "Early access to new postings",
        "Priority support",
      ],
      cta: "Get Premium",
      popular: false,
    },
  ],
  recruiters: [
    {
      id: "recruiter_free",
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company’s first year of hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      id: "recruiter_growth",
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "For growing teams with continuous hiring needs.",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking system (ATS)",
        "Basic hiring analytics",
        "Email support",
      ],
      cta: "Choose Growth",
      popular: true,
    },
    {
      id: "recruiter_enterprise",
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Comprehensive hiring solutions for scale.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration tools",
        "Custom branding & priority support",
      ],
      cta: "Choose Enterprise",
      popular: false,
    },
  ],
};

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your plan at any time from your account settings. You will retain access to your paid features until the end of your billing cycle.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee for initial purchases if you are not satisfied with our platform services.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and online payments processed via Stripe.",
  },
  {
    question: "How does plan switching work?",
    answer:
      "When you upgrade or downgrade your plan, the change takes effect immediately. Any pro-rated remaining balance on your previous plan is applied automatically.",
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg">
            Choose the right plan whether you are looking for your next career
            step or hiring top talent.
          </p>

          {/* Toggle Switch */}
          <div className="pt-6 flex justify-center">
            <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl flex items-center space-x-1">
              <button
                onClick={() => setActiveTab("seekers")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === "seekers"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setActiveTab("recruiters")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === "recruiters"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                For Recruiters
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plansData[activeTab].map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-200 ${
                plan.popular
                  ? "bg-zinc-900 border-blue-500 shadow-xl shadow-blue-500/10"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="my-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-zinc-400 text-sm ml-1">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 border-t border-zinc-800/80 pt-6">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start text-sm text-zinc-300 gap-2.5"
                    >
                      <svg
                        className="w-4 h-4 text-blue-400 mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>


                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <button type="submit" role="link" className={`w-full py-2.5 text-sm font-medium rounded-xl transition ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                }`}>
                      Checkout
                    </button>
                  </section>
                </form>

              </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-zinc-800 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Everything you need to know about billing and management.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-zinc-800 bg-zinc-900/40 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-zinc-200 hover:text-white transition"
                >
                  <span>{faq.question}</span>
                  <span className="text-zinc-400 text-xl font-light">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-sm text-zinc-400 border-t border-zinc-800/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
