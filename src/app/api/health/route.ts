import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function GET() {
  const dbConfigured = Boolean(process.env.DATABASE_URL);
  const aiConfigured = Boolean(process.env.AI_API_KEY);
  let dbConnected = false;

  const pool = getDbPool();
  if (pool) {
    try {
      await pool.query("SELECT 1");
      dbConnected = true;
    } catch {
      dbConnected = false;
    }
  }

  return NextResponse.json({
    app: "KIRAYA Chat",
    tagline: "Create Your Own Story",
    status: "ok",
    dbConfigured,
    dbConnected,
    aiConfigured,
  });
}
