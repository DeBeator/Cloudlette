import type { Metadata } from "next";
import { fontHeading, fontSans } from "@/lib/fonts";
import { ToastProvider } from "@/components/ui/toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthInitializer } from "@/components/layout/AuthInitializer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloudlette — Fashion Storefront",
  description:
    "Effortless elegance and everyday style. Explore bags, shoes, and tops from Cloudlette.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontSans.variable}`}>
      <body className="flex flex-col min-h-screen bg-cream text-dark antialiased font-sans">
        <ToastProvider>
          <AuthInitializer />
          <ConditionalLayout>{children}</ConditionalLayout>
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
