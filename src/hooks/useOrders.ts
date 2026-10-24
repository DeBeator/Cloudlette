"use client";

import { useState, useEffect } from "react";
import { orders } from "@/api";
import type { Order } from "@/types";

export function useOrders() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    orders.getOrders().then((res) => {
      if (cancelled) return;
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || "Failed to load orders");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
