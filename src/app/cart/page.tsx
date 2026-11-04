"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/mock-data";
import { useCartStore, type CartItem } from "@/store/useCartStore";

function CartLine({ item }: { item: CartItem }) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const variant = getProductById(item.productId)?.variants.find((candidate) => candidate.id === item.variantId);
  const available = variant?.stockQty;

  useEffect(() => {
    if (available !== undefined && item.quantity > available) updateQty(item.id, available);
  }, [available, item.id, item.quantity, updateQty]);

  return (
    <li className="flex gap-4 border-b border-blush/40 py-5 first:pt-0 sm:gap-6">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-light sm:h-28 sm:w-24"><Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" /></div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-dark-muted">{item.category}</p><h2 className="font-heading text-lg font-bold text-dark">{item.name}</h2><p className="text-xs text-dark-muted">{item.color}{item.size ? ` · ${item.size}` : ""}</p></div><button type="button" onClick={() => removeItem(item.id)} className="rounded-full p-2 text-dark-muted hover:bg-rose-50 hover:text-rose-700" aria-label={`Remove ${item.name} from cart`}><Trash2 className="h-4 w-4" aria-hidden="true" /></button></div>
        {available === 0 ? <p className="text-xs font-semibold text-rose-700">This variant is no longer available and will be removed.</p> : null}
        <div className="flex items-center justify-between gap-3 pt-1"><div className="inline-flex items-center rounded-xl border border-blush/70 bg-white p-1"><button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="rounded-lg p-2 hover:bg-cream" aria-label={`Decrease quantity of ${item.name}`}><Minus className="h-3.5 w-3.5" /></button><span className="w-8 text-center text-sm font-bold" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span><button type="button" disabled={available === 0 || (available !== undefined && item.quantity >= available)} onClick={() => updateQty(item.id, item.quantity + 1)} className="rounded-lg p-2 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Increase quantity of ${item.name}`}><Plus className="h-3.5 w-3.5" /></button></div><p className="font-mono text-sm font-bold text-dark">{formatPrice(item.price * item.quantity)}</p></div>
      </div>
    </li>
  );
}

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => setMounted(true), []);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  if (!mounted) return <div className="min-h-[50vh]" aria-busy="true" />;
  if (items.length === 0) return <FadeInSection className="mx-auto max-w-2xl space-y-5 px-4 py-20 text-center"><ShoppingBag className="mx-auto h-10 w-10 text-gold" /><h1 className="font-heading text-4xl font-bold text-dark">Your cart is empty</h1><p className="text-sm text-dark-muted">Pieces you add are saved on this device until checkout is connected.</p><Button asChild><Link href="/shop">Explore Cloudlette</Link></Button></FadeInSection>;
  return <FadeInSection className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-14"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Your selection</p><h1 className="font-heading text-4xl font-bold text-dark">Shopping cart</h1></div><button type="button" onClick={clearCart} className="text-xs font-bold uppercase tracking-wide text-dark-muted underline-offset-4 hover:text-rose-700 hover:underline">Clear cart</button></div><div className="grid gap-8 lg:grid-cols-[1fr_23rem]"><section className="rounded-3xl border border-blush/60 bg-white p-5 sm:p-7"><ul>{items.map((item) => <CartLine key={item.id} item={item} />)}</ul></section><aside className="h-fit space-y-4 rounded-3xl border border-blush/60 bg-cream/40 p-6 lg:sticky lg:top-24"><h2 className="font-heading text-2xl font-bold text-dark">Order summary</h2><div className="flex justify-between text-sm"><span className="text-dark-muted">Products subtotal</span><span className="font-mono font-bold">{formatPrice(subtotal)}</span></div><div className="border-y border-blush/50 py-4 text-xs leading-relaxed text-dark-muted">Delivery is confirmed separately: Lagos ₦2,000–₦7,000; interstate ₦5,000–₦7,000. Berger Park pickup has a ₦1,000 handling fee paid directly to the storekeeper.</div><Button asChild className="w-full"><Link href="/checkout">Continue to checkout</Link></Button><Link href="/shop" className="block text-center text-xs font-bold uppercase tracking-wide text-dark underline-offset-4 hover:underline">Continue shopping</Link></aside></div></FadeInSection>;
}
