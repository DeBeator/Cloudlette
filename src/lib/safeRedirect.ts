/**
 * Allows only same-origin application paths after authentication. Query-string
 * values are attacker-controlled and must never be passed directly to router
 * navigation.
 */
export function getSafeRedirect(value: string | null, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  return value;
}
