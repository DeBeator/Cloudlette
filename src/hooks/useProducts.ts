"use client";

import { useState, useEffect } from "react";
import { products } from "@/api";
import type { Product } from "@/types";
import type { ProductFilters } from "@/api/products";

export function useProducts(filters?: ProductFilters) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    products.getProducts(filters).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || "Failed to load products");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // Stringify filters for stable dependency — filters object may be recreated each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}
