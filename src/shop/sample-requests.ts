import { PRODUCTS } from './data/catalogue'
import type { Product } from './types'

/**
 * There is no brand-approval workflow yet (that's future, campaign-lifecycle
 * work) — for now Urmei is the sole, manual gatekeeper, so every request a
 * creator submits starts at `requested`. The other three states only ever
 * appear in the seeded fixture data below, standing in for what Urmei's
 * manual review would eventually produce.
 */
export type SampleRequestStatus = 'requested' | 'approved' | 'shipped' | 'rejected'

/** The same `fields` shape Manage Account's saved addresses use (schema
 *  varies by country — see `ADDRESS_FIELDS_BY_COUNTRY`), snapshotted at
 *  submit time rather than a fixed set of named columns. */
export type SampleShippingAddress = Record<string, string>

export type SampleRequest = {
  id: string
  productId: string
  /** Denormalized at submit time so a request still reads correctly even if
   *  the product is later removed from the catalogue. */
  productName: string
  productBrand: string
  productImage: string
  variant?: string
  shippingAddress: SampleShippingAddress
  note?: string
  status: SampleRequestStatus
  requestedAt: number
  updatedAt: number
}

export const SAMPLE_REQUEST_STATUS_LABELS: Record<SampleRequestStatus, string> = {
  requested: 'Requested',
  approved: 'Approved',
  shipped: 'Shipped',
  rejected: 'Rejected',
}

const SAMPLE_REQUESTS_KEY = 'urmei.sample-requests'
const DAY_MS = 24 * 60 * 60 * 1000

/** Demo history so the status page isn't empty before there's a real backend
 *  to fulfil requests — built from real catalogue products so it reads as
 *  genuine activity rather than placeholder rows (mirrors the seeded-fixture
 *  approach `NotificationsDrawer` already uses for the same reason). */
function seedSampleRequests(): SampleRequest[] {
  const now = Date.now()
  const statuses: SampleRequestStatus[] = ['shipped', 'approved', 'requested']
  return PRODUCTS.slice(0, statuses.length).map((product, index) => ({
    id: `seed-${product.id}`,
    productId: product.id,
    productName: product.name,
    productBrand: product.brand,
    productImage: product.shopCardImage,
    variant: product.variant,
    shippingAddress: {
      label: 'Home',
      blockNo: '12A',
      street: 'Orchard Boulevard',
      building: 'Camden Medical Centre',
      floorNo: '03',
      unitNumber: '28',
      postalCode: '520101',
      country: 'Singapore',
      phone: '+65 9123 4567',
    },
    status: statuses[index]!,
    requestedAt: now - (index + 1) * 4 * DAY_MS,
    updatedAt: now - (index + 1) * DAY_MS,
  }))
}

export function loadSampleRequests(): SampleRequest[] {
  try {
    const raw = window.localStorage.getItem(SAMPLE_REQUESTS_KEY)
    if (!raw) {
      const seeded = seedSampleRequests()
      saveSampleRequests(seeded)
      return seeded
    }
    return JSON.parse(raw) as SampleRequest[]
  } catch {
    return []
  }
}

function saveSampleRequests(requests: SampleRequest[]) {
  try {
    window.localStorage.setItem(SAMPLE_REQUESTS_KEY, JSON.stringify(requests))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

/** The most recent request for a product, if any — lets a product card or
 *  detail view show a status instead of "Request sample" once one exists. */
export function latestSampleRequestForProduct(productId: string): SampleRequest | null {
  const matches = loadSampleRequests()
    .filter((request) => request.productId === productId)
    .sort((a, b) => b.requestedAt - a.requestedAt)
  return matches[0] ?? null
}

/** Submitting is always independent of whether the product is in the
 *  creator's shop — see `docs/prd/creator-reviews-and-sample-requests.md`. */
export function submitSampleRequest(input: {
  product: Product
  variant?: string
  shippingAddress: SampleShippingAddress
  note?: string
}): SampleRequest {
  const now = Date.now()
  const request: SampleRequest = {
    id: `${now}-${Math.random().toString(36).slice(2)}`,
    productId: input.product.id,
    productName: input.product.name,
    productBrand: input.product.brand,
    productImage: input.product.shopCardImage,
    variant: input.variant,
    shippingAddress: input.shippingAddress,
    note: input.note,
    status: 'requested',
    requestedAt: now,
    updatedAt: now,
  }
  saveSampleRequests([request, ...loadSampleRequests()])
  return request
}
