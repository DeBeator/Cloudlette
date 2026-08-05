"use client";

// TODO: replace with API call to /api/products
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export function FastSellingSection() {
  // TODO: replace with API call to /api/products
  const fastSelling = MOCK_PRODUCTS.filter((p) =>
    p.tags.includes("fast-selling")
  ).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-cream border-t border-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="space-y-2 mb-10 text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            MOVING FAST
          </span>
          <div className="relative inline-block">
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-dark pb-2">
              Fast Selling
            </h2>
            {/* Thin short gold decorative underline accent */}
            <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {fastSelling.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge="SELLING FAST"
                badgeType="hot"
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
