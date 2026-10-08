import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import PartnerForm from "@/components/PartnerForm";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).form.partnerTitle } : {};
}

export default async function PartnerPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const p = t.partner;

  return (
    <>
      <section className="hero photo-hero">
        <div className="bg" style={{ backgroundImage: "url(/images/ai-team-leader.jpg)" }} />
        <div className="shade" />
        <div className="container">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", whiteSpace: "normal", maxWidth: 680 }}>{p.title}</h1>
          <p className="sub">{p.sub}</p>
          <div className="pills" style={{ marginBottom: 28 }}>
            {p.pills.map((x) => <span className="pill" key={x}>✓ {x}</span>)}
          </div>
          <a href="#register" className="btn btn-red">{p.cta} ↓</a>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="h2 head">{p.whoTitle}</h2>
          <div className="grid g3">
            {p.who.map((w) => (
              <div className="card" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2 head">{p.benefitsTitle}</h2>
            <ul className="check-list">{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <img className="photo" src="/images/photo-group.jpg" alt="" loading="lazy" />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="h2 head">{p.tiersTitle}</h2>
          <div className="grid g3">
            {p.tiers.map((tier, i) => (
              <div className={`card tier${i === 1 ? " featured" : ""}${i === 2 ? " dark" : ""}`} key={tier.name}>
                <span className="level">{tier.level}</span>
                <h3 style={{ fontSize: 24 }}>{tier.name}</h3>
                <span className="range">{tier.range}</span>
                <ul>{tier.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="note-bar">{p.tiersNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{p.stepsTitle}</h2>
          <div className="grid g3">
            {p.steps.map((s, i) => (
              <div className="card" key={s}>
                <p className="num">{i + 1}</p>
                <h3>{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <h2 className="h2 head">{p.rulesTitle}</h2>
            <ul className="check-list">{p.rules.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div className="quote">{p.quote}</div>
        </div>
      </section>

      <section className="section" id="register">
        <div className="container form-wrap">
          <div className="head">
            <h2 className="h2">{t.form.partnerTitle}</h2>
            <p className="lead">{t.form.partnerSub}</p>
          </div>
          <div className="card">
            <PartnerForm t={t.form} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
