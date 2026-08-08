import Image from "next/image";

type Step = {
  title: string;
  description: string;
};

type HowItWorksSectionProps = {
  eyebrow: string;
  heading: string;
  steps: Step[];
  imageSrc: string;
  imageAlt: string;
};

export function HowItWorksSection({
  eyebrow,
  heading,
  steps,
  imageSrc,
  imageAlt,
}: HowItWorksSectionProps) {
  return (
    <section className="rounded-[24px] border border-border bg-surface p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-darkest">
        {heading}
      </h2>

      <div className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-3 rounded-2xl border border-border bg-surface-secondary p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              {index + 1}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-darkest">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[20px] border border-border bg-surface-secondary p-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={500}
          className="h-auto w-full rounded-[16px] object-cover"
        />
      </div>
    </section>
  );
}
