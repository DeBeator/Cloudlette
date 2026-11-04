"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  HeartDoodle,
  SparkleDoodle,
  BowIllustration,
  UnderlineSquiggle,
} from "@/components/ui/decorative-icons";

export function HeroSection() {
  return (
    <section className="relative w-full bg-hero-pattern overflow-hidden border-b border-brand-beige/60 py-12 sm:py-16 lg:py-24">
      {/* Decorative floating doodles */}
      <div className="absolute top-8 left-8 text-brand-taupe/40 hidden sm:block animate-pulse pointer-events-none">
        <SparkleDoodle className="w-5 h-5" />
      </div>
      <div className="absolute top-1/3 right-10 text-brand-butter-dark hidden lg:block pointer-events-none">
        <SparkleDoodle className="w-6 h-6" />
      </div>
      <div className="absolute bottom-10 left-1/4 text-brand-taupe/30 hidden md:block pointer-events-none">
        <HeartDoodle className="w-5 h-5 text-brand-taupe" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Copy (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left relative z-10 space-y-6">
            
            {/* Eyebrow with bow illustration */}
            <div className="inline-flex items-center justify-center lg:justify-start space-x-2">
              <BowIllustration className="w-5 h-5 text-brand-black" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-brand-black/80">
                THE CLOUDLETTE EDIT
              </span>
            </div>

            {/* Playful Handwritten Main Headline */}
            <div className="relative inline-block">
              <h1 className="font-handwriting font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight text-brand-black">
                Your daily dose of chic.{" "}
                <span className="inline-block text-brand-black transform rotate-6 ml-1">
                  ♡
                </span>
              </h1>
              {/* Subtle underline squiggle */}
              <div className="mt-2 flex justify-center lg:justify-start">
                <UnderlineSquiggle className="w-36 sm:w-48 text-brand-butter-dark" />
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl font-light text-brand-black/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Cute finds, lovely details and everyday favourites. Curated pieces to make every outfit feel a little more special.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-brand-black text-brand-ivory hover:bg-brand-black-light px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/shop?category=new-arrival"
                className="inline-flex items-center justify-center border-2 border-brand-black text-brand-black hover:bg-brand-butter px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200"
              >
                EXPLORE THE EDIT
              </Link>
            </div>

            {/* Micro-trust line */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-4 text-xs text-brand-taupe-dark font-medium">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Doorstep delivery in Lagos</span>
              </div>
              <span className="text-brand-beige-dark">·</span>
              <span>Swift nationwide dispatch</span>
            </div>
          </div>

          {/* Right Column: Editorial Fashion Composition (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background soft butter pill decorative backdrop */}
            <div className="absolute inset-0 bg-brand-butter/70 rounded-4xl transform rotate-2 -z-0 scale-95 border border-brand-beige" />
            
            {/* Composite Fashion Visuals Grid */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-none grid grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4">
              
              {/* Primary Visual: Cream Handbag (7 cols) */}
              <div className="col-span-7 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md border-2 border-brand-ivory bg-brand-beige/40 group">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                  alt="Cloudlette Handcrafted Structured Leather Bag in Cream"
                  fill
                  priority
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-brand-ivory/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-black shadow-xs">
                  Handcrafted Bags
                </div>
              </div>

              {/* Right Stack: Shoes + Soft Top (5 cols) */}
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                
                {/* Secondary Visual: Chic Designer Shoes */}
                <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-brand-ivory bg-brand-beige/40 group">
                  <Image
                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
                    alt="Cloudlette Statement Pointed Mules and Heels"
                    fill
                    sizes="(max-width: 768px) 35vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-brand-butter text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                    Shoes
                  </div>
                </div>

                {/* Tertiary Visual: Soft Knit / Silk Top */}
                <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-brand-ivory bg-brand-beige/40 group">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
                    alt="Cloudlette Soft Knitted Top and Blouses"
                    fill
                    sizes="(max-width: 768px) 35vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-brand-beige text-brand-black px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                    Cute Tops
                  </div>
                </div>
              </div>

              {/* Little cute floating stamp badge */}
              <div className="absolute -bottom-4 -left-3 sm:-left-5 bg-brand-ivory text-brand-black p-3 rounded-2xl shadow-lg border border-brand-beige flex items-center space-x-2 animate-float">
                <span className="w-8 h-8 rounded-full bg-brand-butter flex items-center justify-center text-sm font-bold">
                  ✦
                </span>
                <div className="text-left pr-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider">Boutique Edit</p>
                  <p className="text-[11px] text-brand-taupe-dark">New Drops Weekly</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

