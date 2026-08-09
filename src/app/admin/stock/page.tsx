"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { useStockStore, getStockStatusInfo, StockItem } from "@/lib/mock-stock";
import { useToast } from "@/components/ui/toast";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit3, X, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: PUT /api/products/variants/:id/stock

export default function AdminStockPage() {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const { showToast } = useToast();
  const { items, updateStockQty } = useStockStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Stock edit modal state
  const [itemToEdit, setItemToEdit] = useState<StockItem | null>(null);
  const [newQtyInput, setNewQtyInput] = useState<number>(0);

  // Filter & default sort by stockQty ascending (low stock first)
  const filteredItems = useMemo(() => {
    const list = items.filter((item) => {
      const matchesSearch = item.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const statusInfo = getStockStatusInfo(item.stockQty);
      const matchesStatus =
        statusFilter === "all" || statusInfo.statusKey === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Default sort by stockQty ascending
    return list.sort((a, b) => a.stockQty - b.stockQty);
  }, [items, searchTerm, statusFilter]);

  const handleStockUpdateConfirm = () => {
    if (itemToEdit) {
      updateStockQty(itemToEdit.variantId, newQtyInput);
      // TODO: PUT /api/products/variants/:id/stock
      showToast(
        "Stock Updated!",
        `Inventory for "${itemToEdit.productName} (${itemToEdit.color})" updated to ${newQtyInput}.`
      );
      setItemToEdit(null);
    }
  };

  return (
    <FadeInSection className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          INVENTORY CONTROL
        </span>
        <h1 className="font-heading text-3xl font-normal text-dark">
          Stock Management
        </h1>
      </div>

      {/* Filter Bar: Search Input + Status Dropdown */}
      <div className="bg-white rounded-2xl p-4 border border-blush/60 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted" />
          <Input
            type="text"
            placeholder="Search variant inventory by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cream-light/50 border-blush/40 focus:border-gold rounded-xl text-xs py-2.5"
          />
        </div>

        <div className="w-full sm:w-52">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter variants by stock status"
            className="w-full bg-cream-light/50 border border-blush/40 rounded-xl px-3 py-2.5 text-xs text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="all">All Inventory Statuses</option>
            <option value="low">Low Stock (≤ 3)</option>
            <option value="out">Out of Stock (0)</option>
            <option value="in">In Stock (&gt; 3)</option>
          </select>
        </div>
      </div>

      {/* Desktop Stock Inventory Table (hidden on mobile) */}
      <div className="hidden md:block bg-white rounded-3xl border border-blush/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-cream-light/70 border-b border-blush/40 text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                <th className="py-4 px-6">Product Image</th>
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Color</th>
                <th className="py-4 px-4">Size</th>
                <th className="py-4 px-4">Stock Qty</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush/30 text-xs">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const statusInfo = getStockStatusInfo(item.stockQty);

                  return (
                    <tr key={item.variantId} className="hover:bg-cream-light/30 transition-colors">
                      {/* Image */}
                      <td className="py-3.5 px-6">
                        <div className="relative w-11 h-14 bg-cream-light rounded-lg overflow-hidden flex-shrink-0 border border-blush/40">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="py-3.5 px-4 font-heading text-sm font-semibold text-dark">
                        {item.productName}
                        <span className="block font-mono text-[10px] text-dark-muted font-normal">
                          Var: {item.variantId}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-medium text-dark capitalize">
                        {item.category}
                      </td>

                      {/* Color */}
                      <td className="py-3.5 px-4 text-dark font-medium">
                        {item.color}
                      </td>

                      {/* Size */}
                      <td className="py-3.5 px-4 text-dark-muted font-mono">
                        {item.size}
                      </td>

                      {/* Stock Qty */}
                      <td className="py-3.5 px-4 font-mono font-bold text-dark text-sm">
                        {item.stockQty}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusInfo.badgeStyle}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setItemToEdit(item);
                            setNewQtyInput(item.stockQty);
                          }}
                          className="h-8 px-3 text-xs rounded-full border-blush/60 text-dark hover:bg-cream-light"
                        >
                          <Edit3 className="h-3.5 w-3.5 mr-1 text-gold" />
                          <span>Update Stock</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-dark-muted italic">
                    No variant inventory found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stock Card List View (visible below md) */}
      <div className="md:hidden space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const statusInfo = getStockStatusInfo(item.stockQty);
            return (
              <div key={item.variantId} className="bg-white rounded-3xl p-5 border border-blush/60 shadow-xs space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="relative w-16 h-20 bg-cream-light rounded-xl overflow-hidden flex-shrink-0 border border-blush/40">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusInfo.badgeStyle}`}>
                        {statusInfo.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-dark">
                        Qty: {item.stockQty}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-medium text-dark mt-1 truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-dark-muted font-medium mt-0.5">
                      {item.color} • Size: {item.size}
                    </p>
                    <p className="text-[11px] text-dark-muted font-mono mt-0.5">
                      Var: {item.variantId}
                    </p>
                  </div>
                </div>

                {/* Update Stock Button */}
                <div className="pt-2 border-t border-blush/40">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setItemToEdit(item);
                      setNewQtyInput(item.stockQty);
                    }}
                    className="w-full rounded-full text-xs font-semibold text-dark border-blush/60 hover:bg-cream-light"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5 text-gold" />
                    <span>Update Stock</span>
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-dark-muted italic bg-white rounded-3xl border border-blush/60">
            No variant inventory found matching search criteria.
          </div>
        )}
      </div>

      {/* Stock Update Modal */}
      {itemToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-xs"
            onClick={() => setItemToEdit(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-blush/60 shadow-2xl space-y-4 z-10">
            <button
              type="button"
              onClick={() => setItemToEdit(null)}
              className="absolute top-4 right-4 text-dark-muted hover:text-dark"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-hover">
                VARIANT #{itemToEdit.variantId}
              </span>
              <h3 className="font-heading text-xl font-normal text-dark">
                Update Stock Quantity
              </h3>
              <p className="text-xs text-dark-muted font-light">
                {itemToEdit.productName} ({itemToEdit.color} • {itemToEdit.size})
              </p>
            </div>

            <div className="space-y-2 py-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Inventory Stock Count
              </label>
              <Input
                type="number"
                min="0"
                value={newQtyInput}
                onChange={(e) => setNewQtyInput(parseInt(e.target.value) || 0)}
                className="bg-cream-light border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-base font-mono font-bold"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setItemToEdit(null)}
                className="rounded-full text-xs font-semibold px-5 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleStockUpdateConfirm}
                className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-6 py-2.5 shadow-md"
              >
                Confirm Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </FadeInSection>
  );
}
