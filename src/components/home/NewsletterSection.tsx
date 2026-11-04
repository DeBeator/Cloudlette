"use client";

import { useState } from "react";
import {
  BowIllustration,
  SparkleDoodle,
  HeartDoodle,
} from "@/components/ui/decorative-icons";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    // Transparent, honest feedback: backend subscription service is coming in Phase 2
    setStatusMessage(
      "Thank you for your interest! Our automated newsletter subscription service is currently being connected to our backend and will be live shortly."
    );
  };

  return (
    <section className="w-full bg-brand-butter/50 py-12 sm:py-16 lg:py-20 text-center relative overflow-hidden">
      {/* Subtle decorative accents */}
      <div className="absolute top-10 left-10 text-brand-taupe/30 hidden sm:block pointer-events-none">
        <SparkleDoodle className="w-5 h-5" />
      </div>
      <div className="absolute bottom-10 right-10 text-brand-taupe/30 hidden sm:block pointer-events-none">
        <HeartDoodle className="w-5 h-5 text-brand-taupe" />
      </div>

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10 space-y-5">

        {/* Decorative Bow Icon */}
        <div className="inline-flex items-center justify-center space-x-2 text-brand-black">
          <BowIllustration className="w-7 h-7 text-brand-black" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2.5">
          <h2 className="font-handwriting font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-black">
            A little note from Cloudlette{" "}
            <span className="inline-block text-brand-black transform rotate-6 ml-1">
              ✦
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-normal text-brand-black/80 max-w-lg mx-auto leading-relaxed">
            Be the first to know about new arrivals, restocks, exclusive offers and more cute finds.
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 bg-brand-ivory p-1.5 rounded-full border-2 border-brand-black shadow-xs focus-within:ring-2 focus-within:ring-brand-black/20 transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (statusMessage) setStatusMessage(null);
              }}
              placeholder="Enter your email address"
              required
              aria-label="Email address for boutique newsletter"
              className="w-full px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-brand-black placeholder:text-brand-taupe-dark bg-transparent outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-2.5 sm:py-3 rounded-full bg-brand-black text-brand-ivory hover:bg-brand-black-light text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all flex-shrink-0 shadow-xs cursor-pointer"
            >
              JOIN US
            </button>
          </div>

          {/* Honest status or validation feedback */}
          {statusMessage && (
            <p className="text-xs text-brand-black/90 font-medium px-4 py-2 rounded-xl bg-brand-ivory/80 border border-brand-beige inline-block animate-in fade-in">
              {statusMessage}
            </p>
          )}

          <p className="text-[11px] text-brand-taupe-dark font-light pt-1">
            We respect your inbox. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}
