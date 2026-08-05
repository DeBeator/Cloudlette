"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useRequireAuth } from "@/lib/withAuth";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { formatPrice } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { CheckCircle2, ShoppingBag, Truck, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

function OrderConfirmationContent() {
  // const { isAuthenticated, isLoading: authLoading } = useRequireAuth(); // TODO: uncomment when backend auth is live
  const authLoading = false;
  const isAuthenticated = true;
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const { items, clearCart } = useCartStore();

  const deliveryType = searchParams.get("type") || "delivery";
  const shippingParam = searchParams.get("shipping");
  const shippingFee = shippingParam
    ? parseFloat(shippingParam)
    : deliveryType === "pickup"
    ? 1000
    : 3500;

  // Snapshot cart items and generate random order reference on mount
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [orderRef, setOrderRef] = useState<string>("");

  useEffect(() => {
    // Generate random order reference client-side
    // TODO: replace with real order reference from POST /api/orders response
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderRef(`CLD-${randomCode}`);
  }, []);

  useEffect(() => {
    // Capture order snapshot before clearing cart
    if (items.length > 0 && orderItems.length === 0) {
      setOrderItems([...items]);
      clearCart();
    }
  }, [items, orderItems, clearCart]);

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-dark-muted font-medium">Verifying order details...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
            Order Confirmed!
          </h1>
          <p className="text-dark-muted text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            We've got your order. You'll hear from us on your number once it's on the way.
          </p>
        </div>

        {/* Order Reference Pill Block */}
        {/* TODO: replace with real order reference from POST /api/orders response */}
        <div className="inline-flex flex-col items-center space-y-1.5 bg-white py-3 px-6 rounded-2xl border border-blush/60 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-hover">
            ORDER REFERENCE
          </span>
          <span className="font-mono font-bold text-base sm:text-lg text-dark tracking-wider">
            {orderRef || "CLD-PENDING"}
          </span>
        </div>

        {/* Order Summary Card */}
        {/* TODO: replace with order data from GET /api/orders/:id when backend is live */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-sm text-left space-y-6"
        >
          <div className="flex items-center justify-between border-b border-blush/40 pb-3">
            <h2 className="font-heading text-xl font-normal text-dark">
              Purchased Items
            </h2>
            <span className="text-xs font-semibold text-dark-muted">
              {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Items List */}
          {orderItems.length > 0 ? (
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1 no-scrollbar">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 text-xs">
                  <div className="relative w-12 h-14 bg-cream-light rounded-xl overflow-hidden flex-shrink-0 border border-blush/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-medium text-dark truncate">
                      {item.name}
                    </h3>
                    <p className="text-dark-muted">
                      {item.color} {item.size ? `• Size ${item.size}` : ""} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-dark font-mono text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-dark-muted italic">Order items processed.</p>
          )}

          {/* Subtotal & Delivery Breakdown */}
          <div className="space-y-2.5 border-t border-blush/40 pt-4 text-xs">
            <div className="flex justify-between text-dark-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-dark">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-dark-muted">
              <span>Shipping Fee ({deliveryType === "pickup" ? "Pickup" : "Home Delivery"})</span>
              <span className="font-semibold text-dark">{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-blush/60 pt-3 text-sm">
              <span className="font-bold text-dark uppercase tracking-wider">
                Total Paid
              </span>
              <span className="font-heading text-2xl font-bold text-gold-hover">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Delivery Info Block */}
          {/* TODO: replace with actual delivery estimate from backend */}
          <div className="p-4 bg-cream-light rounded-2xl border border-blush/50 flex items-center space-x-3 text-xs">
            {deliveryType === "pickup" ? (
              <>
                <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
                <div>
                  <p className="font-bold text-dark uppercase tracking-wider">
                    Ready for pickup within 24 hours
                  </p>
                  <p className="text-dark-muted font-light mt-0.5">
                    Location: Berger Park Station, Lagos. We will notify you via SMS when ready.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Truck className="h-5 w-5 text-gold flex-shrink-0" />
                <div>
                  <p className="font-bold text-dark uppercase tracking-wider">
                    Estimated delivery: 3–5 business days
                  </p>
                  <p className="text-dark-muted font-light mt-0.5">
                    Your package is being prepared for dispatch with our courier partners.
                  </p>
                </div>
              </>
            )}
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
