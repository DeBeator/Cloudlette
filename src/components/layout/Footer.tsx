import Link from "next/link";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { SparkleDoodle } from "@/components/ui/decorative-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const pagesLinks = [
    { name: "Shop Collection", href: "/shop" },
    { name: "About Cloudlette", href: "/about" },
    { name: "Contact & Studio", href: "/contact" },
    { name: "Refund & Exchange Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const customerCareLinks = [
    { name: "Frequently Asked Questions", href: "/faq" },
    { name: "Track Your Order", href: "/track-order" },
    { name: "Direct WhatsApp Line", href: "https://wa.me/message/23DKTWB4MIAEE1" },
    { name: "Shipping & Delivery Rates", href: "/faq" },
  ];

  return (
    <footer className="bg-brand-black text-brand-ivory border-t border-brand-black/20 py-16 lg:py-20 w-full mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* 4 Columns desktop layout, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-brand-beige/15">
          
          {/* Col 1: Brand Logo + Tagline + Social Icons (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 font-handwriting text-4xl sm:text-5xl font-bold tracking-tight text-brand-ivory hover:text-brand-butter transition-colors"
            >
              <span>Cloudlette</span>
              <span className="text-2xl text-brand-butter inline-block">♡</span>
            </Link>
            
            <p className="text-brand-ivory/80 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Your daily dose of chic. Handcrafted luxury bags, statement heels, and lovely everyday tops — curated with love in Lagos.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-ivory/10 text-brand-ivory hover:text-brand-butter hover:bg-brand-ivory/20 transition-all flex items-center justify-center"
                aria-label="Follow Cloudlette on Instagram"
              >
                <Instagram className="h-4 w-4 stroke-[1.8]" />
              </a>
              <a
                href="https://www.tiktok.com/@bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-ivory/10 text-brand-ivory hover:text-brand-butter hover:bg-brand-ivory/20 transition-all flex items-center justify-center font-bold text-xs tracking-tighter"
                aria-label="Follow Cloudlette on TikTok"
              >
                TT
              </a>
              <a
                href="https://wa.me/message/23DKTWB4MIAEE1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-ivory/10 text-brand-ivory hover:text-brand-butter hover:bg-brand-ivory/20 transition-all flex items-center justify-center"
                aria-label="Chat with Cloudlette on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 stroke-[1.8]" />
              </a>
            </div>
          </div>

          {/* Col 2: Pages links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-brand-butter tracking-[0.2em] uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              {pagesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-ivory/75 hover:text-brand-butter transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-brand-butter tracking-[0.2em] uppercase">
              Customer Care & Contact
            </h4>
            
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-ivory/75 hover:text-brand-butter transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-brand-ivory/75 hover:text-brand-butter transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-2 text-xs text-brand-ivory/70 font-light border-t border-brand-beige/10">
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-brand-butter flex-shrink-0" />
                <a
                  href="mailto:Hercloudlette@gmail.com"
                  className="hover:text-brand-butter transition-colors truncate"
                >
                  Hercloudlette@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3.5 w-3.5 text-brand-butter flex-shrink-0" />
                <span>Berger, Lagos State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-ivory/50 font-light tracking-wider">
          <p>© {currentYear} Cloudlette. Handcrafted & curated with love.</p>
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <span className="text-brand-butter">♡</span>
            <span>in Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
