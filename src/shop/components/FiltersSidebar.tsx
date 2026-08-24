import { useState, type ReactNode } from 'react'
import {
  CATEGORIES,
  EMPTY_FILTERS,
  FILTER_BRANDS,
  INGREDIENTS,
  PRICE_BUCKETS,
  RATING_THRESHOLDS,
  hasActiveFilters,
  type ProductFilters,
} from '../data/catalogue'
import { Checkbox } from './Checkbox'
import { Icon } from './Icon'

type FiltersSidebarProps = {
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]
}

function FilterGroup({
  label,
  open,
  onToggle,
  children,
  last = false,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  /** The design omits the bottom border on the last (Ingredients) group. */
  last?: boolean
}) {
  return (
    <div
      className={[
        'flex w-full flex-col items-start border-r border-border-default',
        last ? '' : 'border-b',
      ].join(' ')}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between px-md py-lg"
      >
        <span className="text-body-lg text-text-secondary-1000">{label}</span>
        <Icon
          name="chevron-down"
          srcSize={24}
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>
      {open && <div className="flex w-full flex-col items-start gap-md-sm px-md pb-lg">{children}</div>}
    </div>
  )
}

/**
 * Search Results' left filter rail (Figma `1184:70079`). Brand, Price, Rating,
 * Category, and Ingredients each expand independently (the design shows all
 * five open at once in one frame and all collapsed in another, not a
 * single-open accordion). Brand/Price/Category/Ingredients content in the
 * design references brands and shipping options we don't carry — the filter
 * TYPES and interaction (checkbox lists, a "Search brands" box) are Figma's;
 * the values are this catalogue's real brands, categories and ingredients so
 * every filter actually narrows real results.
 */
export function FiltersSidebar({ filters, onChange }: FiltersSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [brandSearch, setBrandSearch] = useState('')

  function toggleGroup(label: string) {
    setOpenGroups((current) => {
      const next = new Set(current)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  const visibleBrands = FILTER_BRANDS.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  )

  return (
    <aside className="flex w-[285px] flex-col items-start self-start bg-surface-secondary-100">
      <div className="flex h-[74px] w-full items-center justify-between border-r border-b border-border-default px-md py-md-2">
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

      <FilterGroup label="Brand" open={openGroups.has('Brand')} onToggle={() => toggleGroup('Brand')}>
        <div className="flex w-full items-center gap-sm rounded-sm border border-border-default px-md-sm py-sm">
          <Icon name="search" />
          <input
            type="text"
            value={brandSearch}
            onChange={(event) => setBrandSearch(event.target.value)}
            placeholder="Search brands"
            className="w-full text-body-sm text-text-secondary-1000 placeholder:text-text-secondary-700 focus:outline-none"
          />
        </div>
        {visibleBrands.map((brand) => (
          <Checkbox
            key={brand}
            label={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => onChange({ ...filters, brands: toggleInList(filters.brands, brand) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Price" open={openGroups.has('Price')} onToggle={() => toggleGroup('Price')}>
        {PRICE_BUCKETS.map((bucket) => (
          <Checkbox
            key={bucket.id}
            label={bucket.label}
            checked={filters.priceBuckets.includes(bucket.id)}
            onChange={() =>
              onChange({ ...filters, priceBuckets: toggleInList(filters.priceBuckets, bucket.id) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Rating" open={openGroups.has('Rating')} onToggle={() => toggleGroup('Rating')}>
        {RATING_THRESHOLDS.map((threshold) => (
          <Checkbox
            key={threshold.min}
            label={threshold.label}
            checked={filters.ratingThresholds.includes(threshold.min)}
            onChange={() =>
              onChange({
                ...filters,
                ratingThresholds:
                  filters.ratingThresholds.includes(threshold.min)
                    ? filters.ratingThresholds.filter((value) => value !== threshold.min)
                    : [...filters.ratingThresholds, threshold.min],
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Category" open={openGroups.has('Category')} onToggle={() => toggleGroup('Category')}>
        {CATEGORIES.map((category) => (
          <Checkbox
            key={category.label}
            label={category.label}
            checked={filters.categories.includes(category.label)}
            onChange={() =>
              onChange({ ...filters, categories: toggleInList(filters.categories, category.label) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup
        label="Ingredients"
        open={openGroups.has('Ingredients')}
        onToggle={() => toggleGroup('Ingredients')}
        last
      >
        {INGREDIENTS.map((ingredient) => (
          <Checkbox
            key={ingredient.label}
            label={ingredient.label}
            checked={filters.ingredients.includes(ingredient.label)}
            onChange={() =>
              onChange({ ...filters, ingredients: toggleInList(filters.ingredients, ingredient.label) })
            }
          />
        ))}
      </FilterGroup>
    </aside>
  )
}
