import { NextResponse } from "next/server";
import { get, put, remove } from "@/lib/db";
import { APPLICANT_STATUSES, INQUIRY_STATUSES, PARTNER_STATUSES } from "@/lib/types";
import { int, oneOf, str } from "@/lib/validate";
import { jobFromBody } from "@/lib/jobs";

type Params = { params: Promise<{ collection: string; id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { collection, id } = await params;
  const body = ((await req.json().catch(() => null)) ?? {}) as Record<string, unknown>;

  if (collection === "applicants") {
    const row = await get("applicants", id);
    if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if ("status" in body) row.status = oneOf(body.status, APPLICANT_STATUSES, row.status);
    if ("memo" in body) row.memo = str(body.memo, 1000);
    await put("applicants", row);
    return NextResponse.json(row);
  }

  if (collection === "partners") {
    const row = await get("partners", id);
    if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if ("status" in body) row.status = oneOf(body.status, PARTNER_STATUSES, row.status);
    if ("memo" in body) row.memo = str(body.memo, 1000);
    if ("headcount" in body) row.headcount = int(body.headcount, 1, 10000) ?? row.headcount;
    await put("partners", row);
    return NextResponse.json(row);
  }

  if (collection === "inquiries") {
    const row = await get("inquiries", id);
    if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if ("status" in body) row.status = oneOf(body.status, INQUIRY_STATUSES, row.status);
    if ("memo" in body) row.memo = str(body.memo, 1000);
    await put("inquiries", row);
    return NextResponse.json(row);
  }

  if (collection === "jobs") {
    const row = await get("jobs", id);
    if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const updated = jobFromBody(body, row);
    if (!updated) return NextResponse.json({ error: "invalid" }, { status: 400 });
    await put("jobs", updated);
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "not_found" }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { collection, id } = await params;
  if (collection !== "applicants" && collection !== "partners" && collection !== "jobs" && collection !== "inquiries") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  await remove(collection, id);
  return NextResponse.json({ ok: true });
}
