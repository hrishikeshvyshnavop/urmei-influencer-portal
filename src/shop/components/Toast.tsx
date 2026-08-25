import { Icon } from './Icon'

type ToastAction = { label: string; onClick: () => void }

type ToastProps = {
  message: string
  /** check-circle (success, default) or x-circle (blocked/error). */
  variant?: 'success' | 'error'
  /** e.g. "Manage Slot" on the featured-slots-full toast — fixes the toast at 400px wide. */
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
          'motion-toast pointer-events-auto flex items-center gap-md-sm rounded-md bg-surface-primary-500 p-md-sm',
          action ? 'w-[400px] justify-between' : 'w-fit',
        ].join(' ')}
      >
        <span className="flex items-center gap-sm">
          <Icon name={variant === 'success' ? 'check-circle' : 'x-circle'} size={22} />
          <span className="truncate text-body-sm font-medium text-text-secondary-100">
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
