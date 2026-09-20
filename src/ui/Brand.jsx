import clsx from "clsx";

export function Brand({ name, showMark = true, className }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      {showMark && (
        <span aria-hidden="true" className="brand-mark">
          <svg viewBox="0 0 32 32" className="size-full">
            <path d="M7.5 19.5h6" stroke="#f4f4f2" strokeWidth="2.2" strokeLinecap="round" />
            <path
              d="M18.5 11.5 24.5 15.5 18.5 19.5"
              fill="none"
              stroke="#f4f4f2"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      <span className="brand-wordmark">{name}</span>
    </span>
  );
}
