import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { MAX_FEATURED, sameFeatured, type FeaturedRef } from '../banner-store'
import type { Collection } from '../collections-store'
import { collectionItems, moreLabel } from '../featured'
import type { ShopItem } from '../types'
import { Button } from './Button'
import { ConfirmDialog } from './ConfirmDialog'
import { Icon } from './Icon'
import { PickerEmptyState } from './PickerEmptyState'
import { PillTabs } from './PillTabs'

type Tab = 'collections' | 'products'

type FeaturedItemsDialogProps = {
  items: ShopItem[]
  collections: Collection[]
  /** The saved picks, ticked when the dialog opens. */
  current: FeaturedRef[]
  /** Optional item opened from a product or collection overflow menu. */
  initial?: FeaturedRef
  onClose: () => void
  /** Only called when the picks differ from `current`. */
  onSave: (refs: FeaturedRef[]) => void
  /** Browse Catalogue on the empty state (flow 04): closes the dialog and
   *  opens the catalogue. */
  onBrowseCatalogue: () => void
}

/** The library checkbox (K-Beauty `Checkbox with label`, label hidden). */
function TickBox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-[16px] items-center justify-center rounded-xs border',
        checked ? 'border-surface-primary-500 bg-surface-primary-500' : 'border-border-default bg-surface-secondary-100',
      )}
    >
      {checked && <img src="/assets/icons/checkbox-check.svg" alt="" className="h-[8px] w-[10px]" />}
    </span>
  )
}

function CollectionTile({
  collection,
  items,
  checked,
  disabled,
  onToggle,
}: {
  collection: Collection
  items: ShopItem[]
  checked: boolean
  disabled: boolean
  onToggle: () => void
}) {
  const [first, second, third] = items
  const more = moreLabel(items.length)
  const image = (item: ShopItem | undefined) =>
    item ? (
      <img src={item.product.shopCardImage} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />
    ) : (
      <span aria-hidden="true" className="absolute inset-0 bg-surface-secondary-300" />
    )
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onToggle}
      className={cn('flex w-[224px] flex-col gap-md-sm text-left', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
    >
      <span className="relative block w-full">
        <span className={cn('flex aspect-[288/192] w-full gap-[2px] overflow-clip rounded-md', disabled && 'opacity-40')}>
          <span className="relative h-full min-w-0 flex-[2]">{image(first)}</span>
          <span className="flex h-full min-w-0 flex-1 flex-col gap-[2px]">
            <span className="relative min-h-0 flex-1">{image(second)}</span>
            <span className="relative min-h-0 flex-1 overflow-clip">
              {image(third)}
              {more && (
                <span className="absolute inset-0 flex flex-col items-center justify-center bg-scrim text-center font-medium whitespace-nowrap text-text-secondary-100">
                  <span className="text-[14px] leading-none">{more.count}</span>
                  <span className="text-[9px]">{more.label}</span>
                </span>
              )}
            </span>
          </span>
        </span>
        <span className="absolute top-[6px] right-[6px] flex size-[24px] items-center justify-center">
          <TickBox checked={checked} />
        </span>
        {checked && (
          <span aria-hidden="true" className="pointer-events-none absolute -inset-[3px] rounded-[11px] border-2 border-border-dark" />
        )}
      </span>
      <span className={cn('w-full truncate text-body-md font-medium', disabled ? 'text-text-secondary-500' : 'text-text-secondary-1000')}>
        {collection.name}
      </span>
    </button>
  )
}

function ProductTile({
  item,
  checked,
  disabled,
  onToggle,
}: {
  item: ShopItem
  checked: boolean
  disabled: boolean
  onToggle: () => void
}) {
  const { product } = item
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onToggle}
      className={cn('flex w-[226px] min-w-0 flex-col gap-xs text-left', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
    >
      <span
        className={cn(
          'relative block aspect-square w-full overflow-clip rounded-sm bg-surface-secondary-100',
          checked ? 'border-2 border-border-dark' : 'border border-border-default',
        )}
      >
        <img
          src={product.shopCardImage}
          alt=""
          className={cn('pointer-events-none absolute inset-0 size-full object-cover', checked && 'rounded-xs', disabled && 'opacity-40')}
        />
        {/* 5px in once ticked, 3px otherwise, so the box keeps its place
            inside the thicker border (Work File `3334:57810`). */}
        <span className={cn('absolute flex size-[24px] items-center justify-center', checked ? 'top-[5px] right-[5px]' : 'top-[3px] right-[3px]')}>
          <TickBox checked={checked} />
        </span>
      </span>
      <span className={cn('w-full truncate text-body-sm font-medium', disabled ? 'text-text-secondary-500' : 'text-text-secondary-1000')}>
        {product.name}
      </span>
      <span className={cn('text-body-xs whitespace-nowrap', disabled ? 'text-text-secondary-500' : 'text-text-secondary-700')}>
        {product.brand.toUpperCase()} · {product.price}
      </span>
    </button>
  )
}

