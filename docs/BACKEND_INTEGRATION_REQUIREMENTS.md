# Cloudlette frontend/backend integration requirements

Status: proposed integration requirements. These are not implemented API contracts and require ASP.NET Core developer agreement.

## Environment and transport

- `BACKEND_URL` is server-only and used by Next.js authentication proxy routes.
- `NEXT_PUBLIC_API_MODE=live` must be set only when browser-facing API routes are available. `mock` is for an explicitly labelled demonstration deployment.
- `NEXT_PUBLIC_API_URL` may be empty only when same-origin proxy routes exist. Do not expose credentials with `NEXT_PUBLIC_`.
- Return JSON, use UTC ISO 8601 timestamps, NGN amounts as integer kobo or clearly documented decimal values, and stable IDs.
- Use a consistent failure envelope: `{ "success": false, "error": { "code": "...", "message": "...", "fieldErrors": {} } }`. Do not return stack traces.

## Authentication and authorization

Existing frontend proxy assumptions: `POST /auth/login`, `POST /auth/signup`, `POST /auth/logout`, and `GET /auth/me`. The first two currently expect `{ user, token? }`; this must be agreed and replaced with a secure session strategy where appropriate.

- `GET /auth/me` must return the trusted user and role, for example `{"user":{"id":"...","fullName":"...","email":"...","role":"customer"}}`.
- Admin authorization must be enforced by every privileged API endpoint. The frontend admin boundary is only a fail-closed user-interface boundary.
- Define token expiration, refresh, revocation, CSRF protections for cookie sessions, rate limits, reset-token lifecycle, and password policy.
- Profile, addresses, customer order history, and wishlist synchronization require authenticated endpoints; local frontend persistence must never be treated as authoritative.

## Catalog, categories, variants, and inventory

Agree request pagination/filter semantics before connecting the catalog. Proposed response shape:

```ts
interface PagedResult<T> { items: T[]; page: number; pageSize: number; total: number; }
interface ProductVariant { id: string; color: string; size: string | null; price: number; stockQty: number; isActive: boolean; sku: string; }
interface Product { id: string; slug: string; name: string; description: string; price: number; category: string; images: string[]; variants: ProductVariant[]; tags: string[]; }
```

Required capabilities: catalog pagination, search, category/filter/sort parameters, product by slug, active category list, product image metadata, variant prices, and an inventory version/updated timestamp. The backend owns price and stock validation; frontend stock is informational only.

## Cart, wishlist, checkout, orders, payments, and tracking

- Cart items must identify `productId` and `variantId`; backend should reprice and validate stock on every mutation and checkout request.
- Wishlist sync must be explicitly enabled for authenticated customers; guest wishlist remains local until a merge contract is defined.
- A shipping quote must be server-authoritative and include expiry, delivery method, NGN amount, and pickup handling rules. Never accept a client-provided final shipping fee.
- Checkout must create an idempotent order/payment intent using an idempotency key. Return verified order reference and payment state only after server validation.
- Payment integration requires approved provider details, callback/webhook verification on the backend, and retry-safe client states. Never send raw card data through this app.
- Tracking lookup must require agreed privacy controls and return only verified order/timeline data.

## Administration and uploads

- Require admin role server-side for dashboard, products, inventory, categories, orders, customers, settings, and uploads.
- Admin mutations must return persisted data; the current interfaces are preview-only.
- Image upload needs an agreed signed-upload or proxied-upload flow, MIME/size validation, malware scanning policy, object ownership, and deletion lifecycle.
- Define audit events for stock changes, price changes, order status changes, and administrative access.

## Required backend decisions before production

1. Session/cookie and CSRF model; role claim format; token expiry and refresh.
2. Currency unit and rounding rules; tax, discount, and shipping quotation model.
3. Pagination/filter vocabulary and error envelope.
4. Payment provider, verified callback flow, and order idempotency model.
5. Order tracking privacy rules and customer/support contact policy.
6. Image storage host, CORS policy, upload flow, and allowed Next Image remote patterns.
