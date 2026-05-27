import { NextResponse } from "next/server";

let cachedPaths = null;

async function getSitemapPaths(request) {
  if (cachedPaths) return cachedPaths;

  const res = await fetch(
    `${request.nextUrl.origin}/sitemap.xml`
  );

  const xml = await res.text();

  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];

  cachedPaths = matches.map((m) => {
    const url = new URL(m[1]);

    return url.pathname.replace(/\/$/, "") || "/";
  });

  return cachedPaths;
}

export async function middleware(request) {
  const pathname =
    request.nextUrl.pathname.replace(/\/$/, "") || "/";

  // static files ignore
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // homepage allow
  if (pathname === "/") {
    return NextResponse.next();
  }

  const paths = await getSitemapPaths(request);

  const exists = paths.includes(pathname);

  // invalid url => redirect home
  if (!exists) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};