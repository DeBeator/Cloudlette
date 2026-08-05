import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-full bg-blush/30 text-gold mb-2">
          <ShoppingCart className="h-8 w-8 text-dark" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-dark">Your Cart</h1>
        <p className="text-dark-muted leading-relaxed">
          Your shopping cart is currently empty. Items added to your cart will appear here.
        </p>
        <div className="pt-6">
          <Button asChild className="bg-gold hover:bg-gold-hover text-dark font-semibold">
            <Link href="/shop">Explore Shop</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
