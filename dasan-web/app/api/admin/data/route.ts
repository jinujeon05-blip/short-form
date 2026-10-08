import { NextResponse } from "next/server";
import { list, storageConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [jobs, applicants, partners, inquiries] = await Promise.all([
    list("jobs"),
    list("applicants"),
    list("partners"),
    list("inquiries"),
  ]);
  return NextResponse.json({ jobs, applicants, partners, inquiries, storageConfigured });
}
