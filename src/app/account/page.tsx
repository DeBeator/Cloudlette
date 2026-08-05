"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "@/lib/withAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/ui/toast";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  // useRequireAuth(); // TODO: uncomment when backend auth is live

  const { user } = useAuthStore();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire PATCH /api/users/me when backend is live
    showToast("Profile Update Coming Soon", "Backend profile management will be available shortly.");
  };

  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <AccountSidebar />
        </div>

        {/* Right Main Content */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Page Heading */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
              ACCOUNT SETTINGS
            </span>
            <div className="relative inline-block">
              <h1 className="font-heading text-3xl sm:text-4xl font-normal text-dark pb-2">
                Account Details
              </h1>
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs max-w-xl">
            <form onSubmit={handleSaveChanges} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Amara Okafor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
                />
              </div>

              {/* Email (Read-only greyed out) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                    Email Address
                  </label>
                  <span className="text-[10px] text-dark-muted/60 uppercase font-semibold">
                    Read-only
                  </span>
                </div>
                <Input
                  type="email"
                  disabled
                  readOnly
                  value={email}
                  className="bg-cream-light/80 text-dark-muted border-blush/40 rounded-xl py-3 px-4 text-sm cursor-not-allowed opacity-75"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
                />
              </div>

              {/* Submit Button */}
              {/* TODO: wire PATCH /api/users/me when backend is live */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-8 py-3.5 shadow-md transition-all duration-300"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
