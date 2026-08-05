"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isOpen = useCartStore((state) => state.isOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Lock body scroll when drawer is open on mobile/desktop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeDrawer();
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    closeDrawer();
    router.push("/shop");
  };

  // Motion variants for Desktop (slide from right)
  const desktopDrawerVariants = {
    closed: {
      x: shouldReduceMotion ? 0 : "100%",
      opacity: shouldReduceMotion ? 0 : 1,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  // Motion variants for Mobile (slide up from bottom)
  const mobileDrawerVariants = {
    closed: {
      y: shouldReduceMotion ? 0 : "100%",
      opacity: shouldReduceMotion ? 0 : 1,
    },
    open: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-dark/60 backdrop-blur-xs"
          />

          {/* Desktop Slide-In Panel (hidden on mobile) */}
          <div className="hidden md:flex fixed inset-y-0 right-0 max-w-full justify-end">
            <motion.div
              variants={desktopDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-[400px] h-full bg-cream shadow-2xl flex flex-col border-l border-blush/40 relative z-10"
            >
              <DrawerContent
                totalItems={totalItems}
                items={items}
                totalPrice={totalPrice}
                closeDrawer={closeDrawer}
                removeItem={removeItem}
                updateQty={updateQty}
                handleCheckout={handleCheckout}
                handleContinueShopping={handleContinueShopping}
              />
            </motion.div>
          </div>

          {/* Mobile Bottom Sheet (visible below md) */}
          <div className="flex md:hidden fixed inset-x-0 bottom-0 max-h-[85vh] justify-end">
            <motion.div
              variants={mobileDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-h-[85vh] bg-cream rounded-t-2xl shadow-2xl flex flex-col border-t border-blush/60 relative z-10 overflow-hidden"
            >
              <DrawerContent
                totalItems={totalItems}
                items={items}
                totalPrice={totalPrice}
                closeDrawer={closeDrawer}
                removeItem={removeItem}
                updateQty={updateQty}
                handleCheckout={handleCheckout}
                handleContinueShopping={handleContinueShopping}
              />
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Inner Drawer Content layout reused between mobile & desktop panels
function DrawerContent({
  totalItems,
  items,
  totalPrice,
  closeDrawer,
  removeItem,
  updateQty,
  handleCheckout,
  handleContinueShopping,
}: {
  totalItems: number;
  items: any[];
  totalPrice: number;
  closeDrawer: () => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  handleCheckout: () => void;
  handleContinueShopping: () => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-blush/50 bg-cream/90">
        <div className="flex items-center space-x-2.5">
          <h2 className="font-heading text-xl font-medium text-dark">Your Cart</h2>
          <span className="bg-gold text-dark text-xs font-bold px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        </div>
        <button
          onClick={closeDrawer}
          className="p-1.5 rounded-full text-dark hover:bg-blush/30 transition-colors"
          aria-label="Close Cart Drawer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body / Scrollable Item List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
            <div className="w-16 h-16 rounded-full bg-blush/30 border border-blush/60 flex items-center justify-center text-gold-hover">
              <ShoppingBag className="h-8 w-8 stroke-[1.5] text-dark" />
            </div>
            <h3 className="font-heading text-lg font-normal text-dark">
              Your cart is empty
            </h3>
            <p className="text-xs text-dark-muted font-light max-w-xs">
              Check out our bags, shoes, and tops to find something you like.
            </p>
            <Button
              onClick={handleContinueShopping}
              variant="goldOutline"
              size="sm"
              className="rounded-full px-6 text-xs font-semibold uppercase tracking-wider mt-2"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-blush/30">
            {items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 items-start">
                {/* Square Product Image */}
                <div className="relative w-20 aspect-square rounded-lg overflow-hidden bg-cream-light border border-blush/50 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-hover block">
                    {item.category}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-dark line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-dark-muted font-light">
                    {item.color} {item.size ? `• Size: ${item.size}` : ""}
                  </p>
                  <p className="text-xs font-bold text-dark pt-0.5">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Stepper + Trash */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-blush/70 rounded bg-white h-7 px-1.5 space-x-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="text-dark hover:text-gold p-0.5"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-semibold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="text-dark hover:text-gold p-0.5"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-dark-muted hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer (Sticky at bottom) */}
      {items.length > 0 && (
        <div className="border-t border-blush/50 bg-white p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs uppercase tracking-wider font-semibold text-dark-muted">
              Subtotal
            </span>
            <span className="font-heading text-lg font-bold text-dark">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <Button
            onClick={handleCheckout}
            size="lg"
            className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-sm py-3.5 shadow-md flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
