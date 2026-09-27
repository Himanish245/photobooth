import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Little Photobooth ♡",
  description:
    "A dreamy luxury photobooth experience — strawberry patisserie, lily garden, and Parisian romance.",
  keywords: ["photobooth", "romantic", "luxury", "coquette"],
  openGraph: {
    title: "Our Little Photobooth ♡",
    description: "A dreamy corner just for us",
    type: "website",
  },
};

import FloatingDecor from "@/components/hero/FloatingDecor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancing.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">
        <FloatingDecor />
        {children}
        {/* Subtle grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
