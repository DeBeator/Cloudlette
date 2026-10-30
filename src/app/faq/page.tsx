"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ChevronDown, MessageCircle, Mail } from "lucide-react";

interface FAQItem {
  id: string;
  topic: string;
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "delivery-1",
    topic: "Delivery",
    question: "How long does delivery take within Lagos and nationwide?",
    answer:
      "Deliveries within Lagos arrive within 24 to 48 hours via our dedicated courier service. Interstate deliveries across Nigeria take 3 to 5 business days with verified national partners. You will receive dispatch updates via SMS and WhatsApp.",
  },
  {
    id: "delivery-2",
    topic: "Delivery",
    question: "What are your shipping rates?",
    answer:
      "Standard Lagos Delivery: ₦2,000–₦7,000 depending on your location. Interstate Delivery: ₦5,000–₦7,000 depending on your destination. Pickup (Optional): Customers can pick up at Berger Park. A ₦1,000 handling fee is payable directly to the storekeeper. Delivery fees vary by location — confirm before completing your order.",
  },
  {
    id: "payments-1",
    topic: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major Nigerian debit and credit cards (Mastercard, Visa, and Verve), direct bank transfers, and USSD banking through our Paystack-secured checkout. All payment transactions are encrypted using 256-bit bank-grade SSL security.",
  },
  {
    id: "payments-2",
    topic: "Payments",
    question: "Is payment on delivery (POD) available?",
    answer:
      "To preserve the integrity and exclusive reservation of our limited-batch luxury products, orders must be secured online during checkout prior to dispatch.",
  },
  {
    id: "returns-1",
    topic: "Returns",
    question: "What is your exchange and return policy?",
    answer:
      "We offer exchanges or store credit within 7 calendar days of delivery for unworn items in pristine condition, with all original tags, dust bags, and protective wrapping intact. Read our complete Refund Policy for full eligibility details.",
  },
  {
    id: "sizes-1",
    topic: "Sizes",
    question: "How do I choose the correct size?",
    answer:
      "Our tops and blouses fit true to size. For pointed-toe mules and heels, we advise selecting one EU size up if you have broader feet or are between sizes. Each shoe and top product page features an interactive Size Guide with exact centimeter measurements.",
  },
  {
    id: "tracking-1",
    topic: "Order Tracking",
    question: "How can I track my package?",
    answer:
      "You can visit our Track Order page at any time to monitor your shipment status. Additionally, our courier dispatch rider will contact you directly on WhatsApp or mobile prior to arrival.",
  },
  {
    id: "intl-1",
    topic: "International Delivery",
    question: "Do you ship internationally outside Nigeria?",
    answer:
      "Yes, we ship to Ghana, Benin Republic, Cotonou, and Abidjan. Contact us on WhatsApp for international shipping quotes.",
  },
  {
    id: "contact-1",
    topic: "Contact",
    question: "How can I reach Cloudlette customer support?",
    answer:
      "Our customer care concierge is available Monday to Saturday, 9:00 AM to 7:00 PM (WAT). Reach us instantly on WhatsApp at +234 800 CLOUDLETTE or email hello@cloudlette.com.",
  },
];

const TOPICS = [
  "All",
  "Delivery",
  "Payments",
  "Returns",
  "Sizes",
  "Order Tracking",
  "International Delivery",
  "Contact",
];

export default function FAQPage() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [openIds, setOpenIds] = useState<string[]>(["delivery-1", "payments-1"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    selectedTopic === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.topic === selectedTopic);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <FadeInSection className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
            Client Assistance
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know about ordering, delivery across Nigeria, size guidelines, and caring for your Cloudlette pieces.
          </p>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {TOPICS.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`py-1.5 px-4 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  isActive
                    ? "bg-dark text-cream shadow-sm"
                    : "bg-cream/40 text-dark-muted hover:text-dark hover:bg-cream border border-blush/40"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-blush/60 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 hover:bg-cream-light/40 transition-colors focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      {faq.topic}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-semibold text-dark">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-gold/15 text-gold" : "text-dark-muted"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-dark-muted font-light leading-relaxed border-t border-blush/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-cream/40 rounded-3xl p-8 sm:p-10 border border-blush/60 text-center space-y-4">
          <h2 className="font-heading text-2xl font-bold text-dark">
            Still have questions?
          </h2>
          <p className="text-xs sm:text-sm text-dark-muted font-light max-w-md mx-auto">
            Our luxury styling & order concierge is standing by to help with sizing, orders, and inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="https://wa.me/message/23DKTWB4MIAEE1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-dark hover:bg-cream border border-blush/80 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Page</span>
            </Link>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
