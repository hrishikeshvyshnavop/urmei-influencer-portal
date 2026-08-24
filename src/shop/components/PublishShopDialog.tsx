import { Icon } from './Icon'

type PublishShopDialogProps = {
  /** When false the dialog shows the blocking banner and Publish is disabled. */
  profileComplete: boolean
  onClose: () => void
  onPublish: () => void
  onCompleteProfile: () => void
}

export function PublishShopDialog({
  profileComplete,
  onClose,
  onPublish,
  onCompleteProfile,
}: PublishShopDialogProps) {
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
            Once published, your products and featured products will be live and visible to your
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
              disabled={!profileComplete}
              className={[
                'flex flex-1 items-center justify-center gap-sm rounded-md px-md py-sm text-body-sm font-medium',
                profileComplete
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
