import { newId } from "./db";
import type { Job } from "./types";
import { int, str } from "./validate";

// Builds a job from an admin form body; `existing` keeps id/createdAt on edit.
export function jobFromBody(body: Record<string, unknown>, existing?: Job): Job | null {
  const title = (body.title ?? {}) as Record<string, unknown>;
  const description = (body.description ?? {}) as Record<string, unknown>;
  const job: Job = {
    id: existing?.id ?? newId(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    open: typeof body.open === "boolean" ? body.open : (existing?.open ?? true),
    title: { vi: str(title.vi, 120), ko: str(title.ko, 120) },
    company: str(body.company, 120),
    location: str(body.location, 120),
    salary: str(body.salary, 120),
    shift: str(body.shift, 120),
    headcount: int(body.headcount, 1, 10000) ?? 1,
    description: { vi: str(description.vi, 3000), ko: str(description.ko, 3000) },
  };
  if (!job.title.vi) return null;
  if (!job.title.ko) job.title.ko = job.title.vi;
  return job;
}
