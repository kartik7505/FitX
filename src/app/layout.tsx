import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import Navigation from "@/components/ui/navigation";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({ 
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power Bulk — 60 Tablets | Shakti House",
  description: "BUILD • FUEL • GROW. The 60-tablet dietary supplement designed for strength and consistency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-canvas text-ivory selection:bg-gold/30 selection:text-ivory" suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
