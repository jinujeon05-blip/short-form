import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPANY, KR_CONTACT, getDict, isLocale } from "@/lib/i18n";
import InquiryForm from "@/components/InquiryForm";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).business.meta } : {};
}

export default async function BusinessPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const b = t.business;
  const companyFaq = t.faq.groups[t.faq.groups.length - 1];

  return (
    <>
      <section className="hero photo-hero">
        <div className="bg" style={{ backgroundImage: "url(/images/ai-handshake.jpg)" }} />
        <div className="shade" />
        <div className="container">
          <p className="eyebrow">{b.eyebrow}</p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>{b.title}</h1>
          <p className="sub">{b.sub}</p>
          <div className="ctas">
            <a href="#inquiry" className="btn btn-red">{b.cta} ↓</a>
            <a href={`tel:${KR_CONTACT.tel}`} className="btn btn-white">☎ {b.call} {KR_CONTACT.phone}</a>
          </div>
          <span className="badge">✓ {t.hero.badge} {COMPANY.license}</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{b.painsTitle}</h2>
          <div className="grid g2">
            {b.pains.map((p) => (
              <div className="card pain" key={p.q}>
                <p className="pain-q">{p.q}</p>
                <p className="pain-a">→ {p.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="h2 head">{b.servicesTitle}</h2>
          <div className="grid g4">
            {b.services.map((s, i) =>
              i === b.services.length - 1 ? (
                <a className="card service-link" key={s.title} href={`/${lang}/sorting`}>
                  <p className="num">0{i + 1}</p>
                  <h3>{s.title}</h3>
                  <p>{s.sub}</p>
                  <span className="more">{t.nav.sorting} →</span>
                </a>
              ) : (
                <div className="card" key={s.title}>
                  <p className="num">0{i + 1}</p>
                  <h3>{s.title}</h3>
                  <p>{s.sub}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2 head">{b.whyTitle}</h2>
            <div className="grid g2">
              {b.why.map((w) => (
                <div className="card" key={w.title}>
                  <h3>✓ {w.title}</h3>
                  <p>{w.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <img className="photo photo-real" src="/images/real-orientation-1.jpg" alt={b.realPhotoAlt} loading="lazy" />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="h2 head">{b.processTitle}</h2>
          <div className="grid g5">
            {b.process.map((s, i) => (
              <div className="card" key={s.title}>
                <p className="num">{i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 head">{b.legalTitle}</h2>
          <p className="note-bar" style={{ marginTop: 0, fontWeight: 500, lineHeight: 1.7 }}>{b.legal}</p>
          <div className="grid g4" style={{ marginTop: 28 }}>
            {t.legal.docs.map((d) => (
              <a className="card doc" key={d.img} href={`/images/${d.img}.jpg`} target="_blank" rel="noopener noreferrer">
                <img src={`/images/${d.img}.jpg`} alt={d.title} loading="lazy" />
                <h3>{d.title}</h3>
                <p>{d.sub}</p>
              </a>
            ))}
          </div>
          <h3 style={{ margin: "40px 0 16px", fontSize: 22 }}>{t.clients.title}</h3>
          <div className="clients">
            <img src="/images/clients.jpg" alt="SMAC, Samsung Display, Mobase, Goertek, ITM, Yamagata, Cresyn, KCI Vina, KDA M&C, EM-Tech" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section alt" id="inquiry">
        <div className="container form-wrap">
          <div className="head">
            <h2 className="h2">{b.formTitle}</h2>
            <p className="lead">{b.formSub}</p>
            <p className="lead" style={{ marginTop: 8 }}>
              ☎ <a href={`tel:${KR_CONTACT.tel}`}>{KR_CONTACT.phone}</a> (Zalo · KakaoTalk) · <a href={`mailto:${KR_CONTACT.email}`}>{KR_CONTACT.email}</a>
            </p>
          </div>
          <div className="card">
            <InquiryForm t={t.form} />
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="container">
          <h2 className="h2 head">{b.faqTitle}</h2>
          <div className="grid g2">
            {companyFaq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
