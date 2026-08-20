"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, Product } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/components/ui/toast";
import { ShoppingBag, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  badge?: string;
  badgeType?: "new" | "hot";
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultVariant =
      product.variants.find((v) => v.stockQty > 0) || product.variants[0];

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images[0],
      size: defaultVariant.size,
      color: defaultVariant.color,
      quantity: 1,
    });

    showToast("Added to Cart!", `${product.name} added to your cart.`);
  };

  const isOutOfStock = product.variants.every((v) => v.stockQty <= 0);

  return (
    <div className="group flex flex-col bg-cream/30 rounded-xl overflow-hidden border border-blush/40 shadow-xs hover:shadow-lg transition-all duration-300 h-full relative">
      {/* Image Container — Tall portrait aspect ratio aspect-[3/4] */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] w-full bg-cream-light overflow-hidden">
        {/* Product Image */}
        {/* TODO: replace with real product photography from client */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Top-Left — Small dark pill, cream text, no emojis */}
        {badge && !isOutOfStock && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-dark text-cream font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs block">
              {badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-dark text-cream px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop Quick "ADD TO CART" bar slides up from bottom of image */}
        {!isOutOfStock && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-0 inset-x-0 bg-dark text-cream py-3 px-4 hidden md:flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hover:bg-gold hover:text-dark cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-gold group-hover:text-dark stroke-[2]" />
            <span>Add to Cart</span>
          </button>
        )}
      </Link>

      {/* Info Section Below Image */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
        <Link href={`/product/${product.id}`} className="space-y-1 block">
          {/* Category Tag */}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold block">
            {product.category}
          </span>
          {/* Product Name */}
          <h3 className="font-heading text-sm sm:text-base font-medium text-dark group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price & Mobile '+' Button Row */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-dark font-semibold text-base sm:text-lg">
            {formatPrice(product.price)}
          </p>

          {/* Mobile small '+' icon button */}
          {!isOutOfStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-dark text-cream flex items-center justify-center hover:bg-gold hover:text-dark transition-colors md:hidden shadow-xs flex-shrink-0"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
