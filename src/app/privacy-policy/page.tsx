import React from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";

export default function PrivacyPolicyPage() {
  return (
    <FadeInSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="space-y-10">
        {/* Page Heading */}
        <div className="space-y-3 pb-8 border-b border-blush/60">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            LEGAL
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-dark">
            Privacy Policy
          </h1>
          <p className="text-xs text-dark-muted font-light">
            Last updated: August 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-dark text-sm sm:text-base font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              1. Introduction
            </h2>
            <p className="text-dark-muted">
              At Cloudlette (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, purchase our products (bags, shoes, and tops), or interact with our customer service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              2. Information We Collect
            </h2>
            <p className="text-dark-muted">
              We collect information that you provide directly to us when placing an order or communicating with us:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>Contact details: Full name, phone number, and email address.</li>
              <li>Delivery details: Physical street address, city, state, and country.</li>
              <li>Order details: Products selected, order history, and fulfillment preference (Home Delivery or Berger Pickup).</li>
              <li>Communication records: Messages sent via our contact form, email, or WhatsApp.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              3. Payment Processing
            </h2>
            <p className="text-dark-muted">
              All payment transactions on Cloudlette are securely processed by Paystack. We do not store, process, or hold your credit or debit card numbers, PINs, or sensitive banking credentials on our servers. Paystack handles payment authorization under strict PCI-DSS compliance standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              4. How We Use Your Information
            </h2>
            <p className="text-dark-muted">
              We use your information solely to provide and improve our services, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>Processing, verifying, and dispatching your orders.</li>
              <li>Communicating order status updates and delivery tracking info.</li>
              <li>Responding to customer service inquiries or support requests.</li>
              <li>Fulfilling legal and regulatory requirements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              5. Shipping & Logistics Partners
            </h2>
            <p className="text-dark-muted">
              To deliver your packages safely across Lagos, nationwide within Nigeria, or internationally to Ghana, Benin Republic, Cotonou, and Abidjan, we share your necessary contact and address details with our vetted courier and dispatch partners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              6. Data Protection & Contact
            </h2>
            <p className="text-dark-muted">
              We implement appropriate technical and organizational measures to safeguard your personal data. You have the right to request updates to or deletion of your personal details at any time. For privacy inquiries, please contact us at:
            </p>
            <div className="pt-1 text-dark font-medium space-y-1">
              <p>Email: <a href="mailto:Hercloudlette@gmail.com" className="text-gold-hover hover:underline">Hercloudlette@gmail.com</a></p>
              <p>Phone: <a href="tel:08104408304" className="text-gold-hover hover:underline">08104408304</a></p>
              <p>Location: Berger, Lagos</p>
            </div>
          </section>
        </div>
      </div>
    </FadeInSection>
  );
}

