"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthActions } from "@insforge/sdk/ssr";

const getOAuthRedirectUrl = () => {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

    return new URL("/api/auth/callback", baseUrl).toString();
};

const signInWithOAuthProvider = async (provider: "google" | "github") => {
    const cookieStore = await cookies();
    const auth = createAuthActions({ cookies: cookieStore });
    const { data, error } = await auth.signInWithOAuth(provider, {
        redirectTo: getOAuthRedirectUrl(),
        skipBrowserRedirect: true,
    });

    if (error || !data?.url || !data?.codeVerifier) {
        throw new Error(error?.message ?? "OAuth sign-in failed");
    }

    cookieStore.set("insforge_code_verifier", data.codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
    });

    redirect(data.url);
};

export async function signInWithGoogle() {
    await signInWithOAuthProvider("google");
}

export async function signInWithGitHub() {
    await signInWithOAuthProvider("github");
}

export async function signOut() {
    const cookieStore = await cookies();
    const auth = createAuthActions({ cookies: cookieStore });
    await auth.signOut();
    cookieStore.delete("insforge_code_verifier");
    redirect("/login");
}
