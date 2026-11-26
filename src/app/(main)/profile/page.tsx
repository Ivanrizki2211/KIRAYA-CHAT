// src/app/profile/page.tsx
import { KirayaShell } from "@/components/navigation/KirayaShell";

export default function ProfilePage() {
  return (
    <KirayaShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <h1 className="text-xl sm:text-2xl font-bold">Profil Pengguna — KIRAYA Chat</h1>
        <p className="mt-1 text-xs sm:text-sm text-[#C4B5FD]">
          Pengaturan akun, preferensi AI, memori, dan voice chat KIRAYA Chat.
        </p>
      </div>
    </KirayaShell>
  );
}
