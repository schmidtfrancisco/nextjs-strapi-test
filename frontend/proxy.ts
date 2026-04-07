import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { STRAPI_BASE_URL } from "./lib/strapi";

const PROTECTED_ROURTES = ["/dashboard"];

function checkIsProtectedRoute(path: string) {
  return PROTECTED_ROURTES.some(route => path.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = checkIsProtectedRoute(currentPath);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
    const userResponse = await response.json();

    if (!userResponse) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying user authentication:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico).*)"
  ]
}