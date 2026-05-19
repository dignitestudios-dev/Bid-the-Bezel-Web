"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Bid The Bezel?",
      answer: "Bid The Bezel is a luxury watch marketplace where users can securely buy, sell, and auction premium watches online."
    },
    {
      question: "How does Bid The Bezel work?",
      answer: "Users can create an account, select a subscription plan, list watches for sale, participate in live auctions, and complete transactions securely through escrow protected payments."
    },
    {
      question: "Can I browse the platform without creating an account?",
      answer: "Yes. Users can explore listings in Guest Mode. However, actions such as bidding, purchasing, or interacting with listings require registration."
    },
    {
      question: "How do live auctions work?",
      answer: "Eligible watches can enter a live auction system where users place bids in real time. Auctions include countdown timers, bid history, incremental bidding, and anti sniping protection."
    },
    {
      question: "What is the anti sniping feature?",
      answer: "If a bid is placed during the final minute of an auction, the timer automatically extends by one minute to ensure fair bidding opportunities for all participants."
    },
    {
      question: "What payment methods are supported?",
      answer: "Users are required to add a valid credit card to subscribe, make purchases, or place bids within the platform."
    },
    {
      question: "What is escrow protection?",
      answer: "All payments are securely held in escrow until both the buyer and seller confirm successful delivery of the watch. Once confirmed, funds are released to the seller."
    },
    {
      question: "Can watches be authenticated?",
      answer: "Yes. Sellers can choose to authenticate their watches for an authentication fee. Once verified, the listing receives an \"Authenticated\" badge."
    },
    {
      question: "How long does watch authentication take?",
      answer: "After shipment to the authentication center, watches are typically authenticated and returned within 2–4 business days."
    },
    {
      question: "Are user identities visible?",
      answer: "No. Users create anonymous usernames, and real identities are not publicly displayed on the platform."
    },
    {
      question: "Can buyers and sellers communicate?",
      answer: "Yes. In app chat becomes available once payment is secured in escrow. Users can exchange messages, images, and documents directly within the platform."
    },
    {
      question: "Are phone numbers allowed in chat?",
      answer: "No. Sharing direct contact information such as phone numbers is prohibited within the platform chat system."
    },
    {
      question: "What happens if an auction does not sell?",
      answer: "If no agreement is reached, the watch automatically moves into the \"Taking Offers\" section where the seller can relist or negotiate offers."
    },
    {
      question: "What happens if the highest bidder backs out?",
      answer: "The second highest bidder may be offered the opportunity to purchase the watch. In addition, a penalty may be deducted from the original highest bidder according to platform rules."
    },
    {
      question: "Can I track my orders?",
      answer: "Yes. Buyers can track shipping information, delivery updates, transaction history, and order status directly through the platform."
    },
    {
      question: "What subscription plans are available?",
      answer: "Bid The Bezel offers multiple subscription tiers with different selling limits and trial periods, including Basic, Gold, and Executive plans."
    },
    {
      question: "Is Bid The Bezel secure?",
      answer: "Yes. The platform includes secure payment systems, escrow protection, authentication options, anonymous profiles, and monitored transactions to help ensure safe trading experiences."
    },
    {
      question: "Can I favorite auction listings?",
      answer: "Yes. Users can favorite auction watches and receive reminders and notifications before auctions end."
    },
    {
      question: "What If I only have one watch to sell?",
      answer: "Choose the basic package and after it sells you can cancel the subscription with no penalty."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0D1B2A] rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Bid The Bezel
          </p>
        </div>

        {/* FAQ Items - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4 flex-1">
            {faqs.map((faq, index) => {
              if (index % 2 !== 0) return null;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 flex-1">
            {faqs.map((faq, index) => {
              if (index % 2 === 0) return null;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-[#0D1B2A] rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <a
            href="mailto:zack@bidthebezel.com"
            className="inline-block bg-white text-[#0D1B2A] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 text-center shadow-sm">

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-[#0D1B2A]">
                Disclaimer:
              </span>{" "}
              Bid the Bezel is not liable for any inaccuracies or
              failures resulting from use.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
