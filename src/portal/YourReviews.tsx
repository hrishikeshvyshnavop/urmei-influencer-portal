import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import AppShell from "./components/AppShell";
import ProductOverlay from "./components/ProductOverlay";
import { requestProductTour } from "./tour-status";
import { loadSampleRequests, type SampleReview } from "./sample-requests";
import { allProductReviews } from "../shop/data/creator-testimonials";
import { PRODUCTS } from "../shop/data/catalogue";
import type { Product } from "../shop/types";
import { navigate } from "../router";

type ReviewEntry = {
  key: string;
  brand: string;
  name: string;
  image: string;
  /** The catalogue product, which the row opens in the product overlay. */
  product?: Product;
  /** Where the row leads when there is no catalogue product to open. */
  href: string;
  review: SampleReview;
};

/** Every review the creator has written — from a product page's "Write a
 *  Review" prompt and from delivered samples — newest first. */
function loadReviews(): ReviewEntry[] {
  const fromProducts = Object.entries(allProductReviews()).flatMap(([productId, review]) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return [];
    return [{
      key: `product:${productId}`,
      brand: product.brand,
      name: product.name,
      image: product.heroImage,
      product,
      href: `/shop/product/${encodeURIComponent(productId)}`,
      review,
    }];
  });
  const fromSamples = loadSampleRequests().flatMap((request) => {
    if (!request.review) return [];
    // Requests filed from a product page carry its id; the seeded ones are
    // matched by name ("Low pH Good Morning Gel Cleanser (50ml)").
    const product =
      PRODUCTS.find((item) => item.id === request.productId) ??
      PRODUCTS.find((item) => request.productName.startsWith(item.name));
    return [{
          key: `sample:${request.id}`,
          brand: request.brand ?? product?.brand ?? "",
          name: request.productName,
          image: request.image,
          product,
          href: `/sample-requests/${encodeURIComponent(request.id)}`,
          review: request.review,
        }];
  });
  return [...fromProducts, ...fromSamples].sort((a, b) =>
    (b.review.writtenAt ?? "").localeCompare(a.review.writtenAt ?? ""),
  );
}

/** Your Reviews (Figma `1030:30341`): the Sample Requests list's card, with
 *  brand over product name and the creator's score and words beneath. */
export default function YourReviews() {
  const [query, setQuery] = useState("");
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const reviews = loadReviews().filter((entry) =>
    [entry.brand, entry.name, entry.review.text].join(" ").toLowerCase().includes(normalizedQuery),
  );

  return (
    <AppShell
      className="bg-portal-light text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { navigate("/help-center"); }}
    >
      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[794px] px-6 pb-14 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
          <a href="/home">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <span className="text-portal-muted">Your Reviews</span>
        </nav>

        <h1 className="sr-only">Your Reviews</h1>

        <div className="pb-4">
          <label className="flex w-full items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2 sm:w-[343px]">
            <Search aria-hidden="true" className="size-4 shrink-0 text-portal-text" strokeWidth={1.5} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search your reviews"
              className="min-w-0 flex-1 bg-transparent text-body-sm text-portal-text outline-none placeholder:text-portal-muted"
            />
          </label>
        </div>

        {reviews.length === 0 ? (
          <p className="py-4 text-body-sm text-portal-muted">
            {normalizedQuery
              ? `No reviews match “${query.trim()}”.`
              : "You haven't written any reviews yet. Review a product from its page, or a sample once it's delivered."}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {reviews.map((entry) => (
              <li key={entry.key}>
                <ReviewCard entry={entry} onOpenProduct={setViewingProduct} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <ProductOverlay product={viewingProduct} onClose={() => setViewingProduct(null)} showReviews />
    </AppShell>
  );
}

function ReviewCard({ entry, onOpenProduct }: { entry: ReviewEntry; onOpenProduct: (product: Product) => void }) {
  // The product row and the review strip are one target: a catalogue product
  // opens in the full-page overlay on this page; anything else falls back to
  // its sample request. Spans throughout, since a button only takes phrasing
  // content.
  const cardClass =
    "block w-full cursor-pointer overflow-clip rounded-[10px] bg-portal-surface text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark";
  const content = (
    <>
      <span className="flex w-full items-center gap-4 px-4 py-5">
        <img src={entry.image} alt="" className="size-14 shrink-0 rounded-[10px] object-cover" />
        <span className="flex min-w-0 flex-1 flex-col text-body-sm">
          {entry.brand ? <span className="uppercase text-portal-muted">{entry.brand}</span> : null}
          <span className="truncate font-medium text-portal-text">{entry.name}</span>
        </span>
        <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-portal-text" strokeWidth={1.5} />
      </span>

      <span className="flex items-center gap-3 rounded-[10px] border border-portal-surface bg-portal-light px-4 py-3 drop-shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
        <span className="flex shrink-0 items-center rounded-full bg-portal-star p-[4.5px]">
          <img src="/urmei/sample-requests/star.svg" alt="" width={15.9091} height={15.9091} className="block size-[15.9091px]" />
        </span>
        <span className="shrink-0 pr-2 pl-1 text-body-sm font-semibold text-portal-muted">
          {entry.review.rating}/10
          <span className="sr-only"> rating</span>
        </span>
        <span className="min-w-0 flex-1 text-body-sm text-portal-muted">{entry.review.text}</span>
      </span>
    </>
  );
  const { product } = entry;

  return (
    <article>
      {product ? (
        <button type="button" onClick={() => onOpenProduct(product)} className={cardClass}>
          {content}
        </button>
      ) : (
        <a href={entry.href} className={cardClass}>
          {content}
        </a>
      )}
    </article>
  );
}
