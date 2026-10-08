import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { get } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const job = await get("jobs", id);
  return job ? { title: job.title[lang] || job.title.vi } : {};
}

export default async function JobPage({ params }: Props) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const job = await get("jobs", id);
  if (!job) notFound();
  const t = getDict(lang).jobs;
  const description = job.description[lang] || job.description.vi;

  return (
    <section className="section">
      <div className="container form-wrap job-detail">
        <Link href={`/${lang}/jobs`}>{t.back}</Link>
        <h1 className="h2" style={{ marginTop: 16 }}>{job.title[lang] || job.title.vi}</h1>
        {job.company && <p className="lead">{job.company}</p>}
        <div className="card job" style={{ marginTop: 20 }}>
          <dl className="meta">
            {job.location && (<><dt>{t.location}</dt><dd>{job.location}</dd></>)}
            {job.salary && (<><dt>{t.salary}</dt><dd>{job.salary}</dd></>)}
            {job.shift && (<><dt>{t.shift}</dt><dd>{job.shift}</dd></>)}
            <dt>{t.headcount}</dt>
            <dd>{job.headcount} {t.people}</dd>
          </dl>
        </div>
        {description && <p className="desc">{description}</p>}
        {job.open ? (
          <Link href={`/${lang}/apply?job=${job.id}`} className="btn btn-red">{t.applyThis}</Link>
        ) : (
          <p className="alert err">{t.closed}</p>
        )}
      </div>
    </section>
  );
}