/**
 * The Featured items dialog (flow 02, main file `2799:103887`): pick up to
 * two collections or products from the creator's own shop. Collections /
 * Products pills with the search under them; the search filters both tabs
 * and the pill counts show the matches. At 2 of 2 the unticked tiles fade
 * and stop responding. Save Changes is always enabled; with nothing changed
 * it just closes. Closing with unsaved picks asks first, as Change backdrop
 * does.
 */
export function FeaturedItemsDialog({ items, collections, current, initial, onClose, onSave, onBrowseCatalogue }: FeaturedItemsDialogProps) {
  const [picks, setPicks] = useState<FeaturedRef[]>(() => {
    if (!initial || current.some((ref) => ref.kind === initial.kind && ref.id === initial.id) || current.length >= MAX_FEATURED) {
      return current
    }
    return [...current, initial]
  })
  const [tab, setTab] = useState<Tab>(() => (current[0]?.kind === 'product' ? 'products' : 'collections'))
  const [query, setQuery] = useState('')
  const [confirmingDiscard, setConfirmingDiscard] = useState(false)
  const dirty = !sameFeatured(picks, current)
  const full = picks.length >= MAX_FEATURED

  const requestClose = () => {
    if (dirty) setConfirmingDiscard(true)
    else onClose()
  }

  useEffect(() => {
    if (confirmingDiscard) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  })

  const needle = query.trim().toLowerCase()
  // Shoppers never see an empty collection, so it can't be featured.
  const pickableCollections = collections
    .map((collection) => ({ collection, covered: collectionItems(collection, items) }))
    .filter(({ covered }) => covered.length > 0)
  const shownCollections = pickableCollections.filter(({ collection }) => collection.name.toLowerCase().includes(needle))
  const shownProducts = items.filter(({ product }) =>
    `${product.name} ${product.brand}`.toLowerCase().includes(needle),
  )

  const isPicked = (kind: FeaturedRef['kind'], id: string) => picks.some((ref) => ref.kind === kind && ref.id === id)
  const toggle = (pick: FeaturedRef) =>
    setPicks((list) =>
      list.some((ref) => ref.kind === pick.kind && ref.id === pick.id)
        ? list.filter((ref) => !(ref.kind === pick.kind && ref.id === pick.id))
        : list.length < MAX_FEATURED
          ? [...list, pick]
          : list,
    )

  const noMatches = tab === 'collections' ? shownCollections.length === 0 : shownProducts.length === 0
  // No products means no collection with products either (04.2): no search,
  // just the empty state pointing at the catalogue.
  const nothingToFeature = items.length === 0

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-scrim px-md"
        role="presentation"
        onClick={requestClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Featured items"
          onClick={(event) => event.stopPropagation()}
          className="flex h-[820px] max-h-[calc(100vh-80px)] w-[1120px] max-w-full flex-col overflow-clip rounded-lg bg-surface-secondary-100"
        >
          <div className="flex w-full shrink-0 items-center justify-between gap-md border-b border-border-default px-lg py-md">
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              <p className="text-body-xl font-semibold text-text-secondary-1000">Featured items</p>
              <p className="text-body-sm text-text-secondary-700">
                You can only feature products and collections from your shop.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={requestClose}
              className="flex w-[40px] shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="x" srcSize={24} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-md p-lg">
            <p className="flex shrink-0 flex-wrap items-center gap-sm">
              <span className="text-body-md font-medium text-text-secondary-1000">Select up to {MAX_FEATURED} to feature</span>
              <span aria-hidden="true" className="text-body-sm text-text-secondary-700">·</span>
              <span className="text-body-sm text-text-secondary-700" aria-live="polite">
                {picks.length} of {MAX_FEATURED} selected
              </span>
            </p>

            <div className="flex shrink-0 flex-col gap-md-sm">
              <PillTabs
                label="Featured item type"
                tabs={[
                  { id: 'collections', label: `Collections (${shownCollections.length})` },
                  { id: 'products', label: `Products (${shownProducts.length})` },
                ]}
                activeId={tab}
                onChange={setTab}
              />
              {/* With text in it the field darkens, drops the search icon and
                  gets an × that clears it (main file `2799:104371`). */}
              {!nothingToFeature && (
              <div
                className={cn(
                  'flex h-[38px] w-[360px] max-w-full items-center gap-sm rounded-sm border bg-surface-secondary-100 px-md-sm',
                  query ? 'border-surface-primary-500' : 'border-border-default',
                )}
              >
                {!query && <Icon name="search" />}
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={tab === 'collections' ? 'Search collections' : 'Search products'}
                  aria-label={tab === 'collections' ? 'Search collections' : 'Search products'}
                  className="min-w-0 flex-1 truncate bg-transparent text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-700"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery('')}
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-sm p-xs"
                  >
                    <Icon name="x" srcSize={24} />
                  </button>
                )}
              </div>
              )}
            </div>

            {/* The dialog keeps its height across tabs; only the grid scrolls. */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {nothingToFeature ? (
                <div className="flex h-full items-center justify-center">
                  <div className="w-[464px] max-w-full">
                    <PickerEmptyState
                      icon={<Icon name="shopping-bag-lg" size={28} />}
                      title="Nothing to feature yet"
                      body="Add products to your shop or create a collection, then feature them here."
                      action={
                        <button
                          type="button"
                          onClick={onBrowseCatalogue}
                          className="flex cursor-pointer items-center justify-center gap-sm rounded-md border border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                        >
                          Browse Catalogue
                        </button>
                      }
                    />
                  </div>
                </div>
              ) : noMatches && needle ? (
                // No Clear Search button: the field's own ✕ clears it, keeping the ticks and the tab.
                <div className="flex h-full items-center justify-center">
                  <div className="w-[464px] max-w-full">
                    <PickerEmptyState
                      icon={<Icon name="search-lg" size={28} srcSize={32} />}
                      title={`No matches for “${query.trim()}”`}
                      body="Check the spelling, or try a brand or collection name."
                    />
                  </div>
                </div>
              ) : noMatches ? (
                // Products but no collection holding any: the same Picker empty
                // state as a search with no matches (main file `2799:104381`).
                <div className="flex h-full items-center justify-center">
                  <div className="w-[464px] max-w-full">
                    {tab === 'collections' ? (
                      <PickerEmptyState
                        icon={<Icon name="layout-grid" size={28} />}
                        title="No collections to feature"
                        body="Create a collection with products in My Shop, then feature it here."
                      />
                    ) : (
                      <PickerEmptyState
                        icon={<Icon name="shopping-bag-lg" size={28} />}
                        title="No products to feature"
                        body="Add products to your shop, then feature them here."
                      />
                    )}
                  </div>
                </div>
              ) : tab === 'collections' ? (
                <div className="flex flex-wrap content-start gap-md p-[4px]">
                  {shownCollections.map(({ collection, covered }) => {
                    const checked = isPicked('collection', collection.id)
                    return (
                      <CollectionTile
                        key={collection.id}
                        collection={collection}
                        items={covered}
                        checked={checked}
                        disabled={full && !checked}
                        onToggle={() => toggle({ kind: 'collection', id: collection.id })}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap content-start gap-md">
                  {shownProducts.map((item) => {
                    const checked = isPicked('product', item.id)
                    return (
                      <ProductTile
                        key={item.id}
                        item={item}
                        checked={checked}
                        disabled={full && !checked}
                        onToggle={() => toggle({ kind: 'product', id: item.id, productId: item.product.id })}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full shrink-0 justify-end gap-sm border-t border-border-default px-lg py-md">
            <Button variant="outline" onClick={requestClose}>
              Cancel
            </Button>
            <Button onClick={() => (dirty ? onSave(picks) : onClose())}>Save Changes</Button>
          </div>
        </div>
      </div>

      {confirmingDiscard && (
        <ConfirmDialog
          title="Discard your changes?"
          message="You have changes that aren't saved yet. If you discard them, your shop stays as it is."
          cancelLabel="Keep Editing"
          confirmLabel="Discard"
          onClose={() => setConfirmingDiscard(false)}
          onConfirm={onClose}
        />
      )}
    </>
  )
}
