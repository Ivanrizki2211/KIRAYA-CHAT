"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { KirayaShell } from "@/components/navigation/KirayaShell";

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Anime");
  const [shortDescription, setShortDescription] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [personalityPrompt, setPersonalityPrompt] = useState("");
  const [submittedPreview, setSubmittedPreview] = useState<{
    name: string;
    category: string;
    shortDescription: string;
    greetingMessage: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !shortDescription.trim()) return;
    setSubmittedPreview({
      name: name.trim(),
      category,
      shortDescription: shortDescription.trim(),
      greetingMessage:
        greetingMessage.trim() || `Halo, aku ${name.trim()}! Senang bertemu di KIRAYA Chat.`,
    });
  }

  return (
    <KirayaShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Character Creator — KIRAYA Chat</h1>
          <p className="text-xs sm:text-sm text-[#C4B5FD]">Create Your Own Story</p>
        </div>

        <form onSubmit={handleSubmit} className="kiraya-card rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#C4B5FD] mb-1.5">
              Nama Karakter *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Hoshizora Mika"
              className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#0B0914] px-3.5 py-2.5 text-sm text-white focus:border-[#EC4899] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C4B5FD] mb-1.5">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#0B0914] px-3.5 py-2.5 text-sm text-white focus:border-[#EC4899] focus:outline-none"
            >
              <option value="Anime">Anime</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Adventure">Adventure</option>
              <option value="Mystery">Mystery</option>
              <option value="Comedy">Comedy</option>
              <option value="School Life">School Life</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Historical">Historical</option>
              <option value="Original Characters">Original Characters</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C4B5FD] mb-1.5">
              Deskripsi Singkat *
            </label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Ringkasan kepribadian dan peran karakter..."
              className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#0B0914] px-3.5 py-2.5 text-sm text-white focus:border-[#EC4899] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C4B5FD] mb-1.5">
              Pesan Sapaan Awal
            </label>
            <input
              type="text"
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="Kalimat pembuka saat chat dimulai..."
              className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#0B0914] px-3.5 py-2.5 text-sm text-white focus:border-[#EC4899] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C4B5FD] mb-1.5">
              System Personality Prompt
            </label>
            <textarea
              rows={3}
              value={personalityPrompt}
              onChange={(e) => setPersonalityPrompt(e.target.value)}
              placeholder="Instruksi gaya bicara, sifat, dan aturan karakter..."
              className="w-full rounded-xl border border-[#8B5CF6]/35 bg-[#0B0914] px-3.5 py-2.5 text-sm text-white focus:border-[#EC4899] focus:outline-none"
            />
          </div>

          <button type="submit" className="inline-flex items-center gap-2 rounded-xl kiraya-btn-primary px-5 py-2.5 text-xs sm:text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Simpan &amp; Pratinjau Karakter</span>
          </button>
        </form>

        {submittedPreview && (
          <div className="kiraya-card rounded-2xl p-5 border-[#EC4899]/50 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F472B6]">
              <CheckCircle2 className="h-4 w-4" />
              <span>Pratinjau Karakter Siap</span>
            </div>
            <p className="text-base font-bold text-white">{submittedPreview.name}</p>
            <p className="text-xs text-[#C4B5FD]">Kategori: {submittedPreview.category}</p>
            <p className="text-xs text-white/90">{submittedPreview.shortDescription}</p>
            <p className="text-xs italic text-[#C4B5FD]">“{submittedPreview.greetingMessage}”</p>
          </div>
        )}
      </div>
    </KirayaShell>
  );
}
