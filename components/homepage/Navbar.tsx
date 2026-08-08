type NavbarLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  brandName: string;
  links: NavbarLink[];
  ctaLabel: string;
  ctaHref: string;
};

export function Navbar({ brandName, links, ctaLabel, ctaHref }: NavbarProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-3 text-lg font-semibold text-text-darkest"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-accent-foreground">
            OF
          </span>
          <span>{brandName}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-text-dark md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent-dark"
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
