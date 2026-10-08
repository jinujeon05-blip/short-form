import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { list } from "@/lib/db";
import JobCard from "@/components/JobCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).jobs.title } : {};
}

export default async function JobsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const jobs = (await list("jobs")).filter((j) => j.open);

  return (
    <section className="section">
      <div className="container">
        <div className="head">
          <p className="eyebrow">{t.jobs.eyebrow}</p>
          <h1 className="h2">{t.jobs.title}</h1>
        </div>
        {jobs.length ? (
          <div className="grid g3">{jobs.map((j) => <JobCard key={j.id} job={j} lang={lang} t={t.jobs} />)}</div>
        ) : (
          <p className="lead">{t.jobs.empty}</p>
        )}
        <div style={{ marginTop: 28 }}>
          <Link href={`/${lang}/apply`} className="btn btn-red">{t.nav.apply}</Link>
        </div>
      </div>
    </section>
  );
}
