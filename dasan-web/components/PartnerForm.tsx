"use client";

import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

export default function PartnerForm({ t, lang }: { t: Dict["form"]; lang: Locale }) {
  const [state, setState] = useState<"idle" | "sending" | "error" | "invalid">("idle");
  const [code, setCode] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("consent")) return setState("invalid");
    setState("sending");
    const res = await fetch("/api/partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(f), consent: true }),
    }).catch(() => null);
    if (res?.ok) {
      const data = (await res.json()) as { code: string };
      setCode(data.code);
    } else {
      setState(res?.status === 400 ? "invalid" : "error");
    }
  }

  if (code) {
    // Workers always land on the Vietnamese form, whatever language the partner used.
    const link = `${window.location.origin}/vi/apply?ref=${code}`;
    return (
      <div className="form">
        <p className="alert ok">{t.successPartner}</p>
        <div className="code-box">{code}</div>
        <p>{t.successPartnerNote}</p>
        <p style={{ wordBreak: "break-all", fontWeight: 600 }}>{link}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
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
          <label htmlFor="area">{t.area} <span className="req">*</span></label>
          <input id="area" name="area" required maxLength={120} placeholder={lang === "ko" ? "예: 박닌 옌퐁" : "VD: Yên Phong, Bắc Ninh"} />
        </div>
        <div className="field">
          <label htmlFor="headcount">{t.headcount} <span className="req">*</span></label>
          <input id="headcount" name="headcount" required type="number" inputMode="numeric" min={1} max={10000} placeholder="5" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="role">{t.role}</label>
        <select id="role" name="role" defaultValue="leader">
          {(Object.keys(t.roles) as (keyof typeof t.roles)[]).map((r) => <option key={r} value={r}>{t.roles[r]}</option>)}
        </select>
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
