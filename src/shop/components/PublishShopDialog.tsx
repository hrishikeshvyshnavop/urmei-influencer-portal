import { Icon } from './Icon'

type PublishShopDialogProps = {
  /** When false the dialog shows the blocking banner and Publish is disabled. */
  profileComplete: boolean
  /** When false (no products in the shop) the dialog shows a warning banner —
   *  Publish stays clickable, but confirming leads to the blocked-publish
   *  outcome instead of a real publish (Figma `1362:73671`/`1362:73958`). */
  hasProducts: boolean
  onClose: () => void
  onPublish: () => void
  onCompleteProfile: () => void
}

export function PublishShopDialog({
  profileComplete,
  hasProducts,
  onClose,
  onPublish,
  onCompleteProfile,
}: PublishShopDialogProps) {
  const canPublish = profileComplete
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Publish your shop?"
        className="flex w-[400px] flex-col items-center overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">
            Publish your shop?
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex w-[40px] items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-md px-lg pt-md pb-lg">
          <p className="w-full text-body-sm text-text-secondary-700">
            Once published, your products and favorite products will be live and visible to your
            customers.
          </p>

          {!profileComplete && (
            <div className="flex w-full items-center justify-between overflow-clip rounded-md bg-surface-alert-tint px-md-sm py-[6px]">
              <div className="flex items-center gap-ten">
                <Icon name="alert-circle" />
                <p className="text-body-xs text-surface-tertiary-1000">
                  Complete your profile to publish{' '}
                </p>
              </div>
              <button
                type="button"
                onClick={onCompleteProfile}
                className="text-body-xs font-medium text-text-secondary-1000 underline"
              >
                Complete profile
              </button>
            </div>
          )}

          {!hasProducts && (
            <div className="flex w-full items-start overflow-clip rounded-md bg-surface-alert-tint px-md-sm py-sm">
              <div className="flex items-start gap-ten">
                <Icon name="alert-circle" className="mt-[2px]" />
                <div className="flex flex-col gap-xs">
                  <p className="text-body-xs font-semibold text-surface-tertiary-1000">
                    This takes your shop offline
                  </p>
                  <p className="text-body-xs text-text-tertiary-800">
                    It won't show as your storefront on ecom until you add products and publish
                    again.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full items-center gap-sm">
            <button
              type="button"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-sm rounded-md border border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={!canPublish}
              className={[
                'flex flex-1 items-center justify-center gap-sm rounded-md px-md py-sm text-body-sm font-medium',
                canPublish
                  ? 'bg-surface-primary-500 text-text-secondary-100'
                  : 'cursor-default bg-surface-secondary-300 text-text-secondary-500',
              ].join(' ')}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
