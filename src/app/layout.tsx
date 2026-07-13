import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

// Condensed, uppercase display face for headings (matches the reference logo /
// headline treatment); humanist sans for body copy.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AREEN Investment — Smart Investment, Strong Future",
  description:
    "AREEN Investment is a leading real estate development company delivering high-quality projects and sustainable returns for investors and partners.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-ink text-fg antialiased">{children}</body>
    </html>
  );
}
