import clsx from "clsx";
import { useEffect, useRef } from "react";

export function Dialog({ open, onClose, labelledBy, describedBy, className, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[data-autofocus]")?.focus();
    }

    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      data-tone="dark"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={clsx("dialog dialog-frame", className)}
    >
      <div className="glass-blur dialog-panel">
        <div className="dialog-body">{children}</div>
      </div>
    </dialog>
  );
}
