import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-full bg-blush/30 text-gold mb-2">
          <Mail className="h-8 w-8 text-dark" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-dark">Contact Us</h1>
        <p className="text-dark-muted leading-relaxed">
          Have questions or need styling assistance? Reach out to our customer support team via email or WhatsApp.
        </p>
        <div className="pt-6">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
