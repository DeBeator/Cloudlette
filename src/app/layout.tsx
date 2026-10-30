import type { Metadata } from "next";
import { baloo2, fontSans } from "@/lib/fonts";
import { ToastProvider } from "@/components/ui/toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthInitializer } from "@/components/layout/AuthInitializer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloudlette — Bags, Shoes & Tops",
  description:
    "Your daily dosage of chic. Bags, shoes, heels & cute tops — shop Cloudlette.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo2.variable} ${fontSans.variable}`}>
      <body className="flex flex-col min-h-screen bg-off-white text-dark antialiased font-sans">
        <ToastProvider>
          <AuthInitializer />
          <ConditionalLayout>{children}</ConditionalLayout>
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
