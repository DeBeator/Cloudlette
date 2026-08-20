"use client";

// TODO: replace with API call to /api/products
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export function NewArrivalsSection() {
  // TODO: replace with API call to /api/products
  const newArrivals = MOCK_PRODUCTS.filter((p) =>
    p.tags.includes("new-arrival")
  ).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-cream/40 border-t border-blush/30 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        {/* Section Heading: Left-Aligned, Playfair Display Large. No Eyebrow. */}
        <FadeInSection className="mb-10 text-left">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            New Arrivals
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} badge="NEW" badgeType="new" />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
