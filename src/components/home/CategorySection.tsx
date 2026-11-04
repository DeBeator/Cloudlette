import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SparkleDoodle, HeartDoodle } from "@/components/ui/decorative-icons";

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
      tagline: "Statement block heels, mules & strappy sandals",
      href: "/shop/shoes",
      badge: "Statement Footwear",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Cute tops",
      slug: "tops",
      tagline: "Silk draped blouses, satin wraps & ribbed knit tops",
      href: "/shop/tops",
      badge: "Chic Silhouettes",
      image:
        "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-brand-ivory border-b border-brand-beige/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header with boutique handwritten title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-taupe-dark">
            <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-black/70">
              COLLECTIONS
            </span>
            <SparkleDoodle className="w-4 h-4 text-brand-butter-dark" />
          </div>

          <h2 className="font-handwriting font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-black">
            Shop by Category{" "}
            <span className="inline-block text-brand-black transform -rotate-12 ml-1">
              ♡
            </span>
          </h2>
          
          <p className="text-sm sm:text-base font-light text-brand-taupe-dark leading-relaxed">
            Thoughtfully curated edits crafted for confidence, effortless charm, and modern poise.
          </p>
        </div>

        {/* 3 Visual Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col bg-brand-butter/30 rounded-3xl overflow-hidden border border-brand-beige/70 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
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

                {/* Subtle gradient overlay on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Badge Pill on top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-butter text-brand-black text-[11px] font-bold uppercase tracking-wider shadow-xs border border-brand-black/10">
                    {cat.name}
                  </span>
                </div>

                {/* Arrow Action on top-right */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-ivory/90 text-brand-black flex items-center justify-center shadow-sm group-hover:bg-brand-black group-hover:text-brand-ivory transition-colors">
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </div>

                {/* Overlay Text info at bottom of image */}
                <div className="absolute bottom-4 inset-x-4 z-10 text-brand-ivory space-y-1">
                  <p className="text-xs uppercase tracking-widest text-brand-butter font-semibold">
                    {cat.badge}
                  </p>
                  <h3 className="font-handwriting text-3xl font-bold tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5 bg-brand-ivory flex items-center justify-between border-t border-brand-beige/60">
                <p className="text-xs text-brand-taupe-dark font-light line-clamp-1 pr-2">
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

