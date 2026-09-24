import { useState, type ReactNode } from 'react'
import AppShell from '../../portal/components/AppShell'
import { requestProductTour } from '../../portal/tour-status'
import { Breadcrumb } from '../components/Breadcrumb'
import { PeriodFilter } from '../components/PeriodFilter'
import { ProductListingCard } from '../components/ShopProductCard'
import { affiliateLinkFor, formatShopDate, hasLiveLink } from '../data/shop'
import {
  ORIGIN_CRUMBS,
  STAT_SPECS,
  statsBreakdownHash,
  statsForProduct,
  type StatMetric,
  type StatsOrigin,
} from '../data/stats'
import { loadPublishedAt, loadShopItems } from '../shop-items-store'
import type { ShopItem } from '../types'
import { navigate } from '../../router'

const TABS = ['Sales', 'Performance', 'Details'] as const
type Tab = (typeof TABS)[number]

/**
 * The crumb trail, built from where the user came in: Home or My Shop, then the
 * breakdown they clicked through (absent when they arrived from a product's
 * performance card, which links straight here), then this product.
 */
function crumbsFor(origin: StatsOrigin, via: StatMetric | undefined, productName: string) {
  const root = ORIGIN_CRUMBS[origin]
  return [
    {
      label: root.label,
      onClick: () => {
        navigate(root.hash)
      },
    },
    ...(via
      ? [
          {
            label: STAT_SPECS[via].crumb,
            onClick: () => {
              navigate(statsBreakdownHash(via, origin))
            },
          },
        ]
      : []),
    { label: productName },
  ]
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-[80px] flex-col justify-center rounded-md bg-surface-secondary-300 px-md-sm">
      <p className="w-full text-body-xl font-semibold text-text-secondary-1000">{value}</p>
      <p className="w-full text-body-sm font-medium text-text-secondary-700">{label}</p>
    </div>
  )
}

/** The 2-up tile grid both the Sales and Performance tabs draw. */
function Tiles({ children }: { children: ReactNode }) {
  return <div className="grid w-full grid-cols-2 gap-fourteen">{children}</div>
}

/**
 * One product's stats, reached from a stats-breakdown row or straight from
 * Home's top-performing cards (Figma `1619:40702` Sales, `1619:40759`
 * Performance, `1619:40813` Details).
 *
 * The three tabs are three views of the same product rather than three pages:
 * Sales carries the earnings, Performance the traffic, and Details the terms
 * — selling price and commission per sale — with the affiliate link and the
 * regions it sells in. The link comes from `affiliateLinkFor` — the frame
 * prints "uermi.charlotte/klairs", which is both a typo and a different shape
 * from the link every other screen in the shop copies.
 */
