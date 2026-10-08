import { NextResponse } from "next/server";
import { put } from "@/lib/db";
import { jobFromBody } from "@/lib/jobs";

export async function POST(req: Request) {
  const body = ((await req.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const job = jobFromBody(body);
  if (!job) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await put("jobs", job);
  return NextResponse.json(job);
}
