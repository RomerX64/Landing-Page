import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("TU_SECRETO");

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/administracion", "/user"];

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      if (!payload.isAdmin) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Aplicar middleware solo en ciertas rutas
export const config = {
  matcher: ["/administracion/:path*", "/user/:path*"], // Protege estas rutas
};
