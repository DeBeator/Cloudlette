import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BowIllustration, SparkleDoodle } from "@/components/ui/decorative-icons";

export function PromotionalStrip() {
  return (
    <section className="w-full bg-brand-butter py-8 sm:py-10 border-b border-brand-beige/80 relative overflow-hidden">
      {/* Decorative sparkle accents */}
      <div className="absolute top-3 left-6 text-brand-black/20 pointer-events-none hidden sm:block">
        <SparkleDoodle className="w-4 h-4" />
      </div>
      <div className="absolute bottom-3 right-8 text-brand-black/20 pointer-events-none hidden sm:block">
        <SparkleDoodle className="w-5 h-5" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

          {/* Highlight Message */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 rounded-full bg-brand-ivory flex items-center justify-center text-brand-black shadow-xs flex-shrink-0">
              <BowIllustration className="w-5 h-5" />
            </div>
            <div>
              <p className="font-handwriting font-bold text-2xl sm:text-3xl text-brand-black tracking-tight leading-none">
                Curated in Lagos · Handpicked with Love ♡
              </p>
              <p className="text-xs text-brand-black/70 font-normal mt-0.5">
                New boutique arrivals and limited restocks every Friday.
              </p>
            </div>
          </div>

          {/* Action Link */}
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-brand-black text-brand-ivory hover:bg-brand-black-light text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all flex-shrink-0"
          >
            <span>Explore Boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
