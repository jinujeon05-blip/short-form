import { NextResponse } from "next/server";
import { get, newId, put } from "@/lib/db";
import type { Applicant } from "@/lib/types";
import { int, oneOf, phone, str } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  // Honeypot: real visitors never see or fill this field.
  if (str(body.website, 100)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const tel = phone(body.phone);
  const thisYear = new Date().getFullYear();
  const birthYear = int(body.birthYear, thisYear - 70, thisYear - 15);
  if (!name || !tel || birthYear === null || body.consent !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const jobIdRaw = str(body.jobId, 40);
  const job = jobIdRaw ? await get("jobs", jobIdRaw) : null;

  const applicant: Applicant = {
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "new",
    name,
    phone: tel,
    birthYear,
    gender: oneOf(body.gender, ["male", "female", "other"] as const, "other"),
    hometown: str(body.hometown, 120),
    jobType: oneOf(body.jobType, ["general", "seasonal", "fulltime", "any"] as const, "any"),
    jobId: job ? job.id : null,
    referralCode: str(body.referralCode, 12).toUpperCase(),
    note: str(body.note, 500),
    memo: "",
  };
  await put("applicants", applicant);
  return NextResponse.json({ ok: true });
}
