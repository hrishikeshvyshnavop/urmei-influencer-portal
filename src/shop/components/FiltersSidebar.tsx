import type { ReactNode } from 'react'
import { COUNTRIES } from '../../portal/country-status'
import {
  CATEGORIES,
  FILTER_BRANDS,
  INGREDIENTS,
  PRICE_BUCKETS,
  RATING_THRESHOLDS,
  type ProductFilters,
} from '../data/catalogue'
import { Checkbox } from './Checkbox'
import { Icon } from './Icon'

type FiltersSidebarProps = {
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
  /** Which accordion groups are expanded, and the Brand search box's text —
   *  owned by the caller (`SearchResults`) rather than local state here. This
   *  sidebar gets re-parented into `document.body` via a portal once the
   *  scroll position makes it "stick" (see `useStickyOnScroll`), and React
   *  treats a portal's target-container change as a different portal
   *  identity — it remounts the portaled subtree rather than updating it in
   *  place. Local state here would reset (collapsing every open group) the
   *  instant that happens; state that lives in the never-unmounting caller
   *  survives it. */
  openGroups: Set<string>
  onToggleGroup: (label: string) => void
  brandSearch: string
  onBrandSearchChange: (value: string) => void
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]
}

/** Brand values are stored upper-case (matching how the catalogue displays
 *  them elsewhere), but Figma's Brand filter shows them in title case —
 *  display-only, so filtering still matches on the real, stored value. */
function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type SelectedTag = { value: string; label: string }

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex shrink-0 items-center justify-center gap-xs rounded-sm bg-surface-tertiary-500 px-sm py-xs">
      <span className="text-body-sm font-medium whitespace-nowrap text-text-secondary-1000">{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        onClick={onRemove}
        className="flex items-center justify-center"
      >
        <Icon name="x" srcSize={24} />
      </button>
    </span>
  )
}

function FilterGroup({
  label,
  open,
  onToggle,
  children,
  last = false,
  selected = [],
  onRemoveSelected,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  /** The design omits the bottom border on the last (Ingredients) group. */
  last?: boolean
  /** Currently-applied values for this group, shown as removable chips
   *  whenever the group is collapsed — so a filter stays visible and
   *  editable without needing to reopen the checkbox list. */
  selected?: SelectedTag[]
  onRemoveSelected?: (value: string) => void
}) {
  const showSelected = !open && selected.length > 0

  return (
    <div
      className={[
        'flex w-full flex-col items-start',
        last ? '' : 'border-b border-border-default',
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
      {showSelected && (
        <div className="flex w-full flex-wrap items-start gap-sm px-md pb-lg">
          {selected.map((tag) => (
            <Tag key={tag.value} label={tag.label} onRemove={() => onRemoveSelected?.(tag.value)} />
          ))}
        </div>
      )}
      {open && <div className="flex w-full flex-col items-start gap-md-sm px-md pb-lg">{children}</div>}
    </div>
  )
}

/**
 * Search Results' left filter rail (Figma `1184:70079`). Only one group is
 * open at a time — opening one closes the previous. That's a deliberate
 * departure from the Figma frames, which show every group open at once in one
 * and all collapsed in another; it was asked for directly, and it keeps the
 * rail close to one screen tall instead of several. Brand/Price/Category/
 * Ingredients content in the design references brands and shipping options we
 * don't carry — the filter TYPES and interaction (checkbox lists, a "Search
 * brands" box) are Figma's; the values are this catalogue's real brands,
 * categories and ingredients so every filter actually narrows real results.
 *
 * Country isn't in the Figma frame; it's appended last so the five designed
 * groups keep their specified order.
 */
export function FiltersSidebar({
  filters,
  onChange,
  openGroups,
  onToggleGroup,
  brandSearch,
  onBrandSearchChange,
}: FiltersSidebarProps) {
  const visibleBrands = FILTER_BRANDS.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  )

  // `w-full` rather than a fixed 285px: the scrolling wrapper in
  // `SearchResults` owns the rail's width, so this shrinks into the
  // scrollbar's gutter instead of overflowing it horizontally.
  return (
    <aside className="flex w-full flex-col items-start self-start bg-surface-secondary-100">
      <FilterGroup
        label="Brand"
        open={openGroups.has('Brand')}
        onToggle={() => onToggleGroup('Brand')}
        selected={filters.brands.map((brand) => ({ value: brand, label: toTitleCase(brand) }))}
        onRemoveSelected={(brand) => onChange({ ...filters, brands: toggleInList(filters.brands, brand) })}
      >
        <div className="flex w-full items-center gap-sm rounded-sm border border-border-default px-md-sm py-sm">
          <Icon name="search" />
          <input
            type="text"
            value={brandSearch}
            onChange={(event) => onBrandSearchChange(event.target.value)}
            placeholder="Search brands"
            className="w-full text-body-sm text-text-secondary-1000 placeholder:text-text-secondary-700 focus:outline-none"
          />
        </div>
        {visibleBrands.map((brand) => (
          <Checkbox
            key={brand}
            label={toTitleCase(brand)}
            checked={filters.brands.includes(brand)}
            onChange={() => onChange({ ...filters, brands: toggleInList(filters.brands, brand) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup
        label="Price"
        open={openGroups.has('Price')}
        onToggle={() => onToggleGroup('Price')}
        selected={filters.priceBuckets.map((id) => ({
          value: id,
          label: PRICE_BUCKETS.find((bucket) => bucket.id === id)?.label ?? id,
        }))}
        onRemoveSelected={(id) =>
          onChange({ ...filters, priceBuckets: toggleInList(filters.priceBuckets, id) })
        }
      >
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

      <FilterGroup
        label="Rating"
        open={openGroups.has('Rating')}
        onToggle={() => onToggleGroup('Rating')}
        selected={filters.ratingThresholds.map((min) => ({
          value: String(min),
          label: RATING_THRESHOLDS.find((threshold) => threshold.min === min)?.label ?? `${min}★ & up`,
        }))}
        onRemoveSelected={(value) => {
          const min = Number(value)
          onChange({
            ...filters,
            ratingThresholds: filters.ratingThresholds.filter((threshold) => threshold !== min),
          })
        }}
      >
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

      <FilterGroup
        label="Category"
        open={openGroups.has('Category')}
        onToggle={() => onToggleGroup('Category')}
        selected={filters.categories.map((category) => ({ value: category, label: category }))}
        onRemoveSelected={(category) =>
          onChange({ ...filters, categories: toggleInList(filters.categories, category) })
        }
      >
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
        onToggle={() => onToggleGroup('Ingredients')}
        selected={filters.ingredients.map((ingredient) => ({ value: ingredient, label: ingredient }))}
        onRemoveSelected={(ingredient) =>
          onChange({ ...filters, ingredients: toggleInList(filters.ingredients, ingredient) })
        }
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

      <FilterGroup
        label="Country"
        open={openGroups.has('Country')}
        onToggle={() => onToggleGroup('Country')}
        selected={filters.countries.map((country) => ({ value: country, label: country }))}
        onRemoveSelected={(country) =>
          onChange({ ...filters, countries: toggleInList(filters.countries, country) })
        }
        last
      >
        {COUNTRIES.map((country) => (
          <Checkbox
            key={country.id}
            label={country.name}
            checked={filters.countries.includes(country.name)}
            onChange={() =>
              onChange({ ...filters, countries: toggleInList(filters.countries, country.name) })
            }
          />
        ))}
      </FilterGroup>
    </aside>
  )
}
