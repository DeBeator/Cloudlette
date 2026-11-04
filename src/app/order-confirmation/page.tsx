"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { CheckCircle2, ShoppingBag, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

function OrderConfirmationContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FadeInSection className="bg-cream/30 min-h-[calc(100vh-140px)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center space-y-8">
        {/* Animated Checkmark Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center text-gold shadow-sm"
          >
            <CheckCircle2 className="w-12 h-12 stroke-[2]" />
          </motion.div>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-dark tracking-tight">
            Order confirmation pending
          </h1>
          <p className="text-dark-muted text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            A verified order confirmation will appear here only after the backend creates an order and confirms payment. This page does not treat URL values or browser cart data as proof of an order.
          </p>
        </div>

        {/* A backend-issued order response will replace this non-transactional state. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-sm text-left space-y-6"
        >
          <div className="flex items-center justify-between border-b border-blush/40 pb-3">
            <h2 className="font-heading text-xl font-normal text-dark">
              What happens next
            </h2>
            <span className="text-xs font-semibold text-dark-muted">
              Backend integration pending
            </span>
          </div>

          <p className="text-sm leading-relaxed text-dark-muted">Delivery fees vary by location. Lagos delivery is ₦2,000–₦7,000, interstate delivery is ₦5,000–₦7,000, and Berger Park pickup has a ₦1,000 handling fee paid directly to the storekeeper.</p>

          <div className="p-4 bg-cream-light rounded-2xl border border-blush/50 flex items-center space-x-3 text-xs">
            <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
            <p className="text-dark-muted font-light">Final delivery and pickup details are confirmed before an order is completed.</p>
          </div>
        </motion.div>

        {/* Centered CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            asChild
            variant="goldOutline"
            className="w-full sm:w-auto rounded-full px-8 py-3.5 text-xs uppercase tracking-wider font-semibold"
          >
            <Link href="/orders">View My Orders</Link>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto rounded-full bg-gold hover:bg-gold-hover text-dark px-8 py-3.5 text-xs uppercase tracking-wider font-semibold shadow-md"
          >
            <Link href="/shop" className="inline-flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </Button>
        </div>
      </div>
    </FadeInSection>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-dark-muted font-medium">Loading confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
