/**
 * The storefront's content column: the design's 1200px column (1440px frame
 * less its 120px page margins), centred on wider viewports.
 *
 * Shared rather than repeated because every band on the page has to resolve to
 * the same left and right edge — the header row, the breadcrumb, the profile
 * card, both product sections and the footer. Sections that carried only
 * `px-margin`, with no `max-w`, hugged the raw viewport edge instead of this
 * column, so above 1440px they drifted out of alignment with everything else
 * (at 1728px: 120px vs the column's 264px).
 *
 * A full-bleed background belongs on an outer wrapper; this goes on the inner
 * row that holds the content.
 */
export const CONTENT_COLUMN = 'w-full max-w-[1440px] px-margin'
