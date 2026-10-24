import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-8 py-16 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-blush/60 shadow-xs max-w-lg mx-auto space-y-6">
        {/* Decorative Compass / Icon */}
        <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-gold border border-gold/20 shadow-xs">
          <Compass className="w-10 h-10 stroke-[1.5] animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block">
            404 Error
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Looks like this page got lost.
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted font-light leading-relaxed max-w-sm mx-auto">
            The page you are looking for may have moved, been renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="w-full sm:w-auto rounded-full px-7 py-3 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-2"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-1.5" />
              <span>Back Home</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="goldOutline"
            className="w-full sm:w-auto rounded-full px-7 py-3 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
          >
            <Link href="/shop">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span>Shop Collection</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
