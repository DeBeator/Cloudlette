"use client";

import { Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const FEATURE_BADGES = [
  {
    icon: Sparkles,
    title: "Carefully Selected",
    description: "Handpicked pieces chosen with love for your daily rotation.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% encrypted and safe checkout via trusted payment channels.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Same-day doorstep delivery in Lagos & quick nationwide dispatch.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple exchanges so you can always shop with peace of mind.",
  },
];

export function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-cream py-10 sm:py-14 border-b border-blush/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURE_BADGES.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center px-2 group"
              >
                {/* Icon centered above */}
                <div className="w-12 h-12 rounded-full bg-blush/35 border border-blush/60 flex items-center justify-center text-dark mb-3.5 group-hover:bg-gold/25 group-hover:border-gold/50 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-dark" strokeWidth={1.5} />
                </div>

                {/* Short Label */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-dark tracking-tight mb-1.5">
                  {item.title}
                </h3>

                {/* One-line description */}
                <p className="text-xs sm:text-sm text-dark/75 leading-relaxed font-light max-w-xs">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
