import Link from "next/link";
import { ArrowLeft, Tags } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function CategoryPreviewPage() {
  const categories = ["bag", "shoe", "top"].map((slug) => ({ slug, count: MOCK_PRODUCTS.filter((product) => product.category === slug).length }));
  return <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-8"><Link href="/admin-preview" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-dark-muted hover:text-dark"><ArrowLeft className="h-4 w-4" /> Admin preview</Link><header><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Demonstration data</p><h1 className="font-heading text-4xl font-bold text-dark">Categories</h1></header><p role="status" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">Create, edit, and delete controls require an administrative API and are intentionally unavailable here.</p><div className="grid gap-4 sm:grid-cols-3">{categories.map((category) => <article key={category.slug} className="rounded-3xl border border-blush/60 bg-white p-6"><Tags className="mb-4 h-6 w-6 text-gold" /><h2 className="font-heading text-2xl font-bold capitalize">{category.slug}s</h2><p className="mt-2 text-sm text-dark-muted">{category.count} demonstration products</p><button type="button" disabled className="mt-5 rounded-full border border-blush px-4 py-2 text-xs font-bold text-dark-muted disabled:opacity-60">Editing unavailable</button></article>)}</div></main>;
}
