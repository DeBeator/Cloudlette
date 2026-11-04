import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { CategorySection } from "@/components/home/CategorySection";
import { PromotionalStrip } from "@/components/home/PromotionalStrip";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="w-full space-y-0 overflow-x-hidden bg-brand-ivory">
      {/* SECTION A — Hero */}
      <HeroSection />

      {/* SECTION B — Store benefits */}
      <BenefitsStrip />

      {/* SECTION C — Shop by Category */}
      <CategorySection />

      {/* SECTION D — Promotional strip */}
      <PromotionalStrip />

      {/* SECTION E — Featured products ("Pretty picks") */}
      <FeaturedProducts />

      {/* SECTION F — Newsletter */}
      <NewsletterSection />
    </div>
  );
}
