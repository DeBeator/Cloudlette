# Cloudlette — Backend Integration Checklist

A reference for the backend developer. Every stubbed API call in the 
frontend codebase, grouped by phase. Uncomment the corresponding 
`useRequireAuth()` / `useRequireAdmin()` calls in each file once the 
endpoint is live and tested.

---

## Auth Guards — Uncomment When Backend Is Live
List of all frontend routes protected by client-side auth guards (currently commented out):

- `src/app/checkout/page.tsx:L75` -> `// const { isAuthenticated, isLoading: authLoading, user } = useRequireAuth();`
- `src/app/order-confirmation/page.tsx:L18` -> `// const { isAuthenticated, isLoading: authLoading } = useRequireAuth();`
- `src/app/orders/page.tsx:L16` -> `// useRequireAuth();`
- `src/app/orders/[id]/page.tsx:L106` -> `// useRequireAuth();`
- `src/app/account/page.tsx:L15` -> `// useRequireAuth();`
- `src/app/admin/page.tsx:L26` -> `// useRequireAdmin();`
- `src/app/admin/products/page.tsx:L19` -> `// useRequireAdmin();`
- `src/app/admin/products/new/page.tsx:L25` -> `// useRequireAdmin();`
- `src/app/admin/products/[id]/edit/page.tsx:L30` -> `// useRequireAdmin();`
- `src/app/admin/orders/page.tsx:L21` -> `// useRequireAdmin();`
- `src/app/admin/orders/[id]/page.tsx:L25` -> `// useRequireAdmin();`
- `src/app/admin/stock/page.tsx:L18` -> `// useRequireAdmin();`

---

## Phase 0 — Auth Endpoints
All proxy routes are in `src/app/api/auth/*` forwarding to `${BACKEND_URL}` and managing the `auth_token` `httpOnly` cookie:

- **`POST /auth/login`**:
  - Location: `src/app/api/auth/login/route.ts:L4`
  - Function: Proxies email & password credentials to backend, sets `auth_token` `httpOnly` cookie on response.
- **`POST /auth/signup`**:
  - Location: `src/app/api/auth/signup/route.ts:L3`
  - Function: Proxies user registration details (`fullName`, `email`, `phone`, `password`) to backend, sets `auth_token` `httpOnly` cookie on response.
- **`POST /auth/logout`**:
  - Location: `src/app/api/auth/logout/route.ts:L4`
  - Function: Proxies logout notification to backend and clears `auth_token` cookie (maxAge = 0).
- **`GET /auth/me`**:
  - Location: `src/app/api/auth/me/route.ts:L4`
  - Function: Passes `auth_token` cookie to backend to rehydrate user session state on application mount.
- **`POST /auth/reset-password`**:
  - Locations: `src/app/api/auth/reset-password/route.ts:L3`, `src/app/forgot-password/page.tsx:L21`
  - Function: Initiates password reset email flow via backend email provider.

---

## Phase 1 — Products
- **`GET /api/products`**:
  - Locations: `src/app/shop/page.tsx:L10,L48`, `src/components/home/NewArrivalsSection.tsx:L3,L9`, `src/components/home/FastSellingSection.tsx:L3,L9`
  - Function: Retrieves full product catalog or curated section items.
- **`GET /api/products?category=`**:
  - Locations: `src/app/shop/page.tsx:L10,L48`, `src/app/product/[id]/page.tsx:L130,L385`
  - Function: Filters products by category (`bag`, `shoe`, `top`) and fetches recommended related items.
- **`GET /api/products/:id`**:
  - Location: `src/app/product/[id]/page.tsx`
  - Function: Retrieves detailed product info, variants, pricing, and stock count for Product Details page.

---

## Phase 2 — Orders + Payments
- **`POST /api/orders`**:
  - Locations: `src/app/checkout/page.tsx:L179,L181,L182,L630,L659`
  - Function: Creates an order record with contact/delivery info & items, returning Paystack payment `authorization_url`.
- **`GET /api/orders/:id`**:
  - Location: `src/app/order-confirmation/page.tsx:L111`
  - Function: Retrieves completed order details for order confirmation page.
