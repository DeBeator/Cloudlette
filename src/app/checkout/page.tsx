"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/mock-data";
import { FadeInSection } from "@/components/animations/FadeInSection";
import {
  ShoppingBag,
  MapPin,
  Truck,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

// TODO: wire real Nigerian states list from backend or static config if preferred
const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

function CheckoutForm() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const authLoading = false;
  const isAuthenticated = true;

  const { items, getTotalPrice } = useCartStore();
  const { showToast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [deliveryType, setDeliveryType] = useState<"home" | "pickup">("home");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("Lagos");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-fill user data when user is loaded
  useEffect(() => {
    if (user) {
      if (user.fullName && !fullName) setFullName(user.fullName);
      if (user.email && !email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user, fullName, email, phone]);

  // Shipping Fee Calculation
  // TODO: replace hardcoded shipping fee with GET /api/shipping/rate?location=
  const shippingFee = useMemo(() => {
    if (deliveryType === "pickup") {
      return 1000;
    }
    if (selectedState.toLowerCase().includes("lagos")) {
      return 3500;
    }
    return 5000;
  }, [deliveryType, selectedState]);

  const subtotal = useMemo(() => {
    return mounted ? getTotalPrice() : 0;
  }, [mounted, getTotalPrice, items]);

  const grandTotal = subtotal + shippingFee;

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    const cleanedPhone = phone.trim().replace(/[\s-]/g, "");
    if (!cleanedPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^0\d{10}$/.test(cleanedPhone)) {
      newErrors.phone = "Enter a valid 11-digit Nigerian phone (e.g. 08012345678).";
    }

    if (deliveryType === "home") {
      if (!streetAddress.trim()) {
        newErrors.streetAddress = "Street address is required for home delivery.";
      }
      if (!city.trim()) {
        newErrors.city = "City is required.";
      }
      if (!selectedState) {
        newErrors.state = "Please select a state.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: POST /api/orders → receive Paystack authorization_url → redirect user to Paystack hosted page

    showToast(
      "Order Placed!",
      "Redirecting to order confirmation..."
    );

    const typeParam = deliveryType === "home" ? "delivery" : "pickup";
    router.push(`/order-confirmation?type=${typeParam}&shipping=${shippingFee}`);
  };

  if (authLoading || !mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-dark-muted font-medium">Securing checkout session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <FadeInSection className="w-full px-4 sm:px-8 lg:px-16 py-20 text-center">
        <div className="bg-white rounded-none p-10 sm:p-14 border border-blush/60 shadow-xs space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-cream-light border border-blush/60 flex items-center justify-center mx-auto text-dark-muted">
            <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-dark">
              Your Cart is Empty
            </h1>
            <p className="text-dark-muted text-xs font-light leading-relaxed">
              Your cart is empty. Pick a few pieces you like to get started.
            </p>
          </div>
          <Button
            asChild
            className="w-full rounded-none bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider py-3.5 shadow-sm transition-colors"
          >
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-14">
      {/* Top Header */}
      <div className="mb-8 space-y-2 text-left">
        <Link
          href="/cart"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-dark-muted hover:text-gold transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back to Cart
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold block">
          CHECKOUT
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
          Order Checkout
        </h1>
      </div>

      {/* Mobile Accordion for Order Summary */}
      <div className="lg:hidden mb-6 bg-cream/40 border border-blush/60 rounded-none overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
        >
          <div className="flex items-center space-x-2 text-xs font-semibold text-dark uppercase tracking-wider">
            <ShoppingBag className="h-4 w-4 text-gold" />
            <span>
              {mobileSummaryOpen ? "Hide order summary" : "Show order summary"}
            </span>
            {mobileSummaryOpen ? (
              <ChevronUp className="h-4 w-4 text-dark-muted" />
            ) : (
              <ChevronDown className="h-4 w-4 text-dark-muted" />
            )}
          </div>
          <span className="font-bold text-sm text-dark font-mono">
            {formatPrice(grandTotal)}
          </span>
        </button>

        {mobileSummaryOpen && (
          <div className="p-4 border-t border-blush/40 bg-white space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 text-xs">
                  <div className="relative w-12 h-14 bg-cream-light rounded-none overflow-hidden flex-shrink-0 border border-blush/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark truncate">{item.name}</p>
                    <p className="text-[11px] text-dark-muted">
                      {item.color} {item.size ? `• Size ${item.size}` : ""} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-blush/40 pt-3 text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Shipping ({deliveryType === "pickup" ? "Pickup" : "Home Delivery"})</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-dark pt-2 border-t border-blush/40">
                <span>Total</span>
                <span className="text-dark font-mono">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Full-Width Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column (~60%): 3-Section Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* SECTION 1 — CONTACT */}
            <div className="bg-white rounded-none p-6 sm:p-8 border border-blush/60 shadow-xs space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-blush/40">
                <span className="w-6 h-6 rounded-none bg-dark text-cream font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark text-left">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Amara Okafor"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    className={`bg-white border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm ${
                      errors.fullName ? "border-rose-500" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`bg-white border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm ${
                      errors.email ? "border-rose-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`bg-white border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm ${
                      errors.phone ? "border-rose-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2 — DELIVERY */}
            <div className="bg-white rounded-none p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-blush/40">
                <span className="w-6 h-6 rounded-none bg-dark text-cream font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark text-left">
                  Delivery Option
                </h2>
              </div>

              {/* Delivery Type Toggle Pills */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType("home")}
                  className={`p-4 rounded-none border text-left transition-all flex flex-col justify-between space-y-2 ${
                    deliveryType === "home"
                      ? "border-gold bg-cream-light/60 ring-1 ring-gold"
                      : "border-blush/60 hover:border-gold/50 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck className="h-5 w-5 text-gold" />
                    <span
                      className={`w-4 h-4 border flex items-center justify-center ${
                        deliveryType === "home"
                          ? "border-gold bg-gold"
                          : "border-blush"
                      }`}
                    >
                      {deliveryType === "home" && (
                        <span className="w-1.5 h-1.5 bg-dark" />
                      )}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark">
                      Home Delivery
                    </p>
                    <p className="text-[11px] text-dark-muted font-light mt-0.5">
                      {selectedState.toLowerCase().includes("lagos")
                        ? "Delivery within 24–48 hours"
                        : "3–5 working days after dispatch"}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`p-4 rounded-none border text-left transition-all flex flex-col justify-between space-y-2 ${
                    deliveryType === "pickup"
                      ? "border-gold bg-cream-light/60 ring-1 ring-gold"
                      : "border-blush/60 hover:border-gold/50 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <MapPin className="h-5 w-5 text-gold" />
                    <span
                      className={`w-4 h-4 border flex items-center justify-center ${
                        deliveryType === "pickup"
                          ? "border-gold bg-gold"
                          : "border-blush"
                      }`}
                    >
                      {deliveryType === "pickup" && (
                        <span className="w-1.5 h-1.5 bg-dark" />
                      )}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark">
                      Pickup (Berger Park)
                    </p>
                    <p className="text-[11px] text-dark-muted font-light mt-0.5">
                      Pick up at Berger Park, Lagos — ₦1,000 flat
                    </p>
                  </div>
                </button>
              </div>

              {/* Shipping Fee Display Notice */}
              <div className="text-xs font-semibold text-dark flex items-center justify-between bg-cream/30 p-3 border border-blush/40">
                <span className="text-dark-muted">Shipping Fee:</span>
                <span className="text-dark font-bold font-mono">
                  {deliveryType === "pickup"
                    ? "₦1,000 flat fee"
                    : selectedState
                    ? formatPrice(shippingFee)
                    : "Calculating..."}
                </span>
              </div>

              {/* Address Fields */}
              {deliveryType === "pickup" ? (
                <div className="p-4 bg-gold/10 border border-gold/30 space-y-1.5 text-left">
                  <div className="flex items-center space-x-2 text-xs font-bold text-dark uppercase tracking-wider">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>Pickup Location</span>
                  </div>
                  <p className="text-xs text-dark-muted leading-relaxed">
                    Pick up at Berger Park, Lagos — ₦1,000 to the storekeeper. We&apos;ll notify you when your order is ready.
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-4 pt-1"
                  >
                    {/* Street Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                        Street Address <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        type="text"
                        required={deliveryType === "home"}
                        placeholder="House / Flat No., Street Name, Landmark"
                        value={streetAddress}
                        onChange={(e) => {
                          setStreetAddress(e.target.value);
                          if (errors.streetAddress)
                            setErrors({ ...errors, streetAddress: "" });
                        }}
                        className={`bg-white border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm ${
                          errors.streetAddress ? "border-rose-500" : ""
                        }`}
                      />
                      {errors.streetAddress && (
                        <p className="text-[11px] font-medium text-rose-600 mt-1">
                          {errors.streetAddress}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                          City / Town <span className="text-rose-500">*</span>
                        </label>
                        <Input
                          type="text"
                          required={deliveryType === "home"}
                          placeholder="e.g. Ikeja or Lekki"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) setErrors({ ...errors, city: "" });
                          }}
                          className={`bg-white border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm ${
                            errors.city ? "border-rose-500" : ""
                          }`}
                        />
                        {errors.city && (
                          <p className="text-[11px] font-medium text-rose-600 mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* State Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                          State <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="w-full bg-white border border-blush/60 focus:border-gold rounded-none py-3 px-4 text-sm text-dark outline-none cursor-pointer"
                        >
                          {NIGERIAN_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-dark block text-left">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any delivery instructions or security gate details..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full bg-white border border-blush/60 focus:border-gold rounded-none p-3 text-sm text-dark outline-none resize-none"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* SECTION 3 — PAYMENT */}
            <div className="bg-white rounded-none p-6 sm:p-8 border border-blush/60 shadow-xs space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-blush/40">
                <span className="w-6 h-6 rounded-none bg-dark text-cream font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark text-left">
                  Payment Method
                </h2>
              </div>

              {/* Paystack Banner */}
              <div className="p-5 bg-cream-light rounded-none border border-blush/60 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs font-bold text-dark uppercase tracking-wider">
                      Paystack Secure Gateway
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-none bg-dark text-gold tracking-widest uppercase">
                      VISA
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-none bg-rose-900 text-cream tracking-widest uppercase">
                      MC
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-none bg-emerald-900 text-cream tracking-widest uppercase">
                      VERVE
                    </span>
                  </div>
                </div>

                <p className="text-xs text-dark-muted leading-relaxed font-light">
                  Secure payment powered by Paystack. You will be redirected to Paystack’s encrypted payment checkout page to safely pay using your debit card, bank transfer, or USSD.
                </p>
              </div>

              {/* Submit Button — Full-width dark background, cream text */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-dark text-cream hover:bg-gold hover:text-dark transition-colors duration-300 font-semibold text-sm sm:text-base uppercase tracking-wider py-4 rounded-none shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Lock className="h-4 w-4 stroke-[2]" />
                  <span>Place Order — Pay {formatPrice(grandTotal)}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column (~40%): Sticky Order Summary */}
        <div className="lg:col-span-5 hidden lg:block sticky top-28">
          <div className="bg-white rounded-none p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-blush/40 pb-4">
              <h2 className="font-heading text-2xl font-bold text-dark">
                Order Summary
              </h2>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-hover">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Item List */}
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-14 h-16 bg-cream-light rounded-none overflow-hidden flex-shrink-0 border border-blush/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-heading text-sm font-semibold text-dark truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-dark-muted">
                      {item.color} {item.size ? `• Size ${item.size}` : ""}
                    </p>
                    <p className="text-[11px] text-dark-muted font-mono">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-sm text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 border-t border-blush/40 pt-4 text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>
                  Shipping Fee ({deliveryType === "pickup" ? "Pickup" : "Home Delivery"})
                </span>
                <span className="font-semibold text-dark">{formatPrice(shippingFee)}</span>
              </div>

              {/* Total Line */}
              <div className="flex justify-between items-baseline border-t border-blush/60 pt-4 text-sm">
                <span className="font-bold text-dark uppercase tracking-wider">
                  Total
                </span>
                <span className="font-heading text-2xl font-bold text-dark font-mono">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Reassurance Note */}
            <div className="pt-2 border-t border-blush/30 text-[11px] text-dark-muted/80 text-center leading-relaxed">
              You only pay when you hit confirm on the next page.
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-dark-muted font-medium">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
