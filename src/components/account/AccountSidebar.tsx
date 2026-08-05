"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Package, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = mounted && user?.fullName ? user.fullName : "Customer";

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    {
      name: "My Orders",
      href: "/orders",
      icon: Package,
      active: pathname.startsWith("/orders"),
    },
    {
      name: "Account Details",
      href: "/account",
      icon: User,
      active: pathname === "/account",
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Greeting Block */}
      <div className="bg-white rounded-2xl p-5 border border-blush/60 shadow-xs">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-hover">
          WELCOME BACK
        </p>
        <h2 className="font-heading text-xl font-normal text-dark truncate mt-0.5">
          Hello, {displayName}
        </h2>
      </div>

      {/* Desktop Navigation Sidebar */}
      <div className="hidden md:block bg-white rounded-2xl p-3 border border-blush/60 shadow-xs space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all",
                item.active
                  ? "bg-gold text-dark font-bold shadow-xs"
                  : "text-dark-muted hover:bg-cream-light hover:text-dark"
              )}
            >
              <Icon className="h-4 w-4 stroke-[1.8]" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-rose-600 hover:bg-rose-50 transition-all text-left mt-2 border-t border-blush/30"
        >
          <LogOut className="h-4 w-4 stroke-[1.8]" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Mobile Top Tabs (Visible on screens < 768px) */}
      <div className="md:hidden flex rounded-2xl bg-white p-1.5 border border-blush/60 shadow-xs space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
              item.active
                ? "bg-gold text-dark shadow-xs"
                : "text-dark-muted hover:text-dark"
            )}
          >
            {item.name}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
