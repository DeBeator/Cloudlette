"use client";

import { useState, useEffect } from "react";
import { products } from "@/api";
import type { Product } from "@/types";

export function useProduct(slug: string | undefined) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    products.getProduct(slug).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || "Product not found");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
}
