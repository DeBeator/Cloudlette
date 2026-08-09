"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Bags",
    slug: "bag",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    tagline: "Structured Totes & Clutch Purses",
  },
  {
    name: "Shoes",
    slug: "shoe",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    tagline: "Handcrafted Heels & Mules",
  },
  {
    name: "Tops",
    slug: "top",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    tagline: "Fluid Silk & Satin Wraps",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover">
            EXPLORE CATEGORIES
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-dark">
            Collections
          </h2>
          <p className="text-dark-muted text-sm sm:text-base font-light">
            Bags, shoes, and tops for everyday wear.
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md border border-blush/40 flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Full-bleed background image */}
                {/* TODO: replace with real category photography from client */}
                <Image
                  src={cat.image}
                  alt={`${cat.name} Collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content at bottom-left */}
                <div className="relative z-10 space-y-2 text-cream">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    {cat.tagline}
                  </span>
                  <h3 className="font-heading text-3xl font-normal text-white">
                    {cat.name}
                  </h3>
                  <div className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cream/90 group-hover:text-gold transition-colors pt-1">
                    <span>See all {cat.name.toLowerCase()}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
