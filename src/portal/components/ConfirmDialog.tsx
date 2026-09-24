import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button, { type ButtonVariant } from "./Button";

/**
 * The portal's "are you sure?" popup — the 444px panel the sample-request
 * cancel confirmation introduced (Figma `1030:27424`): a titled header with the
 * 40px close button, a line of consequence, then a keep/confirm pair. Anything
 * irreversible (cancelling a request, deleting bank details) confirms here.
 */
export default function ConfirmDialog({
  title,
  children,
  cancelLabel,
  confirmLabel,
  confirmVariant = "portal",
  onClose,
  onConfirm,
}: {
  title: string;
  children: ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  confirmVariant?: ButtonVariant;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="motion-modal-panel w-[444px] max-w-full overflow-hidden rounded-[10px] border border-portal-border bg-portal-light">
        <div className="flex items-center justify-between border-b border-portal-border px-6 py-4">
          <h2 id={titleId} className="min-w-0 flex-1 text-body-xl font-semibold text-portal-text">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 pt-4 pb-6">
          <div className="text-body-sm text-portal-muted">{children}</div>
          <div className="flex w-full gap-2">
            <Button variant="portalOutline" className="min-w-0 flex-1" onClick={onClose}>
              {cancelLabel}
            </Button>
            <Button variant={confirmVariant} className="min-w-0 flex-1" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
