"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardSkeleton } from "@/components/shop/ProductCardSkeleton";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { getColorHex } from "@/lib/mock-data";
import { SlidersHorizontal, X, RotateCcw, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type SortOption = "newest" | "best-selling" | "price-asc" | "price-desc";
type AvailabilityOption = "all" | "in-stock" | "out-of-stock";

interface ShopCatalogProps {
  forcedCategory?: "bag" | "shoe" | "top";
  title?: string;
  description?: string;
  showSearchInput?: boolean;
}

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "bag", label: "Bags" },
  { id: "shoe", label: "Shoes" },
  { id: "top", label: "Tops" },
  { id: "new-arrival", label: "New Arrivals" },
  { id: "fast-selling", label: "Fast Selling" },
];

export function ShopCatalog({
  forcedCategory,
  title = "Cloudlette",
  description,
  showSearchInput = false,
}: ShopCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: products, loading } = useProducts();

  // Read URL params
  const categoryParam = forcedCategory || searchParams?.get("category") || "all";
  const colorParam = searchParams?.get("color") || "";
  const sizeParam = searchParams?.get("size") || "";
  const minPriceParam = searchParams?.get("minPrice") || "";
  const maxPriceParam = searchParams?.get("maxPrice") || "";
  const availabilityParam = (searchParams?.get("availability") as AvailabilityOption) || "all";
  const sortParam = (searchParams?.get("sort") as SortOption) || "newest";
  const queryParam = searchParams?.get("q") || "";

  // Local state for inputs to allow smooth typing
  const [minPriceInput, setMinPriceInput] = useState(minPriceParam);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPriceParam);
  const [searchInputVal, setSearchInputVal] = useState(queryParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync inputs if URL params change externally
  useEffect(() => {
    setMinPriceInput(minPriceParam);
  }, [minPriceParam]);

  useEffect(() => {
    setMaxPriceInput(maxPriceParam);
  }, [maxPriceParam]);

  useEffect(() => {
    setSearchInputVal(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInputVal.trim() || null });
  };

  // Helper to update query params
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams ? searchParams.toString() : "");

      Object.entries(updates).forEach(([key, val]) => {
        if (!val || val === "all" || (key === "sort" && val === "newest")) {
          current.delete(key);
        } else {
          current.set(key, val);
        }
      });

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Collect all unique colors and sizes available in loaded products
  const { availableColors, availableSizes } = useMemo(() => {
    const colors = new Set<string>();
    const sizes = new Set<string>();

    products.forEach((p) => {
      // If forcedCategory is set, only consider variants of this category
      if (forcedCategory && p.category !== forcedCategory) return;

      p.variants.forEach((v) => {
        if (v.color) colors.add(v.color);
        if (v.size) sizes.add(v.size);
      });
    });

    return {
      availableColors: Array.from(colors).sort(),
      availableSizes: Array.from(sizes),
    };
  }, [products, forcedCategory]);

  // Handle clearing all filters
  const handleClearFilters = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    const current = new URLSearchParams();
    if (queryParam) current.set("q", queryParam);
    const targetUrl = current.toString() ? `${pathname}?${current.toString()}` : pathname;
    router.replace(targetUrl, { scroll: false });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...products];

    // Forced Category (for /shop/[category] pages)
    if (forcedCategory) {
      list = list.filter((p) => p.category === forcedCategory);
    } else if (categoryParam && categoryParam !== "all") {
      if (categoryParam === "bag" || categoryParam === "shoe" || categoryParam === "top") {
        list = list.filter((p) => p.category === categoryParam);
      } else if (categoryParam === "new-arrival" || categoryParam === "fast-selling") {
        list = list.filter((p) => p.tags.includes(categoryParam));
      }
    }

    // Search query
    if (queryParam) {
      const q = queryParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.variants.some((v) => v.color.toLowerCase().includes(q))
      );
    }

    // Color filter
    if (colorParam) {
      const targetColor = colorParam.toLowerCase();
      list = list.filter((p) =>
        p.variants.some((v) => v.color.toLowerCase() === targetColor)
      );
    }

    // Size filter
    if (sizeParam) {
      list = list.filter((p) => p.variants.some((v) => v.size === sizeParam));
    }

    // Price range filter
    if (minPriceParam) {
      const min = Number(minPriceParam);
      if (!isNaN(min)) {
        list = list.filter((p) => p.price >= min);
      }
    }
    if (maxPriceParam) {
      const max = Number(maxPriceParam);
      if (!isNaN(max)) {
        list = list.filter((p) => p.price <= max);
      }
    }

    // Availability filter
    if (availabilityParam === "in-stock") {
      list = list.filter((p) => p.variants.some((v) => v.stockQty > 0));
    } else if (availabilityParam === "out-of-stock") {
      list = list.filter((p) => p.variants.every((v) => v.stockQty <= 0));
    }

    // Sorting
    if (sortParam === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortParam === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortParam === "best-selling") {
      list.sort((a, b) => {
        const aScore = (a.isBestSeller ? 2 : 0) + (a.tags.includes("fast-selling") ? 1 : 0);
        const bScore = (b.isBestSeller ? 2 : 0) + (b.tags.includes("fast-selling") ? 1 : 0);
        return bScore - aScore;
      });
    }

    return list;
  }, [
    products,
    forcedCategory,
    categoryParam,
    queryParam,
    colorParam,
    sizeParam,
    minPriceParam,
    maxPriceParam,
    availabilityParam,
    sortParam,
  ]);

  const hasActiveFilters = Boolean(
    (!forcedCategory && categoryParam !== "all") ||
      colorParam ||
      sizeParam ||
      minPriceParam ||
      maxPriceParam ||
      availabilityParam !== "all" ||
      queryParam
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
      {/* Header Title Section */}
      <div className="text-left space-y-4 mb-8 border-b border-blush/40 pb-6">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-dark-muted font-light max-w-2xl leading-relaxed mt-1">
              {description}
            </p>
          )}
        </div>

        {showSearchInput && (
          <div className="pt-2 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white rounded-full border border-blush/80 shadow-xs focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all overflow-hidden p-1.5">
              <Search className="w-4 h-4 text-dark-muted ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search bags, heels, mules, silk tops..."
                value={searchInputVal}
                onChange={(e) => setSearchInputVal(e.target.value)}
                className="w-full py-2 px-3 bg-transparent text-sm text-dark placeholder:text-dark-muted/60 outline-none"
              />
              {searchInputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInputVal("");
                    updateParams({ q: null });
                  }}
                  className="p-1 rounded-full hover:bg-cream text-dark-muted hover:text-dark mr-1 transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-dark text-cream hover:bg-gold hover:text-dark text-xs font-semibold uppercase tracking-wider transition-colors flex-shrink-0 shadow-sm"
              >
                Search
              </button>
            </form>
            <div className="flex items-center flex-wrap gap-2 pt-3">
              <span className="text-[11px] font-semibold text-dark-muted uppercase tracking-wider mr-1">
                Trending:
              </span>
              {["Leather Tote", "Silk Blouse", "Block Heels", "Emerald", "Satin"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchInputVal(term);
                    updateParams({ q: term });
                  }}
                  className="text-xs py-1 px-3 bg-cream/50 hover:bg-gold/20 border border-blush/50 rounded-full text-dark/80 hover:text-dark transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {queryParam && !showSearchInput && (
          <p className="text-xs sm:text-sm text-dark-muted font-light">
            Search results for &quot;<span className="font-semibold text-dark">{queryParam}</span>&quot;
          </p>
        )}
      </div>

      {/* Mobile Category Tabs Bar (Only when category is not forced) */}
      {!forcedCategory && (
        <div className="md:hidden overflow-x-auto scrollbar-hide pb-3 mb-6 no-scrollbar border-b border-blush/30">
          <div className="flex items-center space-x-6 min-w-max">
            {CATEGORIES.map((tab) => {
              const isActive = categoryParam === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => updateParams({ category: tab.id })}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.18em] pb-1 border-b-2 transition-all duration-200 whitespace-nowrap focus:outline-none",
                    isActive
                      ? "border-gold text-dark font-bold"
                      : "border-transparent text-dark-muted hover:text-dark"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left Sidebar: Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 space-y-6 bg-cream/30 p-6 rounded-2xl border border-blush/40 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between border-b border-blush/40 pb-3">
            <h2 className="font-heading text-xl font-bold text-dark">Filters</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-dark-muted hover:text-gold transition-colors inline-flex items-center space-x-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Section (when not forced) */}
          {!forcedCategory && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                Category
              </h3>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const isActive = categoryParam === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateParams({ category: cat.id })}
                      className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg text-left transition-colors hover:bg-cream-light"
                    >
                      <span className={cn("font-medium", isActive ? "text-dark font-bold" : "text-dark-muted")}>
                        {cat.label}
                      </span>
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                          isActive ? "border-gold bg-gold" : "border-blush/80 bg-white"
                        )}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-dark" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Availability Filter */}
          <div className="space-y-3 pt-3 border-t border-blush/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
              Availability
            </h3>
            <div className="flex flex-col space-y-1.5">
              {[
                { id: "all", label: "All Items" },
                { id: "in-stock", label: "In Stock" },
                { id: "out-of-stock", label: "Out of Stock" },
              ].map((opt) => {
                const isActive = availabilityParam === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateParams({ availability: opt.id })}
                    className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg text-left transition-colors hover:bg-cream-light"
                  >
                    <span className={cn("font-medium", isActive ? "text-dark font-bold" : "text-dark-muted")}>
                      {opt.label}
                    </span>
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                        isActive ? "border-gold bg-gold" : "border-blush/80 bg-white"
                      )}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-dark" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          {availableColors.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-blush/30">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Color
                </h3>
                {colorParam && (
                  <button
                    type="button"
                    onClick={() => updateParams({ color: null })}
                    className="text-[11px] text-dark-muted hover:text-gold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((colorName) => {
                  const isSelected = colorParam.toLowerCase() === colorName.toLowerCase();
                  const hex = getColorHex(colorName);

                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() =>
                        updateParams({ color: isSelected ? null : colorName })
                      }
                      className={cn(
                        "w-6 h-6 rounded-full border border-black/10 transition-all flex items-center justify-center relative",
                        isSelected
                          ? "ring-2 ring-gold ring-offset-2 scale-110"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      )}
                      style={{ backgroundColor: hex }}
                      title={colorName}
                    >
                      {isSelected && (
                        <Check
                          className={cn(
                            "w-3 h-3 stroke-[3]",
                            hex === "#F9F6EE" || hex === "#FFFDD0" || hex === "#E8D8B0"
                              ? "text-dark"
                              : "text-white"
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Filter */}
          {availableSizes.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-blush/30">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Size
                </h3>
                {sizeParam && (
                  <button
                    type="button"
                    onClick={() => updateParams({ size: null })}
                    className="text-[11px] text-dark-muted hover:text-gold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => {
                  const isSelected = sizeParam === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => updateParams({ size: isSelected ? null : size })}
                      className={cn(
                        "min-w-[36px] h-8 px-2 text-xs font-bold uppercase rounded border transition-all",
                        isSelected
                          ? "bg-gold text-dark border-gold font-bold shadow-xs"
                          : "bg-white text-dark border-blush/70 hover:border-gold"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Range Section with apply */}
          <div className="space-y-3 pt-3 border-t border-blush/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                Price (₦)
              </h3>
              {(minPriceParam || maxPriceParam) && (
                <button
                  type="button"
                  onClick={() => {
                    setMinPriceInput("");
                    setMaxPriceInput("");
                    updateParams({ minPrice: null, maxPrice: null });
                  }}
                  className="text-[11px] text-dark-muted hover:text-gold"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ₦"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateParams({ minPrice: minPriceInput || null });
                  }
                }}
                className="w-full bg-white border border-blush/60 rounded-md py-1.5 px-2.5 text-xs text-dark outline-none focus:border-gold"
              />
              <input
                type="number"
                placeholder="Max ₦"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateParams({ maxPrice: maxPriceInput || null });
                  }
                }}
                className="w-full bg-white border border-blush/60 rounded-md py-1.5 px-2.5 text-xs text-dark outline-none focus:border-gold"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                updateParams({
                  minPrice: minPriceInput || null,
                  maxPrice: maxPriceInput || null,
                })
              }
              className="w-full py-1.5 bg-dark text-cream hover:bg-gold hover:text-dark rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors"
            >
              Apply Price
            </button>
          </div>
        </aside>

        {/* Right Area: Controls & Product Grid */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Control Bar: Showing X Products count & Sort Dropdown */}
          <div className="flex items-center justify-between gap-4 bg-cream/20 p-3 rounded-xl border border-blush/30">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 px-3 py-1.5 bg-dark text-cream rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-dark transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filter {hasActiveFilters && "•"}</span>
            </button>

            {/* Product count */}
            <p className="text-xs text-dark-muted font-medium">
              Showing{" "}
              <span className="text-dark font-bold">
                {loading ? "..." : filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="hidden sm:block text-xs font-medium text-dark-muted">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortParam}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="bg-white border border-blush/60 focus:border-gold rounded-lg py-1.5 px-3 text-xs text-dark outline-none cursor-pointer font-medium"
              >
                <option value="newest">Newest</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-dark-muted mr-1">
                Active:
              </span>
              {queryParam && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span>Search: &ldquo;{queryParam}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInputVal("");
                      updateParams({ q: null });
                    }}
                    className="hover:text-gold"
                    aria-label="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {!forcedCategory && categoryParam !== "all" && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span className="capitalize">{categoryParam.replace("-", " ")}</span>
                  <button
                    type="button"
                    onClick={() => updateParams({ category: null })}
                    className="hover:text-gold"
                    aria-label="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {colorParam && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span>Color: {colorParam}</span>
                  <button
                    type="button"
                    onClick={() => updateParams({ color: null })}
                    className="hover:text-gold"
                    aria-label="Remove color filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sizeParam && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span>Size: {sizeParam}</span>
                  <button
                    type="button"
                    onClick={() => updateParams({ size: null })}
                    className="hover:text-gold"
                    aria-label="Remove size filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(minPriceParam || maxPriceParam) && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span>
                    Price: {minPriceParam ? `₦${Number(minPriceParam).toLocaleString()}` : "₦0"} -{" "}
                    {maxPriceParam ? `₦${Number(maxPriceParam).toLocaleString()}` : "Any"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMinPriceInput("");
                      setMaxPriceInput("");
                      updateParams({ minPrice: null, maxPrice: null });
                    }}
                    className="hover:text-gold"
                    aria-label="Remove price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {availabilityParam !== "all" && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cream text-dark text-xs border border-blush/60">
                  <span>{availabilityParam === "in-stock" ? "In Stock" : "Out of Stock"}</span>
                  <button
                    type="button"
                    onClick={() => updateParams({ availability: null })}
                    className="hover:text-gold"
                    aria-label="Remove availability filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-gold hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid or Skeletons */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-cream/20 rounded-2xl border border-blush/40 p-8 space-y-3">
              <p className="text-dark font-semibold text-base">No products match your selection.</p>
              <p className="text-dark-muted text-xs font-light">
                Try clearing some active filters or search terms.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-2 inline-flex items-center px-4 py-2 bg-dark text-cream rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-dark transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <FadeInSection>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
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
                    badgeType={product.tags.includes("fast-selling") ? "hot" : "new"}
                  />
                ))}
              </div>
            </FadeInSection>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="absolute bottom-0 inset-x-0 bg-cream rounded-t-3xl p-6 shadow-2xl border-t border-gold/40 max-h-[85vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-blush/40 pb-4">
                <h2 className="font-heading text-2xl font-bold text-dark">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-dark hover:bg-blush/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Category Filter on Mobile */}
              {!forcedCategory && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                    Category
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => {
                      const isActive = categoryParam === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => updateParams({ category: cat.id })}
                          className={cn(
                            "py-2 px-3 rounded-lg text-xs font-semibold text-center border transition-all",
                            isActive
                              ? "bg-dark text-cream border-dark"
                              : "bg-white text-dark border-blush/70"
                          )}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Availability Filter on Mobile */}
              <div className="space-y-3 pt-2 border-t border-blush/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Availability
                </h3>
                <div className="flex gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "in-stock", label: "In Stock" },
                    { id: "out-of-stock", label: "Out of Stock" },
                  ].map((opt) => {
                    const isActive = availabilityParam === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateParams({ availability: opt.id })}
                        className={cn(
                          "flex-1 py-2 text-xs font-semibold rounded-lg border text-center transition-all",
                          isActive
                            ? "bg-dark text-cream border-dark"
                            : "bg-white text-dark border-blush/70"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Filter on Mobile */}
              {availableColors.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-blush/30">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {availableColors.map((colorName) => {
                      const isSelected = colorParam.toLowerCase() === colorName.toLowerCase();
                      const hex = getColorHex(colorName);

                      return (
                        <button
                          key={colorName}
                          type="button"
                          onClick={() =>
                            updateParams({ color: isSelected ? null : colorName })
                          }
                          className={cn(
                            "w-8 h-8 rounded-full border border-black/10 transition-all flex items-center justify-center",
                            isSelected
                              ? "ring-2 ring-gold ring-offset-2 scale-110"
                              : "hover:scale-105 opacity-80"
                          )}
                          style={{ backgroundColor: hex }}
                          title={colorName}
                        >
                          {isSelected && (
                            <Check
                              className={cn(
                                "w-4 h-4 stroke-[3]",
                                hex === "#F9F6EE" || hex === "#FFFDD0" || hex === "#E8D8B0"
                                  ? "text-dark"
                                  : "text-white"
                              )}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Filter on Mobile */}
              {availableSizes.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-blush/30">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => {
                      const isSelected = sizeParam === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => updateParams({ size: isSelected ? null : size })}
                          className={cn(
                            "min-w-[40px] h-9 px-3 text-xs font-bold uppercase rounded-lg border transition-all",
                            isSelected
                              ? "bg-gold text-dark border-gold font-bold shadow-xs"
                              : "bg-white text-dark border-blush/70"
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Range Filter on Mobile */}
              <div className="space-y-3 pt-2 border-t border-blush/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Price Range (₦)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min ₦"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="w-full bg-white border border-blush/60 rounded-lg p-2.5 text-xs text-dark outline-none focus:border-gold"
                  />
                  <input
                    type="number"
                    placeholder="Max ₦"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="w-full bg-white border border-blush/60 rounded-lg p-2.5 text-xs text-dark outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-blush/40 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    handleClearFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 py-3 bg-white text-dark border border-blush rounded-full text-xs font-bold uppercase tracking-wider text-center"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateParams({
                      minPrice: minPriceInput || null,
                      maxPrice: maxPriceInput || null,
                    });
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 py-3 bg-dark text-cream rounded-full text-xs font-bold uppercase tracking-wider text-center hover:bg-gold hover:text-dark transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
