type CTASectionProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export function CTASection({ eyebrow, heading, body, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <section className="rounded-[24px] border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-darkest">{heading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">{body}</p>
        </div>
        <a
          href={ctaHref}
          className="rounded-md border border-border bg-surface-secondary px-4 py-2 text-sm font-medium text-text-dark transition hover:border-accent hover:text-accent"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
