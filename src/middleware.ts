import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { jwtDecode } from "jwt-decode";
import { Payload } from "./types/authResponseTypes";
import { Roles } from "./constants/Roles";

async function authMiddleware(req: NextRequest) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
      return null;
    }

    return NextResponse.redirect(new URL("/auth/login", req.url));
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

async function rolesMiddleware(req: NextRequest, roles: string[]) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    let tokenDecoded: Payload | null;
    tokenDecoded = jwtDecode(session?.access_token as string);

    if (roles.some((role) => tokenDecoded?.roles.includes(role))) {
      return null;
    }
    console.log(tokenDecoded);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  } catch (error) {
    console.error("Error al verificar roles:", error);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let response = await authMiddleware(req);

  if (response) {
    return response;
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth/register")) {
    response = await rolesMiddleware(req, [Roles.admin]);
    if (response) return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/register"],
};
