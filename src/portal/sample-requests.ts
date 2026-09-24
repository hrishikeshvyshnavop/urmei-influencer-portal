/**
 * Sample requests (Figma `1030:27076`). There is no requests backend, so the
 * seeded list below *is* the starting data. Requests the creator submits from
 * a product page, and any they cancel, are kept in browser storage so the
 * list and the details page agree after a reload.
 */

export type SampleRequestStatus = "requested" | "approved" | "shipped" | "delivered" | "cancelled";

/** The creator's review of a delivered sample (Figma `1030:30661`). */
export type SampleReview = {
  /** 1–10, "Not for me" to "Loved it!". Kept for the backend to rank
   *  top-rated products on URMEI e-commerce (dev note `1030:31427`). */
  rating: number;
  text: string;
  /** Up to three photos, as data URLs. */
  photos: string[];
  /** ISO timestamp, stamped when the review is saved. Older saves lack it. */
  writtenAt?: string;
};

export type SampleRequest = {
  id: string;
  /** The catalogue product, for requests filed from a product page. */
  productId?: string;
  brand?: string;
  productName: string;
  size: string;
  quantity: number;
  image: string;
  status: SampleRequestStatus;
  /** The creator's note to the brand ("Your message"). */
  message: string;
  /** The creator's review of the sample, once they have written one. */
  review?: SampleReview;
  shippingAddress: { name: string; lines: string[] };
  /** ISO dates for each step reached. Shipping dates arrive with the shipment. */
  requestedOn: string;
  approvedOn?: string;
  /** Set once the creator cancels, read back from browser storage. */
  cancelledOn?: string;
  shipment?: {
    carrier: string;
    trackingId: string;
    shippedOn: string;
    outForDeliveryOn: string;
    deliveredOn: string;
    expectedDelivery: string;
  };
};

const PRODUCT_IMAGE = "/urmei/sample-requests/product.png";

const SHIPPING_ADDRESS = {
  name: "Amanda Tan",
  lines: ["123 Orchard road", "#05-678 Lucky plaza", "Singapore 238841"],
};

const MESSAGE =
  "I'd love to try this product as I have sensitive skin and have heard great things about this cleanser. Would appreciate a sample to test before committing to a full purchase.";

const SEEDED_REQUESTS: SampleRequest[] = [
  {
    id: "low-ph-gel-cleanser",
    productName: "Low pH Good Morning Gel Cleanser (50ml)",
    size: "50 ml",
    quantity: 1,
    image: PRODUCT_IMAGE,
    status: "delivered",
    message: MESSAGE,
    shippingAddress: SHIPPING_ADDRESS,
    requestedOn: "2026-09-17",
    approvedOn: "2026-09-17",
    shipment: {
      carrier: "TracX",
      trackingId: "URMEI 5451 441 14",
      shippedOn: "2026-09-17",
      outForDeliveryOn: "2026-09-17",
      deliveredOn: "2026-09-17",
      expectedDelivery: "2026-09-17",
    },
  },
  {
    id: "radiantglow-serum",
    productName: "RadiantGlow Facial Serum – 30ml",
    size: "30 ml",
    quantity: 1,
    image: PRODUCT_IMAGE,
    status: "requested",
    message: MESSAGE,
    shippingAddress: SHIPPING_ADDRESS,
    requestedOn: "2026-09-15",
  },
  {
    id: "water-bank-cream",
    productName: "Water Bank Blue Hyaluronic Cream",
    size: "50 ml",
    quantity: 1,
    image: PRODUCT_IMAGE,
    status: "approved",
    message: MESSAGE,
    shippingAddress: SHIPPING_ADDRESS,
    requestedOn: "2026-09-12",
    approvedOn: "2026-09-14",
  },
  {
    id: "hydrating-toner",
    productName: "Hydrating Essence Toner – 150ml",
    size: "150 ml",
    quantity: 1,
    image: PRODUCT_IMAGE,
    status: "shipped",
    message: MESSAGE,
    shippingAddress: SHIPPING_ADDRESS,
    requestedOn: "2026-09-10",
    approvedOn: "2026-09-11",
    shipment: {
      carrier: "TracX",
      trackingId: "URMEI 5451 441 14",
      shippedOn: "2026-09-15",
      outForDeliveryOn: "2026-09-17",
      deliveredOn: "2026-09-17",
      expectedDelivery: "2026-09-17",
    },
  },
];

export const SAMPLE_REQUESTS_KEY = "urmei.sample-requests-cancelled";
export const SAMPLE_REVIEWS_KEY = "urmei.sample-request-reviews";
export const CREATED_SAMPLE_REQUESTS_KEY = "urmei.sample-requests-created";

