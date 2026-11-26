// src/app/library/page.tsx
import { KirayaShell } from "@/components/navigation/KirayaShell";

export default function LibraryPage() {
  return (
    <KirayaShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <h1 className="text-xl sm:text-2xl font-bold">Library — KIRAYA Chat</h1>
        <p className="mt-1 text-xs sm:text-sm text-[#C4B5FD]">
          Koleksi karakter favorit, karakter buatanmu, dan riwayat cerita di KIRAYA Chat.
        </p>
      </div>
    </KirayaShell>
  );
}
