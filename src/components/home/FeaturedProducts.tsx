"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardSkeleton } from "@/components/shop/ProductCardSkeleton";
import { SparkleDoodle } from "@/components/ui/decorative-icons";

const FILTER_TABS = [
  { id: "all", label: "All Picks" },
  { id: "bags", label: "Bags" },
  { id: "shoes", label: "Shoes & Heels" },
  { id: "tops", label: "Cute Tops" },
];

export function FeaturedProducts() {
  const { data: products, loading, error } = useProducts();
  const [activeTab, setActiveTab] = useState("all");

  // Filter products by category tab
  const filteredProducts = (products || []).filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "bags") return product.category.toLowerCase().includes("bag");
    if (activeTab === "shoes") return product.category.toLowerCase().includes("shoe") || product.category.toLowerCase().includes("heel");
    if (activeTab === "tops") return product.category.toLowerCase().includes("top") || product.category.toLowerCase().includes("blouse");
    return true;
  });

  const prettyPicks = filteredProducts.slice(0, 4);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-brand-ivory border-b border-brand-beige/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-brand-taupe-dark">
              <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-black/70">
                DAILY FAVOURITES
              </span>
            </div>

            <h2 className="font-handwriting font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-black">
              Pretty picks{" "}
              <span className="inline-block text-brand-black transform rotate-6 ml-1">
                ✦
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base font-normal text-brand-taupe-dark">
              Handpicked pieces designed to elevate your everyday wardrobe.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-black hover:text-brand-taupe-dark transition-colors self-start md:self-auto"
          >
            <span>View all pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2 mb-6 sm:mb-8">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-black text-brand-ivory shadow-xs"
                  : "bg-brand-butter/50 text-brand-black hover:bg-brand-butter border border-brand-beige/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
          <div className="p-10 text-center bg-brand-butter/30 rounded-3xl border border-brand-beige space-y-3">
            <p className="font-handwriting text-2xl font-bold text-brand-black">
              No pieces in this edit right now.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-brand-black text-brand-ivory text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <span>View All Picks</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
