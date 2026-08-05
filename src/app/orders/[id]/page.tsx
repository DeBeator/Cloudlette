"use client";

import Link from "next/link";
import Image from "next/image";
import { useRequireAuth } from "@/lib/withAuth";
import { getMockOrderById, formatDate, MockOrder } from "@/lib/mock-orders";
import { formatPrice } from "@/lib/mock-data";
import { StatusBadge } from "@/components/account/StatusBadge";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Truck, Check, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

// 4-Step Visual Order Progress Stepper
function OrderTimelineStepper({ status }: { status: MockOrder["status"] }) {
  const steps = [
    { key: "placed", label: "Order Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const getActiveStepIndex = (st: MockOrder["status"]): number => {
    switch (st) {
      case "pending":
        return 0; // Order Placed
      case "confirmed":
        return 1; // Confirmed
      case "shipped":
        return 2; // Shipped
      case "delivered":
        return 3; // Delivered
      case "cancelled":
        return 0;
      default:
        return 0;
    }
  };

  const activeIndex = getActiveStepIndex(status);
  const isCancelled = status === "cancelled";

  return (
    <div className="space-y-4 pt-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-dark block">
        Order Progress Tracker
      </p>

      {/* Horizontal Stepper */}
      <div className="relative flex items-center justify-between w-full">
        {/* Background Connecting Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-blush/40 -z-0" />

        {/* Active Progress Line */}
        {!isCancelled && (
          <div
            className="absolute top-4 left-4 h-0.5 bg-gold transition-all duration-500 -z-0"
            style={{
              width: `${(activeIndex / (steps.length - 1)) * 90}%`,
            }}
          />
        )}

        {steps.map((step, idx) => {
          const isCompleted = !isCancelled && idx <= activeIndex;
          const isCurrent = !isCancelled && idx === activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center space-y-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-gold text-dark ring-2 ring-gold/40 shadow-xs"
                    : "bg-white text-dark-muted border-2 border-blush/60"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[2.5]" /> : idx + 1}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium text-center ${
                  isCurrent ? "font-bold text-dark" : "text-dark-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {isCancelled && (
        <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-center">
          This order was cancelled.
        </p>
      )}
    </div>
  );
}

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // useRequireAuth(); // TODO: uncomment when backend auth is live

  // TODO: replace mock data with GET /api/orders/:id
  const order = getMockOrderById(params.id);

  if (!order) {
    return (
      <FadeInSection className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-10 border border-blush/60 shadow-sm max-w-md mx-auto space-y-4">
          <AlertTriangle className="h-12 w-12 text-gold mx-auto" />
          <h1 className="font-heading text-2xl font-normal text-dark">Order Not Found</h1>
          <p className="text-xs text-dark-muted font-light">
            The requested order ID could not be located in your history.
          </p>
          <Button asChild variant="goldOutline" className="rounded-full px-6 text-xs uppercase tracking-wider">
            <Link href="/orders" className="inline-flex items-center space-x-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to My Orders</span>
            </Link>
          </Button>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/orders"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back to My Orders
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blush/40">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="bg-gold/15 text-gold-hover font-mono px-3.5 py-1 rounded-full text-sm font-bold border border-gold/30">
              {order.id}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-dark-muted">
            Placed on {formatDate(order.date)}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-dark-muted block">Total Paid</span>
          <span className="font-heading text-2xl font-bold text-gold-hover font-mono">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* 2-Column Grid (Desktop: Items left, Info & Timeline right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items Ordered */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
            <h2 className="font-heading text-xl font-normal text-dark border-b border-blush/40 pb-3">
              Items Ordered ({order.items.length})
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-16 h-20 bg-cream-light rounded-xl overflow-hidden flex-shrink-0 border border-blush/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-dark truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-dark-muted">
                      {item.color} {item.size ? `• Size ${item.size}` : ""}
                    </p>
                    <p className="text-xs text-dark-muted font-mono mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-bold text-sm text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 border-t border-blush/40 pt-4 text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>
                  Shipping Fee ({order.deliveryType === "pickup" ? "Pickup" : "Home Delivery"})
                </span>
                <span className="font-semibold text-dark">{formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-blush/60 pt-3 text-sm">
                <span className="font-bold text-dark uppercase tracking-wider">
                  Total
                </span>
                <span className="font-heading text-xl font-bold text-gold-hover">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Info & Timeline Tracker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Info & Delivery Notice */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
            <h2 className="font-heading text-xl font-normal text-dark border-b border-blush/40 pb-3">
              Delivery Information
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-dark-muted block uppercase font-bold text-[10px] tracking-wider">
                  Method
                </span>
                <span className="font-semibold text-dark">
                  {order.deliveryType === "pickup"
                    ? "Berger Park Pickup"
                    : "Home Delivery"}
                </span>
              </div>

              {order.address && (
                <div>
                  <span className="text-dark-muted block uppercase font-bold text-[10px] tracking-wider">
                    Destination Address
                  </span>
                  <span className="text-dark leading-relaxed font-light block mt-0.5">
                    {order.address}
                  </span>
                </div>
              )}
            </div>

            {/* Delivery Estimate Banner */}
            <div className="p-4 bg-cream-light rounded-2xl border border-blush/50 flex items-center space-x-3 text-xs">
              {order.deliveryType === "pickup" ? (
                <>
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <p className="font-bold text-dark uppercase tracking-wider">
                      Ready for pickup within 24 hours
                    </p>
                    <p className="text-dark-muted font-light mt-0.5">
                      Collection point: Berger Park Station, Lagos.
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
                      Shipped via express courier with real-time SMS alerts.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Visual Timeline Tracker */}
            <OrderTimelineStepper status={order.status} />
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
