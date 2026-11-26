"use client";

import React, { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Square, Sparkles } from "lucide-react";
import { KirayaShell } from "@/components/navigation/KirayaShell";

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function ChatInterfaceContent() {
  const params = useSearchParams();
  const characterName = params.get("character") || "Hoshizora Mika";

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "greeting-1",
      role: "assistant",
      content: `Halo! Aku ${characterName} di KIRAYA Chat. Cerita apa yang ingin kita mulai hari ini?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;

    setNotice(null);
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: "user", content: text };
    const assistantId = `a-${Date.now()}`;
    const assistantMsg: ChatMsg = { id: assistantId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterName, content: text }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const msg =
          errJson.message ||
          "Layanan AI belum dikonfigurasi. Isi AI_API_KEY di Environment Variables Vercel untuk mengaktifkan balasan AI.";
        setNotice(msg);
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        setIsStreaming(false);
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.delta) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + parsed.delta } : m
                )
              );
            }
          } catch {
            // Abaikan chunk parsial
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setNotice("Terjadi gangguan koneksi saat mengirim pesan.");
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
    setIsStreaming(false);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="kiraya-card rounded-2xl p-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.svg"
            alt={characterName}
            className="h-10 w-10 rounded-xl border border-[#8B5CF6]/40 bg-[#0B0914]"
          />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white">{characterName}</h1>
            <p className="text-[11px] text-[#C4B5FD]">KIRAYA Chat • Create Your Own Story</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#0B0914] border border-[#8B5CF6]/35 px-3 py-1 text-[11px] text-[#F472B6]">
          <Sparkles className="h-3 w-3" />
          AI Chat
        </span>
      </div>

      {notice && (
        <div className="mb-3 rounded-xl border border-[#EC4899]/50 bg-[#1C1633] px-4 py-3 text-xs text-[#C4B5FD]">
          {notice}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "kiraya-btn-primary rounded-br-sm"
                  : "kiraya-card rounded-bl-sm text-white"
              }`}
            >
              {msg.content || (isStreaming ? "..." : "")}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Kirim pesan ke ${characterName}...`}
          disabled={isStreaming}
          className="flex-1 rounded-xl border border-[#8B5CF6]/35 bg-[#1C1633] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-[#C4B5FD]/60 focus:border-[#EC4899] focus:outline-none disabled:opacity-60"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={handleStop}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#EC4899] bg-[#1C1633] px-4 py-3 text-xs font-semibold text-white"
          >
            <Square className="h-4 w-4 text-[#EC4899]" />
            <span>Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex items-center gap-1.5 rounded-xl kiraya-btn-primary px-4 py-3 text-xs sm:text-sm disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span>Kirim</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default function ChatPage() {
  return (
    <KirayaShell>
      <Suspense fallback={<div className="p-6 text-sm text-[#C4B5FD]">Memuat ruang chat...</div>}>
        <ChatInterfaceContent />
      </Suspense>
    </KirayaShell>
  );
}
