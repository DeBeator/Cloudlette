"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeInSection } from "@/components/animations/FadeInSection";

const CATEGORIES = [
  {
    name: "Bags",
    slug: "bag",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Shoes",
    slug: "shoe",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tops",
    slug: "top",
    // TODO: replace with real category photography from client
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-cream w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        {/* Section Heading Left-Aligned, Playfair Display, Large, Dark. No eyebrow. */}
        <FadeInSection className="mb-10 text-left">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Shop by Category
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-square w-full rounded-2xl overflow-hidden shadow-md border border-blush/40 flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Full-bleed background image */}
                {/* TODO: replace with real category photography from client */}
                <Image
                  src={cat.image}
                  alt={`${cat.name} Collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Dark gradient overlay bottom-up */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content at bottom-left */}
                <div className="relative z-10 space-y-1 text-cream text-left">
                  <h3 className="font-heading text-3xl sm:text-4xl font-bold text-cream">
                    {cat.name}
                  </h3>
                  <div className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold pt-1">
                    Shop →
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
