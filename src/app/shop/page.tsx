import { Suspense } from "react";
import { Metadata } from "next";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cloudlette",
  description:
    "Explore Cloudlette's handcrafted collection of luxury leather bags, artisanal heels, and premium tailored tops.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-4 sm:px-8 lg:px-16 py-14">
          <div className="h-8 w-48 bg-blush/40 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-cream-light/80 rounded-xl animate-pulse border border-blush/40"
              />
            ))}
          </div>
        </div>
      }
    >
      <ShopCatalog title="Cloudlette" />
    </Suspense>
  );
}
