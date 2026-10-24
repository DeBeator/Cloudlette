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
  async redirects() {
    return [
      // 12 Product ID to Slug redirects
      { source: "/product/prod-1", destination: "/product/aurelia-structured-leather-tote", permanent: true },
      { source: "/product/prod-2", destination: "/product/sienna-silk-draped-blouse", permanent: true },
      { source: "/product/prod-3", destination: "/product/lagos-statement-block-heels", permanent: true },
      { source: "/product/prod-4", destination: "/product/celeste-woven-shoulder-bag", permanent: true },
      { source: "/product/prod-5", destination: "/product/zaria-satin-wrap-top", permanent: true },
      { source: "/product/prod-6", destination: "/product/valentina-pointed-leather-mules", permanent: true },
      { source: "/product/prod-7", destination: "/product/noor-mini-crystal-clutch", permanent: true },
      { source: "/product/prod-8", destination: "/product/kano-linen-cut-out-top", permanent: true },
      { source: "/product/prod-9", destination: "/product/amina-strappy-ankle-heels", permanent: true },
      { source: "/product/prod-10", destination: "/product/tari-bucket-crossbody-bag", permanent: true },
      { source: "/product/prod-11", destination: "/product/enugu-ribbed-knit-crop-top", permanent: true },
      { source: "/product/prod-12", destination: "/product/ibadan-woven-platform-slides", permanent: true },

      // Step 4: Category redirects
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "bag" }],
        destination: "/shop/bags",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "bags" }],
        destination: "/shop/bags",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "shoe" }],
        destination: "/shop/shoes",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "shoes" }],
        destination: "/shop/shoes",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "top" }],
        destination: "/shop/tops",
        permanent: true,
      },
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "tops" }],
        destination: "/shop/tops",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;