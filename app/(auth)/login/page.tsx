import { redirect } from "next/navigation";
import { signInWithGitHub, signInWithGoogle } from "@/actions/auth";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { getCurrentUser } from "@/lib/insforge-server";
import { OAuthSignInButton } from "@/components/auth/OAuthSignInButton";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
    const params = await searchParams;
    const redirectTo = getSafeRedirectPath(params.redirectTo);

    const user = await getCurrentUser();
    if (user) {
        redirect(redirectTo);
    }

    return (
        <div className="min-h-screen bg-background px-6 py-12">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[32px] border border-border bg-surface p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl space-y-4">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">
                        Authentication
                    </p>
                    <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
                        Continue to your job search workspace
                    </h1>
                    <p className="text-base leading-7 text-text-secondary">
                        Sign in with Google or GitHub to access your dashboard, profile,
                        and discovered roles.
                    </p>

                    {params.error ? (
                        <div className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                            We couldn&apos;t complete that sign-in. Please try again.
                        </div>
                    ) : null}
                </div>

                <div className="w-full max-w-md rounded-[24px] border border-border bg-surface-secondary p-6">
                    <form action={signInWithGoogle} className="mb-3">
                        <OAuthSignInButton
                            type="submit"
                            provider="google"
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary transition hover:border-accent hover:text-accent"
                        >
                            Continue with Google
                        </OAuthSignInButton>
                    </form>

                    <form action={signInWithGitHub}>
                        <OAuthSignInButton
                            type="submit"
                            provider="github"
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition hover:bg-accent-dark"
                        >
                            Continue with GitHub
                        </OAuthSignInButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
