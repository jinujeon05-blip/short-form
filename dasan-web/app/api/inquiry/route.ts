import { NextResponse } from "next/server";
import { newId, put } from "@/lib/db";
import type { Inquiry } from "@/lib/types";
import { anyPhone, int, oneOf, str } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (str(body.website, 100)) return NextResponse.json({ ok: true });

  const company = str(body.company, 120);
  const contactName = str(body.contactName, 80);
  const phone = anyPhone(body.phone);
  const headcount = int(body.headcount, 1, 100000);
  if (!company || !contactName || !phone || headcount === null || body.consent !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const inquiry: Inquiry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "new",
    company,
    contactName,
    phone,
    email: str(body.email, 120),
    location: str(body.location, 120),
    headcount,
    workType: oneOf(body.workType, ["general", "seasonal", "fulltime", "sorting", "other"] as const, "general"),
    startDate: str(body.startDate, 40),
    message: str(body.message, 1500),
    memo: "",
  };
  await put("inquiries", inquiry);
  return NextResponse.json({ ok: true });
}
