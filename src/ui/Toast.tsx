import { CircleCheck, X } from "lucide-react";
import { useEffect } from "react";

export type ToastMessage = { title: string; message: string };
export type ToastProps = {
  toast: ToastMessage | null;
  dismissLabel: string;
  onDismiss: () => void;
  duration?: number;
};

export function Toast({ toast, dismissLabel, onDismiss, duration = 7000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss, duration]);

  return (
    <div role="status" aria-live="polite" className="toast-viewport">
      {toast && (
        <div data-tone="dark" className="glass-blur animate-toast-in toast-panel">
          <CircleCheck aria-hidden="true" className="check-icon size-5" />
          <div className="min-w-0 flex-1">
            <p className="font-medium">{toast.title}</p>
            <p className="muted-copy-small mt-1">{toast.message}</p>
          </div>
          <button type="button" onClick={onDismiss} aria-label={dismissLabel} className="toast-dismiss">
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
