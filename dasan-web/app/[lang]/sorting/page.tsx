import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPANY, KR_CONTACT, getDict, isLocale } from "@/lib/i18n";
import InquiryForm from "@/components/InquiryForm";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).sorting.meta } : {};
}

export default async function SortingPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const s = t.sorting;

  return (
    <>
      <section className="hero photo-hero">
        <div className="bg" style={{ backgroundImage: "url(/images/ai-sort-line.jpg)" }} />
        <div className="shade" />
        <div className="container">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 style={{ fontSize: "clamp(28px, 4.6vw, 50px)" }}>{s.title}</h1>
          <p className="sub">{s.sub}</p>
          <div className="ctas">
            <a href="#inquiry" className="btn btn-red">{s.cta} ↓</a>
            <a href={`tel:${KR_CONTACT.tel}`} className="btn btn-white">☎ {KR_CONTACT.phone}</a>
          </div>
          <span className="badge">✓ {t.hero.badge} {COMPANY.license}</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{s.whenTitle}</h2>
          <div className="grid g2">
            {s.when.map((w) => (
              <div className="card pain" key={w.q}>
                <p className="pain-q">{w.q}</p>
                <p className="pain-a">→ {w.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <h2 className="h2 head">{s.scopeTitle}</h2>
            <ul className="scope-list">
              {s.scope.map((x) => (
                <li key={x.title}>
                  <strong>{x.title}</strong>
                  <span>{x.sub}</span>
                </li>
              ))}
            </ul>
          </div>
          <img className="photo" src="/images/ai-sort-closeup.jpg" alt="" loading="lazy" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{s.itemsTitle}</h2>
          <div className="grid g3">
            {s.items.map((x) => (
              <div className="card item-chip" key={x}>✓ {x}</div>
            ))}
          </div>
          <p className="note-bar">{s.itemsNote}</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="h2 head">{s.processTitle}</h2>
          <div className="grid g5">
            {s.process.map((p, i) => (
              <div className="card" key={p.title}>
                <p className="num">{i + 1}</p>
                <h3>{p.title}</h3>
                <p>{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{s.whyTitle}</h2>
          <div className="grid g4">
            {s.why.map((w) => (
              <div className="card" key={w.title}>
                <h3>✓ {w.title}</h3>
                <p>{w.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="inquiry">
        <div className="container form-wrap">
          <div className="head">
            <h2 className="h2">{s.formTitle}</h2>
            <p className="lead">{s.formSub}</p>
            <p className="lead" style={{ marginTop: 8 }}>
              ☎ <a href={`tel:${KR_CONTACT.tel}`}>{KR_CONTACT.phone}</a> (Zalo · KakaoTalk) · <a href={`mailto:${KR_CONTACT.email}`}>{KR_CONTACT.email}</a>
            </p>
          </div>
          <div className="card">
            <InquiryForm t={t.form} defaultWorkType="sorting" />
          </div>
        </div>
      </section>
    </>
  );
}
