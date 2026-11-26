// src/components/characters/KirayaCharacterCard.tsx
import React from "react";
import Link from "next/link";
import { MessageSquare, Heart, Sparkles } from "lucide-react";

export interface KirayaCharacterItem {
  id: string;
  name: string;
  shortDescription: string;
  avatarUrl: string;
  category: string;
  tags: string[];
  conversationCount: number;
  favoriteCount: number;
}

export function KirayaCharacterCard({ character }: { character: KirayaCharacterItem }) {
  return (
    <article className="kiraya-card rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        <Link href={`/characters/${character.id}`} className="block relative aspect-[4/5] overflow-hidden bg-[#0B0914]">
          <img
            src={character.avatarUrl}
            alt={`${character.name} — KIRAYA Chat`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#0B0914]/85 border border-[#8B5CF6]/45 px-2.5 py-1 text-[11px] font-medium text-[#C4B5FD]">
            <Sparkles className="h-3 w-3 text-[#F472B6]" />
            {character.category}
          </span>
        </Link>

        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/characters/${character.id}`}
              className="font-bold text-base text-white hover:text-[#F472B6] truncate"
            >
              {character.name}
            </Link>
            <span className="inline-flex items-center gap-1 text-xs text-[#C4B5FD]">
              <Heart className="h-3.5 w-3.5 text-[#EC4899]" />
              {character.favoriteCount.toLocaleString("id-ID")}
            </span>
          </div>

          <p className="mt-1.5 text-xs text-[#C4B5FD]/85 line-clamp-2 leading-relaxed">
            {character.shortDescription}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {character.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#0B0914] border border-[#8B5CF6]/30 px-2 py-0.5 text-[10px] font-medium text-[#C4B5FD]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-[#8B5CF6]/15">
        <span className="text-[11px] text-[#C4B5FD]/75">
          {character.conversationCount.toLocaleString("id-ID")} Chat
        </span>
        <Link
          href={`/chat/new?characterId=${character.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl kiraya-btn-primary px-3 py-2 text-xs"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Chat Sekarang</span>
        </Link>
      </div>
    </article>
  );
                                  }
            
