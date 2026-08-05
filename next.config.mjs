/** @type {import('next').NextConfig} */
// Server Environment Validation:
// BACKEND_URL=http://localhost:5000 (set to https://api.cloudlette.com in production)
//
// Client Environment Validation:
// NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxx (needed client-side when Paystack Inline JS / Pop is wired in Phase 2 backend integration)

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.objectstorage.*.oci.customer-oci.com",
      },
    ],
  },
};

export default nextConfig;