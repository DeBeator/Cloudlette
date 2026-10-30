import { Baloo_2, Manrope } from "next/font/google";

export const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

export const baloo = baloo2;
export const fontHeading = baloo2;

export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
