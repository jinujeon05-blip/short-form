import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, KR_CONTACT, getDict, isLocale } from "@/lib/i18n";
import { list } from "@/lib/db";
import JobCard from "@/components/JobCard";

export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const jobs = (await list("jobs")).filter((j) => j.open).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="bg" style={{ backgroundImage: "url(/images/ai-factory-line.jpg)" }} />
        <div className="shade" />
        <div className="container">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="sub">{t.hero.sub}</p>
          <div className="ctas">
            <Link href={`/${lang}/apply`} className="btn btn-red">{t.hero.ctaWorker}</Link>
            <Link href={`/${lang}/partner`} className="btn btn-white">{t.hero.ctaPartner}</Link>
          </div>
          <span className="badge">✓ {t.hero.badge} {COMPANY.license}</span>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.trust.eyebrow}</p>
            <h2 className="h2">{t.trust.title}</h2>
          </div>
          <div className="grid g4">
            {t.trust.items.map((s) => (
              <div className="card stat" key={s.label}>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="note-bar">{t.trust.note}</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.model.eyebrow}</p>
            <h2 className="h2">{t.model.title}</h2>
          </div>
          <img className="banner" src="/images/ai-handshake.jpg" alt="" loading="lazy" />
          <div className="grid g2">
            <div className="card model-card">
              <p className="label">{t.model.kr.label}</p>
              <ul>{t.model.kr.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="card model-card red">
              <p className="label">{t.model.vn.label}</p>
              <ul>{t.model.vn.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          </div>
          <p className="result-bar">{t.model.result}</p>
        </div>
      </section>

      <section className="section" id="legal">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.legal.eyebrow}</p>
            <h2 className="h2">{t.legal.title}</h2>
          </div>
          <div className="grid g4">
            {t.legal.docs.map((d) => (
              <a className="card doc" key={d.img} href={`/images/${d.img}.jpg`} target="_blank" rel="noopener noreferrer">
                <img src={`/images/${d.img}.jpg`} alt={d.title} loading="lazy" />
                <h3>{d.title}</h3>
                <p>{d.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.clients.eyebrow}</p>
            <h2 className="h2">{t.clients.title}</h2>
          </div>
          <div className="clients">
            <img src="/images/clients.jpg" alt="SMAC, Samsung Display, Mobase, Goertek, ITM, Yamagata, Cresyn, KCI Vina, KDA M&C, EM-Tech" loading="lazy" />
          </div>
          <h3 style={{ margin: "40px 0 16px", fontSize: 22 }}>{t.gallery.title}</h3>
          <div className="grid g3 gallery">
            <img src="/images/photo-canteen.jpg" alt={t.gallery.alt[0]} loading="lazy" />
            <img src="/images/photo-group.jpg" alt={t.gallery.alt[1]} loading="lazy" />
            <img src="/images/photo-factory.jpg" alt={t.gallery.alt[2]} loading="lazy" />
          </div>
          <p className="lead" style={{ marginTop: 12, fontSize: 15 }}>{t.gallery.note}</p>
        </div>
      </section>

      <section className="section" id="jobs">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.jobs.eyebrow}</p>
            <h2 className="h2">{t.jobs.title}</h2>
          </div>
          <div className="split">
            <div className="grid">
              {t.jobs.types.map((j, i) => (
                <div className="card" key={j.title}>
                  <p className="num">0{i + 1}</p>
                  <h3>{j.title}</h3>
                  <p>{j.sub}</p>
                </div>
              ))}
            </div>
            <img className="photo" src="/images/ai-shuttle.jpg" alt="" loading="lazy" />
          </div>
          <h3 style={{ margin: "40px 0 16px", fontSize: 22 }}>{t.jobs.listTitle}</h3>
          {jobs.length ? (
            <div className="grid g3">{jobs.map((j) => <JobCard key={j.id} job={j} lang={lang} t={t.jobs} />)}</div>
          ) : (
            <p className="lead">{t.jobs.empty}</p>
          )}
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/${lang}/jobs`} className="btn btn-navy">{t.jobs.seeAll}</Link>
            <Link href={`/${lang}/apply`} className="btn btn-red">{t.nav.apply}</Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.promise.eyebrow}</p>
            <h2 className="h2">{t.promise.title}</h2>
          </div>
          <img className="banner" src="/images/ai-orientation.jpg" alt="" loading="lazy" />
          <div className="grid g3">
            {t.promise.items.map((p) => (
              <div className="card" key={p.title}>
                <h3>✓ {p.title}</h3>
                <p>{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.steps.eyebrow}</p>
            <h2 className="h2">{t.steps.title}</h2>
          </div>
          <img className="banner" src="/images/ai-consult.jpg" alt="" loading="lazy" />
          <div className="grid g5">
            {t.steps.items.map((s, i) => (
              <div className="card" key={s.title}>
                <p className="num">{i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.sub}</p>
              </div>
            ))}
          </div>
          <p className="note-bar">{t.steps.prepare}</p>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container split">
          <div>
            <p className="eyebrow" style={{ color: "#ffe3e7" }}>{t.partner.eyebrow}</p>
            <h2 className="h2">{t.partner.title}</h2>
            <p className="lead" style={{ marginBottom: 20 }}>{t.partner.sub}</p>
            <div className="pills" style={{ marginBottom: 24 }}>
              {t.partner.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
            </div>
            <Link href={`/${lang}/partner`} className="btn btn-white">{t.partner.cta} →</Link>
          </div>
          <img className="photo" src="/images/ai-team-leader.jpg" alt="" loading="lazy" />
        </div>
      </section>

      <section className="section alt faq" id="faq">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.faq.eyebrow}</p>
            <h2 className="h2">{t.faq.title}</h2>
          </div>
          <div className="grid g2">
            {t.faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="contact">
        <div className="container">
          <div className="head">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 className="h2">{t.contact.title}</h2>
          </div>
          <div className="grid g2">
            <div className="contact-card">
              <p className="label">{t.contact.workerTitle}</p>
              <p className="big">{COMPANY.phone}</p>
              <p>{t.contact.phoneLabel} · {COMPANY.email}</p>
              <p>{lang === "ko" ? COMPANY.addressKo : COMPANY.addressVi}</p>
              <div className="row">
                <a className="btn btn-red btn-small" href={COMPANY.phoneHref}>{t.contact.callBtn}</a>
                <a className="btn btn-white btn-small" href={COMPANY.zalo} target="_blank" rel="noopener noreferrer">{t.contact.zaloBtn}</a>
              </div>
            </div>
            <div className="contact-card">
              <p className="label">{t.contact.krTitle}</p>
              <p className="big">{KR_CONTACT.name || "—"}</p>
              <p>{t.contact.krSub}</p>
              {KR_CONTACT.phone && <p>☎ {KR_CONTACT.phone}</p>}
              {KR_CONTACT.kakao && <p>KakaoTalk: {KR_CONTACT.kakao}</p>}
              {KR_CONTACT.email && <p><a href={`mailto:${KR_CONTACT.email}`}>{KR_CONTACT.email}</a></p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