- **`GET /api/shipping/rate?location=`**:
  - Location: `src/app/checkout/page.tsx:L114`
  - Function: Calculates dynamic shipping rate based on delivery type and state selection.
- **Paystack `authorization_url` redirect**:
  - Location: `src/app/checkout/page.tsx:L180,L182,L659`
  - Function: Redirects user to hosted Paystack checkout after order creation.
- **Oracle Object Storage image upload**:
  - Locations: `src/app/admin/products/new/page.tsx:L213`, `src/app/admin/products/[id]/edit/page.tsx:L254`
  - Function: Uploads binary product images to Oracle Object Storage bucket.

---

## Phase 3 — Customer Dashboard
- **`GET /api/orders`** (authenticated — customer's own orders):
  - Locations: `src/app/orders/page.tsx:L18`, `src/lib/mock-orders.ts:L3`
  - Function: Fetches authenticated user's order history list.

---

## Phase 4 — Admin
- **`GET /api/products`** (admin):
  - Location: `src/app/admin/products/page.tsx:L16`
  - Function: Fetches full product inventory list for admin table.
- **`POST /api/products`**:
  - Location: `src/app/admin/products/new/page.tsx:L15,L75`
  - Function: Creates a new product and variant records.
- **`PUT /api/products/:id`**:
  - Location: `src/app/admin/products/[id]/edit/page.tsx:L16,L99`
  - Function: Updates an existing product and variant details.
- **`DELETE /api/products/:id`**:
  - Location: `src/app/admin/products/page.tsx`
  - Function: Deletes a product from catalog.
- **`GET /api/orders`** (admin — all orders):
  - Location: `src/app/admin/orders/page.tsx:L17`
  - Function: Fetches all store orders for admin management table.
- **`GET /api/orders/:id`** (admin):
  - Location: `src/app/admin/orders/[id]/page.tsx:L17`
  - Function: Fetches order detail with full customer info for admin fulfillment.
- **`PUT /api/orders/:id/status`**:
  - Locations: `src/app/admin/orders/page.tsx:L18,L46`, `src/app/admin/orders/[id]/page.tsx:L18,L40,L167`, `src/lib/mock-orders.ts:L4`
  - Function: Updates order fulfillment status (`pending`, `confirmed`, `shipped`, `delivered`, `cancelled`).
- **`PUT /api/products/variants/:id/stock`**:
  - Locations: `src/app/admin/stock/page.tsx:L15,L51`, `src/lib/mock-stock.ts:L4`
  - Function: Updates stock inventory quantity for a specific product variant.
- **`POST /admin/products/:id/images`**:
  - Locations: `src/app/admin/products/new/page.tsx:L213`, `src/app/admin/products/[id]/edit/page.tsx:L254`
  - Function: Uploads image assets for a product to object storage.
- **`GET /api/admin/dashboard`**:
  - Location: `src/app/admin/page.tsx:L23`
  - Function: Retrieves aggregated dashboard stats (total orders, monthly revenue, total products, low stock alerts).
- **`PATCH /api/users/me`**:
  - Location: `src/app/account/page.tsx:L34,L113`
  - Function: Updates user profile details (full name, phone number).

---

## Mock Data to Replace
Files containing mock data that must be swapped for real API endpoints:

- `src/lib/mock-data.ts`: Replace `MOCK_PRODUCTS` with `GET /api/products` and `GET /api/products/:id`.
- `src/lib/mock-orders.ts`: Replace `MOCK_ORDERS` with `GET /api/orders` (customer), `GET /api/orders` (admin), and `GET /api/orders/:id`.
- `src/lib/mock-stock.ts`: Replace `buildInitialStockItems()` with `GET /api/products/variants` or `GET /api/admin/stock`.

---

## Photography TODOs
Locations where client product & banner photography should be replaced:

- `src/components/shop/ProductCard.tsx:L49`: `// TODO: replace with real product photography from client`
- `src/components/home/FeaturedCategories.tsx:L12,L19,L26,L57`: `// TODO: replace with real category photography from client`
- `src/app/product/[id]/page.tsx:L180`: `// TODO: replace with real product photography from client`
- `src/app/login/page.tsx:L167`: `// TODO: client photography`
- `src/app/signup/page.tsx:L235`: `// TODO: client photography`
