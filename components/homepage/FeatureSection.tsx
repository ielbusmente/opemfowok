type FeatureItem = {
  title: string;
  description: string;
};

type FeatureSectionProps = {
  eyebrow: string;
  heading: string;
  body: string;
  items: FeatureItem[];
};

export function FeatureSection({
  eyebrow,
  heading,
  body,
  items,
}: FeatureSectionProps) {
  return (
    <section className="rounded-[24px] border border-border bg-surface p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-darkest">
        {heading}
      </h2>
      <p className="mt-3 text-sm leading-7 text-text-secondary">{body}</p>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-surface-secondary p-4"
          >
            <h3 className="text-sm font-semibold text-text-darkest">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
