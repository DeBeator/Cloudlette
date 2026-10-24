"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardSkeleton } from "@/components/shop/ProductCardSkeleton";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Search, X, ArrowRight, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";

  const [inputVal, setInputVal] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const { data: products, loading } = useProducts();

  // Sync state if URL query param changes
  useEffect(() => {
    setInputVal(initialQuery);
    setActiveQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    setActiveQuery(trimmed);
    if (trimmed) {
      router.replace(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
    } else {
      router.replace(`/search`, { scroll: false });
    }
  };

  const handleClear = () => {
    setInputVal("");
    setActiveQuery("");
    router.replace(`/search`, { scroll: false });
  };

  // Filter products by name, category, color, description, material
  const searchResults = useMemo(() => {
    if (!activeQuery.trim()) return products;

    const q = activeQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchMaterial = product.material?.toLowerCase().includes(q);
      const matchColor = product.variants.some((v) =>
        v.color.toLowerCase().includes(q)
      );
      const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));

      return matchName || matchCategory || matchDesc || matchMaterial || matchColor || matchTags;
    });
  }, [products, activeQuery]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
          Catalog Search
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
          Find Your Luxury Piece
        </h1>
        <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
          Search by silhouette, category (bags, shoes, tops), fine materials, or signature colors.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative mt-6 max-w-xl mx-auto">
          <div className="relative flex items-center bg-white rounded-full border border-blush/80 shadow-md focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all overflow-hidden p-1.5">
            <Search className="w-5 h-5 text-dark-muted ml-3.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search bags, heels, mules, silk tops..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full py-2.5 px-3 bg-transparent text-sm text-dark placeholder:text-dark-muted/60 outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-cream text-dark-muted hover:text-dark mr-1 transition-colors"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors flex-shrink-0 shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          <span className="text-[11px] font-semibold text-dark-muted uppercase tracking-wider mr-1">
            Trending:
          </span>
          {["Leather Tote", "Silk Blouse", "Block Heels", "Emerald", "Satin"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setInputVal(term);
                setActiveQuery(term);
                router.replace(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
              }}
              className="text-xs py-1 px-3 bg-cream/50 hover:bg-gold/20 border border-blush/50 rounded-full text-dark/80 hover:text-dark transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-blush/40 pb-4 mb-8">
        <div>
          {activeQuery ? (
            <p className="text-sm text-dark">
              Results for &quot;<span className="font-semibold text-dark">{activeQuery}</span>&quot;
            </p>
          ) : (
            <p className="text-sm text-dark">
              Showing all luxury pieces
            </p>
          )}
        </div>
        <p className="text-xs text-dark-muted font-medium">
          {loading ? "Searching..." : `${searchResults.length} ${searchResults.length === 1 ? "product" : "products"} found`}
        </p>
      </div>

      {/* Grid or Skeletons or Empty State */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : activeQuery && searchResults.length === 0 ? (
        <div className="text-center py-20 bg-cream/20 rounded-2xl border border-blush/40 p-8 max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-dark">
            No results for &quot;{activeQuery}&quot;
          </h2>
          <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
            We couldn&apos;t find any pieces matching your search query. Try checking your spelling or explore our entire collection.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Browse all products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <FadeInSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={
                  product.tags.includes("fast-selling")
                    ? "SELLING FAST"
                    : product.tags.includes("new-arrival")
                    ? "NEW"
                    : undefined
                }
              />
            ))}
          </div>
        </FadeInSection>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-4 sm:px-8 lg:px-16 py-14">
          <div className="h-10 w-64 bg-blush/40 rounded-full mx-auto animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
