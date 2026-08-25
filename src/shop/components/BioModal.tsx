import { createPortal } from 'react-dom'
import { Icon } from './Icon'

type BioModalProps = {
  name: string
  onClose: () => void
}

/**
 * Opened by "Read bio" on the storefront preview's profile card (Figma
 * `1115:12996`). The bio copy itself has no editable source elsewhere in
 * this app, so it's the same placeholder text the design specifies.
 */
export function BioModal({ name, onClose }: BioModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-scrim"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${name}'s Bio`}
        className="flex w-[400px] max-w-full flex-col items-center overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">{name}’s Bio</p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex w-[40px] items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>
        <div className="flex w-full flex-col items-start px-lg pt-md pb-lg">
          <p className="text-body-sm text-text-secondary-1000">
            Sharing the products I love, use and recommend. Discover my curated favorites and shop them all in
            one place.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
