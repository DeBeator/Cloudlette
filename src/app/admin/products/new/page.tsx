"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRequireAdmin } from "@/lib/useRequireAdmin";
import { useToast } from "@/components/ui/toast";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, UploadCloud } from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: POST /api/products

interface VariantInput {
  id: string;
  color: string;
  size: string;
  stockQty: number;
}

export default function AddProductPage() {
  // useRequireAdmin(); // TODO: uncomment when backend auth is live

  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<"bag" | "shoe" | "top">("bag");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Dynamic Variants
  const [variants, setVariants] = useState<VariantInput[]>([
    { id: "var-1", color: "Tan Brown", size: "", stockQty: 5 },
  ]);

  const handleAddVariant = () => {
    const nextId = `var-${variants.length + 1}`;
    setVariants((prev) => [
      ...prev,
      { id: nextId, color: "", size: category === "bag" ? "" : "M", stockQty: 5 },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 1) {
      showToast("Validation Warning", "At least one product variant is required.");
      return;
    }
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const handleVariantChange = (
    id: string,
    field: keyof VariantInput,
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      showToast("Validation Error", "Product name and price are required.");
      return;
    }

    // TODO: POST /api/products
    showToast(
      "Product Saved!",
      "Backend integration coming — changes reflected in local view."
    );

    router.push("/admin/products");
  };

  return (
    <FadeInSection className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back to Products Catalog
        </Link>
      </div>

      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
          NEW CATALOG ITEM
        </span>
        <h1 className="font-heading text-3xl font-normal text-dark">
          Add New Product
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush/60 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Product Name *
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Aurelia Structured Leather Tote"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as "bag" | "shoe" | "top")
                }
                className="w-full bg-white border border-blush/60 rounded-xl px-4 py-3 text-sm text-dark font-medium focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="bag">Bag</option>
                <option value="shoe">Shoe</option>
                <option value="top">Top</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Price (₦) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark font-bold font-mono text-sm">
                  ₦
                </span>
                <Input
                  type="number"
                  required
                  min="0"
                  placeholder="68000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-9 bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Crafted from full-grain Italian leather..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-blush/60 rounded-xl p-4 text-sm text-dark focus:outline-none focus:border-gold resize-none"
              />
            </div>

            {/* Status Toggle */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                Catalog Status
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsActive(true)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-gold text-dark shadow-xs"
                      : "bg-cream-light text-dark-muted border border-blush/60"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setIsActive(false)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    !isActive
                      ? "bg-neutral-800 text-white shadow-xs"
                      : "bg-cream-light text-dark-muted border border-blush/60"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload Area Stub */}
          {/* TODO: wire POST /admin/products/:id/images to Oracle Object Storage */}
          <div className="space-y-2 border-t border-blush/40 pt-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
              Product Photography
            </label>
            <div className="border-2 border-dashed border-blush rounded-3xl p-8 text-center bg-cream-light/30 hover:bg-cream-light/60 transition-colors cursor-pointer space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream border border-blush/60 flex items-center justify-center mx-auto text-gold">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-dark">
                  Drag and drop product images here, or browse
                </p>
                <p className="text-[11px] text-dark-muted font-light">
                  PNG, JPG, or WEBP up to 5MB (Oracle Object Storage integration ready)
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Variants Section */}
          <div className="space-y-4 border-t border-blush/40 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-normal text-dark">
                  Product Variants
                </h3>
                <p className="text-xs text-dark-muted font-light">
                  Manage colors, sizes, and stock inventory count
                </p>
              </div>
              <Button
                type="button"
                variant="goldOutline"
                size="sm"
                onClick={handleAddVariant}
                className="rounded-full text-xs font-semibold px-4"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Variant
              </Button>
            </div>

            {/* Variant Rows List */}
            <div className="space-y-3">
              {variants.map((v, index) => (
                <div
                  key={v.id}
                  className="p-4 bg-cream-light/40 border border-blush/50 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-1 text-xs font-bold text-dark-muted">
                    #{index + 1}
                  </div>

                  {/* Color */}
                  <div className="sm:col-span-4">
                    <Input
                      type="text"
                      placeholder="Color (e.g. Tan Brown)"
                      value={v.color}
                      onChange={(e) =>
                        handleVariantChange(v.id, "color", e.target.value)
                      }
                      className="bg-white border-blush/60 text-xs py-2"
                    />
                  </div>

                  {/* Size (Hidden for Bags) */}
                  {category !== "bag" ? (
                    <div className="sm:col-span-3">
                      <Input
                        type="text"
                        placeholder="Size (e.g. 38, S, M)"
                        value={v.size}
                        onChange={(e) =>
                          handleVariantChange(v.id, "size", e.target.value)
                        }
                        className="bg-white border-blush/60 text-xs py-2"
                      />
                    </div>
                  ) : (
                    <div className="sm:col-span-3 text-[11px] text-dark-muted italic px-2">
                      N/A (Bags)
                    </div>
                  )}

                  {/* Stock Qty */}
                  <div className="sm:col-span-3">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Stock Qty"
                      value={v.stockQty}
                      onChange={(e) =>
                        handleVariantChange(
                          v.id,
                          "stockQty",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="bg-white border-blush/60 text-xs py-2 font-mono"
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(v.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove variant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end space-x-4 border-t border-blush/40">
            <Button
              asChild
              variant="outline"
              className="rounded-full text-xs font-semibold px-6 py-3"
            >
              <Link href="/admin/products">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider px-8 py-3 shadow-md"
            >
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </FadeInSection>
  );
}
