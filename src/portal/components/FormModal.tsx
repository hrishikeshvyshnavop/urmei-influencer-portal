import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "./Button";

type FormModalProps = {
  title: string;
  /** Label on the submitting button; the design writes it in sentence case. */
  submitLabel: string;
  onSubmit: () => void;
  onClose: () => void;
  children: ReactNode;
};

/**
 * The account modals' shell (Figma `1619:58187` "Modal / Add shipping address",
 * reused by `1619:59252` for bank details): a 640px panel with a bordered
 * header, a 16px-gap body and a Cancel / confirm pair that split the width.
 * Shared because the two forms differ only in their fields.
 */
export default function FormModal({
  title,
  submitLabel,
  onSubmit,
  onClose,
  children,
}: FormModalProps) {
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
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[rgba(34,34,34,0.45)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <form
        className="motion-modal-panel my-auto flex w-[640px] max-w-full flex-col items-start overflow-clip rounded-[10px] border border-portal-border bg-portal-light shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18)]"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex w-full items-center justify-between border-b border-portal-border px-6 py-4">
          <h2 id={titleId} className="min-w-px flex-1 text-body-xl text-portal-text">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex w-full flex-col items-start gap-4 px-6 pt-4 pb-6">
          {children}
          <div className="flex w-full items-start gap-2">
            <Button type="button" variant="portalOutline" className="min-w-px flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="portal" className="min-w-px flex-1">
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
}
