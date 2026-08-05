"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { FastSellingSection } from "@/components/home/FastSellingSection";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-0">
      {/* Full-Bleed Single Image Hero Section */}
      {/* TODO: replace with full-bleed client photography — this is the hero centrepiece */}
      <section className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-dark">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
          alt="Cloudlette Editorial Presentation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Subtle dark gradient overlay (left to right) for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/45 to-transparent z-10" />

        {/* Overlaid Text Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
          <div className="max-w-xl space-y-6 text-left">
            {/* Headline */}
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-cream-light leading-tight tracking-tight"
            >
              Good clothes for real life.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm sm:text-base text-cream-light/80 font-light leading-relaxed max-w-md"
            >
              Good clothes. Real style. Made for you.
            </motion.p>

            {/* Pill CTA: Understated outline style, small size */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2"
            >
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full px-6 py-2.5 text-xs font-medium tracking-wider uppercase border-cream-light/40 text-cream-light bg-transparent hover:bg-white/10 hover:border-cream-light transition-all duration-300 group shadow-none"
              >
                <Link href="/shop" className="inline-flex items-center space-x-2">
                  <span>Shop Collection</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Featured Categories (Bags, Shoes, Tops) */}
      <FeaturedCategories />

      {/* New Arrivals Section */}
      <NewArrivalsSection />

      {/* Fast Selling Section */}
      <FastSellingSection />
    </div>
  );
}
