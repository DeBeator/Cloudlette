"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, X, LogOut, Package } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDrawer = useCartStore((state) => state.openDrawer);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = mounted ? getTotalItems() : 0;

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
  };

  const initial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-blush/40",
        scrolled
          ? "bg-cream backdrop-blur-none py-4 shadow-sm"
          : "bg-cream/80 backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-dark hover:text-gold hover:bg-blush/20 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link
              href="/"
              className="font-heading text-xl sm:text-2xl font-normal tracking-wide text-dark hover:text-gold transition-colors"
            >
              Cloudlette
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-dark/90 hover:text-gold transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons (Cart & Account) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {mounted && isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gold text-dark font-bold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-gold/50 transition-all focus:outline-none"
                  title={user.fullName || user.email}
                >
                  {initial}
                </button>

                {/* Account Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-blush/60 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-blush/30">
                      <p className="text-xs font-semibold text-dark truncate">
                        {user.fullName || "Account"}
                      </p>
                      <p className="text-[11px] text-dark-muted truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-xs text-dark hover:bg-cream-light hover:text-gold transition-colors"
                    >
                      <Package className="h-3.5 w-3.5 mr-2 stroke-[1.5]" />
                      My Orders
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-2 stroke-[1.5]" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-1.5 text-dark/90 hover:text-gold transition-colors relative"
                title="Sign In"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5]" />
                <span className="sr-only">Sign In</span>
              </Link>
            )}

            {/* Cart Icon Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="p-1.5 text-dark/90 hover:text-gold transition-colors relative flex items-center"
              title="Shopping Cart"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5]" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-dark font-extrabold text-[10px] rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blush/40 bg-cream/98 px-6 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.2em] text-dark hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {mounted && isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 hover:text-rose-700 transition-colors w-full text-left"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-hover transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
