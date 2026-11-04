import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

export default function SettingsPreviewPage() {
  return <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-8"><Link href="/admin-preview" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-dark-muted hover:text-dark"><ArrowLeft className="h-4 w-4" /> Admin preview</Link><header><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Integration preparation</p><h1 className="font-heading text-4xl font-bold text-dark">Store settings</h1></header><div className="rounded-3xl border border-blush/60 bg-white p-6"><Settings className="mb-4 h-6 w-6 text-gold" /><h2 className="font-heading text-2xl font-bold">Settings are backend-managed</h2><p className="mt-2 text-sm leading-relaxed text-dark-muted">Delivery, payment, tax, access-control, notification, and media-storage settings need agreed server contracts. This preview deliberately provides no editable controls or local persistence.</p></div></main>;
}
