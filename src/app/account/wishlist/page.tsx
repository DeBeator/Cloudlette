"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useProducts } from "@/hooks/useProducts";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardSkeleton } from "@/components/shop/ProductCardSkeleton";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Heart, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((state) => state.items);
  const { data: allProducts, loading } = useProducts();

  // Match wishlisted IDs or slugs to full product objects
  const wishlistedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    return allProducts.filter(
      (p) => wishlistIds.includes(p.id) || wishlistIds.includes(p.slug)
    );
  }, [allProducts, wishlistIds]);

  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <AccountSidebar />
        </div>

        {/* Right Content */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-blush/40 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
                MY FAVORITES
              </span>
              <div className="relative inline-block">
                <h1 className="font-heading text-3xl sm:text-4xl font-normal text-dark pb-2">
                  Saved Wishlist
                </h1>
                <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
              </div>
            </div>
            <p className="text-xs text-dark-muted font-medium">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Product Grid or Empty State */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : wishlistedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blush/60 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
                <Heart className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-dark">
                Nothing saved yet. Start browsing.
              </h2>
              <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                Save your favorite bags, statement heels, and tops to easily find and purchase them later.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}
