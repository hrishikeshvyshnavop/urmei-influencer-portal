import { useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { CatalogueSearch } from '../components/CatalogueSearch'
import { FiltersSidebar } from '../components/FiltersSidebar'
import { Icon } from '../components/Icon'
import Pagination from '../../components/Pagination'
import { SortDropdown } from '../components/SortDropdown'
import { EMPTY_FILTERS, applyFilters, sortProducts, type SortId } from '../data/catalogue'
import { useFitScale } from '../hooks/useFitScale'
import type { Product } from '../types'

function findScrollAncestor(node: HTMLElement): HTMLElement | null {
  let current = node.parentElement
  while (current) {
    if (getComputedStyle(current).overflowY === 'auto') return current
    current = current.parentElement
  }
  return null
}

/**
 * Height (in this screen's 1440-wide design space) for the results column so
 * it scrolls in its own pane, ending flush with the bottom of the overlay's
 * real scroll viewport. `position: sticky` on the Filters sidebar can't be
 * used instead — `ScaledBox`'s `transform: scale()` ancestor makes sticky
 * degrade to static (see `BrowseOverlay`'s header comment for the same
 * issue) — so the sidebar sticks by simply never being part of a scrolling
 * region: only its sibling column scrolls, in a pane sized to fit exactly.
 */
function useResultsPaneHeight(rowRef: RefObject<HTMLDivElement | null>) {
  const scale = useFitScale(1440)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return
    const scrollParent = findScrollAncestor(row)
    if (!scrollParent) return

    function measure() {
      if (!row || !scrollParent) return
      // Measure as if unscrolled, so an in-progress scroll doesn't skew the result.
      const savedScrollTop = scrollParent.scrollTop
      scrollParent.scrollTop = 0
      const rowTop = row.getBoundingClientRect().top
      const containerBottom = scrollParent.getBoundingClientRect().bottom
      scrollParent.scrollTop = savedScrollTop

      setHeight(Math.max(400, (containerBottom - rowTop) / scale))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [rowRef, scale])

  return height
}

type SearchResultsProps = {
  query: string
  results: Product[]
  onQueryChange: (value: string) => void
  onSearch: (query: string) => void
  onBackToCatalogue: () => void
  onOpenProduct: (product: Product) => void
  onAddToShop: (product: Product) => void
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

export function SearchResults({
  query,
  results,
  onQueryChange,
  onSearch,
  onBackToCatalogue,
  onOpenProduct,
  onAddToShop,
}: SearchResultsProps) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState<SortId>('relevance')
  const [page, setPage] = useState(1)

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
  const paneHeight = useResultsPaneHeight(rowRef)

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

        <div ref={rowRef} className="flex w-full items-start">
          <FiltersSidebar filters={filters} onChange={setFilters} />

          <div
            style={paneHeight ? { height: paneHeight } : undefined}
            className="flex min-w-0 flex-1 flex-col items-end gap-3xl overflow-y-auto"
          >
            <div className="flex h-[74px] w-full shrink-0 flex-col items-end justify-center border-b border-border-default pt-xs pb-md-sm">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

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
    </div>
  )
}