function readCreated(): SampleRequest[] {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CREATED_SAMPLE_REQUESTS_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

/** A local-time `YYYY-MM-DD`, the shape every request date is kept in. */
function isoDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayIso() {
  return isoDate(new Date());
}

/** Files a new request from the Request a sample modal; it opens the list,
 *  newest first, waiting for the brand's approval. */
export function createSampleRequest(request: Omit<SampleRequest, "id" | "status" | "requestedOn">) {
  const created: SampleRequest = {
    ...request,
    id: `request-${Date.now()}`,
    status: "requested",
    requestedOn: todayIso(),
  };
  try {
    window.localStorage.setItem(CREATED_SAMPLE_REQUESTS_KEY, JSON.stringify([created, ...readCreated()]));
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
  return created;
}

function readCancelled(): Record<string, string> {
  try {
    const stored = JSON.parse(window.localStorage.getItem(SAMPLE_REQUESTS_KEY) ?? "{}");
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function readReviews(): Record<string, SampleReview> {
  try {
    const stored = JSON.parse(window.localStorage.getItem(SAMPLE_REVIEWS_KEY) ?? "{}");
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

export function loadSampleRequests(): SampleRequest[] {
  const cancelled = readCancelled();
  const reviews = readReviews();
  return [...readCreated(), ...SEEDED_REQUESTS].map((request) => {
    const withReview = reviews[request.id] ? { ...request, review: reviews[request.id] } : request;
    return cancelled[request.id]
      ? { ...withReview, status: "cancelled", cancelledOn: isoDate(new Date(cancelled[request.id])) }
      : withReview;
  });
}

/** Whether the creator already has a live (not cancelled) request for this
 *  product — the product page then greys out Request sample (Figma
 *  `1030:27989`). Cancelling frees the product to be requested again. */
export function hasSampleRequest(productId: string) {
  return loadSampleRequests().some((request) => request.productId === productId && request.status !== "cancelled");
}

/** The review prompt shows on every request, whatever its status, until the
 *  creator has written one. Dev note `1030:31426` gated it on delivery; that
 *  was relaxed on request so the nudge is always there, matching the list. */
export function canReview(request: SampleRequest) {
  return !request.review;
}

/** Keeps the review with the request. Photos are data URLs, so a full
 *  storage quota drops the write — the review still shows this session. */
export function saveSampleReview(id: string, review: SampleReview) {
  try {
    const reviews = readReviews();
    reviews[id] = { ...review, writtenAt: review.writtenAt ?? new Date().toISOString() };
    window.localStorage.setItem(SAMPLE_REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}

export function findSampleRequest(id: string) {
  return loadSampleRequests().find((request) => request.id === id);
}

/** A request can be cancelled until it ships (Figma dev note `1030:27422`). */
export function canCancel(request: SampleRequest) {
  return request.status === "requested" || request.status === "approved";
}

export function cancelSampleRequest(id: string) {
  try {
    const cancelled = readCancelled();
    cancelled[id] = new Date().toISOString();
    window.localStorage.setItem(SAMPLE_REQUESTS_KEY, JSON.stringify(cancelled));
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}

export const STATUS_LABELS: Record<SampleRequestStatus, string> = {
  requested: "Requested",
  approved: "Approved",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Thu, 17 Sep 2026" — the design's date format. Built by hand because
 *  `en-GB` spells September "Sept". */
export function formatRequestDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${WEEKDAYS[date.getDay()]}, ${day} ${MONTHS[month - 1]} ${year}`;
}

export type TimelineStep = { label: string; date?: string; done: boolean };

/**
 * The details page's step list. Before shipping it is two steps, the second
 * reading "Waiting For Approval" until the brand approves (`1030:27259` /
 * `1030:27312`); once shipped, the full five-step delivery track shows, with
 * the dates the carrier gives for the steps still ahead (`1030:27366`).
 */
export function timelineFor(request: SampleRequest): TimelineStep[] {
  const requested: TimelineStep = { label: "Requested", date: request.requestedOn, done: true };
  const { shipment } = request;

  // Cancelled keeps the steps already reached and ends on the cancellation
  // itself (Figma `1030:27545`).
  if (request.status === "cancelled") {
    return [
      requested,
      ...(request.approvedOn ? [{ label: "Approved", date: request.approvedOn, done: true }] : []),
      { label: "Cancelled", date: request.cancelledOn, done: true },
    ];
  }
  if (!shipment) {
    return request.approvedOn
      ? [requested, { label: "Approved", done: true }]
      : [requested, { label: "Waiting For Approval", done: false }];
  }

  const delivered = request.status === "delivered";
  return [
    requested,
    { label: "Approved", date: request.approvedOn, done: true },
    { label: "Shipped", date: shipment.shippedOn, done: true },
    { label: "Out for delivery", date: shipment.outForDeliveryOn, done: delivered },
    { label: "Delivered", date: shipment.deliveredOn, done: delivered },
  ];
}
