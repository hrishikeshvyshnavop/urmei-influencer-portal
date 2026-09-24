import { useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'
import type { Product } from '../types'

/**
 * The signed-in shopper's address, drawn straight from Figma `916:67136`. A
 * design literal like the site header's cart count: this storefront has no
 * shopper account behind it to read a real address from, and the design's whole
 * point is that a signed-in shopper doesn't have to type one. (The confirmation
 * frames spell other addresses — `sara@example.com` in `916:*` and
 * `charlotte@gmail.com` in the `1616:67001` revision — but the latter is the
 * creator's own name, and this storefront is hers, so a neutral shopper address
 * is kept and used by both steps.)
 */
const ACCOUNT_EMAIL = 'sara.tan@gmail.com'

type NotifyMeDialogProps = {
  product: Product
  /** Market the shopper is browsing — the one they're waiting on stock for. */
  country: string
  /** Storefront owner, for the confirmation step's "Back to X's shop". */
  creatorName: string
  onClose: () => void
  /** Confirmation step's second action: close this and leave the product page. */
  onBackToShop: () => void
}

/**
 * Shared shell for both steps (Figma `916:67136` / `916:67022`) — same 400px
 * card, same scrim. Only the body differs, so the two steps are two bodies
 * rather than two dialogs.
 *
 * Portaled to `document.body` because the storefront preview renders this
 * product page inside `ScaledBox`, and a `transform` ancestor becomes the
 * containing block for `position: fixed` descendants: `inset-0` would resolve
 * against the scaled page rather than the viewport, centring the card halfway
 * down the whole document (usually off-screen) and scaling it along with the
 * page. Same escape hatch `FloatingPanel` uses for the same reason.
 */
function DialogShell({
  children,
  labelledBy,
}: {
  children: ReactNode
  labelledBy: string
}) {
  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy}
        className="flex w-[400px] flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18)]"
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

/**
 * "Get notified" flow for a product that doesn't ship to the shopper's market
 * yet (Figma section `1464:20408`). Opened from the product page's
 * not-available panel; two steps in one component — the request, then the
 * confirmation.
 *
 * Nothing is actually subscribed: there's no notifications backend, and the
 * design's own copy ("no account needed") describes a service this prototype
 * doesn't have. The flow is complete and the states are real; only the send is
 * missing.
 */
export function NotifyMeDialog({
  product,
  country,
  creatorName,
  onClose,
  onBackToShop,
}: NotifyMeDialogProps) {
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    /* Modal / Notify — confirmed (`916:67022`). No header row on this step: the
       two actions below carry the close, so there's no × to duplicate them. */
    return (
      <DialogShell labelledBy="You're on the list">
        <div className="flex w-full flex-col items-center gap-md px-lg pt-md pb-lg">
          <div className="flex w-full flex-col items-center gap-ten">
            <Icon name="check-circle-big" size={40} srcSize={40} />
            <p className="text-body-xl font-medium text-text-secondary-1000">You&apos;re on the list</p>
            <p className="w-full text-center text-body-sm text-text-secondary-700">
              We&apos;ll email {ACCOUNT_EMAIL} as soon as {product.name} is available in {country}.
            </p>
          </div>

          <div className="flex w-full flex-col gap-sm">
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onBackToShop}
              className="flex w-full items-center justify-center rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm font-medium text-text-secondary-1000"
            >
              Back to {creatorName}&apos;s shop
            </button>
          </div>
        </div>
      </DialogShell>
    )
  }

  /* Modal / Notify when available — signed in (`916:67136`) */
  return (
    <DialogShell labelledBy="Get notified">
      <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
        <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">Get notified</p>
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
          We&apos;ll email you when this lands in {country}.
        </p>

        <div className="flex w-full items-center gap-md-sm rounded-md bg-surface-tertiary-100 p-md-sm">
          <img
            src={product.listImage}
            alt=""
            className="size-[44px] shrink-0 rounded-sm object-cover"
          />
          <div className="flex min-w-px flex-col">
            <p className="text-[13px] leading-[1.4] text-text-secondary-700">{product.brand}</p>
            <p className="truncate text-body-sm font-medium text-text-secondary-1000">
              {product.name}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[6px] rounded-md border border-[#e6e5e4] px-md py-fourteen">
          <p className="text-[13px] leading-[1.4] text-text-secondary-700">We&apos;ll email you at</p>
          <p className="text-body-md font-medium text-text-secondary-1000">{ACCOUNT_EMAIL}</p>
        </div>

        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100"
        >
          Notify me
        </button>

        <p className="w-full text-body-xs leading-[1.4] text-border-outlined">
          We&apos;ll only use this for this one alert. Unsubscribe any time from your notification
          settings.
        </p>
      </div>
    </DialogShell>
  )
}
