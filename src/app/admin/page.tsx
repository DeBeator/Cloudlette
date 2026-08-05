"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { getMockOrders, formatDate } from "@/lib/mock-orders";
import { useStockStore } from "@/lib/mock-stock";
import { formatPrice } from "@/lib/mock-data";
import { StatusBadge } from "@/components/account/StatusBadge";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: replace with real data from GET /api/admin/dashboard

export default function AdminOverviewPage() {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const recentOrders = getMockOrders().slice(0, 5);
  const stockItems = useStockStore((state) => state.items);

  // Synchronized low stock items list (stockQty <= 3)
  const lowStockVariants = useMemo(() => {
    return stockItems
      .filter((item) => item.stockQty <= 3)
      .sort((a, b) => a.stockQty - b.stockQty);
  }, [stockItems]);

  return (
    <FadeInSection className="space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          ADMIN DASHBOARD
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-dark">
          System Overview
        </h1>
      </div>

      {/* 4 Stat Cards Row (2x2 on mobile, 4 in row on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-blush/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-dark-muted">
              Total Orders
            </span>
            <div className="p-2.5 rounded-2xl bg-gold/15 text-gold-hover">
              <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading text-3xl font-normal text-dark">24</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+14% from last month</span>
            </p>
          </div>
        </div>

        {/* Revenue This Month */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-blush/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-dark-muted">
              Revenue
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
              <TrendingUp className="h-5 w-5 stroke-[1.8]" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading text-2.5xl sm:text-3xl font-normal text-dark font-mono">
              ₦1,240,000
            </p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+22% growth</span>
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-blush/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-dark-muted">
              Products
            </span>
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-700">
              <Package className="h-5 w-5 stroke-[1.8]" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading text-3xl font-normal text-dark">12</p>
            <p className="text-[11px] text-dark-muted font-light">3 main categories</p>
          </div>
        </div>

        {/* Low Stock Alerts (Dynamic Red Accent) */}
        <div className="bg-rose-50/70 rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Low Stock Alerts
            </span>
            <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-5 w-5 stroke-[1.8]" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading text-3xl font-bold text-rose-900">
              {lowStockVariants.length}
            </p>
            <p className="text-[11px] text-rose-700 font-medium">
              {lowStockVariants.length === 0
                ? "All inventory healthy"
                : "Requires immediate restock"}
            </p>
          </div>
        </div>
      </div>

      {/* Two Side-by-Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-blush/40 pb-4">
            <div>
              <h2 className="font-heading text-xl font-normal text-dark">
                Recent Orders
              </h2>
              <p className="text-xs text-dark-muted font-light">Latest customer transactions</p>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold uppercase tracking-wider text-gold-hover hover:text-gold"
            >
              <Link href="/admin/orders" className="inline-flex items-center space-x-1">
                <span>View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between p-3.5 rounded-2xl bg-cream-light/50 border border-blush/30 text-xs gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-dark">{order.id}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <span className="text-[11px] text-dark-muted block">
                    {order.customer.name} • {formatDate(order.date)}
                  </span>
                </div>
                <div className="text-right font-mono font-bold text-sm text-gold-hover">
                  {formatPrice(order.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Items Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-blush/40 pb-4">
            <div>
              <h2 className="font-heading text-xl font-normal text-dark">
                Low Stock Items
              </h2>
              <p className="text-xs text-dark-muted font-light">Variants with ≤ 3 stock</p>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold uppercase tracking-wider text-gold-hover hover:text-gold"
            >
              <Link href="/admin/stock" className="inline-flex items-center space-x-1">
                <span>Manage Stock</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {lowStockVariants.length > 0 ? (
              lowStockVariants.slice(0, 5).map((item) => (
                <div
                  key={item.variantId}
                  className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <p className="font-heading text-sm font-medium text-dark truncate">
                      {item.productName}
                    </p>
                    <p className="text-dark-muted text-[11px]">
                      {item.color} {item.size !== "N/A" ? `• ${item.size}` : ""} • {item.category}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 font-mono font-bold rounded-full text-xs flex-shrink-0 ${
                      item.stockQty === 0
                        ? "bg-rose-600 text-white"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {item.stockQty === 0 ? "Out of Stock" : `${item.stockQty} left`}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-dark-muted italic py-4 text-center">
                All inventory items have healthy stock levels.
              </p>
            )}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
