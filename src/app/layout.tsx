import type { Metadata } from "next";
import { caveat, fontSans } from "@/lib/fonts";
import { ToastProvider } from "@/components/ui/toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthInitializer } from "@/components/layout/AuthInitializer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloudlette — Your daily dose of chic | Bags, Shoes & Cute Tops",
  description:
    "Cute finds, lovely details and everyday favourites. Shop handcrafted luxury bags, statement footwear, and tailored tops at Cloudlette.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${fontSans.variable} font-sans`}
    >
      <body className="flex flex-col min-h-screen bg-brand-ivory text-brand-black antialiased font-sans selection:bg-brand-butter selection:text-brand-black">
        <ToastProvider>
          <AuthInitializer />
          <ConditionalLayout>{children}</ConditionalLayout>
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
