"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardSkeleton } from "@/components/shop/ProductCardSkeleton";
import { SparkleDoodle } from "@/components/ui/decorative-icons";

export function FeaturedProducts() {
  const { data: products, loading, error } = useProducts();

  // Curate 4 featured products from catalog (prefer featured or new arrivals)
  const prettyPicks = products && products.length > 0
    ? products.slice(0, 4)
    : [];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-brand-ivory border-b border-brand-beige/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-brand-taupe-dark">
              <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-black/70">
                DAILY FAVOURITES
              </span>
            </div>

            <h2 className="font-handwriting font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-black">
              Pretty picks{" "}
              <span className="inline-block text-brand-black transform rotate-6 ml-1">
                ✦
              </span>
            </h2>
            
            <p className="text-sm sm:text-base font-light text-brand-taupe-dark">
              Handpicked pieces designed to elevate your everyday wardrobe.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-black hover:text-brand-taupe-dark transition-colors self-start sm:self-auto"
          >
            <span>View all pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 text-center bg-brand-butter/40 rounded-3xl border border-brand-beige text-brand-black space-y-3">
            <p className="text-sm font-semibold">Unable to load featured collection.</p>
            <Link
              href="/shop"
              className="inline-block text-xs font-bold uppercase tracking-wider underline hover:text-brand-taupe-dark"
            >
              Browse complete shop catalog
            </Link>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && prettyPicks.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {prettyPicks.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  product={product}
                  badge={product.isNew ? "NEW" : product.isBestSeller ? "POPULAR" : undefined}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && prettyPicks.length === 0 && (
          <div className="p-12 text-center bg-brand-butter/30 rounded-3xl border border-brand-beige space-y-4">
            <p className="font-handwriting text-2xl font-bold text-brand-black">
              Catalog updating shortly...
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-brand-black text-brand-ivory text-xs font-bold uppercase tracking-wider"
            >
              <span>Visit Shop</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

