"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { MOCK_PRODUCTS, formatPrice, Product } from "@/lib/mock-data";
import { useToast } from "@/components/ui/toast";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, AlertTriangle, X } from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: replace with GET /api/products (admin)

export default function AdminProductsPage() {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || prod.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      showToast(
        "Delete Coming Soon",
        `Deleting "${productToDelete.name}" requires backend API integration.`
      );
      setProductToDelete(null);
    }
  };

  return (
    <FadeInSection className="space-y-6">
      {/* Top Bar: Heading + Add New Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            PRODUCT MANAGEMENT
          </span>
          <h1 className="font-heading text-3xl font-normal text-dark">
            Products Catalog
          </h1>
        </div>

        <Button
          asChild
          className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-6 py-3 shadow-md self-start sm:self-auto"
        >
          <Link href="/admin/products/new" className="inline-flex items-center space-x-2">
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add New Product</span>
          </Link>
        </Button>
      </div>

      {/* Filter Row: Search Input + Category Dropdown */}
      <div className="bg-white rounded-2xl p-4 border border-blush/60 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted" />
          <Input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cream-light/50 border-blush/40 focus:border-gold rounded-xl text-xs py-2.5"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter products by category"
            className="w-full bg-cream-light/50 border border-blush/40 rounded-xl px-3 py-2.5 text-xs text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="bag">Bags</option>
            <option value="shoe">Shoes</option>
            <option value="top">Tops</option>
          </select>
        </div>
      </div>

      {/* Products Table Area */}
      <div className="bg-white rounded-3xl border border-blush/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-cream-light/70 border-b border-blush/40 text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Variants</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush/30 text-xs">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const variantCount = product.variants.length;
                  const isBag = product.category === "bag";

                  return (
                    <tr key={product.id} className="hover:bg-cream-light/30 transition-colors">
                      {/* Image + Name */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-11 h-14 bg-cream-light rounded-lg overflow-hidden flex-shrink-0 border border-blush/40">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-heading text-sm font-semibold text-dark">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-dark-muted font-mono">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-semibold text-dark capitalize">
                        {product.category}
                      </td>

                      {/* Variants Count */}
                      <td className="py-3.5 px-4 text-dark-muted">
                        {variantCount} {variantCount === 1 ? "variant" : "variants"}
                        {!isBag && (
                          <span className="block text-[10px] text-dark-muted/70">
                            ({Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean))).join(", ")})
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-mono font-bold text-gold-hover">
                        {formatPrice(product.price)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                          Active
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right space-x-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2.5 text-xs text-dark hover:text-gold"
                        >
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            <span>Edit</span>
                          </Link>
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setProductToDelete(product)}
                          className="h-8 px-2.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          <span>Delete</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-dark-muted italic">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal Stub */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-xs"
            onClick={() => setProductToDelete(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-blush/60 shadow-2xl space-y-4 z-10">
            <button
              type="button"
              onClick={() => setProductToDelete(null)}
              className="absolute top-4 right-4 text-dark-muted hover:text-dark"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-normal text-dark">
                Delete Product?
              </h3>
              <p className="text-xs text-dark-muted leading-relaxed font-light">
                Are you sure you want to delete <span className="font-bold text-dark">"{productToDelete.name}"</span>? This action cannot be undone once backend synchronization is active.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setProductToDelete(null)}
                className="rounded-full text-xs font-semibold px-5 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteConfirm}
                className="rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-5 py-2.5"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </FadeInSection>
  );
}
