import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SparkleDoodle } from "@/components/ui/decorative-icons";

export function CategorySection() {
  const categories = [
    {
      name: "Bags",
      slug: "bags",
      tagline: "Structured leather totes, clutches & woven bags",
      href: "/shop/bags",
      badge: "Handcrafted",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shoes",
      slug: "shoes",
      tagline: "Classic Mary Janes, loafers & block heels",
      href: "/shop/shoes",
      badge: "Statement Footwear",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Cute tops",
      slug: "tops",
      tagline: "Cream knitwear, silk blouses & ribbed tops",
      href: "/shop/tops",
      badge: "Chic Knits",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-brand-ivory border-b border-brand-beige/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header with boutique handwritten title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-brand-taupe-dark">
            <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-black/70">
              COLLECTIONS
            </span>
            <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
          </div>

          <h2 className="font-handwriting font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-black">
            Shop by Category{" "}
            <span className="inline-block text-brand-black transform -rotate-12 ml-1">
              ♡
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-normal text-brand-taupe-dark leading-relaxed">
            Thoughtfully curated edits crafted for confidence, effortless charm, and modern poise.
          </p>
        </div>

        {/* 3 Visual Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col bg-brand-butter/30 rounded-3xl overflow-hidden border border-brand-beige/70 shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Image Container (aspect-[4/5] portrait) */}
              <div className="relative aspect-[4/5] w-full bg-brand-beige/40 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={`Cloudlette ${cat.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle gradient overlay on bottom of image for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Badge Pill on top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-butter text-brand-black text-[11px] font-bold uppercase tracking-wider shadow-xs border border-brand-black/10">
                    {cat.name}
                  </span>
                </div>

                {/* Arrow Action on top-right */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-ivory/95 text-brand-black flex items-center justify-center shadow-sm group-hover:bg-brand-black group-hover:text-brand-ivory transition-colors">
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </div>

                {/* Overlay Text info at bottom of image */}
                <div className="absolute bottom-4 inset-x-4 z-10 text-brand-ivory space-y-0.5">
                  <p className="text-[11px] uppercase tracking-widest text-brand-butter font-semibold">
                    {cat.badge}
                  </p>
                  <h3 className="font-handwriting text-2xl sm:text-3xl font-bold tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-brand-ivory flex items-center justify-between border-t border-brand-beige/60">
                <p className="text-xs text-brand-taupe-dark font-normal line-clamp-1 pr-2">
                  {cat.tagline}
                </p>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-black group-hover:text-brand-taupe-dark whitespace-nowrap flex-shrink-0 transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
