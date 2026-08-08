import Image from "next/image";

type Stat = {
  label: string;
  value: string;
};

type HeroSectionProps = {
  badge: string;
  heading: string;
  body: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: Stat[];
  imageSrc: string;
  imageAlt: string;
};

export function HeroSection({
  badge,
  heading,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  stats,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="grid gap-8 rounded-[24px] border border-border bg-surface p-6 shadow-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
      <div className="flex flex-col justify-center">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-secondary px-3 py-1 text-sm font-medium text-accent">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          {badge}
        </div>

        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-text-darkest sm:text-5xl">
          {heading}
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
          {body}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={primaryCtaHref}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent-dark"
          >
            {primaryCtaLabel}
          </a>
          <a
            href={secondaryCtaHref}
            className="rounded-md border border-border bg-surface-secondary px-4 py-2 text-sm font-medium text-text-dark transition hover:border-accent hover:text-accent"
          >
            {secondaryCtaLabel}
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface-secondary p-4"
            >
              <p className="text-2xl font-semibold text-text-darkest">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border bg-surface-secondary p-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={900}
          height={700}
          className="h-auto w-full rounded-[16px] object-cover"
          priority
        />
      </div>
    </section>
  );
}
