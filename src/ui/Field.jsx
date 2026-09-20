import clsx from "clsx";

export function Field({ id, label, hint, error, as: Control = "input", className, ...controlProps }) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="spread-row items-baseline text-sm text-(--fg-muted)">
        <span>{label}</span>
        {hint && (
          <span id={hintId} className="type-label text-(--fg-subtle)">
            {hint}
          </span>
        )}
      </label>
      <Control
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="field-control"
        {...controlProps}
      />
      {error && (
        <p id={errorId} className="text-sm text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}
