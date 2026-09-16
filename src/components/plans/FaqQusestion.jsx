"use client";

import React, { useState } from "react";

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

export default function FaqQusestion() {
  const [activeTab, setActiveTab] = useState("seekers");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">

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
