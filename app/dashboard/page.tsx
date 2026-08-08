import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth";
import { PostHogIdentify, PostHogResetButton } from "@/lib/insforge-client";
import { getCurrentUser } from "@/lib/insforge-server";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <PostHogIdentify
        user={{
          id: user.id,
          email: user.email,
          name: user.profile?.name,
        }}
      />
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[32px] border border-border bg-surface p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold text-text-primary">
              Welcome back, {user?.email ?? "there"}
            </h1>
            <p className="text-base leading-7 text-text-secondary">
              Your workspace is ready. The next steps are profile setup, job
              discovery, and company research.
            </p>
          </div>

          <form action={signOut}>
            <PostHogResetButton />
          </form>
        </div>
      </div>
    </div>
  );
}
