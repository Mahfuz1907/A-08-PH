import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const {pathname} = request.nextUrl

    if(session && (pathname === '/login' || pathname === '/register')){
        return NextResponse.redirect(new URL("/", request.url))
    }

    const protectedRoutes = ["/dashboard", "/add-studio", "/my-listings", "/studios/edit", "/my-bookings"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if(!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/add-studio", "/my-listings", "/studios/edit/:path*", "/my-bookings", "/login", "/register"], 
};