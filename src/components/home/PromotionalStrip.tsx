import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  BowIllustration,
  SparkleDoodle,
  HeartDoodle,
} from "@/components/ui/decorative-icons";

export function PromotionalStrip() {
  return (
    <section className="w-full bg-brand-butter py-14 sm:py-18 lg:py-20 border-b border-brand-beige/70 relative overflow-hidden">
      {/* Decorative floating doodles */}
      <div className="absolute top-6 left-12 text-brand-black/20 hidden sm:block pointer-events-none animate-pulse">
        <SparkleDoodle className="w-5 h-5" />
      </div>
      <div className="absolute bottom-6 right-16 text-brand-black/20 hidden sm:block pointer-events-none">
        <HeartDoodle className="w-5 h-5" />
      </div>
      <div className="absolute top-1/2 left-8 text-brand-black/15 hidden lg:block pointer-events-none">
        <BowIllustration className="w-8 h-8 -rotate-12" />
      </div>
      <div className="absolute top-1/3 right-8 text-brand-black/15 hidden lg:block pointer-events-none">
        <BowIllustration className="w-8 h-8 rotate-12" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
        
        {/* Bow and Sparkle Header */}
        <div className="inline-flex items-center justify-center space-x-3 text-brand-black">
          <SparkleDoodle className="w-4 h-4 text-brand-black/60" />
          <BowIllustration className="w-8 h-8 text-brand-black" />
          <SparkleDoodle className="w-4 h-4 text-brand-black/60" />
        </div>

        {/* Client Quote Message */}
        <h2 className="font-handwriting font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-black leading-tight max-w-3xl mx-auto">
          “Good pieces make brighter days.”
        </h2>

        {/* Small subtitle */}
        <p className="text-sm sm:text-base font-light text-brand-black/80 max-w-lg mx-auto leading-relaxed">
          Curated silhouettes made to be worn on repeat. Step out in confidence every day of the week.
        </p>

        {/* Button */}
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-black text-brand-ivory hover:bg-brand-black-light text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

