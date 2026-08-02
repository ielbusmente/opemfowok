import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@insforge/sdk/ssr/middleware";
import { isProtectedPath } from "@/lib/auth-redirect";

export async function proxy(request: NextRequest) {
    const response = NextResponse.next({ request });

    await updateSession({
        requestCookies: request.cookies,
        responseCookies: response.cookies,
    });

    const pathname = request.nextUrl.pathname;
    const isProtectedRoute = isProtectedPath(pathname);

    if (isProtectedRoute) {
        const requestAccessToken = request.cookies.get("insforge_access_token")?.value;
        const requestRefreshToken = request.cookies.get("insforge_refresh_token")?.value;
        const responseAccessToken = response.cookies.get("insforge_access_token")?.value;
        const responseRefreshToken = response.cookies.get(
            "insforge_refresh_token",
        )?.value;
        const hasSessionCookie = Boolean(
            requestAccessToken ||
            requestRefreshToken ||
            responseAccessToken ||
            responseRefreshToken,
        );

        if (!hasSessionCookie) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirectTo", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/find-jobs/:path*",
        "/profile/:path*",
        "/login",
        "/api/auth/:path*",
    ],
};
