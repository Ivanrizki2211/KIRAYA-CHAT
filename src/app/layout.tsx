import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "KIRAYA CHAT", description: "AI character chat" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
