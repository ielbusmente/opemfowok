import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { getCurrentUser } from "@/lib/insforge-server";

export default async function FindJobsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirectTo=/find-jobs");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="find-jobs" />
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-5 py-8 sm:px-8"
      >
        <section className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">
            Job discovery
          </p>
          <h1 className="text-3xl font-semibold text-text-primary">
            Find Jobs
          </h1>
          <p className="max-w-2xl text-base leading-7 text-text-secondary">
            Explore opportunities that fit your experience and job preferences.
          </p>
        </section>

        <section
          aria-labelledby="find-jobs-empty-title"
          className="rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10"
        >
          <div className="mx-auto max-w-xl space-y-3 py-6 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Coming soon
            </p>
            <h2
              id="find-jobs-empty-title"
              className="text-xl font-semibold text-text-primary"
            >
              Job search is not available yet
            </h2>
            <p className="text-base leading-7 text-text-secondary">
              Search tools and matching opportunities will appear here when job
              discovery is ready.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
