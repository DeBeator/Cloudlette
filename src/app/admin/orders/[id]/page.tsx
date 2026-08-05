"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { getMockOrderById, formatDate, MockOrder } from "@/lib/mock-orders";
import { formatPrice } from "@/lib/mock-data";
import { StatusBadge } from "@/components/account/StatusBadge";
import { useToast } from "@/components/ui/toast";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, MapPin, Truck, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: replace with GET /api/orders/:id (admin)
// TODO: PUT /api/orders/:id/status

export default function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const { showToast } = useToast();
  const order = getMockOrderById(params.id);

  const [statusVal, setStatusVal] = useState<MockOrder["status"]>("confirmed");

  useEffect(() => {
    if (order) {
      setStatusVal(order.status);
    }
  }, [order]);

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PUT /api/orders/:id/status
    showToast(
      "Status Updated!",
      `Order ${order?.id} status set to "${statusVal}". Backend integration in progress.`
    );
  };

  if (!order) {
    return (
      <FadeInSection className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-10 border border-blush/60 shadow-sm max-w-md mx-auto space-y-4">
          <AlertTriangle className="h-12 w-12 text-gold mx-auto" />
          <h1 className="font-heading text-2xl font-normal text-dark">Order Not Found</h1>
          <p className="text-xs text-dark-muted font-light">
            The requested order ID could not be located in the system.
          </p>
          <Button asChild variant="goldOutline" className="rounded-full px-6 text-xs uppercase tracking-wider">
            <Link href="/admin/orders" className="inline-flex items-center space-x-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Orders</span>
            </Link>
          </Button>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection className="max-w-7xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back to Orders Management
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blush/40">
        <div className="space-y-1">`1`
          <div className="flex items-center space-x-3">
            <span className="bg-gold/15 text-gold-hover font-mono px-3.5 py-1 rounded-full text-sm font-bold border border-gold/30">
              {order.id}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-dark-muted font-light">
            Placed on {formatDate(order.date)}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-dark-muted block">Order Total</span>
          <span className="font-heading text-2xl font-bold text-gold-hover font-mono">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items Ordered */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
            <h2 className="font-heading text-xl font-normal text-dark border-b border-blush/40 pb-3">
              Items Ordered ({order.items.length})
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 text-xs">
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
                    <p className="text-dark-muted">
                      {item.color} {item.size ? `• Size ${item.size}` : ""}
                    </p>
                    <p className="text-dark-muted font-mono mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-bold text-sm text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal & Shipping breakdown */}
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

        {/* Right Column: Customer Info & Status Update Control */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Update Control Form */}
          {/* TODO: PUT /api/orders/:id/status */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-4">
            <h2 className="font-heading text-xl font-normal text-dark border-b border-blush/40 pb-3">
              Admin Actions
            </h2>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Update Fulfill Status
                </label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value as MockOrder["status"])}
                  className="w-full bg-cream-light border border-blush/60 rounded-xl px-4 py-3 text-sm text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider py-3 shadow-md"
              >
                Update Status
              </Button>
            </form>
          </div>

          {/* Customer Information Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-4 text-xs">
            <h2 className="font-heading text-xl font-normal text-dark border-b border-blush/40 pb-3">
              Customer Details
            </h2>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-dark">
                <User className="h-4 w-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-dark-muted text-[10px] uppercase font-bold tracking-wider block">
                    Full Name
                  </span>
                  <span className="font-semibold text-sm">{order.customer.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-dark">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-dark-muted text-[10px] uppercase font-bold tracking-wider block">
                    Email Address
                  </span>
                  <span className="font-mono">{order.customer.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-dark">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-dark-muted text-[10px] uppercase font-bold tracking-wider block">
                    Phone Number
                  </span>
                  <span className="font-mono">{order.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address / Info */}
            <div className="border-t border-blush/40 pt-4 space-y-2">
              <span className="text-dark-muted text-[10px] uppercase font-bold tracking-wider block">
                Delivery Location
              </span>
              <div className="p-3.5 bg-cream-light rounded-2xl border border-blush/40 flex items-start space-x-2.5">
                {order.deliveryType === "pickup" ? (
                  <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                ) : (
                  <Truck className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-dark uppercase tracking-wider">
                    {order.deliveryType === "pickup" ? "Berger Park Pickup" : "Home Delivery"}
                  </p>
                  {order.address && (
                    <p className="text-dark-muted font-light mt-0.5 leading-relaxed">
                      {order.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
