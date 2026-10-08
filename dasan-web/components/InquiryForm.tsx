"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

export default function InquiryForm({ t, defaultWorkType = "general" }: { t: Dict["form"]; defaultWorkType?: keyof Dict["form"]["workTypes"] }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("consent")) return setState("invalid");
    setState("sending");
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(f), consent: true }),
    }).catch(() => null);
    setState(res?.ok ? "ok" : res?.status === 400 ? "invalid" : "error");
  }

  if (state === "ok") return <p className="alert ok">{t.successBiz}</p>;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row2">
        <div className="field">
          <label htmlFor="company">{t.company} <span className="req">*</span></label>
          <input id="company" name="company" required maxLength={120} autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="contactName">{t.contactName} <span className="req">*</span></label>
          <input id="contactName" name="contactName" required maxLength={80} autoComplete="name" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="phone">{t.bizPhone} <span className="req">*</span></label>
          <input id="phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+82 10… / 09…" />
        </div>
        <div className="field">
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" maxLength={120} autoComplete="email" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="location">{t.location}</label>
          <input id="location" name="location" maxLength={120} placeholder="Bắc Ninh, Thái Nguyên, Hải Phòng, Vĩnh Phúc…" />
        </div>
        <div className="field">
          <label htmlFor="headcount">{t.needHeadcount} <span className="req">*</span></label>
          <input id="headcount" name="headcount" required type="number" inputMode="numeric" min={1} max={100000} placeholder="30" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="workType">{t.workType}</label>
          <select id="workType" name="workType" defaultValue={defaultWorkType}>
            {(Object.keys(t.workTypes) as (keyof typeof t.workTypes)[]).map((k) => <option key={k} value={k}>{t.workTypes[k]}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="startDate">{t.startDate}</label>
          <input id="startDate" name="startDate" maxLength={40} placeholder="2026-11" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" rows={4} maxLength={1500} />
      </div>
      <div className="hp" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{t.bizConsent}</span>
      </label>
      {state === "invalid" && <p className="alert err">{t.required}</p>}
      {state === "error" && <p className="alert err">{t.error}</p>}
      <button className="btn btn-red" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
