"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useToast } from "@/components/ui/toast";
import { ShoppingBag, Plus, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  badge?: string;
  badgeType?: "new" | "hot";
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const availableVariants = product.variants.filter(
      (variant) => variant.isActive !== false && variant.stockQty > 0
    );
    // Quick add is safe only when there is one purchasable variant. Products
    // with meaningful variant choices should be selected on their detail page.
    if (availableVariants.length !== 1) return;
    const defaultVariant = availableVariants[0];

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      category: product.category,
      price: defaultVariant.price,
      image: product.images[0],
      size: defaultVariant.size,
      color: defaultVariant.color,
      quantity: 1,
    });

    showToast("Added to Cart!", `${product.name} added to your cart.`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isInWishlist ? "Removed from Wishlist" : "Saved to Wishlist",
      `${product.name} ${isInWishlist ? "removed from" : "added to"} your wishlist.`
    );
  };

  const availableVariants = product.variants.filter(
    (variant) => variant.isActive !== false && variant.stockQty > 0
  );
  const isOutOfStock = availableVariants.length === 0;
  const canQuickAdd = availableVariants.length === 1;

  return (
    <div className="group flex flex-col bg-brand-ivory rounded-2xl overflow-hidden border border-brand-beige/80 shadow-xs hover:shadow-lg transition-all duration-300 h-full relative">
      {/* Image Container — Tall portrait aspect ratio aspect-[3/4] */}
      <div className="relative aspect-[3/4] w-full bg-brand-beige/30 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block absolute inset-0" aria-label={`View ${product.name}`}>
        {/* Product Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        </Link>
        {/* Independent controls must not be nested inside the product link. */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-brand-black/60 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-110 shadow-sm"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist
                ? "fill-brand-butter text-brand-butter stroke-[2]"
                : "text-brand-ivory fill-transparent stroke-[2] hover:text-brand-butter"
            }`}
          />
        </button>

        {/* Badge Top-Left — Small dark pill, cream text, no emojis */}
        {badge && !isOutOfStock && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-butter text-brand-black font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs block border border-brand-black/10">
              {badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-brand-black/50 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-brand-black text-brand-ivory px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop quick add is shown only for one unambiguous in-stock variant. */}
        {canQuickAdd && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-0 inset-x-0 bg-brand-black text-brand-ivory py-3 px-4 hidden md:flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hover:bg-brand-black-light cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-brand-butter stroke-[2]" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>

      {/* Info Section Below Image */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-2 bg-brand-ivory">
        <Link href={`/product/${product.slug}`} className="space-y-1 block">
          {/* Category Tag */}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-taupe-dark block">
            {product.category}
          </span>
          {/* Product Name */}
          <h3 className="font-heading text-base font-semibold text-brand-black group-hover:text-brand-taupe-dark transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price & Mobile '+' Button Row */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-brand-black font-bold text-base sm:text-lg font-mono">
            {formatPrice(product.price)}
          </p>

          {/* Mobile small '+' icon button */}
          {canQuickAdd ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-brand-black text-brand-ivory flex items-center justify-center hover:bg-brand-black-light transition-colors md:hidden shadow-xs flex-shrink-0"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
            </button>
          ) : !isOutOfStock ? (
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex h-8 items-center rounded-full bg-brand-black px-3 text-[10px] font-bold uppercase tracking-wide text-brand-ivory transition-colors hover:bg-brand-black-light md:hidden"
            >
              Options
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
