import Link from "next/link";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const pagesLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const customerCareLinks = [
    { name: "FAQ", href: "/contact" },
    { name: "Track Order", href: "/account" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-dark text-cream border-t border-dark-light/40 py-16 lg:py-20 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        {/* 4 Columns desktop layout, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12">
          {/* Col 1: Brand Logo + Tagline + Social Icons */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
              Cloudlette
            </h3>
            <p className="text-cream/70 text-xs sm:text-sm leading-relaxed font-light">
              We pick pieces we actually love. Bags, shoes, tops — for women who know what they want.
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

          {/* Col 2: Pages links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              {pagesLinks.map((link) => (
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

          {/* Col 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              {customerCareLinks.map((link) => (
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

          {/* Col 4: Get in Touch */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white tracking-widest uppercase">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-light text-cream/70">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <a href="mailto:Hercloudlette@gmail.com" className="hover:text-gold transition-colors truncate">
                  Hercloudlette@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-gold flex-shrink-0" />
                <a
                  href="https://wa.me/message/23DKTWB4MIAEE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: full-width dark divider line */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 font-light tracking-wider">
          <p>© {currentYear} Cloudlette. All rights reserved.</p>
          <p>Made with ♥ in Lagos</p>
        </div>
      </div>
    </footer>
  );
}
