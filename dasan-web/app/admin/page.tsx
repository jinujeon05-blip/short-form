"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APPLICANT_STATUSES,
  PARTNER_STATUSES,
  type Applicant,
  type ApplicantStatus,
  type Job,
  type Partner,
  type PartnerStatus,
} from "@/lib/types";

const APPLICANT_LABEL: Record<ApplicantStatus, string> = {
  new: "Mới · 신규",
  contacted: "Đã gọi · 연락함",
  interview: "Phỏng vấn · 면접",
  working: "Đang làm · 출근중",
  rejected: "Không đạt · 불합격",
};
const PARTNER_LABEL: Record<PartnerStatus, string> = {
  new: "Mới · 신규",
  contacted: "Đã liên hệ · 연락함",
  active: "Đang hợp tác · 활동중",
  inactive: "Ngừng · 중단",
};
const JOB_TYPE: Record<Applicant["jobType"], string> = {
  any: "Bất kỳ · 무관",
  general: "Phổ thông · 생산직",
  seasonal: "Thời vụ · 단기",
  fulltime: "Chính thức · 정규직",
};

type Data = { jobs: Job[]; applicants: Applicant[]; partners: Partner[]; storageConfigured: boolean };
type Tab = "applicants" | "partners" | "jobs";

const fmtDate = (iso: string) => new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });

