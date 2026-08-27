import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Breadcrumb } from '../components/Breadcrumb'
import { CatalogueSearch } from '../components/CatalogueSearch'
import { FiltersSidebar } from '../components/FiltersSidebar'
import { Icon } from '../components/Icon'
import Pagination from '../../components/Pagination'
import { SortDropdown } from '../components/SortDropdown'
import {
  EMPTY_FILTERS,
  applyFilters,
  hasActiveFilters,
  sortProducts,
  type ProductFilters,
  type SortId,
} from '../data/catalogue'
import { useStickyOnScroll } from '../hooks/useStickyOnScroll'
import type { Product } from '../types'

type SearchResultsProps = {
  query: string
  results: Product[]
  onQueryChange: (value: string) => void
  onSearch: (query: string) => void
  onBackToCatalogue: () => void
  onOpenProduct: (product: Product) => void
  onAddToShop: (product: Product) => void
  /** Seeds the Filters panel — e.g. a brand card's "View Products" link
   *  arrives with that brand pre-checked instead of typed into the search box. */
  initialFilters?: ProductFilters
}

function ResultCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product
  onOpen: () => void
  onAdd: () => void
}) {
  return (
    <div className="flex w-full items-center justify-center overflow-clip border-b border-border-default bg-surface-secondary-100 py-md-sm">
      <div className="flex flex-1 items-center gap-md-2">
        <button type="button" onClick={onOpen} className="flex items-center gap-md-2 text-left">
          <img src={product.listImage} alt="" className="size-[105px] rounded-md object-cover" />
          <span className="flex w-[193px] flex-col gap-[6px]">
            <span className="flex w-full flex-col gap-xs">
              <span className="text-body-xs font-medium text-text-secondary-600">
                {product.brand}
              </span>
              <span className="text-body-sm font-medium text-text-secondary-1000">
                {product.name}
              </span>
            </span>
          </span>
        </button>

        <div className="flex flex-1 items-center gap-md-sm">
          <div className="h-[48px] w-px bg-border-default" />
          <div className="flex flex-1 flex-col justify-center gap-[2px]">
            <p className="text-body-md font-medium text-text-secondary-1000">
              {product.priceRange}
            </p>
            <span className="flex w-fit items-center justify-center gap-xs rounded-[24px] bg-surface-secondary-300 px-sm py-xs text-body-xs text-text-secondary-900">
              <span className="font-medium text-text-secondary-1000">
                {product.commissionBadge}
              </span>{' '}
              Commission
            </span>
          </div>

          <div className="h-[48px] w-px bg-border-default" />
          <div className="flex flex-1 flex-col justify-center gap-[2px]">
            <p className="text-body-xs text-text-secondary-700">Available region</p>
            <p className="text-body-sm font-medium text-text-secondary-1000">
              {product.regions.join(', ')}
            </p>
          </div>

          <div className="h-[48px] w-px bg-border-default" />
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 capitalize"
          >
            <Icon name="plus-inverse" />
            Add to shop
          </button>
        </div>
      </div>
    </div>
  )
}

function NoResults() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-fourteen p-md">
      <div className="flex size-[64px] items-center justify-center rounded-full bg-surface-tertiary-500 p-md-sm">
        <Icon name="search-lg" size={32} />
      </div>
      <div className="flex w-full flex-col items-center gap-ten text-center">
        <p className="text-body-xxl font-medium text-text-secondary-1000">
          No products match this search
        </p>
        <p className="text-body-sm text-text-secondary-700">
          Check the spelling, try a shorter phrase, or clear a filter to widen the results.
        </p>
      </div>
    </div>
  )
}

/** Cards per page — also the threshold above which pagination appears at all. */
const PAGE_SIZE = 8

/** Design-space width of the Filters column and the toolbar's height, shared
 *  by the inline layout, the sticky-toolbar portal, and the sticky-Filters
 *  portal so all three stay pixel-aligned. */
const SIDEBAR_WIDTH = 285
const TOOLBAR_HEIGHT = 74

/** The scrolling box the sticky chrome belongs to — the overlay's body. Found
 *  by the same walk `useStickyOnScroll` does, rather than being passed down,
 *  so both agree on which element they're talking about. */
