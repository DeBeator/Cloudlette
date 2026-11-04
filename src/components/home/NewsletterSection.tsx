"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import {
  BowIllustration,
  SparkleDoodle,
  HeartDoodle,
} from "@/components/ui/decorative-icons";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate async UI validation state (keeps form integration-ready for Phase 2/3 newsletter backend service)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-brand-butter/50 py-16 sm:py-20 lg:py-24 text-center relative overflow-hidden">
      {/* Subtle decorative accents */}
      <div className="absolute top-10 left-10 text-brand-taupe/30 hidden sm:block pointer-events-none">
        <SparkleDoodle className="w-5 h-5" />
      </div>
      <div className="absolute bottom-10 right-10 text-brand-taupe/30 hidden sm:block pointer-events-none">
        <HeartDoodle className="w-5 h-5 text-brand-taupe" />
      </div>

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Decorative Bow Icon */}
        <div className="inline-flex items-center justify-center space-x-2 text-brand-black">
          <BowIllustration className="w-7 h-7 text-brand-black" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3">
          <h2 className="font-handwriting font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-black">
            A little note from Cloudlette{" "}
            <span className="inline-block text-brand-black transform rotate-6 ml-1">
              ✦
            </span>
          </h2>
          
          <p className="text-sm sm:text-base font-light text-brand-black/80 max-w-lg mx-auto leading-relaxed">
            Be the first to know about new arrivals, restocks, exclusive offers and more cute finds.
          </p>
        </div>

        {/* Subscription Form */}
        {submitted ? (
          <div className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-brand-ivory text-brand-black text-xs sm:text-sm font-semibold border border-brand-beige shadow-xs animate-in fade-in duration-300">
            <span>You’re on our boutique list! We’ll keep you updated. ♡</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 bg-brand-ivory p-1.5 rounded-full border-2 border-brand-black shadow-xs focus-within:ring-2 focus-within:ring-brand-black/20 transition-all">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter your email address"
                required
                aria-label="Email address for boutique newsletter"
                className="w-full px-5 py-3 text-xs sm:text-sm text-brand-black placeholder:text-brand-taupe-dark bg-transparent outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-brand-black text-brand-ivory hover:bg-brand-black-light text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all flex-shrink-0 disabled:opacity-60 shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>JOINING...</span>
                  </>
                ) : (
                  <>
                    <span>JOIN US</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-rose-600 font-medium pt-1 animate-in fade-in">
                {error}
              </p>
            )}

            <p className="text-[11px] text-brand-taupe-dark font-light pt-1">
              We respect your inbox. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
