"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/components/ui/toast";

export function ProductListCard({ product }: { product: Product }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const availableVariants = product.variants.filter(
    (variant) => variant.isActive !== false && variant.stockQty > 0
  );
  const canQuickAdd = availableVariants.length === 1;
  const isOutOfStock = availableVariants.length === 0;

  const addSingleVariant = () => {
    const variant = availableVariants[0];
    if (!variant) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      category: product.category,
      price: variant.price,
      image: product.images[0],
      color: variant.color,
      size: variant.size,
      quantity: 1,
    });
    showToast("Added to cart", `${product.name} was added to your cart.`);
  };

  return (
    <article className="grid grid-cols-[7rem_1fr] gap-4 rounded-3xl border border-brand-beige bg-white p-3 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-4">
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-beige/30">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 7rem, 11rem" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-col justify-between gap-3 py-1">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-taupe-dark">{product.category}</p>
          <Link href={`/product/${product.slug}`} className="block font-heading text-xl font-bold text-brand-black hover:text-brand-taupe-dark sm:text-2xl">{product.name}</Link>
          <p className="line-clamp-2 text-xs leading-relaxed text-brand-taupe-dark sm:text-sm">{product.shortDescription || product.description}</p>
          <p className="text-xs text-brand-taupe-dark">{isOutOfStock ? "Out of stock" : `${availableVariants.length} available variant${availableVariants.length === 1 ? "" : "s"}`}</p>
          <p className="font-mono text-lg font-bold text-brand-black">{formatPrice(product.price)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={isInWishlist} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-beige px-4 text-xs font-bold text-brand-black hover:bg-brand-butter">
            <Heart className={`h-4 w-4 ${isInWishlist ? "fill-brand-black" : ""}`} aria-hidden="true" />
            {isInWishlist ? "Saved" : "Save"}
          </button>
          {canQuickAdd ? (
            <button type="button" onClick={addSingleVariant} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-black px-4 text-xs font-bold text-brand-ivory hover:bg-brand-black-light">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to cart
            </button>
          ) : !isOutOfStock ? (
            <Link href={`/product/${product.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-brand-black px-4 text-xs font-bold text-brand-ivory hover:bg-brand-black-light">Choose options</Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
