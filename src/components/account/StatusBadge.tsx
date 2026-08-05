import { MockOrder } from "@/lib/mock-orders";

export function StatusBadge({ status }: { status: MockOrder["status"] }) {
  const statusStyles: Record<MockOrder["status"], string> = {
    pending: "bg-amber-50 text-amber-800 border-amber-300",
    confirmed: "bg-sky-50 text-sky-800 border-sky-300",
    shipped: "bg-purple-50 text-purple-800 border-purple-300",
    delivered: "bg-emerald-50 text-emerald-800 border-emerald-300",
    cancelled: "bg-rose-50 text-rose-800 border-rose-300",
  };

  const statusLabels: Record<MockOrder["status"], string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
        statusStyles[status] || "bg-cream text-dark border-blush"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
