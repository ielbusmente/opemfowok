type CompletionIndicatorProps = {
  percentage: number;
  missingFields: string[];
};

export function CompletionIndicator({
  percentage,
  missingFields,
}: CompletionIndicatorProps) {
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      aria-label={`${percentage}% profile complete`}
    >
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96" role="img">
        <circle
          cx="48"
          cy="48"
          r="38"
          fill="none"
          stroke="var(--color-border-light)"
          strokeWidth="8"
        />
        <circle
          cx="48"
          cy="48"
          r="38"
          fill="none"
          stroke="var(--color-error)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-2xl font-semibold text-text-primary">
        {percentage}%
      </span>
      <span className="sr-only">Missing: {missingFields.join(", ")}</span>
    </div>
  );
}
