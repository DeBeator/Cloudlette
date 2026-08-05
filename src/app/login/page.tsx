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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          WELCOME BACK
        </span>
        <h1 className="font-heading text-3xl font-normal text-dark">
          Sign In
        </h1>
        <p className="text-xs text-dark-muted font-light">
          Please enter your credentials to access your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Email */}
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

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-gold-hover hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm pr-10"
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

        {/* Inline Error Display */}
        {error && (
          <div className="text-xs font-medium text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200 animate-in fade-in duration-200">
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
              <span>Signing in...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Below Form Footer */}
      <div className="pt-4 text-center border-t border-blush/40">
        <p className="text-xs text-dark-muted">
          Don't have an account?{" "}
          <Link
            href={
              redirect
                ? `/signup?redirect=${encodeURIComponent(redirect)}`
                : "/signup"
            }
            className="font-bold text-dark hover:text-gold transition-colors inline-flex items-center"
          >
            Create one →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <FadeInSection className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-blush/40">
        {/* Left Side: Soft Dark Editorial Panel (Desktop Only) */}
        <div className="md:col-span-5 bg-dark text-cream p-8 sm:p-12 flex flex-col justify-between hidden md:flex relative overflow-hidden">
          {/* Background Lifestyle Image Placeholder */}
          {/* TODO: client photography */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
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
              Good clothes, delivered.
            </h2>
            <div className="w-12 h-0.5 bg-gold rounded-full" />
            <p className="text-xs text-cream/70 font-light leading-relaxed">
              Sign in to manage your orders and account details.
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
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </FadeInSection>
  );
}
