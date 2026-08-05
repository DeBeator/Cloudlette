"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Client-side hook to guard protected routes.
 * Redirects to /login?redirect=[currentPath] if user is not authenticated.
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const queryString = searchParams?.toString();
      const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, isLoading, pathname, searchParams, router]);

  return { isAuthenticated, isLoading, user };
}
