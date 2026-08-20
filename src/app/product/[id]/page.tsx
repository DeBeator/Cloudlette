"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  getProductById,
  MOCK_PRODUCTS,
  formatPrice,
  getColorHex,
  ProductVariant,
} from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { ShoppingBag, ArrowLeft, AlertTriangle, Heart, Share2, Truck } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Available unique colors for product
  const availableColors = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.variants.map((v) => v.color)));
  }, [product]);

  // Check if product category requires size selection (shoes & tops)
  const hasSizes = useMemo(() => {
    if (!product) return false;
    return product.category !== "bag" && product.variants.some((v) => v.size !== null);
  }, [product]);

  // All unique sizes available across variants for this product
  const allProductSizes = useMemo(() => {
    if (!product || !hasSizes) return [];
    const sizes = Array.from(
      new Set(product.variants.map((v) => v.size).filter((s): s is string => s !== null))
    );
    return sizes;
  }, [product, hasSizes]);

  // Default color and size selection on load
  useEffect(() => {
    if (product && product.variants.length > 0) {
      const firstInStock =
        product.variants.find(
          (v) => (v.stockQty ?? v.stock_qty ?? 0) > 0
        ) || product.variants[0];
      setSelectedColor(firstInStock.color);
      setSelectedSize(firstInStock.size);
    }
  }, [product]);

  // Active selected variant
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (!product) return undefined;
    return product.variants.find((v) => {
      const colorMatch = v.color === selectedColor;
      const sizeMatch = hasSizes ? v.size === selectedSize : true;
      return colorMatch && sizeMatch;
    });
  }, [product, selectedColor, selectedSize, hasSizes]);

  // Handle color swatch click
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (hasSizes && product) {
      const matchingVariants = product.variants.filter((v) => v.color === color);
      const firstInStockForColor =
        matchingVariants.find((v) => (v.stockQty ?? v.stock_qty ?? 0) > 0) ||
        matchingVariants[0];
      if (firstInStockForColor) {
        setSelectedSize(firstInStockForColor.size);
      }
    }
  };

  const selectedStockQty = selectedVariant
    ? (selectedVariant.stockQty ?? selectedVariant.stock_qty ?? 0)
    : 0;

  const isOutOfStock = !selectedVariant || selectedStockQty <= 0;
  const isSelectionMissing = !selectedColor || (hasSizes && !selectedSize);

  const handleAddToCart = () => {
    if (!product || !selectedVariant || isOutOfStock || isSelectionMissing) return;

    addItemToCart(
      {
        id: selectedVariant.id,
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.images[selectedImageIndex] || product.images[0],
        size: selectedVariant.size,
        color: selectedVariant.color,
        quantity: 1,
      },
      { openDrawer: typeof window !== "undefined" && window.innerWidth >= 768 }
    );

    showToast(
      "Added to Cart!",
      `${product.name} (${selectedVariant.color}${
        selectedVariant.size ? `, Size ${selectedVariant.size}` : ""
      })`
    );
  };

  // "You May Also Like" products (same category excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 py-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <AlertTriangle className="h-12 w-12 text-gold mx-auto" />
          <h1 className="font-heading text-3xl font-bold text-dark">Product Not Found</h1>
          <p className="text-dark-muted text-sm font-light">
            The requested product could not be located in our catalog.
          </p>
          <Button asChild variant="goldOutline" className="rounded-full px-6 text-xs uppercase tracking-wider mt-4">
            <Link href="/shop" className="inline-flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const activeImage = product.images[selectedImageIndex] || product.images[0];

  return (
    <FadeInSection className="space-y-0 w-full">
      {/* Product Detail Main Section — Full width two-column layout */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Back to Shop
          </Link>
        </div>

        {/* Full-width 2-Column Split: Left 55% / Right 45% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (55% / col-span-7): Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image (Tall portrait aspect-[3/4]) */}
            {/* TODO: replace with real product photography from client */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-cream-light border border-blush/60 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Row Below (Horizontal scroll, small squares) */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((imgUrl, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 sm:w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        isSelected
                          ? "border-gold ring-2 ring-gold/30 opacity-100"
                          : "border-blush/60 hover:border-gold/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover object-center"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column (45% / col-span-5): Product Info, pl-12 on desktop */}
          <div className="lg:col-span-5 pl-0 lg:pl-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category Tag (Gold, uppercase, small) */}
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                {product.category}
              </span>

              {/* Product Title */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-dark font-semibold text-2xl sm:text-3xl">
                {formatPrice(product.price)}
              </p>

              {/* Thin Gold Divider */}
              <div className="h-[1px] bg-gold/40 my-4" />

              {/* Description Paragraph */}
              <p className="text-dark-muted text-sm sm:text-base font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-6 pt-2">
              {/* Color Swatches */}
              {availableColors.length > 0 && (
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Color:{" "}
                    <span className="text-gold-hover font-semibold">
                      {selectedColor || "Select a color"}
                    </span>
                  </label>
                  <div className="flex items-center space-x-3">
                    {availableColors.map((colorName) => {
                      const isSelected = selectedColor === colorName;
                      const hex = getColorHex(colorName);

                      return (
                        <button
                          key={colorName}
                          onClick={() => handleColorSelect(colorName)}
                          className={`w-7 h-7 rounded-full border border-black/10 transition-all ${
                            isSelected
                              ? "ring-2 ring-gold ring-offset-2 scale-110"
                              : "hover:scale-105 opacity-80 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: hex }}
                          title={colorName}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Pills */}
              {hasSizes && allProductSizes.length > 0 && (
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Size:{" "}
                    <span className="text-gold-hover font-semibold">
                      {selectedSize || "Select size"}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allProductSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      const matchingVar = product.variants.find(
                        (v) => v.color === selectedColor && v.size === size
                      );
                      const sizeStock = matchingVar
                        ? (matchingVar.stockQty ?? matchingVar.stock_qty ?? 0)
                        : 0;
                      const isSizeOutOfStock = !matchingVar || sizeStock <= 0;

                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={isSizeOutOfStock}
                          className={`min-w-[44px] h-9 px-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                            isSelected
                              ? "bg-gold text-dark border-gold font-bold shadow-xs"
                              : isSizeOutOfStock
                              ? "bg-cream-light text-dark-muted/40 border-blush/40 cursor-not-allowed opacity-40"
                              : "bg-white text-dark border-blush hover:border-gold"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stock Status Line */}
              <div className="flex items-center space-x-2 pt-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${
                    isOutOfStock ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-dark">
                  {isOutOfStock ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              {/* Full-width Solid Dark Add to Cart CTA (Gold on hover — NOT gold pill) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isSelectionMissing}
                  className="w-full bg-dark text-cream hover:bg-gold hover:text-dark transition-all duration-300 font-semibold text-sm uppercase tracking-wider py-4 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-4 w-4 stroke-[2]" />
                  <span>
                    {isSelectionMissing
                      ? "Select options"
                      : isOutOfStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </span>
                </button>
              </div>

              {/* Save to Wishlist & Share Stubs */}
              <div className="flex items-center space-x-6 pt-2 text-xs font-medium text-dark-muted">
                <button
                  type="button"
                  className="hover:text-gold transition-colors inline-flex items-center space-x-1.5"
                  onClick={() => showToast("Saved to Wishlist", `${product.name} has been saved.`)}
                >
                  <Heart className="h-4 w-4 stroke-[1.5]" />
                  <span>Save to Wishlist</span>
                </button>
                <button
                  type="button"
                  className="hover:text-gold transition-colors inline-flex items-center space-x-1.5"
                  onClick={() => showToast("Link Copied", "Product link copied to clipboard.")}
                >
                  <Share2 className="h-4 w-4 stroke-[1.5]" />
                  <span>Share</span>
                </button>
              </div>

              {/* Shipping Info Strip Below Button */}
              <div className="flex items-center space-x-2 text-xs text-dark-muted bg-cream/40 p-3 rounded-lg border border-blush/30 pt-3">
                <Truck className="h-4 w-4 text-gold flex-shrink-0" />
                <span>Free delivery in Lagos · Nationwide shipping available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "You May Also Like" section below — full width, 4-column grid */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 bg-cream/50 border-t border-blush/40 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-16">
            <FadeInSection className="mb-10 text-left">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
                You May Also Like
              </h2>
            </FadeInSection>

            <FadeInSection>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relProd) => (
                  <ProductCard key={relProd.id} product={relProd} />
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}
    </FadeInSection>
  );
}
