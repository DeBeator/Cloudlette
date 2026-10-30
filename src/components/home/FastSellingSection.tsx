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
    <section className="py-16 sm:py-24 bg-cream border-t border-blush/30 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        {/* Section Heading with Eyebrow */}
        <FadeInSection className="mb-10 text-left">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gold block mb-2">
            MOVING FAST
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            Fast Selling
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible gap-4 lg:gap-6 snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {fastSelling.map((product) => (
              <div
                key={product.id}
                className="snap-start flex-shrink-0 w-[70vw] lg:w-auto h-full"
              >
                <ProductCard
                  product={product}
                  badge="SELLING FAST"
                  badgeType="hot"
                />
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
