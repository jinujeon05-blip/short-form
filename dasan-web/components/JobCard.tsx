import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import type { Job } from "@/lib/types";

export default function JobCard({ job, lang, t }: { job: Job; lang: Locale; t: Dict["jobs"] }) {
  return (
    <Link href={`/${lang}/jobs/${job.id}`} className="card job">
      <h3>{job.title[lang] || job.title.vi}</h3>
      {job.company && <p>{job.company}</p>}
      <dl className="meta">
        {job.location && (<><dt>{t.location}</dt><dd>{job.location}</dd></>)}
        {job.salary && (<><dt>{t.salary}</dt><dd>{job.salary}</dd></>)}
        {job.shift && (<><dt>{t.shift}</dt><dd>{job.shift}</dd></>)}
        <dt>{t.headcount}</dt>
        <dd>{job.headcount} {t.people}</dd>
      </dl>
    </Link>
  );
}
