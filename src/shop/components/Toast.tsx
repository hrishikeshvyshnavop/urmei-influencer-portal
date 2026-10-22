import { Icon } from './Icon'

type ToastAction = { label: string; onClick: () => void }

type ToastProps = {
  message: string
  /** check-circle (success, default) or x-circle (blocked/error). */
  variant?: 'success' | 'error'
  /** e.g. "Undo" after removing from a collection (Figma `1862:81759`). */
  action?: ToastAction
}

/** Figma's Toast Container is a fixed 146px-tall band pinned to the top of
 *  every screen (My Shop and both Product Detail frames), with the toast
 *  bottom-aligned inside it — 92px from the top, identically everywhere. */
const TOAST_TOP = 92

export function Toast({ message, variant = 'success', action }: ToastProps) {
  return (
    <div
      className="pointer-events-none fixed left-1/2 z-50 -translate-x-1/2"
      style={{ top: TOAST_TOP }}
    >
      <div
        role="status"
        className={[
          'motion-toast pointer-events-auto flex w-max max-w-[calc(100vw-32px)] items-center rounded-md bg-surface-primary-500 p-md-sm',
          // The design hugs the message on one line with 108px before the
          // action; a fixed width wrapped or clipped longer messages such as
          // "Removed from My morning routine. Still in your shop."
          action ? 'gap-[108px]' : 'gap-md-sm',
        ].join(' ')}
      >
        <span className="flex min-w-0 items-center gap-sm">
          <Icon name={variant === 'success' ? 'check-circle' : 'x-circle'} size={22} />
          <span className="min-w-0 truncate text-body-sm font-medium whitespace-nowrap text-text-secondary-100">
            {message}
          </span>
        </span>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="flex shrink-0 items-center justify-center gap-sm rounded-md border border-border-default px-sm py-xs text-body-xs font-medium whitespace-nowrap text-text-secondary-100 capitalize"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}
