"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/format";
import { getColorHex } from "@/lib/mock-data";
import type { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { SizeGuide } from "@/components/shop/SizeGuide";
import { FadeInSection } from "@/components/animations/FadeInSection";
import {
  ShoppingBag,
  ArrowLeft,
  AlertTriangle,
  Heart,
  Share2,
  Truck,
  Minus,
  Plus,
  Ruler,
  ChevronDown,
} from "lucide-react";

interface ProductDetailClientProps {
  slug: string;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const { data: product, loading, error } = useProduct(slug);
  const { data: allProducts } = useProducts();
  const addItemToCart = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("material");

  // Recently viewed products
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<Product[]>([]);

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
        product.variants.find((v) => (v.stockQty ?? 0) > 0) || product.variants[0];
      setSelectedColor(firstInStock.color);
      setSelectedSize(firstInStock.size);
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [product]);

  // Track and load recently viewed in localStorage key `cloudlette-recently-viewed`
  useEffect(() => {
    if (!product) return;
    try {
      const storageKey = "cloudlette-recently-viewed";
      const raw = localStorage.getItem(storageKey);
      const prevSlugs: string[] = raw ? JSON.parse(raw) : [];

      // Update storage with current slug first
      const updatedSlugs = [product.slug, ...prevSlugs.filter((s) => s !== product.slug)].slice(0, 6);
      localStorage.setItem(storageKey, JSON.stringify(updatedSlugs));

      // Resolve previously viewed products excluding current product
      if (allProducts && allProducts.length > 0) {
        const otherSlugs = updatedSlugs.filter((s) => s !== product.slug);
        const resolved = otherSlugs
          .map((s) => allProducts.find((p) => p.slug === s || p.id === s))
          .filter((p): p is Product => Boolean(p));
        setRecentlyViewedProducts(resolved.slice(0, 4));
      }
    } catch {
      // localStorage may fail in private mode or SSR
    }
  }, [product, allProducts]);

  // Active selected variant
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (!product) return undefined;
    return product.variants.find((v) => {
      const colorMatch = v.color === selectedColor;
      const sizeMatch = hasSizes ? v.size === selectedSize : true;
      return colorMatch && sizeMatch;
    });
  }, [product, selectedColor, selectedSize, hasSizes]);

  const selectedStockQty = selectedVariant ? (selectedVariant.stockQty ?? 0) : 0;
  const isOutOfStock = !selectedVariant || selectedStockQty <= 0;
  const isSelectionMissing = !selectedColor || (hasSizes && !selectedSize);

  // Clamp quantity when selected variant changes
  useEffect(() => {
    if (selectedStockQty > 0 && quantity > selectedStockQty) {
      setQuantity(selectedStockQty);
    } else if (selectedStockQty > 0 && quantity < 1) {
      setQuantity(1);
    }
  }, [selectedStockQty, quantity]);

  // Handle color swatch click
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (hasSizes && product) {
      const matchingVariants = product.variants.filter((v) => v.color === color);
      const firstInStockForColor =
        matchingVariants.find((v) => (v.stockQty ?? 0) > 0) || matchingVariants[0];
      if (firstInStockForColor) {
        setSelectedSize(firstInStockForColor.size);
      }
    }
  };

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
        quantity: quantity,
      },
      { openDrawer: typeof window !== "undefined" && window.innerWidth >= 768 }
    );

    showToast(
      "Added to Cart!",
      `${quantity}x ${product.name} (${selectedVariant.color}${
        selectedVariant.size ? `, Size ${selectedVariant.size}` : ""
      })`
    );
  };

  // "You May Also Like" products
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts) return [];
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.slug !== product.slug
    );
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    const otherProducts = allProducts.filter(
      (p) => p.slug !== product.slug && !sameCategory.some((sc) => sc.slug === p.slug)
    );
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [product, allProducts]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 py-8">
        <div className="h-4 w-28 bg-blush/40 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="w-full aspect-[3/4] max-h-[80vh] rounded-2xl bg-cream-light/80 animate-pulse border border-blush/40" />
            <div className="flex space-x-3">
              <div className="w-20 aspect-square rounded-lg bg-cream-light/80 animate-pulse" />
              <div className="w-20 aspect-square rounded-lg bg-cream-light/80 animate-pulse" />
              <div className="w-20 aspect-square rounded-lg bg-cream-light/80 animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="h-4 w-20 bg-blush/40 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-blush/50 rounded animate-pulse" />
            <div className="h-8 w-1/3 bg-blush/60 rounded animate-pulse" />
            <div className="h-20 w-full bg-blush/30 rounded animate-pulse" />
            <div className="h-12 w-full bg-blush/40 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round((((product.compareAtPrice || 0) - product.price) / (product.compareAtPrice || 1)) * 100)
    : 0;

  // JSON-LD structured data schema
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "Cloudlette",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `https://cloudlette.com/product/${product.slug}`,
    },
  };

  return (
    <div className="space-y-0 w-full">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Product Detail Main Section */}
      <FadeInSection className="w-full px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-8">
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

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:max-h-[calc(100vh-10rem)] lg:overflow-hidden">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 flex flex-col">
            <div
              className="relative w-full max-h-[80vh] min-h-[320px] rounded-2xl overflow-hidden bg-cream-light border border-blush/60 shadow-sm"
              style={{ aspectRatio: "3/4", maxHeight: "80vh" }}
            >
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
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Sale badge on main image if compareAtPrice exists */}
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-rose-600 text-cream text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Save {discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row Below */}
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

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 pl-0 lg:pl-4 flex flex-col justify-between space-y-6 lg:overflow-y-auto lg:max-h-[calc(100vh-10rem)] no-scrollbar">
            <div className="space-y-4">
              {/* Category Tag */}
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                {product.category}
              </span>

              {/* Product Title */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price row with compareAtPrice strikethrough & discount pill */}
              <div className="flex items-baseline space-x-3 flex-wrap gap-y-1">
                <p className="text-dark font-semibold text-2xl sm:text-3xl">
                  {formatPrice(product.price)}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-dark/40 line-through text-lg sm:text-xl font-normal">
                      {formatPrice(product.compareAtPrice!)}
                    </p>
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

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

              {/* Size Pills + Size Guide Trigger */}
              {hasSizes && allProductSizes.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                      Size:{" "}
                      <span className="text-gold-hover font-semibold">
                        {selectedSize || "Select size"}
                      </span>
                    </label>

                    {/* Size Guide link/button for shoes & tops */}
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-gold hover:text-gold-hover transition-colors underline-offset-4 hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {allProductSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      const matchingVar = product.variants.find(
                        (v) => v.color === selectedColor && v.size === size
                      );
                      const sizeStock = matchingVar ? (matchingVar.stockQty ?? 0) : 0;
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

              {/* Stock Status Line & "Only X left" warning */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full inline-block ${
                      isOutOfStock ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-dark">
                    {isOutOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                {/* "Only X left" warning when stockQty <= 3 */}
                {!isOutOfStock && selectedStockQty <= 3 && (
                  <div className="flex items-center space-x-2 text-amber-800 text-xs font-semibold bg-amber-50/90 border border-amber-300 px-3 py-1.5 rounded-lg shadow-xs">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span>Only {selectedStockQty} left in stock — order soon</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector (− 1 +) above Add to Cart, capped at available stock */}
              {!isOutOfStock && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Quantity
                  </label>
                  <div className="inline-flex items-center rounded-lg border border-blush/60 bg-white shadow-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-dark/70 hover:text-dark hover:bg-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-dark">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.min(selectedStockQty, prev + 1))}
                      disabled={quantity >= selectedStockQty}
                      className="w-10 h-10 flex items-center justify-center text-dark/70 hover:text-dark hover:bg-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isSelectionMissing}
                  className="w-full bg-dark text-cream hover:bg-gold hover:text-dark transition-all duration-300 font-semibold text-sm uppercase tracking-wider py-4 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rounded-xl"
                >
                  <ShoppingBag className="h-4 w-4 stroke-[2]" />
                  <span>
                    {isSelectionMissing
                      ? "Select options"
                      : isOutOfStock
                      ? "Out of Stock"
                      : `Add to Cart — ${formatPrice(product.price * quantity)}`}
                  </span>
                </button>
              </div>

              {/* Collapsible Accordion Section: Material, Fit, Care Instructions */}
              <div className="pt-4 divide-y divide-blush/40 border-t border-blush/40">
                {/* Material & Details */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === "material" ? null : "material")
                    }
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-dark group-hover:text-gold transition-colors">
                      Material & Details
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-dark/60 transition-transform duration-200 ${
                        openAccordion === "material" ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "material" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                          {product.material || "Crafted with premium high-grade materials and artisanal finishing."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fit & Sizing */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === "fit" ? null : "fit")}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-dark group-hover:text-gold transition-colors">
                      Fit & Sizing
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-dark/60 transition-transform duration-200 ${
                        openAccordion === "fit" ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "fit" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                          {product.fit ||
                            (product.category === "bag"
                              ? "One size structured bag with ample capacity for daily devices and cosmetics."
                              : "Designed for a tailored, true-to-size silhouette. Check our Size Guide for exact body measurements.")}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Care Instructions */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-dark group-hover:text-gold transition-colors">
                      Care Instructions
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-dark/60 transition-transform duration-200 ${
                        openAccordion === "care" ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "care" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 text-xs sm:text-sm text-dark-muted font-light leading-relaxed">
                          {product.careInstructions ||
                            "Handle with gentle care. Store in protective dust bag when not in use."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Save to Wishlist & Share Stubs */}
              <div className="flex items-center space-x-6 pt-1 text-xs font-medium text-dark-muted">
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
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    showToast("Link Copied", "Product link copied to clipboard.");
                  }}
                >
                  <Share2 className="h-4 w-4 stroke-[1.5]" />
                  <span>Share</span>
                </button>
              </div>

              {/* Shipping Info Strip Below Button */}
              <div className="flex items-center space-x-2 text-xs text-dark-muted bg-cream/40 p-3 rounded-lg border border-blush/30">
                <Truck className="h-4 w-4 text-gold flex-shrink-0" />
                <span>Free delivery in Lagos · Nationwide shipping available</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* "You May Also Like" section */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-cream/50 border-t border-blush/40 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-16">
            <FadeInSection className="mb-8 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                Curated For You
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-dark">
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

      {/* "Recently Viewed" section using ProductCard */}
      {recentlyViewedProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-white/70 border-t border-blush/40 w-full">
          <div className="w-full px-4 sm:px-8 lg:px-16">
            <FadeInSection className="mb-8 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                Your Browsing History
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-dark">
                Recently Viewed
              </h2>
            </FadeInSection>

            <FadeInSection>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {recentlyViewedProducts.map((recProd) => (
                  <ProductCard key={recProd.id} product={recProd} />
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultTab={product.category === "shoe" ? "shoes" : "clothing"}
      />
    </div>
  );
}