async function api(path: string, method: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) window.location.href = "/admin/login";
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function AdminPage() {
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<Tab>("applicants");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const load = () => api("/api/admin/data", "GET").then(setData);
  useEffect(() => {
    load();
  }, []);

  const partnerByCode = useMemo(() => new Map((data?.partners ?? []).map((p) => [p.code, p])), [data]);
  const jobById = useMemo(() => new Map((data?.jobs ?? []).map((j) => [j.id, j])), [data]);
  const referrals = useMemo(() => {
    const m = new Map<string, { total: number; working: number }>();
    for (const a of data?.applicants ?? []) {
      if (!a.referralCode) continue;
      const c = m.get(a.referralCode) ?? { total: 0, working: 0 };
      c.total++;
      if (a.status === "working") c.working++;
      m.set(a.referralCode, c);
    }
    return m;
  }, [data]);

  if (!data) return <p style={{ padding: 40 }}>Đang tải… · 불러오는 중…</p>;

  const q = query.trim().toLowerCase();
  const applicants = data.applicants.filter(
    (a) => (!status || a.status === status) && (!q || [a.name, a.phone, a.hometown, a.referralCode].join(" ").toLowerCase().includes(q)),
  );
  const partners = data.partners.filter(
    (p) => (!status || p.status === status) && (!q || [p.name, p.phone, p.area, p.code].join(" ").toLowerCase().includes(q)),
  );

  async function patch(collection: Tab, id: string, body: Record<string, unknown>) {
    await api(`/api/admin/${collection}/${id}`, "PATCH", body);
    await load();
  }
  async function del(collection: Tab, id: string) {
    if (!confirm("Xóa mục này? · 삭제할까요?")) return;
    await api(`/api/admin/${collection}/${id}`, "DELETE");
    await load();
  }
  async function logout() {
    await api("/api/admin/logout", "POST");
    window.location.href = "/admin/login";
  }
  const switchTab = (t: Tab) => {
    setTab(t);
    setStatus("");
    setQuery("");
  };

  const newApplicants = data.applicants.filter((a) => a.status === "new").length;
  const newPartners = data.partners.filter((p) => p.status === "new").length;

  return (
    <>
      <div className="admin-top">
        <div className="container inner">
          <strong>DASAN · Quản trị / 관리자</strong>
          <span style={{ display: "flex", gap: 8 }}>
            <a href="/vi" target="_blank" style={{ color: "#fff", alignSelf: "center" }}>Web ↗</a>
            <button onClick={logout}>Đăng xuất · 로그아웃</button>
          </span>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 60 }}>
        {!data.storageConfigured && (
          <p className="warn">
            ⚠ Chưa kết nối cơ sở dữ liệu (Upstash Redis). Dữ liệu chỉ lưu tạm trên máy này. · 데이터베이스(Upstash Redis)가 연결되지 않아 이
            서버에만 임시 저장됩니다. README의 배포 안내를 확인하세요.
          </p>
        )}
        <div className="tabs">
          <button className={tab === "applicants" ? "active" : ""} onClick={() => switchTab("applicants")}>
            Ứng viên · 지원자 ({data.applicants.length}){newApplicants > 0 && <span className="count">{newApplicants}</span>}
          </button>
          <button className={tab === "partners" ? "active" : ""} onClick={() => switchTab("partners")}>
            Đối tác · 채용파트너 ({data.partners.length}){newPartners > 0 && <span className="count">{newPartners}</span>}
          </button>
          <button className={tab === "jobs" ? "active" : ""} onClick={() => switchTab("jobs")}>
            Việc làm · 채용공고 ({data.jobs.length})
          </button>
        </div>

        {tab !== "jobs" && (
          <div className="toolbar">
            <input placeholder="Tìm tên, SĐT, mã… · 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tất cả · 전체</option>
              {(tab === "applicants" ? APPLICANT_STATUSES : PARTNER_STATUSES).map((s) => (
                <option key={s} value={s}>
                  {tab === "applicants" ? APPLICANT_LABEL[s as ApplicantStatus] : PARTNER_LABEL[s as PartnerStatus]}
                </option>
              ))}
            </select>
            <a href={`/api/admin/export?type=${tab}`}>⬇ Excel (CSV)</a>
          </div>
        )}

        {tab === "applicants" && (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Ngày · 접수일</th><th>Tên · 이름</th><th>SĐT · 전화</th><th>Năm sinh · 출생</th><th>Quê · 거주지</th>
                  <th>Muốn làm · 희망</th><th>Mã ĐT · 추천</th><th>Trạng thái · 상태</th><th>Ghi chú · 메모</th><th></th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => {
                  const partner = a.referralCode ? partnerByCode.get(a.referralCode) : undefined;
                  const job = a.jobId ? jobById.get(a.jobId) : undefined;
                  return (
                    <tr key={a.id}>
                      <td>{fmtDate(a.createdAt)}</td>
                      <td className={a.status === "new" ? "st-new" : ""}>{a.name}<br /><span className="muted">{a.gender === "male" ? "Nam·남" : a.gender === "female" ? "Nữ·여" : ""}</span></td>
                      <td><a href={`tel:${a.phone}`}>{a.phone}</a><br /><a className="muted" href={`https://zalo.me/${a.phone.replace(/^\+?84/, "0")}`} target="_blank" rel="noreferrer">Zalo</a></td>
                      <td>{a.birthYear}</td>
                      <td>{a.hometown}</td>
                      <td>{JOB_TYPE[a.jobType]}{job && <><br /><span className="muted">{job.title.vi}</span></>}{a.note && <><br /><span className="muted">“{a.note}”</span></>}</td>
                      <td>{a.referralCode}{partner && <><br /><span className="muted">{partner.name}</span></>}{a.referralCode && !partner && <><br /><span className="muted">?</span></>}</td>
                      <td>
                        <select value={a.status} onChange={(e) => patch("applicants", a.id, { status: e.target.value })}>
                          {APPLICANT_STATUSES.map((s) => <option key={s} value={s}>{APPLICANT_LABEL[s]}</option>)}
                        </select>
                      </td>
                      <td>
                        <textarea defaultValue={a.memo} onBlur={(e) => e.target.value !== a.memo && patch("applicants", a.id, { memo: e.target.value })} />
                      </td>
                      <td><button className="del" onClick={() => del("applicants", a.id)}>Xóa·삭제</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === "partners" && (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Ngày · 접수일</th><th>Mã · 코드</th><th>Tên · 이름</th><th>SĐT · 전화</th><th>Khu vực · 지역</th>
                  <th>Người/tháng · 월인원</th><th>Đã giới thiệu · 추천실적</th><th>Trạng thái · 상태</th><th>Ghi chú · 메모</th><th></th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => {
                  const r = referrals.get(p.code);
                  return (
                    <tr key={p.id}>
                      <td>{fmtDate(p.createdAt)}</td>
                      <td><strong>{p.code}</strong></td>
                      <td className={p.status === "new" ? "st-new" : ""}>{p.name}<br /><span className="muted">{p.role}</span></td>
                      <td><a href={`tel:${p.phone}`}>{p.phone}</a><br /><a className="muted" href={`https://zalo.me/${p.phone.replace(/^\+?84/, "0")}`} target="_blank" rel="noreferrer">Zalo</a></td>
                      <td>{p.area}{p.note && <><br /><span className="muted">“{p.note}”</span></>}</td>
                      <td>{p.headcount}</td>
                      <td>{r ? `${r.total} (đang làm·출근 ${r.working})` : "0"}</td>
                      <td>
                        <select value={p.status} onChange={(e) => patch("partners", p.id, { status: e.target.value })}>
                          {PARTNER_STATUSES.map((s) => <option key={s} value={s}>{PARTNER_LABEL[s]}</option>)}
                        </select>
                      </td>
                      <td>
                        <textarea defaultValue={p.memo} onBlur={(e) => e.target.value !== p.memo && patch("partners", p.id, { memo: e.target.value })} />
                      </td>
                      <td><button className="del" onClick={() => del("partners", p.id)}>Xóa·삭제</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === "jobs" && <JobsAdmin jobs={data.jobs} onChange={load} onDelete={(id) => del("jobs", id)} />}
      </div>
    </>
  );
}

function JobsAdmin({ jobs, onChange, onDelete }: { jobs: Job[]; onChange: () => Promise<unknown>; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState<Job | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "");
    const body = {
      title: { vi: g("titleVi"), ko: g("titleKo") },
      company: g("company"),
      location: g("location"),
      salary: g("salary"),
      shift: g("shift"),
      headcount: Number(g("headcount")) || 1,
      description: { vi: g("descVi"), ko: g("descKo") },
      open: f.get("open") === "on",
    };
    try {
      if (editing) await api(`/api/admin/jobs/${editing.id}`, "PATCH", body);
      else await api("/api/admin/jobs", "POST", body);
      setEditing(null);
      setFormKey((k) => k + 1);
      setError("");
      await onChange();
    } catch {
      setError("Lỗi: cần nhập tên công việc (tiếng Việt) · 오류: 베트남어 공고명은 필수입니다");
    }
  }

  const j = editing;
  return (
    <>
      <form className="job-form form" key={j?.id ?? `new-${formKey}`} onSubmit={onSubmit}>
        <h3>{j ? "Sửa đơn tuyển · 공고 수정" : "Thêm đơn tuyển · 새 공고 등록"}</h3>
        <div className="row2">
          <div className="field"><label>Tên công việc (VI) *</label><input name="titleVi" required defaultValue={j?.title.vi} placeholder="Công nhân lắp ráp linh kiện điện tử" /></div>
          <div className="field"><label>공고명 (KO)</label><input name="titleKo" defaultValue={j?.title.ko} placeholder="전자부품 조립 생산직" /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Công ty · 회사 (hiển thị · 공개)</label><input name="company" defaultValue={j?.company} placeholder="Công ty điện tử Hàn Quốc tại KCN Yên Phong" /></div>
          <div className="field"><label>Địa điểm · 근무지</label><input name="location" defaultValue={j?.location} placeholder="KCN Yên Phong, Bắc Ninh" /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Lương · 급여</label><input name="salary" defaultValue={j?.salary} placeholder="8–10 triệu/tháng" /></div>
          <div className="field"><label>Ca làm · 근무형태</label><input name="shift" defaultValue={j?.shift} placeholder="2 ca, 12h" /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Số lượng · 인원</label><input name="headcount" type="number" min={1} defaultValue={j?.headcount ?? 10} /></div>
          <label className="consent" style={{ alignSelf: "end" }}><input type="checkbox" name="open" defaultChecked={j?.open ?? true} /> Đang tuyển · 모집중 (hiện trên web · 웹에 표시)</label>
        </div>
        <div className="row2">
          <div className="field"><label>Mô tả (VI)</label><textarea name="descVi" rows={4} defaultValue={j?.description.vi} /></div>
          <div className="field"><label>설명 (KO)</label><textarea name="descKo" rows={4} defaultValue={j?.description.ko} /></div>
        </div>
        {error && <p className="alert err">{error}</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-navy btn-small">{j ? "Lưu · 저장" : "Đăng · 등록"}</button>
          {j && <button type="button" className="btn btn-outline btn-small" onClick={() => setEditing(null)}>Hủy · 취소</button>}
        </div>
      </form>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr><th>Ngày · 등록일</th><th>Tên · 공고명</th><th>Địa điểm · 근무지</th><th>Lương · 급여</th><th>Số lượng · 인원</th><th>Trạng thái · 상태</th><th></th></tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{fmtDate(job.createdAt)}</td>
                <td>{job.title.vi}<br /><span className="muted">{job.title.ko}</span></td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.headcount}</td>
                <td>{job.open ? "Đang tuyển · 모집중" : "Đã đóng · 마감"}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="del" style={{ color: "var(--blue)" }} onClick={() => { setEditing(job); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Sửa·수정</button>{" "}
                  <button className="del" onClick={() => onDelete(job.id)}>Xóa·삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
