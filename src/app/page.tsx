"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { FastSellingSection } from "@/components/home/FastSellingSection";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const marqueeText =
    "FREE NATIONWIDE DELIVERY · BAGS · SHOES · TOPS · NEW ARRIVALS WEEKLY · EASY RETURNS · SHOP NOW →";

  return (
    <div className="space-y-0 w-full overflow-x-hidden">
      {/* 2. Hero Section — Full-width, split layout (left 55% / right 45% desktop, single col mobile) */}
      <section className="w-full min-h-[85vh] lg:min-h-[calc(100vh-110px)] grid grid-cols-1 lg:grid-cols-12 bg-dark">
        {/* Left Panel (55% / col-span-7 on desktop) */}
        <div className="lg:col-span-7 bg-dark text-cream px-6 sm:px-12 lg:px-16 py-14 sm:py-20 lg:py-28 flex flex-col justify-center order-2 lg:order-1">
          <div className="max-w-2xl space-y-6">
            {/* Small Eyebrow */}
            <motion.span
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gold block"
            >
              NEW COLLECTION
            </motion.span>

            {/* Large Bold Headline */}
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-cream leading-[0.95] tracking-tight"
            >
              Good clothes for real life.
            </motion.h1>

            {/* Short Line */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-cream/60 text-sm sm:text-base font-light tracking-wide pt-1"
            >
              Bags. Shoes. Tops.
            </motion.p>

            {/* Two CTAs Side-by-Side */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {/* Shop Now — Solid Gold Pill */}
              <Link
                href="/shop"
                className="rounded-full bg-gold hover:bg-gold-hover text-dark px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center text-center"
              >
                Shop Now
              </Link>

              {/* View Lookbook — Outline Cream Pill */}
              <Link
                href="/shop"
                className="rounded-full border border-cream text-cream hover:bg-cream/10 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center text-center"
              >
                View Lookbook
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Panel (45% / col-span-5 on desktop) */}
        <div className="lg:col-span-5 h-[40vh] lg:h-auto relative overflow-hidden order-1 lg:order-2">
          {/* TODO: replace with client hero photography */}
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
            alt="Cloudlette Hero"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </section>

      {/* 3. Marquee / Ticker Strip */}
      <div className="w-full bg-dark text-cream py-3 border-y border-white/10 overflow-hidden relative select-none">
        <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">
          <span className="shrink-0">{marqueeText}</span>
          <span className="shrink-0">{marqueeText}</span>
          <span className="shrink-0">{marqueeText}</span>
          <span className="shrink-0">{marqueeText}</span>
        </div>
      </div>

      {/* 4. Featured Categories (Bags, Shoes, Tops) */}
      <FeaturedCategories />

      {/* 5. New Arrivals Section */}
      <NewArrivalsSection />

      {/* 5. Fast Selling Section */}
      <FastSellingSection />
    </div>
  );
}
