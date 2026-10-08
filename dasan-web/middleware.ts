import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const prefersKo = (req.headers.get("accept-language") ?? "").toLowerCase().startsWith("ko");
    return NextResponse.redirect(new URL(prefersKo ? "/ko" : "/vi", req.url));
  }

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";
  if (isAdminPage || isAdminApi) {
    const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
    if (!ok) {
      if (isAdminApi) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/api/admin/:path*"],
};
