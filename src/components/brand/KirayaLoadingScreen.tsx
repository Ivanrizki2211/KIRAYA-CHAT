// src/components/brand/KirayaLoadingScreen.tsx
import React from "react";
import { KirayaMark } from "./KirayaLogo";

export function KirayaLoadingScreen({
  label = "Menyiapkan dunia KIRAYA Chat...",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0914] px-6 text-center"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-[#8B5CF6]/25 blur-xl animate-pulse" />
        <KirayaMark size={56} className="relative z-10" />
      </div>

      <p className="mt-5 text-lg font-bold tracking-wider text-white">KIRAYA Chat</p>
      <p className="mt-1 text-xs text-[#C4B5FD]">Create Your Own Story</p>

      <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-[#1C1633]">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] animate-bounce" />
      </div>
      <span className="mt-3 text-xs text-[#C4B5FD]/80">{label}</span>
    </div>
  );
}
