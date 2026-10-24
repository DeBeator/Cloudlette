"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, ArrowLeft, PackageCheck, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !contact.trim()) {
      setError("Please provide both your order number and email or phone number.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <FadeInSection className="max-w-xl mx-auto space-y-8">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back Home
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
            <PackageCheck className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
            Shipment Status
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed max-w-md mx-auto">
            Enter your Cloudlette order number and the email or phone number associated with your purchase.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                Order Number <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. CLD-2026-8941"
                value={orderNumber}
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                  if (error) setError("");
                }}
                className="rounded-xl py-2.5 text-xs uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                Email Address or Phone <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. blossom@cloudlette.com or 08012345678"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (error) setError("");
                }}
                className="rounded-xl py-2.5 text-xs"
              />
            </div>

            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}

            <Button
              type="submit"
              className="w-full rounded-full py-3.5 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Shipment</span>
            </Button>
          </form>

          {/* Submission Notice Box */}
          {submitted && (
            <div className="p-5 rounded-2xl bg-cream/60 border border-gold/40 text-dark space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-gold-hover font-bold text-xs uppercase tracking-wider">
                <Info className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Order Tracking Notice</span>
              </div>
              <p className="text-xs text-dark/80 leading-relaxed font-normal">
                Order tracking will be live when our store launches. Contact us on WhatsApp for order updates.
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/message/23DKTWB4MIAEE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </FadeInSection>
    </div>
  );
}
