import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { list } from "@/lib/db";
import ApplyForm from "@/components/ApplyForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ job?: string; ref?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).form.applyTitle } : {};
}

export default async function ApplyPage({ params, searchParams }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { job, ref } = await searchParams;
  const t = getDict(lang);
  const jobs = (await list("jobs")).filter((j) => j.open).map((j) => ({ id: j.id, title: j.title[lang] || j.title.vi }));

  return (
    <section className="section alt">
      <div className="container form-wrap">
        <div className="head">
          <p className="eyebrow">{t.steps.eyebrow}</p>
          <h1 className="h2">{t.form.applyTitle}</h1>
          <p className="lead">{t.form.applySub}</p>
        </div>
        <div className="card">
          <ApplyForm t={t.form} jobs={jobs} initialJob={job ?? ""} initialRef={ref ?? ""} />
        </div>
      </div>
    </section>
  );
}
