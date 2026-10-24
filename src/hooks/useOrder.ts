"use client";

import { useState, useEffect } from "react";
import { orders } from "@/api";
import type { Order } from "@/types";

export function useOrder(id: string | undefined) {
  const [data, setData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    orders.getOrder(id).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || "Order not found");
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}