export function ProductStats({
  itemId,
  origin,
  via,
}: {
  itemId: string
  origin: StatsOrigin
  /** The breakdown page this was opened from, when there was one. */
  via?: StatMetric
}) {
  const [items] = useState(loadShopItems)
  const [tab, setTab] = useState<Tab>('Sales')
  const [copied, setCopied] = useState(false)

  const item: ShopItem | undefined = items.find((row) => row.id === itemId)

  if (!item) {
    return (
      <AppShell
        className="bg-surface-secondary-100"
        onShowTour={requestProductTour}
        onShowHelp={() => {
          navigate('/help-center')
        }}
      >
        <main className="mx-auto flex flex-1 w-full max-w-[1440px] flex-col items-center px-6 pt-8 pb-16">
          <div className="flex w-full max-w-[794px] flex-col items-start">
            <div className="w-full py-sm">
              <Breadcrumb items={crumbsFor(origin, via, 'Stats')} />
            </div>
            <p className="text-body-md text-text-secondary-700">
              This product is no longer in your shop.
            </p>
          </div>
        </main>
      </AppShell>
    )
  }

  const { product } = item
  const stats = statsForProduct(product)
  const link = affiliateLinkFor(product)
  // Read straight from storage: this page is portal-routed, so the shop app —
  // which holds the publish state in memory — is not mounted around it.
  const linkLive = hasLiveLink(item, loadPublishedAt())

  const copyLink = () => {
    void navigator.clipboard?.writeText(link)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AppShell
      className="bg-surface-secondary-100"
      onShowTour={requestProductTour}
      onShowHelp={() => {
        navigate('/help-center')
      }}
    >
      <main className="mx-auto flex flex-1 w-full max-w-[1440px] flex-col items-center px-6 pt-8 pb-16">
        <div className="flex w-full max-w-[794px] flex-col items-start">
          <div className="flex w-full items-center justify-between py-sm">
            <Breadcrumb items={crumbsFor(origin, via, product.name)} />
            <PeriodFilter />
          </div>

          <div className="flex w-full flex-col items-start gap-lg lg:flex-row">
            {/* The shop's own listing card, minus its menu and its pricing
                block: this page is a read-out, every action already lives on
                the shop itself, and the price, commission and regions are all
                printed in the column beside it (Figma `1652:59725`). */}
            <div className="w-full shrink-0 lg:w-[330px]">
              <ProductListingCard item={item} titleOnly />
            </div>

            <div className="flex min-w-px flex-1 flex-col items-start gap-md-sm">
              <p className="text-body-sm font-medium text-text-secondary-900">
                {item.addedAt
                  ? `Added to shop on ${formatShopDate(new Date(item.addedAt))}`
                  : // Items saved before the shop recorded an added-at date.
                    'Added to shop'}
              </p>

              <div className="flex w-full flex-col items-start gap-md-sm">
                <div className="flex items-center gap-ten" role="tablist">
                  {TABS.map((name) => (
                    <button
                      key={name}
                      type="button"
                      role="tab"
                      aria-selected={tab === name}
                      onClick={() => setTab(name)}
                      className={[
                        'rounded-full border px-md py-sm text-body-md transition-colors duration-200',
                        tab === name
                          ? 'border-transparent bg-surface-tertiary-1000 text-text-secondary-100'
                          : 'border-border-default bg-surface-secondary-100 text-text-secondary-700 hover:bg-surface-secondary-300',
                      ].join(' ')}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {tab === 'Sales' && (
                  <Tiles>
                    <Tile value={`${stats.sales} Unit`} label="Sales" />
                    <Tile value={`S$${stats.commissionPending}`} label="Commission Pending" />
                    <Tile value={`S$${stats.commissionOwned}`} label="Commission Owned" />
                    <Tile value={`S$${stats.commissionSettled}`} label="Commission Settled" />
                  </Tiles>
                )}

                {tab === 'Performance' && (
                  <Tiles>
                    <Tile value={String(stats.clicks)} label="Clicks" />
                    <Tile value={`${stats.conversionRate}%`} label="Conversion Rate" />
                  </Tiles>
                )}

                {tab === 'Details' && (
                  <div className="flex w-full flex-col items-start gap-md-sm">
                    <Tiles>
                      <Tile value={product.price} label="Selling Price" />
                      <Tile value={`${stats.commissionPerSale}%`} label="Commission Per Sale" />
                    </Tiles>

                    <div className="flex w-full items-center gap-md-sm rounded-lg border border-border-default bg-surface-secondary-100 p-ten">
                      <span className="size-[65px] shrink-0 overflow-hidden rounded-sm bg-surface-secondary-300">
                        <img src={product.listImage} alt="" className="size-full object-cover" />
                      </span>
                      <span className="flex min-w-px flex-1 flex-col gap-xs">
                        <span className="text-body-sm font-medium text-text-secondary-700">
                          Share product link to earn
                        </span>
                        <span className="flex items-center gap-xs rounded-lg bg-surface-secondary-300 py-[6px] pr-[6px] pl-md-sm">
                          {/* Same placeholder the product-detail link row shows: the
                              link is minted by publishing, so there is nothing to
                              copy until this product is on the live storefront. */}
                          <span
                            className={`min-w-px flex-1 truncate text-body-sm ${
                              linkLive ? 'text-text-secondary-900' : 'text-text-secondary-600'
                            }`}
                          >
                            {linkLive ? link : 'Publish shop to get your product URL'}
                          </span>
                          {linkLive && (
                            <button
                              type="button"
                              onClick={copyLink}
                              className="shrink-0 rounded-md bg-surface-primary-500 px-sm py-xs text-body-xs font-medium text-text-secondary-100"
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </button>
                          )}
                        </span>
                      </span>
                    </div>

                    <p className="w-full text-body-sm text-text-secondary-700">
                      Available in{' '}
                      <span className="font-medium text-text-secondary-1000">
                        {product.regions.join(' & ')}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  )
}
