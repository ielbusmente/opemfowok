type TagListProps = { tags: string[]; onRemove: (tag: string) => void };

export function TagList({ tags, onRemove }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-surface-tertiary px-2.5 py-1 text-[10px] font-semibold text-text-dark"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onRemove(tag)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}
