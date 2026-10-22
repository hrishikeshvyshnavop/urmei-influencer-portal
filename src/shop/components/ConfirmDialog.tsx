import { useEffect, type ReactNode } from 'react'
import { Icon } from './Icon'

type ConfirmDialogProps = {
  title: string
  message: ReactNode
  confirmLabel: string
  /** Defaults to Cancel; the discard confirm says Keep Editing. */
  cancelLabel?: string
  onClose: () => void
  onConfirm: () => void
}

/**
 * The shop's 525px confirm dialog (Figma `1862:87536` "Delete this
 * collection?", `1862:81877` "Remove from this collection?"): a bordered
 * header with the 40px close button, a 16px message, and Cancel / confirm
 * splitting the width. Escape, the × and Cancel all close without acting.
 */
export function ConfirmDialog({ title, message, confirmLabel, cancelLabel = 'Cancel', onClose, onConfirm }: ConfirmDialogProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex w-[525px] flex-col items-center overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">{title}</p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex w-[40px] items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-lg px-lg pt-md pb-lg">
          <p className="text-body-md leading-[24px] text-text-secondary-700">{message}</p>
          <div className="flex w-full items-center gap-md-sm">
            <button
              type="button"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-sm rounded-md border border-surface-primary-200 px-md py-sm text-body-sm font-medium text-text-secondary-1000"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex flex-1 items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 capitalize"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
