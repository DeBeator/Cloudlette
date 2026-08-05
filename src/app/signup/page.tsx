"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const signup = useAuthStore((state) => state.signup);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      return "All fields are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valError = validate();
    if (valError) {
      setError(valError);
      return;
    }

    setLoading(true);

    try {
      await signup(fullName, email, phone, password);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-5">
      {/* Header */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          GET STARTED
        </span>
        <h1 className="font-heading text-3xl font-normal text-dark">
          Create Account
        </h1>
        <p className="text-xs text-dark-muted font-light">
          Fill in your details below to create your Cloudlette account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
            Full Name
          </label>
          <Input
            type="text"
            required
            placeholder="e.g. Amara Okafor"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-white border-blush/60 focus:border-gold rounded-xl py-2.5 px-4 text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
            Email Address
          </label>
          <Input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-blush/60 focus:border-gold rounded-xl py-2.5 px-4 text-sm"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
            Phone Number
          </label>
          <Input
            type="tel"
            required
            placeholder="e.g. 08012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white border-blush/60 focus:border-gold rounded-xl py-2.5 px-4 text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
            Password (Min 8 characters)
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-blush/60 focus:border-gold rounded-xl py-2.5 px-4 text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark p-1"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 stroke-[1.5]" />
              ) : (
                <Eye className="h-4 w-4 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
            Confirm Password
          </label>
          <Input
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white border-blush/60 focus:border-gold rounded-xl py-2.5 px-4 text-sm"
          />
        </div>

        {/* Inline Error Display */}
        {error && (
          <div className="text-xs font-medium text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 animate-in fade-in duration-200">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-sm py-3.5 shadow-md transition-all duration-300 mt-2"
        >
          {loading ? (
            <span className="inline-flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating account...</span>
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Below Form Footer */}
      <div className="pt-3 text-center border-t border-blush/40">
        <p className="text-xs text-dark-muted">
          Already have an account?{" "}
          <Link
            href={
              redirect
                ? `/login?redirect=${encodeURIComponent(redirect)}`
                : "/login"
            }
            className="font-bold text-dark hover:text-gold transition-colors inline-flex items-center"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <FadeInSection className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-blush/40">
        {/* Left Side: Soft Dark Editorial Panel (Desktop Only) */}
        <div className="md:col-span-5 bg-dark text-cream p-8 sm:p-12 flex flex-col justify-between hidden md:flex relative overflow-hidden">
          {/* Background Lifestyle Image Placeholder */}
          {/* TODO: client photography */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
              alt="Cloudlette Editorial"
              fill
              className="object-cover"
            />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-2">
            <Link
              href="/"
              className="font-heading text-2xl font-normal text-cream hover:text-gold transition-colors inline-block"
            >
              Cloudlette
            </Link>
          </div>

          {/* Tagline & Decorative Underline */}
          <div className="relative z-10 space-y-4 my-auto py-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-normal text-cream leading-tight">
              Good to have you.
            </h2>
            <div className="w-12 h-0.5 bg-gold rounded-full" />
            <p className="text-xs text-cream/70 font-light leading-relaxed">
              Create an account for faster checkout, order tracking, and new arrival alerts.
            </p>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-cream/50">
            © {new Date().getFullYear()} Cloudlette. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-cream/20">
          <Suspense fallback={<div className="text-xs text-dark-muted p-4">Loading form...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </FadeInSection>
  );
}
