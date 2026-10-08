import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  if (!(await checkPassword(password))) {
    // Slow down guessing a little.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }
  const session = await createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });
  return res;
}
