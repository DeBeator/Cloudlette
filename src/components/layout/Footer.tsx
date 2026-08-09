import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-dark text-cream border-t border-dark-light/40 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-cream/10">
          {/* Brand Blurb */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-normal tracking-wide text-white">
              Cloudlette
            </h3>
            <p className="text-cream/70 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              We pick pieces we actually love. Bags, shoes, tops — for women who know what they want.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-medium text-white tracking-widest uppercase">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Connect */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-medium text-white tracking-widest uppercase">
              Find Us
            </h4>
            <p className="text-cream/70 text-xs sm:text-sm font-light leading-relaxed">
              Follow our daily style releases and reach out directly on WhatsApp.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.instagram.com/bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-cream/5 text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 stroke-[1.5]" />
              </a>
              <a
                href="https://www.tiktok.com/@bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/5 text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors flex items-center justify-center font-bold text-xs tracking-tighter"
                aria-label="TikTok"
              >
                TT
              </a>
              <a
                href="https://wa.me/message/23DKTWB4MIAEE1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-cream/5 text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4 stroke-[1.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="pt-8 text-center text-xs text-cream/40 font-light tracking-wider">
          <p>© {currentYear} Cloudlette. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
