"use client";

import { useState } from "react";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: wire to email provider when backend is live
    showToast(
      "Message received — we'll get back to you shortly"
    );

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column — Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-hover block">
              CONTACT US
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-normal text-dark">
              Get in touch
            </h1>
            <p className="text-dark-muted text-sm sm:text-base font-light leading-relaxed">
              We&apos;re pretty responsive. Reach out on WhatsApp for the fastest reply.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center text-gold flex-shrink-0">
                <Phone className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                  Phone
                </p>
                <a
                  href="tel:08104408304"
                  className="text-sm font-medium text-dark hover:text-gold transition-colors"
                >
                  08104408304
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center text-gold flex-shrink-0">
                <Mail className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                  Email
                </p>
                <a
                  href="mailto:Hercloudlette@gmail.com"
                  className="text-sm font-medium text-dark hover:text-gold transition-colors"
                >
                  Hercloudlette@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-cream-light border border-blush/60 flex items-center justify-center text-gold flex-shrink-0">
                <MapPin className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                  Location
                </p>
                <p className="text-sm font-medium text-dark">Berger, Lagos</p>
              </div>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="pt-4 border-t border-blush/40 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
              Connect with us
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white border border-blush/60 text-xs font-medium text-dark hover:border-gold hover:text-gold-hover transition-all duration-200 shadow-2xs"
              >
                <Instagram className="h-3.5 w-3.5 stroke-[1.5] text-gold" />
                <span>Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@bycloudlette"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white border border-blush/60 text-xs font-medium text-dark hover:border-gold hover:text-gold-hover transition-all duration-200 shadow-2xs"
              >
                <span>TikTok</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/message/23DKTWB4MIAEE1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white border border-blush/60 text-xs font-medium text-dark hover:border-gold hover:text-gold-hover transition-all duration-200 shadow-2xs"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column — Simple Form (Stubbed) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-blush/60 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-normal text-dark">
                Send a Message
              </h2>
              <p className="text-xs text-dark-muted font-light">
                Fill out the form below and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-blush/60 focus:border-gold rounded-xl py-3 px-4 text-sm"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark block">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-blush/60 focus:border-gold rounded-xl p-4 text-sm text-dark outline-none resize-none"
                />
              </div>
            </div>

            {/* TODO: wire to email provider when backend is live */}
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gold hover:bg-gold-hover text-dark font-semibold text-xs uppercase tracking-wider py-4 px-8 shadow-md transition-all duration-300"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </FadeInSection>
  );
}

