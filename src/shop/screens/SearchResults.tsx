import { useMemo, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { CatalogueSearch } from '../components/CatalogueSearch'
import { FiltersSidebar } from '../components/FiltersSidebar'
import { Icon } from '../components/Icon'
import { SortDropdown } from '../components/SortDropdown'
import { EMPTY_FILTERS, applyFilters, sortProducts, type SortId } from '../data/catalogue'
import type { Product } from '../types'

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

function Pagination() {
  return (
    <div className="flex w-full items-center justify-center gap-sm overflow-clip pt-md">
      <button type="button" aria-label="Previous page" className="size-[38px]">
        <img src="/assets/icons/page-prev.svg" alt="" className="size-full" />
      </button>
      {[1, 2, 3, 4].map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === 1 ? 'page' : undefined}
          className={[
            'flex size-[38px] items-center justify-center overflow-clip rounded-md text-body-sm leading-[1.4] font-medium',
            page === 1
              ? 'bg-surface-primary-500 text-text-secondary-100'
              : 'border border-border-default bg-surface-secondary-100 text-text-secondary-1000',
          ].join(' ')}
        >
          {page}
        </button>
      ))}
      <button type="button" aria-label="Next page" className="size-[38px]">
        <img src="/assets/icons/page-next.svg" alt="" className="size-full" />
      </button>
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
}: SearchResultsProps) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState<SortId>('relevance')

  const visibleResults = useMemo(
    () => sortProducts(applyFilters(results, filters), sortBy),
    [results, filters, sortBy],
  )

  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Breadcrumb
          items={[{ label: 'Catalogue', onClick: onBackToCatalogue }, { label: 'Search' }]}
        />
      </div>

      <div className="flex w-full flex-col items-start px-margin pt-md-2">
        <CatalogueSearch
          className="w-[384px]"
          value={query}
          onChange={onQueryChange}
          onSubmit={onSearch}
        />

        <div className="mt-[34px] flex w-full items-start">
          <FiltersSidebar filters={filters} onChange={setFilters} />

          <div className="flex min-w-0 flex-1 flex-col items-end gap-3xl">
            <div className="flex h-[74px] w-full flex-col items-end justify-center border-b border-border-default pt-xs pb-md-sm">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <div className="flex w-full flex-col items-start gap-md-sm pl-xxl">
              {visibleResults.length === 0 ? (
                <NoResults />
              ) : (
                visibleResults.map((product, index) => (
                  <ResultCard
                    key={`${product.id}-${index}`}
                    product={product}
                    onOpen={() => onOpenProduct(product)}
                    onAdd={() => onAddToShop(product)}
                  />
                ))
              )}
            </div>

            {visibleResults.length > 0 && <Pagination />}
          </div>
        </div>
      </div>
    </div>
  )
}
