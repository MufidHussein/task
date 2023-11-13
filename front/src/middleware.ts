import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  if (token === undefined || token === null) {
    if (path !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    const claims = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    // server timezone is UTC
    const expDate = new Date(claims.exp * 1000);
    const now = new Date(new Date().toUTCString());

    if (now < expDate) {
      if (path === "/") {
        return NextResponse.redirect(new URL("/restaurants", request.url));
      }
    } else {
      if (path !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - favicon.ico (favicon file)
   */
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
