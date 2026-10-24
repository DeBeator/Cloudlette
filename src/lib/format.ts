/**
 * Format a numeric amount as Nigerian Naira (₦).
 * Example: formatPrice(68000) → "₦68,000"
 */
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
