import { NextResponse } from "next/server";
import { list, newId, newPartnerCode, put } from "@/lib/db";
import type { Partner } from "@/lib/types";
import { int, phone, str } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (str(body.website, 100)) return NextResponse.json({ ok: true, code: newPartnerCode() });

  const name = str(body.name, 80);
  const tel = phone(body.phone);
  const area = str(body.area, 120);
  const headcount = int(body.headcount, 1, 10000);
  if (!name || !tel || !area || headcount === null || body.consent !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const taken = new Set((await list("partners")).map((p) => p.code));
  let code = newPartnerCode();
  while (taken.has(code)) code = newPartnerCode();

  const partner: Partner = {
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "new",
    code,
    name,
    phone: tel,
    area,
    role: str(body.role, 40),
    headcount,
    note: str(body.note, 500),
    memo: "",
  };
  await put("partners", partner);
  return NextResponse.json({ ok: true, code });
}
