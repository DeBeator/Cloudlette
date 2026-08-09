import React from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";

export default function RefundPolicyPage() {
  return (
    <FadeInSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="space-y-10">
        {/* Page Heading */}
        <div className="space-y-3 pb-8 border-b border-blush/60">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
            CUSTOMER SERVICE
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-dark">
            Refund & Exchange Policy
          </h1>
          <p className="text-xs text-dark-muted font-light">
            Last updated: August 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-dark text-sm sm:text-base font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              1. Overview
            </h2>
            <p className="text-dark-muted">
              At Cloudlette, we pick pieces we love and want every order to feel worth it. We inspect all items (bags, shoes, and tops) thoroughly before dispatching them. Please review our policies regarding exchanges and returns below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              2. Returns & Eligibility
            </h2>
            <p className="text-dark-muted">
              If you receive a defective, damaged, or incorrect item, please contact us within 48 hours of receiving your delivery or picking up your order.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>Items must be unworn, unused, unwashed, and in the exact condition received.</li>
              <li>Original tags, packaging, and dust bags must be attached and intact.</li>
              <li>Items showing signs of wear, damage from misuse, or altered tags will not be accepted.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              3. Exchanges
            </h2>
            <p className="text-dark-muted">
              We offer size or style exchanges based on item availability. If the item requested for exchange is out of stock, we will issue store credit or arrange a refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              4. Shipping & Pickup Fees for Returns
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-dark-muted pl-2">
              <li>Seller Error / Defect: If the exchange is due to an error on our part (damaged product or wrong item sent), Cloudlette will cover all return shipping costs.</li>
              <li>Customer Preference / Size Change: If the exchange is due to a customer size change or personal preference where the correct ordered item was fulfilled, the customer is responsible for courier/delivery fees.</li>
              <li>Berger Pickup Fee: The ₦1,000 storekeeper fee paid at Berger Park is paid directly to the station storekeeper and is non-refundable once pickup has been completed.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              5. Refund Process
            </h2>
            <p className="text-dark-muted">
              Approved refunds will be processed back via bank transfer or Paystack refund authorization within 3–5 working days of return verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-dark">
              6. How to Request a Return or Exchange
            </h2>
            <p className="text-dark-muted">
              To initiate a return or exchange, reach out to our team with your order reference number and clear photos or videos of the item:
            </p>
            <div className="pt-1 text-dark font-medium space-y-1">
              <p>WhatsApp: <a href="https://wa.me/message/23DKTWB4MIAEE1" target="_blank" rel="noopener noreferrer" className="text-gold-hover hover:underline">Message us on WhatsApp</a></p>
              <p>Email: <a href="mailto:Hercloudlette@gmail.com" className="text-gold-hover hover:underline">Hercloudlette@gmail.com</a></p>
              <p>Phone: <a href="tel:08104408304" className="text-gold-hover hover:underline">08104408304</a></p>
            </div>
          </section>
        </div>
      </div>
    </FadeInSection>
  );
}

