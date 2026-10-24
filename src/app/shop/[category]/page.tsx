import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

interface CategoryPageProps {
  params: { category: string };
}

const CATEGORY_DATA: Record<
  string,
  {
    internalCategory: "bag" | "shoe" | "top";
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  bags: {
    internalCategory: "bag",
    title: "Luxury Bags & Totes",
    description:
      "Handcrafted leather totes, woven shoulder bags, and crystal evening clutches made for enduring luxury.",
    metaTitle: "Luxury Bags & Clutches | Cloudlette",
    metaDescription:
      "Shop handcrafted leather totes, crystal evening bags, and artisanal clutches by Cloudlette.",
  },
  bag: {
    internalCategory: "bag",
    title: "Luxury Bags & Totes",
    description:
      "Handcrafted leather totes, woven shoulder bags, and crystal evening clutches made for enduring luxury.",
    metaTitle: "Luxury Bags & Clutches | Cloudlette",
    metaDescription:
      "Shop handcrafted leather totes, crystal evening bags, and artisanal clutches by Cloudlette.",
  },
  shoes: {
    internalCategory: "shoe",
    title: "Designer Shoes & Heels",
    description:
      "Statement block heels, pointed leather mules, and braided raffia platform slides designed for comfort and poise.",
    metaTitle: "Designer Shoes & Heels | Cloudlette",
    metaDescription:
      "Explore Cloudlette's collection of statement suede heels, leather mules, and platform slides.",
  },
  shoe: {
    internalCategory: "shoe",
    title: "Designer Shoes & Heels",
    description:
      "Statement block heels, pointed leather mules, and braided raffia platform slides designed for comfort and poise.",
    metaTitle: "Designer Shoes & Heels | Cloudlette",
    metaDescription:
      "Explore Cloudlette's collection of statement suede heels, leather mules, and platform slides.",
  },
  tops: {
    internalCategory: "top",
    title: "Luxury Tops & Blouses",
    description:
      "Mulberry silk draped blouses, satin wrap tops, and organic linen silhouettes crafted for modern sophistication.",
    metaTitle: "Luxury Tops & Blouses | Cloudlette",
    metaDescription:
      "Discover elegant silk draped blouses, satin wraps, and organic linen tops by Cloudlette.",
  },
  top: {
    internalCategory: "top",
    title: "Luxury Tops & Blouses",
    description:
      "Mulberry silk draped blouses, satin wrap tops, and organic linen silhouettes crafted for modern sophistication.",
    metaTitle: "Luxury Tops & Blouses | Cloudlette",
    metaDescription:
      "Discover elegant silk draped blouses, satin wraps, and organic linen tops by Cloudlette.",
  },
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORY_DATA[params.category.toLowerCase()];

  if (!cat) {
    return {
      title: "Category Not Found | Cloudlette",
      description: "The requested category does not exist in our catalog.",
    };
  }

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      type: "website",
      url: `https://cloudlette.com/shop/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORY_DATA[params.category.toLowerCase()];

  if (!cat) {
    notFound();
  }

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
      <ShopCatalog
        forcedCategory={cat.internalCategory}
        title={cat.title}
        description={cat.description}
      />
    </Suspense>
  );
}
