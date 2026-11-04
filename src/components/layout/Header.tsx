"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Search,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { SparkleDoodle } from "@/components/ui/decorative-icons";

const CATEGORY_TABS = [
  { name: "ALL", href: "/shop", categoryParam: null },
  { name: "BAGS", href: "/shop?category=bag", categoryParam: "bag" },
  { name: "SHOES", href: "/shop?category=shoe", categoryParam: "shoe" },
  { name: "TOPS", href: "/shop?category=top", categoryParam: "top" },
  { name: "NEW ARRIVALS", href: "/shop?category=new-arrival", categoryParam: "new-arrival" },
  { name: "FAST SELLING", href: "/shop?category=fast-selling", categoryParam: "fast-selling" },
];

function HeaderCategoryBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="hidden md:block border-t border-brand-beige/50 py-2.5 px-4 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide bg-brand-ivory/80">
      <div className="flex items-center justify-center space-x-8 min-w-max">
        {CATEGORY_TABS.map((tab) => {
          const isShopPage = pathname === "/shop";
          const isActive = isShopPage
            ? tab.categoryParam === currentCategory ||
              (tab.categoryParam === null && !currentCategory)
            : false;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.16em] py-1 border-b-2 transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "border-brand-black text-brand-black font-bold"
                  : "border-transparent text-brand-black/70 hover:text-brand-black hover:border-brand-taupe"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CategoryBarFallback() {
  return (
    <div className="hidden md:block border-t border-brand-beige/50 py-2.5 px-4 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide bg-brand-ivory/80">
      <div className="flex items-center justify-center space-x-8 min-w-max">
        {CATEGORY_TABS.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="text-xs font-semibold uppercase tracking-[0.16em] py-1 border-b-2 border-transparent text-brand-black/70"
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const openDrawer = useCartStore((state) => state.openDrawer);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = mounted ? getTotalItems() : 0;

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleScroll = () => {
      if (window.scrollY > 20) setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const initial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "BAGS", href: "/shop?category=bag" },
    { name: "SHOES", href: "/shop?category=shoe" },
    { name: "TOPS", href: "/shop?category=top" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* 1. Announcement Bar — Compact, elegant, cream/black luxury statement */}
      <div className="bg-brand-black text-brand-ivory py-2 px-4 sm:px-8 text-center text-xs tracking-wider font-medium flex items-center justify-center space-x-2 border-b border-brand-black/20">
        <Truck className="w-3.5 h-3.5 text-brand-butter flex-shrink-0" aria-hidden="true" />
        <span className="truncate">
          Same-day doorstep delivery within Lagos · Excluding Sundays
        </span>
      </div>

      {/* 2. Main Storefront Navigation Bar */}
      <div className="bg-brand-ivory/95 backdrop-blur-md border-b border-brand-beige shadow-xs">
        <div className="w-full max-w-7xl mx-auto py-3.5 sm:py-4 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">

          {/* Left: Mobile hamburger menu / Desktop category links */}
          <div className="flex items-center space-x-6 flex-1 md:flex-initial">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-brand-black hover:text-brand-taupe-dark focus:outline-none focus:ring-2 focus:ring-brand-black md:hidden transition-colors"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.18em] transition-colors relative py-1",
                      isActive
                        ? "text-brand-black font-bold"
                        : "text-brand-black/75 hover:text-brand-black"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-black rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Playful Boutique Handwritten Branding */}
          <div className="flex-1 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 font-handwriting text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-brand-black hover:opacity-90 transition-opacity select-none"
            >
              <span>Cloudlette</span>
              <span className="text-2xl text-brand-black inline-block transform -rotate-6">
                ♡
              </span>
            </Link>
          </div>

          {/* Right: Actions Group (Search, Account, Cart) */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-1 md:flex-initial">

            {/* Search Toggle Button */}
            <div className="relative" ref={searchContainerRef}>
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-brand-black hover:bg-brand-beige/50 focus:outline-none focus:ring-2 focus:ring-brand-black transition-colors"
                title="Search collection"
                aria-label="Search collection"
              >
                <Search className="h-5 w-5 stroke-[1.8]" />
              </button>

              {/* Search Dropdown Overlay */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-brand-beige p-3 z-50"
                  >
                    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search bags, shoes, tops..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs text-brand-black outline-none bg-brand-ivory border border-brand-beige/80 rounded-xl focus:border-brand-black transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-black text-brand-ivory hover:bg-brand-black-light rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Find
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Account / Sign In */}
            {mounted && isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-brand-black text-brand-ivory font-bold text-xs flex items-center justify-center hover:bg-brand-black-light focus:outline-none focus:ring-2 focus:ring-brand-black transition-all shadow-xs"
                  title={user.fullName || user.email}
                  aria-label="User account menu"
                >
                  {initial}
                </button>

                {/* Account Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-brand-beige py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-brand-beige/50">
                      <p className="text-xs font-bold text-brand-black truncate">
                        {user.fullName || "Account"}
                      </p>
                      <p className="text-[11px] text-brand-taupe-dark truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-xs font-medium text-brand-black hover:bg-brand-butter/50 transition-colors"
                    >
                      <User className="h-3.5 w-3.5 mr-2 stroke-[1.8]" />
                      Account Settings
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-xs font-medium text-brand-black hover:bg-brand-butter/50 transition-colors"
                    >
                      <Package className="h-3.5 w-3.5 mr-2 stroke-[1.8]" />
                      My Orders
                    </Link>

                    <Link
                      href="/account/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-xs font-medium text-brand-black hover:bg-brand-butter/50 transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5 mr-2 stroke-[1.8]" />
                      Wishlist
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border-t border-brand-beige/40 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-2 stroke-[1.8]" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-full text-brand-black hover:bg-brand-beige/50 focus:outline-none focus:ring-2 focus:ring-brand-black transition-colors"
                title="Sign in to your account"
                aria-label="Sign in"
              >
                <User className="h-5 w-5 stroke-[1.8]" />
              </Link>
            )}

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative p-2 rounded-full text-brand-black hover:bg-brand-beige/50 focus:outline-none focus:ring-2 focus:ring-brand-black transition-colors"
              title="Shopping Cart"
              aria-label={`Shopping Cart, ${totalItems} items`}
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand-butter text-brand-black border border-brand-black text-[10px] font-bold flex items-center justify-center animate-in zoom-in-50">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Secondary Category Bar */}
        <Suspense fallback={<CategoryBarFallback />}>
          <HeaderCategoryBar />
        </Suspense>
      </div>

      {/* 4. Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-black/50 backdrop-blur-xs z-40"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-brand-ivory border-r border-brand-beige p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-brand-beige pb-4">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-handwriting text-3xl font-bold tracking-tight text-brand-black"
                  >
                    Cloudlette ♡
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-brand-black hover:bg-brand-beige/50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Primary Nav Links */}
                <nav className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe-dark px-1">
                    Categories
                  </p>
                  {CATEGORY_TABS.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-[0.16em] text-brand-black hover:bg-brand-butter transition-colors"
                    >
                      {tab.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-2 border-t border-brand-beige/60 space-y-1">
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-black/80 hover:text-brand-black transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-black/80 hover:text-brand-black transition-colors"
                  >
                    Customer Care
                  </Link>
                </div>
              </div>

              {/* User Account Section on Mobile */}
              <div className="pt-6 border-t border-brand-beige space-y-3">
                {mounted && isAuthenticated ? (
                  <>
                    <div className="px-2 pb-1">
                      <p className="text-xs font-bold text-brand-black truncate">
                        {user?.fullName || "Account"}
                      </p>
                      <p className="text-[11px] text-brand-taupe-dark truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-black hover:text-brand-taupe-dark transition-colors"
                    >
                      My Account & Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-black hover:text-brand-taupe-dark transition-colors"
                    >
                      Saved Wishlist
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-full bg-brand-black text-brand-ivory text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-brand-black-light transition-colors"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
