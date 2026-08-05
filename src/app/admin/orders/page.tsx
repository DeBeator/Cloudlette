"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { getMockOrders, formatDate, MockOrder } from "@/lib/mock-orders";
import { formatPrice } from "@/lib/mock-data";
import { StatusBadge } from "@/components/account/StatusBadge";
import { useToast } from "@/components/ui/toast";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit3, X } from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: replace with GET /api/orders (admin)
// TODO: PUT /api/orders/:id/status

export default function AdminOrdersPage() {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Status update modal state
  const [selectedOrderForUpdate, setSelectedOrderForUpdate] = useState<MockOrder | null>(null);
  const [newStatus, setNewStatus] = useState<MockOrder["status"]>("confirmed");

  const orders = getMockOrders();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || order.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const handleUpdateStatusSubmit = () => {
    if (selectedOrderForUpdate) {
      // TODO: PUT /api/orders/:id/status
      showToast(
        "Status Update Coming Soon",
        `Updating order ${selectedOrderForUpdate.id} to "${newStatus}" requires backend API synchronization.`
      );
      setSelectedOrderForUpdate(null);
    }
  };

  const getItemsSummaryText = (order: MockOrder): string => {
    const totalQty = order.items.reduce((acc, i) => acc + i.quantity, 0);
    return `${totalQty} ${totalQty === 1 ? "item" : "items"}`;
  };

  return (
    <FadeInSection className="space-y-6">
      {/* Top Bar */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          ORDER FULFILLMENT
        </span>
        <h1 className="font-heading text-3xl font-normal text-dark">
          Orders Management
        </h1>
      </div>

      {/* Filter Row: Search Input + Status Dropdown */}
      <div className="bg-white rounded-2xl p-4 border border-blush/60 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted" />
          <Input
            type="text"
            placeholder="Search by reference (CLD-...) or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cream-light/50 border-blush/40 focus:border-gold rounded-xl text-xs py-2.5"
          />
        </div>

        <div className="w-full sm:w-52">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter orders by status"
            className="w-full bg-cream-light/50 border border-blush/40 rounded-xl px-3 py-2.5 text-xs text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-blush/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-cream-light/70 border-b border-blush/40 text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                <th className="py-4 px-6">Reference</th>
                <th className="py-4 px-4">Customer Name</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush/30 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-light/30 transition-colors">
                    {/* Reference */}
                    <td className="py-4 px-6">
                      <span className="bg-gold/15 text-gold-hover font-mono px-3 py-1 rounded-full text-xs font-bold border border-gold/30">
                        {order.id}
                      </span>
                    </td>

                    {/* Customer Name */}
                    <td className="py-4 px-4 font-semibold text-dark">
                      {order.customer.name}
                      <span className="block text-[11px] text-dark-muted font-normal">
                        {order.customer.email}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-dark-muted font-light">
                      {formatDate(order.date)}
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-dark font-medium">
                      {getItemsSummaryText(order)}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-mono font-bold text-gold-hover">
                      {formatPrice(order.total)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <StatusBadge status={order.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2.5 text-xs text-dark hover:text-gold"
                      >
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          <span>View</span>
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrderForUpdate(order);
                          setNewStatus(order.status);
                        }}
                        className="h-8 px-2.5 text-xs rounded-full border-blush/60 text-dark hover:bg-cream-light"
                      >
                        <Edit3 className="h-3.5 w-3.5 mr-1 text-gold" />
                        <span>Update Status</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-dark-muted italic">
                    No orders found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedOrderForUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-xs"
            onClick={() => setSelectedOrderForUpdate(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-blush/60 shadow-2xl space-y-4 z-10">
            <button
              type="button"
              onClick={() => setSelectedOrderForUpdate(null)}
              className="absolute top-4 right-4 text-dark-muted hover:text-dark"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-hover">
                ORDER #{selectedOrderForUpdate.id}
              </span>
              <h3 className="font-heading text-xl font-normal text-dark">
                Update Order Status
              </h3>
            </div>

            <div className="space-y-2 py-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Select New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as MockOrder["status"])}
                className="w-full bg-cream-light border border-blush/60 rounded-xl px-4 py-3 text-sm text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedOrderForUpdate(null)}
                className="rounded-full text-xs font-semibold px-5 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpdateStatusSubmit}
                className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-6 py-2.5 shadow-md"
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </FadeInSection>
  );
}
