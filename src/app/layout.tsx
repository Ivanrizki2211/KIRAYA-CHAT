// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KIRAYA Chat — Create Your Own Story",
    template: "%s | KIRAYA Chat",
  },
  description:
    "KIRAYA Chat — Create Your Own Story. Platform AI Character Chat premium dengan karakter anime 2D, cerita interaktif, voice chat, dan komunitas anime.",
  applicationName: "KIRAYA Chat",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0914",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${notoSansJp.variable} dark`}>
      <body className="min-h-screen bg-[#0B0914] text-white antialiased selection:bg-[#8B5CF6]/35 selection:text-white">
        {children}
      </body>
    </html>
  );
}
