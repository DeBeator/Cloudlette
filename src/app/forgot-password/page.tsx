"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TODO: wire reset email flow when backend email provider is configured
    try {
      await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // Show success message regardless for security best practices
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeInSection className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blush/40 space-y-6">
        {/* Back to Login link */}
        <div>
          <Link
            href="/login"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Back to Sign In
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            ACCOUNT RECOVERY
          </span>
          <h1 className="font-heading text-3xl font-normal text-dark">
            Forgot Password?
          </h1>
          <p className="text-xs text-dark-muted font-light leading-relaxed">
            Enter the email address associated with your account, and we'll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-5 py-4 animate-in fade-in duration-300">
            <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                If an account exists for that email, you'll receive a reset link shortly.
              </p>
            </div>

            <Button
              asChild
              className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider py-3.5 shadow-sm"
            >
              <Link href="/login">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Email Address
              </label>
              <Input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
              />
            </div>

            {error && (
              <div className="text-xs font-medium text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-sm py-3.5 shadow-md transition-all duration-300 mt-2"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending reset link...</span>
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}
      </div>
    </FadeInSection>
  );
}
