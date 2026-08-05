"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { cn } from "@/lib/utils";

// TODO: replace mock data with GET /api/products?category=...

type FilterTab = "all" | "bag" | "shoe" | "top" | "new-arrival" | "fast-selling";

const FILTER_TABS: { id: FilterTab; label: string; param: string }[] = [
  { id: "all", label: "All", param: "all" },
  { id: "bag", label: "Bags", param: "bag" },
  { id: "shoe", label: "Shoes", param: "shoe" },
  { id: "top", label: "Tops", param: "top" },
  { id: "new-arrival", label: "New Arrivals", param: "new-arrival" },
  { id: "fast-selling", label: "Fast Selling", param: "fast-selling" },
];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    if (categoryParam) {
      const match = FILTER_TABS.find((t) => t.param === categoryParam);
      if (match) {
        setActiveTab(match.id);
      }
    }
  }, [categoryParam]);

  const handleTabChange = (tabId: FilterTab) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      router.replace("/shop", { scroll: false });
    } else {
      router.replace(`/shop?category=${tabId}`, { scroll: false });
    }
  };

  // TODO: replace mock data with GET /api/products?category=...
  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return MOCK_PRODUCTS;

    if (activeTab === "bag" || activeTab === "shoe" || activeTab === "top") {
      return MOCK_PRODUCTS.filter((p) => p.category === activeTab);
    }

    if (activeTab === "fast-selling" || activeTab === "new-arrival") {
      return MOCK_PRODUCTS.filter((p) => p.tags.includes(activeTab));
    }

    return MOCK_PRODUCTS;
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-left space-y-3 mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          THE EDIT
        </span>
        <div className="relative inline-block">
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-dark pb-2">
            Shop
          </h1>
          {/* Short gold decorative underline accent */}
          <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-dark-muted font-light pt-1">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Filter Tabs - Clean underline tabs (no background fill, no outlines) */}
      <div className="overflow-x-auto pb-3 mb-10 no-scrollbar border-b border-blush/40">
        <div className="flex items-center space-x-6 sm:space-x-8 min-w-max">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] pb-1 border-b-2 transition-all duration-200 whitespace-nowrap focus:outline-none",
                  isActive
                    ? "border-gold text-dark"
                    : "border-transparent text-dark-muted/60 hover:text-dark"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-cream-light/60 rounded-2xl border border-blush/40 max-w-md mx-auto">
          <p className="text-dark-muted text-sm font-light">
            No products found in this category yet.
          </p>
        </div>
      ) : (
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={
                  product.tags.includes("fast-selling")
                    ? "SELLING FAST"
                    : product.tags.includes("new-arrival")
                    ? "New"
                    : undefined
                }
                badgeType={product.tags.includes("fast-selling") ? "hot" : "new"}
              />
            ))}
          </div>
        </FadeInSection>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-dark-muted font-light">
          Loading collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
