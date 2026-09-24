import { useState } from 'react'
import { SearchField } from '../../portal/components/SearchField'
import { SEARCH_SUGGESTIONS } from '../data/catalogue'
import { Icon } from './Icon'

type CatalogueSearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (query: string) => void
  placeholder?: string
  /** Autocomplete only appears on the catalogue landing screen. */
  withSuggestions?: boolean
  className?: string
}

export function CatalogueSearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search brands and products',
  withSuggestions = false,
  className = '',
}: CatalogueSearchProps) {
  const [focused, setFocused] = useState(false)

  const matches = SEARCH_SUGGESTIONS.filter((suggestion) =>
    suggestion.text.toLowerCase().includes(value.trim().toLowerCase()),
  )
  const showSuggestions = withSuggestions && focused && value.trim().length > 0 && matches.length > 0

  return (
    <div className={`relative flex flex-col gap-sm ${className}`}>
      <SearchField
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder={placeholder}
        aria-label={placeholder}
        onFocus={() => setFocused(true)}
        /* Delay so a suggestion click lands before the list unmounts. */
        onBlur={() => window.setTimeout(() => setFocused(false), 120)}
        className="w-full"
      />

      {showSuggestions && (
        <ul className="absolute top-[48px] z-10 w-full overflow-clip rounded-sm border border-border-default bg-surface-secondary-100 shadow-ds-sm">
          {matches.map((suggestion) => (
            <li key={suggestion.text}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(suggestion.text)
                  onSubmit(suggestion.text)
                }}
                className="flex w-full items-center gap-sm bg-surface-secondary-300 p-md text-left"
              >
                <span className="flex flex-1 items-center gap-md">
                  <Icon name="search" />
                  <span className="flex-1 truncate text-body-sm font-medium text-text-secondary-1000">
                    {suggestion.text}
                  </span>
                </span>
                <img
                  src={suggestion.thumbnail}
                  alt=""
                  className="size-[48px] rounded-xs object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
