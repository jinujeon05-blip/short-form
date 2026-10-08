export const APPLICANT_STATUSES = ["new", "contacted", "interview", "working", "rejected"] as const;
export type ApplicantStatus = (typeof APPLICANT_STATUSES)[number];

export const PARTNER_STATUSES = ["new", "contacted", "active", "inactive"] as const;
export type PartnerStatus = (typeof PARTNER_STATUSES)[number];

export type Job = {
  id: string;
  createdAt: string;
  open: boolean;
  title: { vi: string; ko: string };
  company: string;
  location: string;
  salary: string;
  shift: string;
  headcount: number;
  description: { vi: string; ko: string };
};

export type Applicant = {
  id: string;
  createdAt: string;
  status: ApplicantStatus;
  name: string;
  phone: string;
  birthYear: number;
  gender: "male" | "female" | "other";
  hometown: string;
  jobType: "general" | "seasonal" | "fulltime" | "any";
  jobId: string | null;
  referralCode: string;
  note: string;
  memo: string;
};

export type Partner = {
  id: string;
  createdAt: string;
  status: PartnerStatus;
  code: string;
  name: string;
  phone: string;
  area: string;
  role: string;
  headcount: number;
  note: string;
  memo: string;
};
