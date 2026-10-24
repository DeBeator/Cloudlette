"use client";

import Link from "next/link";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AddressesPage() {
  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <AccountSidebar />
        </div>

        {/* Right Content */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="space-y-2 border-b border-blush/40 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
              SAVED LOCATIONS
            </span>
            <div className="relative inline-block">
              <h1 className="font-heading text-3xl sm:text-4xl font-normal text-dark pb-2">
                Shipping Addresses
              </h1>
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
            </div>
          </div>

          {/* Placeholder Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blush/60 text-center max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
              <MapPin className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-dark">
              Address management coming soon.
            </h2>
            <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
              You will soon be able to save and manage multiple delivery locations, default addresses, and pickup preferences here.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-full px-6 py-2.5 bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-2"
              >
                <Link href="/account">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Back to Account</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
