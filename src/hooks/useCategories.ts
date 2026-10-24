"use client";

import { useState, useEffect } from "react";
import { products } from "@/api";
import type { Category } from "@/types";

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    products.getCategories().then((res) => {
      if (cancelled) return;
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || "Failed to load categories");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
