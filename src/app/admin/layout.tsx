"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      active: pathname.startsWith("/admin/products"),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      active: pathname.startsWith("/admin/orders"),
    },
    {
      name: "Stock",
      href: "/admin/stock",
      icon: BarChart3,
      active: pathname.startsWith("/admin/stock"),
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream/20">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-dark text-cream px-4 py-3.5 flex items-center justify-between fixed top-0 left-0 right-0 z-40 shadow-md">
        <Link href="/admin" className="font-heading text-xl font-normal text-cream">
          Cloudlette <span className="text-xs text-gold font-sans uppercase font-bold tracking-widest ml-1">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-cream hover:text-gold transition-colors focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-dark/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer content */}
            <motion.div
              initial={shouldReduceMotion ? { x: 0 } : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? { x: 0 } : { x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-72 bg-dark text-cream p-6 flex flex-col justify-between z-50 h-full shadow-2xl"
            >
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-2xl font-normal text-cream"
                  >
                    Cloudlette <span className="text-xs text-gold font-sans uppercase font-bold tracking-widest">Admin</span>
                  </Link>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all rounded-r-xl",
                          item.active
                            ? "text-gold border-l-2 border-gold bg-white/5 font-bold"
                            : "text-cream-light/70 hover:text-cream hover:bg-white/5"
                        )}
                      >
                        <Icon className="h-4 w-4 stroke-[1.8]" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-cream-light/70 hover:text-gold transition-colors py-2 px-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>← Back to Store</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors py-2 px-4 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex w-64 bg-dark text-cream flex-col justify-between p-6 flex-shrink-0 min-h-screen sticky top-0 h-screen border-r border-white/10">
        <div className="space-y-8">
          {/* Logo Branding */}
          <div className="pt-2">
            <Link href="/admin" className="block">
              <span className="font-heading text-2xl font-normal tracking-wide text-cream block">
                Cloudlette
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mt-0.5">
                ADMIN CONSOLE
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-r-xl text-xs uppercase tracking-wider font-semibold transition-all",
                    item.active
                      ? "text-gold border-l-2 border-gold bg-white/5 font-bold shadow-xs"
                      : "text-cream-light/70 hover:text-cream hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4 stroke-[1.8]" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="border-t border-white/10 pt-4 space-y-1 text-xs">
          <Link
            href="/"
            className="flex items-center space-x-2 text-cream-light/70 hover:text-gold transition-colors py-2.5 px-4 rounded-xl hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Back to Store</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors py-2.5 px-4 text-left rounded-xl hover:bg-rose-500/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 md:pt-8 min-w-0 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
