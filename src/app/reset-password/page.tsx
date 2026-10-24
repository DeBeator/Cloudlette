"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";
  const emailParam = searchParams?.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailParam || "customer@cloudlette.com",
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <FadeInSection className="max-w-md mx-auto space-y-8">
        <Link
          href="/login"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
            <Lock className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
            Account Security
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
            Please enter and confirm your new secure password.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
          {success ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-dark">
                Password Reset Complete
              </h2>
              <p className="text-xs text-dark-muted font-light leading-relaxed">
                Your password has been successfully updated. You can now log into your account with your new credentials.
              </p>
              <Button
                asChild
                className="w-full rounded-full py-3.5 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm mt-2"
              >
                <Link href="/login">Proceed to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                  New Password <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl py-2.5 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                  Confirm New Password <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl py-2.5 text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3.5 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>
      </FadeInSection>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
