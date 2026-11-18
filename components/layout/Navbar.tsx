import Link from "next/link";

type WorkspacePage = "dashboard" | "find-jobs" | "profile";

type NavbarProps = {
  activePage: WorkspacePage;
};

const navigationItems: {
  page: WorkspacePage;
  label: string;
  href: string;
}[] = [
  { page: "dashboard", label: "Dashboard", href: "/dashboard" },
  { page: "find-jobs", label: "Find Jobs", href: "/find-jobs" },
  { page: "profile", label: "Profile", href: "/profile" },
];

export function Navbar({ activePage }: NavbarProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent focus:ring-2 focus:ring-accent"
      >
        Skip to main content
      </a>
      <header className="h-16 border-b border-border bg-surface">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-8">
          <Link
            href="/dashboard"
            className="flex h-full items-center gap-2.5 text-sm font-bold text-text-darkest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs text-accent-foreground">
              OF
            </span>
            Opemfowok
          </Link>
          <nav
            className="flex h-full items-center gap-3 sm:gap-7"
            aria-label="Main navigation"
          >
            {navigationItems.map(({ page, label, href }) => {
              const isActive = page === activePage;

              return (
                <Link
                  key={page}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-full items-center text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "text-accent"
                      : "text-text-dark hover:text-accent"
                  }`}
                >
                  {label}
                  {isActive ? (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
