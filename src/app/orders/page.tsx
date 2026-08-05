"use client";

import Link from "next/link";
import { useRequireAuth } from "@/lib/withAuth";
import { getMockOrders, formatDate, MockOrder } from "@/lib/mock-orders";
import { formatPrice } from "@/lib/mock-data";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { StatusBadge } from "@/components/account/StatusBadge";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default function OrdersListPage() {
  // useRequireAuth(); // TODO: uncomment when backend auth is live

  // TODO: replace mock orders with GET /api/orders (authenticated)
  const orders = getMockOrders();

  const getItemsSummary = (order: MockOrder): string => {
    if (!order.items || order.items.length === 0) return "No items";
    const totalQty = order.items.reduce((acc, item) => acc + item.quantity, 0);
    const firstName = order.items[0].name;

    if (order.items.length === 1 && totalQty === 1) {
      return `1 item — ${firstName}`;
    }

    const additionalCount = totalQty - 1;
    return `${totalQty} items — ${firstName} ${
      additionalCount > 0 ? `+ ${additionalCount} more` : ""
    }`;
  };

  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <AccountSidebar />
        </div>

        {/* Right Main Content */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Page Heading */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
              ACCOUNT DASHBOARD
            </span>
            <div className="relative inline-block">
              <h1 className="font-heading text-3xl sm:text-4xl font-normal text-dark pb-2">
                My Orders
              </h1>
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gold rounded-full" />
            </div>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-4 pt-2">
              {orders.map((order, idx) => (
                <FadeInSection key={order.id} delay={idx * 0.08}>
                  <div className="bg-white rounded-3xl p-6 border border-blush/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Reference Monospace Pill */}
                        <span className="bg-gold/15 text-gold-hover font-mono px-3 py-1 rounded-full text-xs font-bold border border-gold/30">
                          {order.id}
                        </span>

                        {/* Status Badge */}
                        <StatusBadge status={order.status} />

                        {/* Date */}
                        <span className="text-xs text-dark-muted font-light">
                          {formatDate(order.date)}
                        </span>
                      </div>

                      {/* Items Summary */}
                      <p className="text-xs sm:text-sm text-dark font-medium leading-relaxed">
                        {getItemsSummary(order)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-blush/30">
                      {/* Total Paid */}
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-dark-muted tracking-wider block">
                          Total
                        </span>
                        <span className="font-bold text-base text-gold-hover font-mono">
                          {formatPrice(order.total)}
                        </span>
                      </div>

                      {/* Link to Order Detail */}
                      <Button
                        asChild
                        variant="goldOutline"
                        size="sm"
                        className="rounded-full text-xs font-semibold px-4 py-2"
                      >
                        <Link href={`/orders/${order.id}`} className="inline-flex items-center space-x-1">
                          <span>View Order</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-10 text-center border border-blush/60 shadow-xs space-y-5 my-4">
              <div className="w-16 h-16 rounded-full bg-cream-light border border-blush/60 flex items-center justify-center mx-auto text-dark-muted">
                <Package className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-xl font-normal text-dark">
                  You haven't placed any orders yet
                </h3>
                <p className="text-xs text-dark-muted font-light">
                  Explore our luxury collection of bags, shoes, and tops to place your first order.
                </p>
              </div>
              <Button
                asChild
                className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-6 py-3 shadow-md"
              >
                <Link href="/shop" className="inline-flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Start Shopping →</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}
