import { CompletionIndicator } from "@/components/profile/CompletionIndicator";

type ProfileAttentionBannerProps = {
  completion: number;
  missingFields: string[];
};

export function ProfileAttentionBanner({
  completion,
  missingFields,
}: ProfileAttentionBannerProps) {
  return (
    <section className="flex flex-col items-start justify-between gap-5 rounded-xl border border-error/20 bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:px-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-error">ⓘ</span>
          <h1 className="text-base font-semibold text-text-primary">
            {completion === 100
              ? "Profile is complete"
              : "Profile needs attention"}
          </h1>
        </div>
        <p className="mt-1 max-w-lg text-xs leading-5 text-text-secondary">
          {completion === 100
            ? "Your profile is ready for tailored matches and quality resume generation."
            : "Complete the missing fields to improve your chance of getting tailored matches and generating quality resumes."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {missingFields.map((field) => (
            <span
              key={field}
              className="rounded-sm bg-error/10 px-2 py-1 text-[10px] font-semibold text-error"
            >
              {field}
            </span>
          ))}
        </div>
      </div>
      <CompletionIndicator
        percentage={completion}
        missingFields={missingFields}
      />
    </section>
  );
}
