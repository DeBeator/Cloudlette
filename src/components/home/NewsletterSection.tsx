"use client";

import { useState } from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { CheckCircle2, Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    // TODO: wire to email provider when backend is live
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-cream py-16 sm:py-24 border-t border-blush/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <div className="w-12 h-12 rounded-full bg-blush/35 border border-blush/60 flex items-center justify-center text-dark mx-auto mb-6">
            <Mail className="h-5 w-5 text-dark" strokeWidth={1.5} />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            A little note from Cloudlette
          </h2>

          <p className="text-dark/80 text-sm sm:text-base font-light mb-8 max-w-lg mx-auto">
            Be the first to know about new drops, sales, and style tips.
          </p>

          {isSubmitted ? (
            <div className="inline-flex items-center gap-2 bg-off-white px-6 py-3.5 rounded-full border border-gold/50 shadow-xs text-dark font-medium text-sm sm:text-base animate-in fade-in duration-300">
              <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0" />
              <span>You’re on the list! 🎉</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-off-white border border-blush/70 text-dark placeholder:text-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all shadow-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-gold hover:bg-gold-hover text-dark px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center text-center flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}
