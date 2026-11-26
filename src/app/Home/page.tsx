// src/app/home/page.tsx
import Link from "next/link";
import { Search } from "lucide-react";
import { KirayaShell } from "@/components/navigation/KirayaShell";
import { KirayaCharacterCard, type KirayaCharacterItem } from "@/components/characters/KirayaCharacterCard";

const CATEGORIES = [
  "Anime",
  "Fantasy",
  "Romance",
  "Adventure",
  "Mystery",
  "Comedy",
  "School Life",
  "Sci-Fi",
  "Historical",
  "Original Characters",
];

const SAMPLE_CHARACTERS: KirayaCharacterItem[] = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    name: "Hoshizora Mika",
    shortDescription: "Penjaga kuil senja & klub sastra yang lembut, ceria, dan penuh cerita.",
    avatarUrl: "/favicon.svg",
    category: "Romance",
    tags: ["hangat", "sastra", "senja"],
    conversationCount: 12500,
    favoriteCount: 3420,
  },
];

export default function HomePage() {
  return (
    <KirayaShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Selamat datang di KIRAYA Chat</h1>
            <p className="text-xs sm:text-sm text-[#C4B5FD]">Create Your Own Story</p>
          </div>

          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-xl border border-[#8B5CF6]/35 bg-[#1C1633] px-3.5 py-2.5 text-xs sm:text-sm text-[#C4B5FD] hover:border-[#EC4899] transition w-full sm:w-72"
          >
            <Search className="h-4 w-4 text-[#8B5CF6]" />
            <span>Cari karakter di KIRAYA Chat...</span>
          </Link>
        </div>

        <section className="kiraya-card rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#1C1633] via-[#281b49] to-[#1C1633]">
          <h2 className="text-xl sm:text-3xl font-bold">
            Temukan Karakter Favoritmu &amp; Mulai Cerita
          </h2>
          <p className="mt-2 max-w-xl text-xs sm:text-sm text-[#C4B5FD]/90">
            Jelajahi berbagai kategori karakter anime, lanjutkan percakapan, atau rancang karaktermu sendiri di KIRAYA Chat.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/explore" className="rounded-xl kiraya-btn-primary px-4 py-2.5 text-xs sm:text-sm">
              Mulai Jelajah
            </Link>
            <Link
              href="/create"
              className="rounded-xl border border-[#8B5CF6]/45 bg-[#0B0914]/70 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:border-[#F472B6] transition"
            >
              Buat Karakter
            </Link>
          </div>
        </section>

        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Kategori</h3>
            <Link href="/explore" className="text-xs text-[#F472B6] hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/explore?category=${encodeURIComponent(cat)}`}
                className="shrink-0 rounded-full border border-[#8B5CF6]/35 bg-[#1C1633] px-3.5 py-1.5 text-xs font-medium text-[#C4B5FD] hover:border-[#EC4899] hover:text-white transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white">Karakter Populer</h3>
            <Link href="/explore?sort=popular" className="text-xs text-[#F472B6] hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_CHARACTERS.map((charItem) => (
              <KirayaCharacterCard key={charItem.id} character={charItem} />
            ))}
          </div>
        </section>
      </div>
    </KirayaShell>
  );
}
