"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRequireAuth } from "@/lib/withAuth";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { FadeInSection } from "@/components/animations/FadeInSection";
import {
  ShoppingBag,
  MapPin,
  Truck,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Lock,
  Check,
  CreditCard,
  User,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

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

  // Re-enable auth guard (Step 5)
  const { isAuthenticated, isLoading: authLoading, user } = useRequireAuth();

  const { items, getTotalPrice } = useCartStore();
  const { showToast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Multi-step state: 1: Contact, 2: Delivery, 3: Review & Payment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Holding message notice state when clicking Place Order
  const [holdingNoticeOpen, setHoldingNoticeOpen] = useState(false);

  // Step 1: Contact Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2: Delivery Fields
  const [deliveryType, setDeliveryType] = useState<"home" | "pickup">("home");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("Lagos");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      if (user.fullName && !fullName) setFullName(user.fullName);
      if (user.email && !email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user, fullName, email, phone]);

  // Shipping Fee Calculation
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

  // Validate Step 1
  const validateStep1 = (): boolean => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

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

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 4: Handle Place Order — Holding message (do NOT create fake order or navigate)
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setHoldingNoticeOpen(true);
    showToast(
      "Launching Soon",
      "We're launching soon — orders will be live shortly."
    );
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
        <div className="bg-white rounded-2xl p-10 sm:p-14 border border-blush/60 shadow-xs space-y-6 max-w-md mx-auto">
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
            className="w-full rounded-full bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider py-3.5 shadow-sm transition-colors"
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
      <div className="mb-6 space-y-2 text-left">
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

      {/* Progress Indicator (Step 1 → Step 2 → Step 3) */}
      <div className="mb-8 max-w-2xl bg-cream/40 p-4 rounded-2xl border border-blush/40">
        <div className="flex items-center justify-between">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex items-center space-x-2.5 text-left focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 1
                  ? "bg-dark text-cream ring-2 ring-gold/40"
                  : currentStep > 1
                  ? "bg-gold text-dark"
                  : "bg-white text-dark/40 border border-blush/60"
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-dark-muted block">
                Step 1
              </span>
              <span className={`text-xs font-bold ${currentStep === 1 ? "text-dark" : "text-dark-muted"}`}>
                Contact
              </span>
            </div>
          </button>

          {/* Line 1-2 */}
          <div
            className={`flex-1 h-0.5 mx-3 sm:mx-4 transition-colors ${
              currentStep > 1 ? "bg-gold" : "bg-blush/60"
            }`}
          />

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => {
              if (validateStep1()) setCurrentStep(2);
            }}
            className="flex items-center space-x-2.5 text-left focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2
                  ? "bg-dark text-cream ring-2 ring-gold/40"
                  : currentStep > 2
                  ? "bg-gold text-dark"
                  : "bg-white text-dark/40 border border-blush/60"
              }`}
            >
              {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-dark-muted block">
                Step 2
              </span>
              <span className={`text-xs font-bold ${currentStep === 2 ? "text-dark" : "text-dark-muted"}`}>
                Delivery
              </span>
            </div>
          </button>

          {/* Line 2-3 */}
          <div
            className={`flex-1 h-0.5 mx-3 sm:mx-4 transition-colors ${
              currentStep > 2 ? "bg-gold" : "bg-blush/60"
            }`}
          />

          {/* Step 3 Pill */}
          <button
            type="button"
            onClick={() => {
              if (validateStep1() && validateStep2()) setCurrentStep(3);
            }}
            className="flex items-center space-x-2.5 text-left focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3
                  ? "bg-dark text-cream ring-2 ring-gold/40"
                  : "bg-white text-dark/40 border border-blush/60"
              }`}
            >
              3
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-dark-muted block">
                Step 3
              </span>
              <span className={`text-xs font-bold ${currentStep === 3 ? "text-dark" : "text-dark-muted"}`}>
                Review & Pay
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Accordion for Order Summary */}
      <div className="lg:hidden mb-6 bg-cream/40 border border-blush/60 rounded-xl overflow-hidden shadow-xs">
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
          <span className="text-sm font-bold text-dark font-mono">
            {formatPrice(grandTotal)}
          </span>
        </button>

        {mobileSummaryOpen && (
          <div className="p-4 border-t border-blush/60 bg-white space-y-4">
            <div className="divide-y divide-blush/40 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex space-x-3 items-center">
                  <div className="relative w-12 h-12 bg-cream-light rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-dark truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-dark-muted">
                      {item.color} {item.size ? `• ${item.size}` : ""} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-2 border-t border-blush/40 text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Shipping ({deliveryType === "home" ? "Delivery" : "Pickup"})</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-dark font-bold text-sm pt-2 border-t border-blush/30">
                <span>Total</span>
                <span className="text-dark font-mono">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: CONTACT */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6"
            >
              <div className="flex items-center space-x-3 border-b border-blush/40 pb-4">
                <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark">
                    Contact Information
                  </h2>
                  <p className="text-xs text-dark-muted font-light">
                    Where we&apos;ll send your invoice, receipt, and shipping updates.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Blossom Debby"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    className={`rounded-lg py-2.5 text-xs ${errors.fullName ? "border-rose-500 ring-rose-200" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. blossom@cloudlette.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`rounded-lg py-2.5 text-xs ${errors.email ? "border-rose-500 ring-rose-200" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                    Phone Number (WhatsApp Delivery Alerts) <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    className={`rounded-lg py-2.5 text-xs ${errors.phone ? "border-rose-500 ring-rose-200" : ""}`}
                  />
                  {errors.phone ? (
                    <p className="text-xs text-rose-500">{errors.phone}</p>
                  ) : (
                    <p className="text-[11px] text-dark-muted font-light">
                      Dispatch riders in Lagos and nationwide call/WhatsApp before delivery.
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation button */}
              <div className="pt-4 border-t border-blush/40 flex justify-end">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="rounded-full px-8 py-3 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DELIVERY */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6"
            >
              <div className="flex items-center space-x-3 border-b border-blush/40 pb-4">
                <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark">
                    Delivery Method & Address
                  </h2>
                  <p className="text-xs text-dark-muted font-light">
                    Select how you want to receive your luxury package.
                  </p>
                </div>
              </div>

              {/* Delivery Type Radio Box */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType("home")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    deliveryType === "home"
                      ? "border-gold bg-gold/10 ring-2 ring-gold/30"
                      : "border-blush/70 bg-cream/20 hover:border-gold/50"
                  }`}
                >
                  <Truck className="w-5 h-5 text-gold mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider text-dark">
                    Home Delivery
                  </p>
                  <p className="text-[11px] text-dark-muted font-light mt-0.5">
                    Doorstep courier delivery
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    deliveryType === "pickup"
                      ? "border-gold bg-gold/10 ring-2 ring-gold/30"
                      : "border-blush/70 bg-cream/20 hover:border-gold/50"
                  }`}
                >
                  <MapPin className="w-5 h-5 text-gold mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider text-dark">
                    In-Store Pickup
                  </p>
                  <p className="text-[11px] text-dark-muted font-light mt-0.5">
                    Lagos Showroom pickup
                  </p>
                </button>
              </div>

              {/* Shipping Method Display / Rate Card */}
              <div className="bg-cream/40 p-4 rounded-xl border border-blush/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-dark">
                  <span>
                    {deliveryType === "home"
                      ? selectedState.toLowerCase().includes("lagos")
                        ? "Lagos Express Courier"
                        : "Nationwide Interstate Shipping"
                      : "Lagos Showroom Pickup Handling"}
                  </span>
                  <span className="font-mono text-gold-hover font-semibold">
                    {formatPrice(shippingFee)}
                  </span>
                </div>
                <p className="text-[11px] text-dark-muted font-light">
                  {deliveryType === "home"
                    ? selectedState.toLowerCase().includes("lagos")
                      ? "Delivered within 24–48 hours across Lagos Island & Mainland."
                      : "Delivered within 3–5 business days via verified national courier."
                    : "Ready for pickup within 24 hours at Victoria Island, Lagos."}
                </p>
              </div>

              {/* Address Fields for Home Delivery */}
              {deliveryType === "home" ? (
                <div className="space-y-4">
                  {/* Street Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                      Street Address <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. 14 Adeola Odeku Street, Victoria Island"
                      value={streetAddress}
                      onChange={(e) => {
                        setStreetAddress(e.target.value);
                        if (errors.streetAddress)
                          setErrors((prev) => ({ ...prev, streetAddress: "" }));
                      }}
                      className={`rounded-lg py-2.5 text-xs ${
                        errors.streetAddress ? "border-rose-500 ring-rose-200" : ""
                      }`}
                    />
                    {errors.streetAddress && (
                      <p className="text-xs text-rose-500">{errors.streetAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                        City / Area <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        placeholder="e.g. Victoria Island / Ikeja"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                        }}
                        className={`rounded-lg py-2.5 text-xs ${
                          errors.city ? "border-rose-500 ring-rose-200" : ""
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-500">{errors.city}</p>
                      )}
                    </div>

                    {/* State Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                        State <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full bg-white border border-blush/70 rounded-lg py-2.5 px-3 text-xs text-dark outline-none focus:border-gold cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark block">
                      Delivery Instructions (Optional)
                    </label>
                    <Input
                      placeholder="e.g. Leave with security, call when outside..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="rounded-lg py-2.5 text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-cream/40 p-4 rounded-xl border border-blush/50 text-xs text-dark space-y-1">
                  <p className="font-bold text-dark">Lagos Showroom Pickup Point:</p>
                  <p className="text-dark-muted">
                    Cloudlette Luxury Lounge, 24 Bishop Oluwole Street, Victoria Island, Lagos.
                  </p>
                  <p className="text-[11px] text-dark-muted font-light pt-1">
                    Opening Hours: Monday – Saturday, 10:00 AM – 7:00 PM.
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-blush/40 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevStep}
                  className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-dark-muted hover:text-dark inline-flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span>Back to Contact</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="rounded-full px-8 py-3 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-2"
                >
                  <span>Review & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: REVIEW & PAYMENT */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-blush/60 shadow-xs space-y-6"
            >
              <div className="flex items-center space-x-3 border-b border-blush/40 pb-4">
                <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-dark">
                    Review Order & Payment
                  </h2>
                  <p className="text-xs text-dark-muted font-light">
                    Confirm your delivery information and payment details before completing.
                  </p>
                </div>
              </div>

              {/* Review Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Review */}
                <div className="bg-cream/30 p-4 rounded-xl border border-blush/40 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      Contact Details
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-[11px] font-semibold text-dark-muted hover:text-gold underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs font-bold text-dark">{fullName}</p>
                  <p className="text-xs text-dark-muted font-light">{email}</p>
                  <p className="text-xs text-dark-muted font-light">{phone}</p>
                </div>

                {/* Delivery Review */}
                <div className="bg-cream/30 p-4 rounded-xl border border-blush/40 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      Delivery Option
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[11px] font-semibold text-dark-muted hover:text-gold underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs font-bold text-dark capitalize">
                    {deliveryType === "home" ? "Home Delivery" : "In-Store Pickup"}
                  </p>
                  {deliveryType === "home" ? (
                    <p className="text-xs text-dark-muted font-light">
                      {streetAddress}, {city}, {selectedState}
                    </p>
                  ) : (
                    <p className="text-xs text-dark-muted font-light">
                      Victoria Island Showroom, Lagos
                    </p>
                  )}
                  <p className="text-xs text-gold-hover font-medium pt-1">
                    Shipping: {formatPrice(shippingFee)}
                  </p>
                </div>
              </div>

              {/* Payment Section / Placeholder */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark block">
                  Payment Method
                </h3>
                <div className="bg-cream/20 p-5 rounded-2xl border border-blush/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <CreditCard className="w-5 h-5 text-gold" />
                      <span className="text-xs font-bold text-dark uppercase tracking-wider">
                        Paystack Secure Payment Gateway
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Secured
                    </span>
                  </div>
                  <p className="text-xs text-dark-muted font-light leading-relaxed">
                    Accepts Nigerian Debit & Credit Cards (Mastercard, Visa, Verve), Bank Transfers, and USSD.
                  </p>
                  <div className="flex items-center space-x-2 text-[11px] text-dark-muted pt-1">
                    <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>256-Bit SSL Encrypted Transactions</span>
                  </div>
                </div>
              </div>

              {/* Holding Notice Box when submit clicked */}
              {holdingNoticeOpen && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                    <Info className="w-4 h-4 flex-shrink-0 text-amber-700" />
                    <span>Store Notice</span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium">
                    We&apos;re launching soon — orders will be live shortly.
                  </p>
                  <p className="text-[11px] text-amber-800/80 font-light">
                    Follow us on Instagram or WhatsApp to receive the launch announcement.
                  </p>
                </div>
              )}

              {/* Navigation & Submit CTA */}
              <div className="pt-4 border-t border-blush/40 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevStep}
                  className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-dark-muted hover:text-dark inline-flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span>Back to Delivery</span>
                </Button>

                {/* Final Step Button: Shows holding message on click */}
                <Button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="rounded-full px-8 py-3.5 bg-dark text-cream hover:bg-gold hover:text-dark font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order — Pay {formatPrice(grandTotal)}</span>
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Desktop Sticky Order Summary (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-blush/60 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-blush/40 pb-4">
              <h2 className="font-heading text-xl font-bold text-dark">
                Order Summary
              </h2>
              <span className="text-xs font-semibold text-dark-muted">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Item list */}
            <div className="divide-y divide-blush/30 max-h-80 overflow-y-auto pr-1 no-scrollbar space-y-3">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex space-x-3 items-center">
                  <div className="relative w-14 h-14 bg-cream-light rounded-lg overflow-hidden border border-blush/40 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-xs font-semibold text-dark truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-dark-muted">
                      {item.color} {item.size ? `• ${item.size}` : ""} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-dark font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-blush/40 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Shipping ({deliveryType === "home" ? "Courier" : "Pickup"})</span>
                <span className="font-semibold text-dark">{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-dark font-bold text-base pt-3 border-t border-blush/30">
                <span>Total Due</span>
                <span className="text-dark font-mono">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-cream/40 p-3 rounded-xl border border-blush/30 flex items-center space-x-2 text-[11px] text-dark-muted">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Complimentary insured shipping across Nigeria</span>
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
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
