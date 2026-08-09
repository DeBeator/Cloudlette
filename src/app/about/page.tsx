import React from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Heart, MapPin, Package } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* Hero Section — Full width, cream background, centered */}
      <section className="bg-cream-light border-b border-blush/40 py-20 lg:py-28 text-center px-4 sm:px-6 lg:px-8">
        <FadeInSection className="max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            OUR STORY
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-dark leading-tight">
            We pick pieces we love.
          </h1>
          <div className="pt-2">
            <div className="h-0.5 w-12 bg-gold mx-auto rounded-full" />
          </div>
        </FadeInSection>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {/* Brand Story Section — 2 column desktop, single mobile */}
        <section>
          <FadeInSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Soft placeholder image */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] bg-cream-dark/30 border border-blush/60 rounded-3xl overflow-hidden flex items-center justify-center p-8 text-center shadow-xs">
                {/* TODO: client brand photography */}
                <div className="space-y-2 text-dark-muted">
                  <p className="font-heading italic text-lg sm:text-xl text-dark/70">
                    Cloudlette Studio
                  </p>
                  <p className="text-xs font-mono tracking-wider opacity-60 uppercase">
                    // TODO: client brand photography
                  </p>
                </div>
              </div>

              {/* Right: Text content */}
              <div className="space-y-6">
                <h2 className="font-heading text-3xl sm:text-4xl font-normal text-dark">
                  About Cloudlette
                </h2>
                <div className="space-y-4 text-dark-muted leading-relaxed text-sm sm:text-base font-light">
                  <p>
                    Cloudlette is a fashion brand for women who know what they want. We carry bags, shoes, and tops — pieces we&apos;d wear ourselves. Nothing fussy, nothing forced. Just good style that works for real life.
                  </p>
                  <p>
                    We&apos;re based in Lagos and we ship nationwide — and to Ghana, Benin Republic, Cotonou, and Abidjan. Whether you pick up at Berger or we bring it to your door, we want every order to feel worth it.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Values Row — 3 simple cards */}
        <section>
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-8 border border-blush/60 shadow-xs space-y-4 text-center hover:border-gold/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center mx-auto text-gold">
                  <Heart className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-xl font-normal text-dark">
                  Made for Women
                </h3>
                <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                  Every piece is picked with you in mind.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-8 border border-blush/60 shadow-xs space-y-4 text-center hover:border-gold/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center mx-auto text-gold">
                  <MapPin className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-xl font-normal text-dark">
                  Lagos Based
                </h3>
                <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                  We&apos;re at Berger. Come say hi.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-8 border border-blush/60 shadow-xs space-y-4 text-center hover:border-gold/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center mx-auto text-gold">
                  <Package className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-heading text-xl font-normal text-dark">
                  We Deliver
                </h3>
                <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                  Nationwide and beyond.
                </p>
              </div>
            </div>
          </FadeInSection>
        </section>
      </div>
    </div>
  );
}

