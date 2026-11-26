// src/app/api/chat/stream/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildCharacterPrompt } from "@/lib/ai/chat-orchestrator";

const StreamRequestSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(4000),
});

export async function POST(req: NextRequest) {
  const parsed = StreamRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload tidak valid", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!process.env.AI_API_KEY) {
    return NextResponse.json(
      {
        error: "AI_PROVIDER_NOT_CONFIGURED",
        message:
          "API key AI belum dikonfigurasi di server. Silakan isi AI_API_KEY pada konfigurasi environment/admin.",
      },
      { status: 503 }
    );
  }

  const payload = buildCharacterPrompt({
    character: {
      name: "KIRAYA Character",
      speaking_style: "",
      background_story: "",
      world_setting: "",
      system_personality_prompt: "Kamu adalah karakter AI di platform KIRAYA Chat.",
      conversation_behavior: "",
    },
    memories: [],
    rollingSummary: "",
    recentMessages: [{ sender_type: "user", content: parsed.data.content }],
  });

  const upstream = await fetch(
    `${process.env.AI_BASE_URL ?? "https://api.openai.com/v1"}/chat/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
        stream: true,
        messages: [{ role: "system", content: payload.systemPrompt }, ...payload.historyMessages],
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Gagal terhubung ke provider AI" }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      let fullReply = "";
      const reader = upstream.body!.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ done: true, fullReply })}\n\n`)
              );
              continue;
            }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content ?? "";
              if (delta) {
                fullReply += delta;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
              }
            } catch {
              // Abaikan frame parsial
            }
          }
        }
      } catch {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream terputus" })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