function findScrollParent(from: HTMLElement | null): HTMLElement | null {
  let node = from?.parentElement ?? null
  while (node) {
    if (getComputedStyle(node).overflowY === 'auto') return node
    node = node.parentElement
  }
  return null
}

/**
 * The "Filters"/"Clear All" + "Sort By" bar, spanning the same 285px-sidebar
 * + flex-1-results split as the row below it. Hoisted out of both columns so
 * it can be pulled out of the scrolling flow as one unit (see
 * `useStickyOnScroll`) instead of the two columns' headers drifting apart.
 */
function FiltersSortToolbar({
  filters,
  onChange,
  sortBy,
  onSortChange,
}: {
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
  sortBy: SortId
  onSortChange: (id: SortId) => void
}) {
  return (
    <div className="flex h-[74px] w-full shrink-0 border-b border-border-default bg-surface-secondary-100">
      <div className="flex w-[285px] shrink-0 items-center justify-between px-md py-md-2">
        <p className="text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          Filters
        </p>
        <button
          type="button"
          onClick={() => onChange(EMPTY_FILTERS)}
          className={[
            'text-body-xs font-medium tracking-[1.6px] text-text-secondary-1000 uppercase',
            hasActiveFilters(filters) ? '' : 'invisible',
          ].join(' ')}
        >
          Clear All
        </button>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-end justify-center pt-xs pb-md-sm">
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>
    </div>
  )
}

