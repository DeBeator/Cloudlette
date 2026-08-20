"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS, Product } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";

export const dynamic = "force-dynamic";

type FilterCategory = "all" | "bag" | "shoe" | "top" | "new-arrival" | "fast-selling";
type SortOption = "newest" | "price-asc" | "price-desc";

const CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "bag", label: "Bags" },
  { id: "shoe", label: "Shoes" },
  { id: "top", label: "Tops" },
];

const MOBILE_CATEGORY_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "bag", label: "BAGS" },
  { id: "shoe", label: "SHOES" },
  { id: "top", label: "TOPS" },
  { id: "new-arrival", label: "NEW ARRIVALS" },
  { id: "fast-selling", label: "FAST SELLING" },
];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;
  const searchQuery = searchParams ? searchParams.get("q") : null;

  // Initialize with "all" so products render immediately on server and client
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param from URL after client hydration
  useEffect(() => {
    if (categoryParam) {
      const match = MOBILE_CATEGORY_TABS.find((t) => t.id === categoryParam);
      if (match) {
        setActiveCategory(match.id);
      }
    } else {
      setActiveCategory("all");
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: FilterCategory) => {
    setActiveCategory(cat);
    if (cat === "all") {
      router.replace("/shop", { scroll: false });
    } else {
      router.replace(`/shop?category=${cat}`, { scroll: false });
    }
  };

  const handleClearFilters = () => {
    setActiveCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    router.replace("/shop", { scroll: false });
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...MOCK_PRODUCTS];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      if (activeCategory === "bag" || activeCategory === "shoe" || activeCategory === "top") {
        list = list.filter((p) => p.category === activeCategory);
      } else if (activeCategory === "new-arrival" || activeCategory === "fast-selling") {
        list = list.filter((p) => p.tags.includes(activeCategory));
      }
    }

    // Sort logic
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
      {/* Header Title Section */}
      <div className="text-left space-y-2 mb-8 border-b border-blush/40 pb-6">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
          Shop Collection
        </h1>
        {searchQuery && (
          <p className="text-xs sm:text-sm text-dark-muted font-light">
            Search results for &quot;<span className="font-semibold text-dark">{searchQuery}</span>&quot;
          </p>
        )}
      </div>

      {/* Mobile Category Tabs Bar (Visible on mobile only) */}
      <div className="md:hidden overflow-x-auto scrollbar-hide pb-3 mb-6 no-scrollbar border-b border-blush/30">
        <div className="flex items-center space-x-6 min-w-max">
          {MOBILE_CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
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

      {/* Main Two-Column Layout (Desktop) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left Sidebar (Desktop Filters — w-64 flex-shrink-0 sticky) */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 space-y-8 bg-cream/30 p-6 rounded-2xl border border-blush/40">
          <div className="flex items-center justify-between border-b border-blush/40 pb-3">
            <h2 className="font-heading text-xl font-bold text-dark">Filter</h2>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-dark-muted hover:text-gold transition-colors inline-flex items-center space-x-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Section (Radio style with gold dot for active) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
              Category
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
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

          {/* Price Range Section (Stub) */}
          <div className="space-y-3 pt-2 border-t border-blush/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
              Price Range (₦)
            </h3>
            {/* TODO: wire price range filter when backend is live */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-white border border-blush/60 rounded-md py-1.5 px-2.5 text-xs text-dark outline-none focus:border-gold"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-white border border-blush/60 rounded-md py-1.5 px-2.5 text-xs text-dark outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Clear Filters Link */}
          <div className="pt-2 border-t border-blush/30">
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold uppercase tracking-wider text-gold-hover hover:underline"
            >
              Clear filters
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
              <span>Filter</span>
            </button>

            <p className="text-xs text-dark-muted font-medium">
              Showing <span className="text-dark font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="hidden sm:block text-xs font-medium text-dark-muted">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-blush/60 focus:border-gold rounded-lg py-1.5 px-3 text-xs text-dark outline-none cursor-pointer font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid (3 columns desktop, 2 mobile) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-cream/20 rounded-2xl border border-blush/40 p-8 space-y-3">
              <p className="text-dark font-semibold text-base">No products match your selection.</p>
              <p className="text-dark-muted text-xs font-light">
                Try selecting another category or clearing active search filters.
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
                <h2 className="font-heading text-2xl font-bold text-dark">Filter</h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-dark hover:bg-blush/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Category
                </h3>
                <div className="space-y-2">
                  {MOBILE_CATEGORY_TABS.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          handleCategoryChange(cat.id);
                          setMobileFilterOpen(false);
                        }}
                        className="w-full flex items-center justify-between text-sm py-2 px-3 rounded-xl text-left bg-white border border-blush/40"
                      >
                        <span className={cn("font-medium", isActive ? "text-dark font-bold" : "text-dark-muted")}>
                          {cat.label}
                        </span>
                        <span
                          className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center",
                            isActive ? "border-gold bg-gold" : "border-blush bg-white"
                          )}
                        >
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-dark" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter (Stub) */}
              <div className="space-y-3 pt-2 border-t border-blush/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark">
                  Price Range (₦)
                </h3>
                {/* TODO: wire price range filter when backend is live */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-white border border-blush/60 rounded-lg p-2.5 text-xs text-dark outline-none focus:border-gold"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
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
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-8 py-20 text-center text-dark-muted font-light">
          Loading collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
