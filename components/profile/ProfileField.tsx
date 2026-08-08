import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldProps = { label: string; className?: string; children: ReactNode };

export function ProfileField({ label, className = "", children }: FieldProps) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-9 w-full rounded-md border border-border bg-surface px-3 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent ${props.className ?? ""}`}
    />
  );
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`h-9 w-full rounded-md border border-border bg-surface px-3 text-xs text-text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-20 w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-xs leading-5 text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent ${props.className ?? ""}`}
    />
  );
}
