// src/components/navigation/KirayaShell.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MessageSquare,
  Sparkles,
  BookMarked,
  User,
  BookOpen,
  Users,
  Shield,
} from "lucide-react";
import { KirayaLogo } from "../brand/KirayaLogo";

const PRIMARY_NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/chat", label: "Chats", icon: MessageSquare },
  { href: "/create", label: "Create", icon: Sparkles },
  { href: "/library", label: "Library", icon: BookMarked },
  { href: "/profile", label: "Profile", icon: User },
];

const SECONDARY_NAV = [
  { href: "/stories", label: "Story Mode", icon: BookOpen },
  { href: "/community", label: "Community", icon: Users },
  { href: "/admin", label: "Admin", icon: Shield },
];

export function KirayaShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0B0914] text-white flex flex-col">
      <header className="sticky top-0 z-30 h-16 border-b border-[#8B5CF6]/25 bg-[#0B0914]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between">
        <Link href="/home" aria-label="KIRAYA Chat Home">
          <KirayaLogo variant="horizontal" size={30} />
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href="/create"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl kiraya-btn-primary px-3.5 py-2 text-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Buat Karakter</span>
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-[#8B5CF6]/40 bg-[#1C1633] px-3.5 py-2 text-xs font-semibold text-[#C4B5FD] hover:border-[#EC4899] hover:text-white transition"
          >
            Masuk
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:flex md:w-64 md:flex-col md:justify-between border-r border-[#8B5CF6]/20 bg-[#141024] p-4">
          <nav aria-label="Navigasi utama KIRAYA Chat" className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#8B5CF6]/20 text-white border border-[#8B5CF6]/55"
                      : "text-[#C4B5FD]/80 hover:bg-[#1C1633] hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-[#EC4899]" : "text-[#8B5CF6]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="my-3 border-t border-[#8B5CF6]/15 pt-3 space-y-1">
              {SECONDARY_NAV.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#EC4899]/20 text-white border border-[#EC4899]/55"
                        : "text-[#C4B5FD]/75 hover:bg-[#1C1633] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-[#F472B6]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="rounded-xl border border-[#8B5CF6]/25 bg-[#1C1633] p-3 text-xs text-[#C4B5FD]">
            <p className="font-semibold text-white">KIRAYA Chat</p>
            <p className="mt-0.5 text-[11px] text-[#C4B5FD]/80">Create Your Own Story</p>
          </div>
        </aside>

        <main className="flex-1 pb-20 md:pb-8">{children}</main>
      </div>

      <nav
        aria-label="Navigasi mobile KIRAYA Chat"
        className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-[#8B5CF6]/25 bg-[#0B0914]/95 backdrop-blur-md px-2 py-1.5 grid grid-cols-6 gap-1"
      >
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-lg py-1 text-[10px] font-medium ${
                active ? "text-[#EC4899]" : "text-[#C4B5FD]/75"
              }`}
            >
              <Icon className="h-4 w-4 mb-0.5" />
              <span className="truncate max-w-full">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
                    }
                  
