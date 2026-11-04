import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { getMockOrders } from "@/lib/mock-orders";

export default function CustomerPreviewPage() {
  const customers = Array.from(new Map(getMockOrders().map((order) => [order.customer.email, order.customer])).values());
  return <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-8"><Link href="/admin-preview" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-dark-muted hover:text-dark"><ArrowLeft className="h-4 w-4" /> Admin preview</Link><header><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Demonstration data</p><h1 className="font-heading text-4xl font-bold text-dark">Customers</h1></header><p role="status" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">These fictional records are derived from local mock orders. They are not customer accounts or contact records.</p><div className="overflow-hidden rounded-3xl border border-blush/60 bg-white"><ul className="divide-y divide-blush/40">{customers.map((customer) => <li key={customer.email} className="flex items-center gap-4 p-5"><Users className="h-5 w-5 text-gold" /><div><h2 className="font-heading text-lg font-bold text-dark">{customer.name}</h2><p className="text-sm text-dark-muted">Demonstration customer · account access unavailable</p></div></li>)}</ul></div></main>;
}
