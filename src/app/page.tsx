"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const CATEGORIES = [
  {
    name: "Bags",
    href: "/shop?category=bag",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Shoes",
    href: "/shop?category=shoe",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Cute tops",
    href: "/shop?category=top",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    // TODO: wire to email provider when backend is live
    setNewsletterSubmitted(true);
  };

  const newArrivals = MOCK_PRODUCTS.filter((p) =>
    p.tags.includes("new-arrival")
  ).slice(0, 4);

  const fastSelling = MOCK_PRODUCTS.filter((p) =>
    p.tags.includes("fast-selling")
  ).slice(0, 4);

  return (
    <div className="w-full space-y-0 overflow-x-hidden bg-off-white">
      {/* SECTION 1 — HERO */}
      <section className="w-full bg-[#F5E6A3] relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left column (text below on mobile) */}
          <div className="order-2 lg:order-1 flex flex-col justify-center relative">
            {/* Scattered ✦ sparkle characters in gold positioned decoratively near heading */}
            <span
              className="absolute -top-3 right-12 text-[#C9A43A] text-xl select-none pointer-events-none animate-pulse"
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className="absolute top-1/2 -left-4 text-[#C9A43A] text-sm select-none pointer-events-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className="absolute -bottom-2 right-1/4 text-[#C9A43A] text-base select-none pointer-events-none"
              aria-hidden="true"
            >
              ✦
            </span>

            {/* Eyebrow */}
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#1A1A1A] mb-3">
              THE CLOUDLETTE EDIT
            </p>

            {/* Heading */}
            <h1 className="font-heading font-extrabold text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.08] tracking-tight mb-4">
              Your daily dosage of chic.{" "}
              <span className="text-[#C9A43A] font-normal inline-block ml-1">
                ♡
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[#1A1A1A]/85 text-base sm:text-lg font-light mb-8 max-w-lg leading-relaxed">
              Cute finds, lovely details and everyday favourites.
            </p>

            {/* Two buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="bg-[#1A1A1A] text-[#F5E6A3] hover:bg-[#1A1A1A]/90 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center text-center"
              >
                SHOP THE COLLECTION →
              </Link>
              <Link
                href="/shop"
                className="border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5E6A3] px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center text-center"
              >
                EXPLORE THE EDIT →
              </Link>
            </div>
          </div>

          {/* Right column (image top on mobile) */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            {/* // TODO: replace with client hero photography */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
                alt="The Cloudlette Edit"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center w-full h-full"
              />

              {/* Small bow decoration — inline SVG absolutely positioned bottom-left of image */}
              <div
                className="absolute bottom-4 left-4 z-10 drop-shadow-md"
                aria-hidden="true"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 20 C15 15, 5 10, 8 20 C5 30, 15 25, 20 20Z"
                    fill="#C9A43A"
                  />
                  <path
                    d="M20 20 C25 15, 35 10, 32 20 C35 30, 25 25, 20 20Z"
                    fill="#C9A43A"
                  />
                  <circle cx="20" cy="20" r="3" fill="#C9A43A" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FEATURE BADGES */}
      <section className="w-full bg-[#F5E6A3] py-8 sm:py-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
              <span className="font-heading font-medium text-xs sm:text-sm text-[#1A1A1A]">
                Carefully selected
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <Star className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
              <span className="font-heading font-medium text-xs sm:text-sm text-[#1A1A1A]">
                Quality pieces
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <ShieldCheck
                className="w-5 h-5 text-[#1A1A1A]"
                strokeWidth={1.5}
              />
              <span className="font-heading font-medium text-xs sm:text-sm text-[#1A1A1A]">
                Secure payments
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <Truck className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
              <span className="font-heading font-medium text-xs sm:text-sm text-[#1A1A1A]">
                Fast & reliable delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SHOP BY CATEGORY */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
              Shop by Category <span className="text-[#C9A43A]">✦</span>
            </h2>
            <Link
              href="/shop"
              className="text-[#C9A43A] hover:text-[#B8963B] font-heading font-semibold text-sm sm:text-base transition-colors"
            >
              Shop all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Heart icon top-right */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1A1A1A] group-hover:text-[#C9A43A] transition-colors shadow-xs">
                  <Heart className="w-4 h-4 stroke-[2]" />
                </div>

                {/* Dark rounded pill label bottom-center */}
                <div className="absolute bottom-6 inset-x-0 flex justify-center z-10">
                  <span className="bg-[#1A1A1A] text-[#F5E6A3] font-heading font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-transform group-hover:scale-105">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — “GOOD PIECES MAKE BRIGHTER DAYS” BANNER */}
      <section className="w-full bg-[#F5E6A3] py-14 sm:py-20 relative overflow-hidden">
        {/* Scattered ✦ gold sparkles around the section */}
        <span
          className="absolute top-6 left-12 text-[#C9A43A] text-xl select-none pointer-events-none"
          aria-hidden="true"
        >
          ✦
        </span>
        <span
          className="absolute top-1/3 right-10 text-[#C9A43A] text-lg select-none pointer-events-none"
          aria-hidden="true"
        >
          ✦
        </span>
        <span
          className="absolute bottom-8 left-1/4 text-[#C9A43A] text-base select-none pointer-events-none"
          aria-hidden="true"
        >
          ✦
        </span>
        <span
          className="absolute bottom-12 right-1/3 text-[#C9A43A] text-sm select-none pointer-events-none"
          aria-hidden="true"
        >
          ✦
        </span>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col items-start justify-center">
            <span className="text-4xl sm:text-5xl mb-3 select-none" role="img" aria-label="Ribbon">
              🎀
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight mb-6">
              Good pieces make brighter days.
            </h2>
            <Link
              href="/shop"
              className="bg-[#1A1A1A] text-[#F5E6A3] hover:bg-[#1A1A1A]/90 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center text-center"
            >
              SHOP NOW →
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80"
                alt="Good pieces make brighter days"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — NEW ARRIVALS */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
              New Arrivals <span className="text-[#C9A43A]">✦</span>
            </h2>
            <Link
              href="/shop?category=new-arrival"
              className="text-[#C9A43A] hover:text-[#B8963B] font-heading font-semibold text-sm sm:text-base transition-colors"
            >
              Shop all →
            </Link>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} badge="NEW" badgeType="new" />
              </div>
            ))}
          </div>

          {/* Mobile: flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 each card w-[72vw] flex-shrink-0 snap-start */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="w-[72vw] flex-shrink-0 snap-start h-full"
              >
                <ProductCard product={product} badge="NEW" badgeType="new" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAST SELLING */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-8 lg:px-16 bg-[#FDF8EC]/50 border-t border-[#D9C7A3]/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1A1A1A]">
              Fast Selling <span className="text-[#C9A43A]">✦</span>
            </h2>
            <Link
              href="/shop?category=fast-selling"
              className="text-[#C9A43A] hover:text-[#B8963B] font-heading font-semibold text-sm sm:text-base transition-colors"
            >
              Shop all →
            </Link>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {fastSelling.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  product={product}
                  badge="SELLING FAST"
                  badgeType="hot"
                />
              </div>
            ))}
          </div>

          {/* Mobile: flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 each card w-[72vw] flex-shrink-0 snap-start */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {fastSelling.map((product) => (
              <div
                key={product.id}
                className="w-[72vw] flex-shrink-0 snap-start h-full"
              >
                <ProductCard
                  product={product}
                  badge="SELLING FAST"
                  badgeType="hot"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — NEWSLETTER */}
      <section className="w-full bg-[#F5E6A3] py-16 sm:py-24 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm italic font-light text-[#1A1A1A]/85 mb-5">
            A little note from Cloudlette <span className="text-[#C9A43A]">✦</span>
          </p>

          {newsletterSubmitted ? (
            <div className="inline-flex items-center gap-2 bg-[#FDF8EC] text-[#1A1A1A] font-heading font-medium px-6 py-3.5 rounded-full shadow-xs border border-[#C9A43A]/40 animate-in fade-in">
              <span>You’re on the list! 🎉</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center gap-3 max-w-md mx-auto"
            >
              {/* // TODO: wire to email provider when backend is live */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent border-2 border-[#1A1A1A] rounded-full px-5 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/50 outline-none focus:border-[#C9A43A] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="w-11 h-11 rounded-full bg-[#1A1A1A] text-[#F5E6A3] hover:bg-[#1A1A1A]/80 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
