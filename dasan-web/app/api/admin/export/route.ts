import { list } from "@/lib/db";

export const dynamic = "force-dynamic";

function csv(rows: Record<string, unknown>[], columns: string[]): string {
  const esc = (v: unknown) => {
    let s = v === null || v === undefined ? "" : String(v);
    // Stop spreadsheet apps from treating a cell as a formula.
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [columns.join(","), ...rows.map((r) => columns.map((c) => esc(r[c])).join(","))].join("\r\n");
}

export async function GET(req: Request) {
  const type = new URL(req.url).searchParams.get("type");
  let body: string;
  if (type === "inquiries") {
    body = csv(await list("inquiries"), ["createdAt", "status", "company", "contactName", "phone", "email", "location", "headcount", "workType", "startDate", "message", "memo"]);
  } else if (type === "partners") {
    body = csv(await list("partners"), ["createdAt", "status", "code", "name", "phone", "area", "role", "headcount", "note", "memo"]);
  } else {
    body = csv(await list("applicants"), ["createdAt", "status", "name", "phone", "birthYear", "gender", "hometown", "jobType", "preferredArea", "jobId", "referralCode", "note", "memo"]);
  }
  const name = type === "partners" || type === "inquiries" ? type : "applicants";
  // BOM so Excel opens Vietnamese/Korean text as UTF-8.
  return new Response("\uFEFF" + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dasan-${name}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
