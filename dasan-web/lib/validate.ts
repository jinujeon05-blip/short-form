// Small helpers for reading untrusted JSON bodies from public forms.

export function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function int(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isInteger(n) || n < min || n > max) return null;
  return n;
}

export function oneOf<T extends string>(v: unknown, options: readonly T[], fallback: T): T {
  return typeof v === "string" && (options as readonly string[]).includes(v) ? (v as T) : fallback;
}

// Vietnamese mobile numbers: 0xxxxxxxxx or +84xxxxxxxxx (spaces/dots/dashes allowed).
export function phone(v: unknown): string | null {
  const raw = str(v, 30);
  const digits = raw.replace(/[\s.\-()]/g, "");
  return /^(\+?84|0)\d{9,10}$/.test(digits) ? digits : null;
}
