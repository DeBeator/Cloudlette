"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AccessState = "checking" | "allowed" | "denied";

/**
 * Verifies the current httpOnly-cookie session with the existing Next auth
 * route. This intentionally does not read Zustand: browser state is mutable
 * and cannot establish an administrative role.
 *
 * The ASP.NET Core API must still enforce authorization for every admin API
 * request. Until server-side route protection is available, this is a
 * fail-closed UI boundary rather than complete authorization.
 */
export function AdminAccessBoundary({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AccessState>("checking");

  useEffect(() => {
    let active = true;

    async function verifyAdminSession() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const payload = (await response.json()) as {
          user?: { role?: string };
        };

        if (!active) return;

        if (response.ok && payload.user?.role === "admin") {
          setState("allowed");
          return;
        }
      } catch {
        // Fail closed when the trusted session cannot be verified.
      }

      if (active) {
        setState("denied");
        router.replace("/login?reason=admin");
      }
    }

    verifyAdminSession();
    return () => {
      active = false;
    };
  }, [router]);

  if (state !== "allowed") {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
        <div className="text-center space-y-3" role="status" aria-live="polite">
          <div className="mx-auto h-8 w-8 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
          <p className="text-sm font-medium text-brand-black">
            {state === "checking" ? "Verifying administrator access…" : "Redirecting securely…"}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
