"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Client-side hook to guard protected routes.
 * Redirects to /login?redirect=[currentPath] if user is not authenticated.
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const search = typeof window !== "undefined" ? window.location.search : "";
      const currentPath = `${pathname}${search}`;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return { isAuthenticated, isLoading, user };
}
