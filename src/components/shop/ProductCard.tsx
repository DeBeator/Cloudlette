"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, Product } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  badge?: string;
  badgeType?: "new" | "hot";
}

export function ProductCard({ product, badge, badgeType = "new" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO: wire Zustand cart store in Phase 2
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
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-blush/60 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-cream-light overflow-hidden">
        {/* TODO: replace with real product photography from client */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Optional Badge */}
        {badge && !isOutOfStock && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                badgeType === "hot"
                  ? "bg-red-50 text-red-700 border border-red-200/80"
                  : "bg-gold text-dark"
              }`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-dark/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-dark text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider shadow">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Info */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <Link href={`/product/${product.id}`} className="space-y-1 block">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-hover block">
            {product.category}
          </span>
          <h3 className="font-heading text-sm sm:text-base font-semibold text-dark group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="font-bold text-base text-gold-hover">
            {formatPrice(product.price)}
          </p>
        </Link>

        {/* Add to Cart Pill Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          size="sm"
          className="w-full rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs py-2 shadow-sm transition-all duration-200"
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5 stroke-[2]" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
