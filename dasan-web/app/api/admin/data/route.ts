import { NextResponse } from "next/server";
import { list, storageConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [jobs, applicants, partners] = await Promise.all([list("jobs"), list("applicants"), list("partners")]);
  return NextResponse.json({ jobs, applicants, partners, storageConfigured });
}
