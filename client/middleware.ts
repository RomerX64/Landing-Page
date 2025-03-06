import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/administracion", "/user"];

  // Verificar si la ruta solicitada está protegida
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!token) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(token, secret);

      // Verificar si el usuario tiene permisos de admin
      if (!payload.isAdmin) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  // Permitir la continuación de la solicitud si todo está bien
  return NextResponse.next();
}

// Aplicar middleware solo en ciertas rutas
export const config = {
  matcher: ["/administracion/:path*", "/user/:path*"],
};
