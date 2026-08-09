import React from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";

export default function TermsPage() {
  return (
    <FadeInSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="space-y-10">
        {/* Page Heading */}
        <div className="space-y-3 pb-8 border-b border-blush/60">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            LEGAL
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-dark">
            Terms & Conditions
          </h1>
          <p className="text-xs text-dark-muted font-light">
            Last updated: August 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-dark text-sm sm:text-base font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              1. Agreement to Terms
            </h2>
            <p className="text-dark-muted">
              By accessing or purchasing from Cloudlette (&quot;the Store&quot;), you agree to be bound by these Terms and Conditions. Please read them carefully before completing any order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              2. Products & Pricing
            </h2>
            <p className="text-dark-muted">
              Cloudlette carries bags, shoes, and tops for women. We make every effort to display product colors, materials, and sizes as accurately as possible.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>All prices are stated in Nigerian Naira (₦).</li>
              <li>We reserve the right to modify prices or discontinue items without prior notice.</li>
              <li>In the rare event that an item is out of stock after order confirmation, we will notify you immediately to offer a replacement or full refund.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              3. Orders & Payment
            </h2>
            <p className="text-dark-muted">
              All orders placed on Cloudlette are processed upon receipt of payment confirmation through Paystack. By confirming your purchase, you agree that all contact and delivery information provided is accurate and complete.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              4. Delivery & Pickup Terms
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>Home Delivery Lagos: Deliveries within Lagos are typically completed within 24–48 hours (excluding Sundays).</li>
              <li>Interstate Shipping: Deliveries outside Lagos within Nigeria take 3–5 working days after dispatch.</li>
              <li>International Deliveries: We ship to Ghana, Benin Republic, Cotonou, and Abidjan. Delivery timelines vary by destination country.</li>
              <li>Pickup at Berger Park: Customers choosing station pickup pay ₦1,000 directly to the storekeeper upon collection.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              5. Intellectual Property
            </h2>
            <p className="text-dark-muted">
              All content on this site — including text, logos, graphics, photography, and software — is the property of Cloudlette and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              6. Governing Law & Contact
            </h2>
            <p className="text-dark-muted">
              These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. If you have any questions regarding these Terms & Conditions, please contact us:
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

