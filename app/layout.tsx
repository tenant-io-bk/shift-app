import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHIFT — NYC Hyperlocal Labor",
  description: "Same-day shifts for NYC workers and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${interTight.variable} ${geistMono.variable}`}>
      <body style={{ fontFamily: "var(--sans)", background: "var(--paper-2)", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