export function SearchResults({
  query,
  results,
  onQueryChange,
  onSearch,
  onBackToCatalogue,
  onOpenProduct,
  onAddToShop,
  initialFilters = EMPTY_FILTERS,
}: SearchResultsProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [sortBy, setSortBy] = useState<SortId>('relevance')
  const [page, setPage] = useState(1)

  // Owned here, not inside `FiltersSidebar`: that component gets re-parented
  // into `document.body` via a portal once scrolling makes it "stick" (see
  // `useStickyOnScroll` below), and React remounts a portal's subtree when
  // its target container changes — which would otherwise reset local state
  // there and collapse every open filter group.
  const [openFilterGroups, setOpenFilterGroups] = useState<Set<string>>(new Set())
  const [brandSearch, setBrandSearch] = useState('')

  // One group open at a time: opening a group closes whichever was open.
  // Still modelled as a set rather than a single label so the sidebar's
  // `openGroups` API doesn't have to change, and so this can go back to
  // multi-open by restoring the add/delete branch.
  function toggleFilterGroup(label: string) {
    setOpenFilterGroups((current) => (current.has(label) ? new Set() : new Set([label])))
  }

  const visibleResults = useMemo(
    () => sortProducts(applyFilters(results, filters), sortBy),
    [results, filters, sortBy],
  )

  // A new search, filter, or sort invalidates whatever page we were on — reset
  // during render (React's documented pattern) rather than in an effect.
  const [resultsForPageReset, setResultsForPageReset] = useState(visibleResults)
  if (visibleResults !== resultsForPageReset) {
    setResultsForPageReset(visibleResults)
    setPage(1)
  }

  const pageCount = Math.max(1, Math.ceil(visibleResults.length / PAGE_SIZE))
  const pagedResults = visibleResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const rowRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const sticky = useStickyOnScroll(sentinelRef, rowRef)

  // Portal targets for the toolbar and Filters list: a local anchor (normal
  // flow) while not stuck, `document.body` (fixed position) once stuck.
  //
  // Changing a portal's container does NOT preserve the subtree — React
  // remounts it, discarding both its component state and its DOM nodes. So
  // anything that has to survive sticking lives in this component instead:
  // the accordion/search state passed down to `FiltersSidebar`, and the wheel
  // listeners above, which re-attach whenever these targets change.
  const [toolbarAnchor, setToolbarAnchor] = useState<HTMLDivElement | null>(null)
  const [filtersAnchor, setFiltersAnchor] = useState<HTMLDivElement | null>(null)
  const toolbarTarget = sticky.stuck ? document.body : toolbarAnchor
  const filtersTarget = sticky.stuck ? document.body : filtersAnchor

  const toolbarBoxRef = useRef<HTMLDivElement>(null)
  const filtersBoxRef = useRef<HTMLDivElement>(null)

  // The sticky chrome takes the wheel over completely rather than leaving it
  // to native scroll chaining, which can't be trusted here: while stuck these
  // boxes are portaled to `document.body`, so their scroll ancestor is the
  // page *behind* the overlay rather than the overlay's body — left alone, an
  // exhausted rail scrolls the page underneath. (The toolbar is worse: it
  // isn't a scroller at all, so chaining skips straight past it and
  // `overscroll-behavior` there is a no-op.) Each box absorbs what it can and
  // the event is always cancelled, so nothing chains in either state; only
  // `forwardResidual` decides whether the leftover reaches the results list.
  //
  // Registered natively rather than via React's `onWheel`, which is passive at
  // the root: `preventDefault` is unavailable there, and a passive handler
  // races the compositor's own scroll while we're partitioning the delta.
  useEffect(() => {
    type WheelBox = { box: HTMLDivElement; forwardResidual: boolean }
    const boxes = [
      // The Filters rail keeps its scrolling to itself. Running off its end
      // used to carry on into the results list, which made the list jump
      // while the pointer was still over the filters; hitting the end of the
      // filters should simply stop.
      { box: filtersBoxRef.current, forwardResidual: false },
      // The toolbar has no scroll of its own and spans the results column, so
      // moving the list is the only thing a wheel there can sensibly do.
      { box: toolbarBoxRef.current, forwardResidual: true },
    ].filter((entry): entry is WheelBox => entry.box !== null)
    if (boxes.length === 0) return

    const detach = boxes.map(({ box, forwardResidual }) => {
      function onWheel(event: WheelEvent) {
        // A mouse wheel commonly reports lines rather than pixels.
        const dy =
          event.deltaMode === 1
            ? event.deltaY * 16
            : event.deltaMode === 2
              ? event.deltaY * box.clientHeight
              : event.deltaY
        if (dy === 0) return

        const max = box.scrollHeight - box.clientHeight
        const next = Math.max(0, Math.min(box.scrollTop + dy, max))
        const absorbed = next - box.scrollTop
        box.scrollTop = next

        const residual = dy - absorbed
        if (forwardResidual && residual !== 0) {
          const list = findScrollParent(filtersAnchor)
          if (list) list.scrollTop += residual
        }
        event.preventDefault()
      }

      box.addEventListener('wheel', onWheel, { passive: false })
      return () => box.removeEventListener('wheel', onWheel)
    })

    return () => detach.forEach((remove) => remove())
    // Keyed on the portal *targets*, not the anchors. The wrappers only exist
    // once an anchor does, so a mount-only effect would attach to nothing —
    // and changing a portal's container remounts its subtree (see
    // `FiltersSidebar`), so sticking replaces these nodes with fresh ones and
    // the listeners have to be re-attached. Watching the anchors alone left
    // them bound to the detached copies, so the wheel went unhandled in
    // exactly the stuck state this exists to fix.
  }, [toolbarTarget, filtersTarget, filtersAnchor])

  // While stuck, the Filters list moves out of `filtersAnchor` and into a
  // `position: fixed` box, leaving the anchor (still sitting in the row,
  // beside the results column) empty — collapsing to zero height. With only
  // a handful of results the row, and so the whole scrollable overlay body,
  // would then shrink to barely more than the toolbar, capping how far the
  // page can scroll — which clamps `scrollTop` back down, which un-crosses
  // the sentinel, flipping `stuck` back to false, right back to the tall
  // inline layout, re-crossing the sentinel, flipping stuck true again...
  // The anchor's wrapper reserves just enough height to break that loop:
  // exactly what the fixed panel itself occupies on screen (the same bound
  // its own `maxHeight` below is clipped to), not the sidebar's full
  // (possibly much taller, all-groups-open) content height — reserving the
  // real content height kept the page scrollable, but also meant scrolling
  // that far past a short results list, with nothing else on screen, read
  // as scrolling into dead space. The fixed panel itself is already fully
  // reachable within this smaller bound via its own internal scroll.
  const stuckFiltersHeight = sticky.bottom - (sticky.top + TOOLBAR_HEIGHT)

  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Breadcrumb
          items={[{ label: 'Catalogue', onClick: onBackToCatalogue }, { label: 'Search' }]}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-fourteen px-margin pt-md-2 pb-5xl">
        <CatalogueSearch
          className="w-[384px]"
          value={query}
          onChange={onQueryChange}
          onSubmit={onSearch}
        />

        <div
          ref={sentinelRef}
          className="w-full"
          style={sticky.stuck ? { height: TOOLBAR_HEIGHT } : undefined}
        >
          <div ref={setToolbarAnchor} className="w-full" />
        </div>

        <div ref={rowRef} className="flex w-full items-start">
          <div
            style={
              sticky.stuck
                ? { width: SIDEBAR_WIDTH, flexShrink: 0, minHeight: stuckFiltersHeight }
                : undefined
            }
          >
            <div ref={setFiltersAnchor} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-end gap-3xl">
            <div className="flex w-full shrink-0 flex-col items-start gap-md-sm pl-xxl">
              {visibleResults.length === 0 ? (
                <NoResults />
              ) : (
                pagedResults.map((product, index) => (
                  <ResultCard
                    key={`${product.id}-${index}`}
                    product={product}
                    onOpen={() => onOpenProduct(product)}
                    onAdd={() => onAddToShop(product)}
                  />
                ))
              )}
            </div>

            {visibleResults.length > PAGE_SIZE && (
              <Pagination page={page} pageCount={pageCount} onChange={setPage} />
            )}
          </div>
        </div>
      </div>

      {toolbarTarget &&
        createPortal(
          <div
            ref={toolbarBoxRef}
            // Marks this as the overlay's own chrome even while it's portaled
            // out to `document.body` — see the matching comment on the Filters
            // wrapper below.
            data-overlay-scroll="allow"
            style={
              sticky.stuck
                ? { position: 'fixed', top: sticky.top, left: sticky.left, width: sticky.width, zIndex: 40 }
                : undefined
            }
          >
            <FiltersSortToolbar filters={filters} onChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} />
          </div>,
          toolbarTarget,
        )}

      {filtersTarget &&
        createPortal(
          <div
            ref={filtersBoxRef}
            // Once stuck, this wrapper is portaled to `document.body`, which
            // puts it outside the scroll container `BrowseOverlay` uses to
            // decide whether a wheel/touch/key event belongs to the overlay or
            // to the locked page behind it. Without this marker the overlay
            // read the rail as "the page" and cancelled the event, so the rail
            // could only be scrolled by dragging its scrollbar thumb — the one
            // input that isn't a wheel or a key. Harmless when not stuck.
            data-overlay-scroll="allow"
            // `maxHeight`/`overflowY` apply unconditionally, not just once
            // stuck: capping the Filters list to one viewport's worth (with
            // its own scrollbar) whether stuck or not keeps its rendered
            // height identical across the transition — so there's nothing
            // for the reserved placeholder above to reconcile — and keeps
            // the product listing's own scroll range from ballooning to
            // match however many filter groups happen to be expanded.
            style={{
              maxHeight: stuckFiltersHeight,
              overflowY: 'auto',
              // Belt to the wheel handler's braces, and the only guard for
              // touch: keeps a flick that runs past the rail's end from
              // scrolling the page behind the overlay.
              overscrollBehavior: 'contain',
              // Set in both states so the scrollbar's gutter comes out of the
              // rail's own width rather than pushing the results column, and
              // so the column measures the same stuck or not.
              width: SIDEBAR_WIDTH,
              ...(sticky.stuck
                ? { position: 'fixed', top: sticky.top + TOOLBAR_HEIGHT, left: sticky.left, zIndex: 39 }
                : undefined),
            }}
            // The scrollbar has to stay visible here. Elsewhere in the app it's
            // hidden (Home's carousel, the featured strips) because those are
            // horizontal and have prev/next buttons as the affordance; this
            // rail has none, so hiding it made a list that does scroll read as
            // one that doesn't once several groups were expanded.
            //
            // Styled with the standard properties rather than `::-webkit-
            // scrollbar` pseudo-elements: Chrome now implements
            // `scrollbar-width`/`scrollbar-color` natively and ignores the
            // legacy pseudo-element rules whenever either is set.
            className="[scrollbar-color:var(--color-border-outlined)_transparent] [scrollbar-width:thin]"
          >
            <FiltersSidebar
              filters={filters}
              onChange={setFilters}
              openGroups={openFilterGroups}
              onToggleGroup={toggleFilterGroup}
              brandSearch={brandSearch}
              onBrandSearchChange={setBrandSearch}
            />
          </div>,
          filtersTarget,
        )}
    </div>
  )
}
