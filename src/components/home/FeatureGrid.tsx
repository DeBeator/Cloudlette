"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Hand-Picked Styles",
    description: "Bags, shoes, and tops we picked ourselves for your daily wear.",
    link: "/about",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    description: "Made with quality materials so your items stay looking good.",
    link: "/about",
  },
  {
    icon: Truck,
    title: "We Deliver Everywhere",
    description: "Fast shipping to your doorstep anywhere in Nigeria.",
    link: "/contact",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple exchanges if something doesn't fit or work for you.",
    link: "/refund-policy",
  },
];

export function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-24 bg-cream/50 border-t border-b border-blush/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.215, 0.61, 0.355, 1.0],
                }}
                className="group flex flex-col space-y-4"
              >
                {/* Circular soft-blush badge with thin line icon */}
                <div className="w-12 h-12 rounded-full bg-blush/30 border border-blush/60 flex items-center justify-center text-dark group-hover:bg-gold/20 group-hover:border-gold/50 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-dark" strokeWidth={1} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-medium text-dark tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-dark-muted leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Styled text link */}
                <div className="pt-1">
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-xs font-semibold tracking-wider text-dark hover:text-gold transition-colors group/link"
                  >
                    <span>See how</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover/link:translate-x-1" strokeWidth={1} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
