import Link from "next/link";
import { BarChart3, Boxes, Package, Settings, Users } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { getMockOrders } from "@/lib/mock-orders";

const panels = [
  { title: "Catalog preview", text: "Browse the current mock products and variants in the storefront.", href: "/shop", icon: Package },
  { title: "Inventory preview", text: "Low-stock calculations are shown from demonstration variants.", href: "/admin-preview/inventory", icon: Boxes },
  { title: "Customers preview", text: "Anonymous demonstration customer records derived from mock orders.", href: "/admin-preview/customers", icon: Users },
  { title: "Categories preview", text: "Category counts are derived from the current product catalog.", href: "/admin-preview/categories", icon: BarChart3 },
  { title: "Settings preview", text: "Integration readiness, not live merchant configuration.", href: "/admin-preview/settings", icon: Settings },
];

export default function AdminPreviewPage() {
  const orders = getMockOrders();
  return <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-8"><header className="space-y-3"><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Frontend demonstration</p><h1 className="font-heading text-4xl font-bold text-dark">Cloudlette admin preview</h1><p role="status" className="max-w-3xl rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">This public route is a visual demonstration only. It cannot authenticate an administrator, expose protected records, or persist changes. The protected <code>/admin</code> area remains fail-closed.</p></header><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{panels.map(({ title, text, href, icon: Icon }) => <Link key={href} href={href} className="rounded-3xl border border-blush/60 bg-white p-6 transition-transform hover:-translate-y-0.5 hover:shadow-md"><Icon className="mb-4 h-6 w-6 text-gold" /><h2 className="font-heading text-xl font-bold text-dark">{title}</h2><p className="mt-2 text-sm leading-relaxed text-dark-muted">{text}</p></Link>)}</section><section className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-cream p-5"><p className="text-xs text-dark-muted">Demo products</p><p className="font-heading text-3xl font-bold">{MOCK_PRODUCTS.length}</p></div><div className="rounded-2xl bg-cream p-5"><p className="text-xs text-dark-muted">Demo orders</p><p className="font-heading text-3xl font-bold">{orders.length}</p></div><div className="rounded-2xl bg-cream p-5"><p className="text-xs text-dark-muted">Persistence</p><p className="font-heading text-xl font-bold">Unavailable</p></div></section></main>;
}
