"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

type Props = { t: Dict["form"]; jobs: { id: string; title: string }[]; initialJob: string; initialRef: string };

export default function ApplyForm({ t, jobs, initialJob, initialRef }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("consent")) return setState("invalid");
    setState("sending");
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(f), consent: true }),
    }).catch(() => null);
    setState(res?.ok ? "ok" : res?.status === 400 ? "invalid" : "error");
  }

  if (state === "ok") return <p className="alert ok">{t.successApply}</p>;
  const year = new Date().getFullYear();

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="row2">
        <div className="field">
          <label htmlFor="name">{t.name} <span className="req">*</span></label>
          <input id="name" name="name" required maxLength={80} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">{t.phone} <span className="req">*</span></label>
          <input id="phone" name="phone" required type="tel" inputMode="tel" placeholder="09xx xxx xxx" autoComplete="tel" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="birthYear">{t.birthYear} <span className="req">*</span></label>
          <input id="birthYear" name="birthYear" required type="number" inputMode="numeric" min={year - 70} max={year - 15} placeholder="2000" />
        </div>
        <div className="field">
          <label htmlFor="gender">{t.gender}</label>
          <select id="gender" name="gender" defaultValue="female">
            {(Object.keys(t.genders) as (keyof typeof t.genders)[]).map((g) => <option key={g} value={g}>{t.genders[g]}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="hometown">{t.hometown}</label>
        <input id="hometown" name="hometown" maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="preferredArea">{t.preferredArea}</label>
        <select id="preferredArea" name="preferredArea" defaultValue="any">
          {(Object.keys(t.preferredAreas) as (keyof typeof t.preferredAreas)[]).map((k) => <option key={k} value={k}>{t.preferredAreas[k]}</option>)}
        </select>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="jobType">{t.jobType}</label>
          <select id="jobType" name="jobType" defaultValue="any">
            {(Object.keys(t.jobTypes) as (keyof typeof t.jobTypes)[]).map((k) => <option key={k} value={k}>{t.jobTypes[k]}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="jobId">{t.job}</label>
          <select id="jobId" name="jobId" defaultValue={jobs.some((j) => j.id === initialJob) ? initialJob : ""}>
            <option value="">—</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="referralCode">{t.referral}</label>
        <input id="referralCode" name="referralCode" maxLength={12} defaultValue={initialRef} placeholder="DS…" style={{ textTransform: "uppercase" }} />
      </div>
      <div className="field">
        <label htmlFor="note">{t.note}</label>
        <textarea id="note" name="note" rows={3} maxLength={500} />
      </div>
      <div className="hp" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{t.consent}</span>
      </label>
      {state === "invalid" && <p className="alert err">{t.required}</p>}
      {state === "error" && <p className="alert err">{t.error}</p>}
      <button className="btn btn-red" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
