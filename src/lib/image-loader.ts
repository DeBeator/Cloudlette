/**
 * Custom Next.js image loader for Cloudflare Workers deployment.
 *
 * Next.js's built-in `/_next/image` optimizer cannot run on Cloudflare Workers
 * (no persistent process). This loader delegates optimisation to:
 *   - Cloudinary's on-the-fly transformation API (for res.cloudinary.com URLs)
 *   - Unsplash's native query-string resizing (for images.unsplash.com URLs)
 *   - A no-op pass-through for everything else (local files, OCI, etc.)
 *
 * Usage: set `images.loader = "custom"` and `images.loaderFile` in next.config.mjs.
 * This file must be a default export matching the Next.js ImageLoader signature.
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const q = quality ?? 75;

  // ── Cloudinary ──────────────────────────────────────────────────────────────
  // Insert f_auto,q_auto,w_<width> transformation after /upload/ in the URL.
  // Handles versioned URLs like /upload/v1234567890/... and plain /upload/...
  // Example in:  https://res.cloudinary.com/demo/image/upload/sample.jpg
  // Example out: https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/sample.jpg
  if (src.includes("res.cloudinary.com") && src.includes("/image/upload/")) {
    return src.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_auto,w_${width}/`
    );
  }

  // ── Unsplash ─────────────────────────────────────────────────────────────────
  // Unsplash supports w= and q= query params natively.
  // Strip any existing w/q params from the URL the mock data already bakes in
  // (e.g. ?auto=format&fit=crop&w=800&q=80) and replace with our values so we
  // don't end up with duplicates like w=800&w=400.
  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(q));
    // Keep auto=format and fit=crop if already present; they don't conflict.
    return url.toString();
  }

  // ── Everything else (local files, OCI Object Storage, unknown hosts) ────────
  // Return src unchanged — the browser will fetch the original at full size.
  return src;
}

