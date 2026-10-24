export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-cream/30 rounded-xl overflow-hidden border border-blush/40 shadow-xs h-full animate-pulse">
      {/* Image Skeleton (aspect-[3/4] tall portrait) */}
      <div className="relative aspect-[3/4] w-full bg-cream-light/80" />

      {/* Info Section Skeleton */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-2">
          {/* Category tag */}
          <div className="h-3 w-16 bg-blush/40 rounded-full" />
          {/* Title */}
          <div className="h-4 w-4/5 bg-blush/50 rounded" />
        </div>

        {/* Price & button row */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-24 bg-blush/60 rounded" />
          <div className="w-8 h-8 rounded-full bg-blush/40 md:hidden" />
        </div>
      </div>
    </div>
  );
}
