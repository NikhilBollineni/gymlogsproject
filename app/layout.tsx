import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fitness App - Transform Your Journey",
  description: "Track workouts, join crews, and build streaks with the ultimate fitness community app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <div className="bg-noise" />
        <div className="ambient-mesh" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
