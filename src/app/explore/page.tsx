"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { KirayaShell } from "@/components/navigation/KirayaShell";
import { KirayaCharacterCard, type KirayaCharacterItem } from "@/components/characters/KirayaCharacterCard";

const ALL_CHARACTERS: KirayaCharacterItem[] = [
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

const CATEGORIES = [
  "Semua",
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

function ExploreContent() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const initialCategory = params.get("category") ?? "Semua";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : "Semua"
  );

  const filtered = useMemo(() => {
    return ALL_CHARACTERS.filter((c) => {
      const matchCategory = selectedCategory === "Semua" || c.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Jelajahi Karakter KIRAYA Chat</h1>
        <p className="text-xs sm:text-sm text-[#C4B5FD]">Create Your Own Story</p>
      </div>

      <div className="relative">
        <Search className="h-4 w-4 text-[#8B5CF6] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama karakter, deskripsi, atau tag..."
          className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#1C1633] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#C4B5FD]/60 focus:border-[#EC4899] focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition ${
              selectedCategory === cat
                ? "kiraya-btn-primary border-transparent"
                : "border-[#8B5CF6]/35 bg-[#1C1633] text-[#C4B5FD] hover:border-[#EC4899]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="kiraya-card rounded-2xl p-8 text-center text-sm text-[#C4B5FD]">
          Tidak ada karakter yang cocok dengan filter saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <KirayaCharacterCard key={item.id} character={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <KirayaShell>
      <Suspense fallback={<div className="p-6 text-sm text-[#C4B5FD]">Memuat karakter...</div>}>
        <ExploreContent />
      </Suspense>
    </KirayaShell>
  );
                                 }
          
