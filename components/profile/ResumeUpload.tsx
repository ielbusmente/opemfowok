"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

type ResumeUploadProps = {
  onFileSelected: (fileName: string) => void;
  initialFileName?: string | null;
};

export function ResumeUpload({ onFileSelected, initialFileName }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(initialFileName ?? null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (file: File | undefined): void => {
    if (!file || file.type !== "application/pdf") return;
    setFileName(file.name);
    onFileSelected(file.name);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    selectFile(event.target.files?.[0]);
  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <div
        className={`flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center transition ${isDragging ? "border-accent bg-accent-muted" : "border-border"}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-sm">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M12 16V4m0 0-4 4m4-4 4 4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-text-primary">
          {fileName ?? "Click to upload or drag and drop"}
        </p>
        <p className="mt-1 text-xs text-text-secondary">
          PDF formatting only. Maximum file size 5MB.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-dark shadow-sm transition hover:border-accent hover:text-accent"
          onClick={() => inputRef.current?.click()}
        >
          {fileName ? "Choose another resume" : "Select Resume"}
        </button>
        <input
          ref={inputRef}
          name="resume"
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-4 border-t border-border-light pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-secondary">
          Need a fresh document based on the fields below?
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition hover:bg-accent-dark"
        >
          <span aria-hidden="true">▤</span> Generate Resume from Profile
        </button>
      </div>
    </div>
  );
}
