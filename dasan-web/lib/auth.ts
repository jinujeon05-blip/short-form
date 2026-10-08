// Admin session: a cookie holding "<expiry>.<hmac>" signed with SESSION_SECRET.
// Uses Web Crypto so it runs in both middleware (edge) and route handlers.

export const SESSION_COOKIE = "dasan_admin";
const SESSION_DAYS = 7;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET must be set (16+ characters)");
  return s;
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession(): Promise<{ value: string; maxAge: number }> {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const expires = String(Date.now() + maxAge * 1000);
  return { value: `${expires}.${await hmac(expires)}`, maxAge };
}

export async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const [expires, sig] = value.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  try {
    return safeEqual(sig, await hmac(expires));
  } catch {
    return false;
  }
}

export async function checkPassword(input: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare digests so the comparison time does not depend on the password length.
  return safeEqual(await hmac("pw:" + input), await hmac("pw:" + expected));
}
