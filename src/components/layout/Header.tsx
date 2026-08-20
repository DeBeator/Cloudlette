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
  MessageCircle,
  Mail,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

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
    <div className="hidden md:block border-t border-gold/20 py-2.5 px-4 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide">
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
                "text-xs font-semibold uppercase tracking-[0.18em] py-1 border-b-2 transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "border-gold text-dark font-bold"
                  : "border-transparent text-dark/70 hover:text-dark hover:border-gold/50"
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
    <div className="hidden md:block border-t border-gold/20 py-2.5 px-4 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-center space-x-8 min-w-max">
        {CATEGORY_TABS.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="text-xs font-semibold uppercase tracking-[0.18em] py-1 border-b-2 border-transparent text-dark/70"
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

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
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
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="w-full relative z-50">
      {/* Row 1 (top bar) — slim, dark background (bg-dark), cream text, py-2 px-8 */}
      <div className="bg-dark text-cream py-2 px-4 sm:px-8 flex items-center justify-between text-xs tracking-wider font-light border-b border-white/5">
        <div className="flex items-center space-x-2 truncate">
          <span>Free delivery within Lagos in 24–48hrs</span>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
          <a
            href="mailto:Hercloudlette@gmail.com"
            className="hidden sm:inline-flex items-center space-x-1.5 hover:text-gold transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Hercloudlette@gmail.com</span>
          </a>
          <a
            href="https://wa.me/message/23DKTWB4MIAEE1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-gold transition-colors"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Contact"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Sticky Navigation Container (Row 2 + Row 3) */}
      <div className="sticky top-0 z-40 bg-cream border-b border-gold/30 shadow-xs">
        {/* Row 2 (main nav) — cream background, py-4 px-8 lg:px-16 */}
        <div className="py-4 px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-dark hover:text-gold focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Left: "Cloudlette" logo text — Playfair Display, bold, large */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link
              href="/"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-dark hover:text-gold transition-colors"
            >
              Cloudlette
            </Link>
          </div>

          {/* Center: nav links — HOME | SHOP | ABOUT | CONTACT (uppercase, tracked, text-sm) */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-colors relative py-1",
                    isActive
                      ? "text-gold font-bold"
                      : "text-dark/90 hover:text-gold"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: search icon + user icon + cart icon with badge */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Icon / Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-dark hover:text-gold transition-colors"
                title="Search"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-[1.75]" />
              </button>

              {/* Inline Search Dropdown Bar */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-blush/60 p-2 z-50"
                  >
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search bags, shoes, tops..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 text-xs text-dark outline-none bg-cream-light/50 rounded-md"
                      />
                      <button
                        type="submit"
                        className="ml-2 px-3 py-2 bg-dark text-cream hover:bg-gold hover:text-dark rounded-md text-xs font-semibold uppercase transition-colors"
                      >
                        Go
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Account Icon */}
            {mounted && isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-dark text-cream font-bold text-xs flex items-center justify-center hover:bg-gold hover:text-dark transition-all focus:outline-none"
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
                className="p-1.5 text-dark hover:text-gold transition-colors relative"
                title="Sign In"
              >
                <User className="h-5 w-5 stroke-[1.75]" />
                <span className="sr-only">Sign In</span>
              </Link>
            )}

            {/* Cart Icon Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="p-1.5 text-dark hover:text-gold transition-colors relative flex items-center"
              title="Shopping Cart"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.75]" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-dark font-extrabold text-[10px] rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>

        {/* Row 3 (category bar) wrapped in Suspense */}
        <Suspense fallback={<CategoryBarFallback />}>
          <HeaderCategoryBar />
        </Suspense>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[110px] z-40 bg-cream border-b border-gold/40 px-6 pt-4 pb-6 space-y-4 shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm uppercase tracking-[0.2em] transition-colors",
                    isActive
                      ? "text-gold font-bold"
                      : "font-semibold text-dark hover:text-gold"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
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
                className={cn(
                  "block py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
                  pathname === "/login" ? "text-gold font-medium" : "text-gold hover:text-gold-hover"
                )}
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
