import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import AppShell from "./components/AppShell";
import { BRAND_DIRECTORY_TILES } from "../shop/data/brand-directory";

/** Every tile links out; this one (Etude's logo, matching Figma 1364:16002's
 *  5th grid slot) always points at the general catalogue instead of Etude's
 *  own brand page. */
const CTA_TILE_INDEX = 4;

function BrandTileLink({ href, label, image }: { href: string; label: string; image: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative aspect-[224/172] overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"
    >
      <img src={image} alt="" className="size-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-[rgba(34,34,34,0.45)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="rounded-md border border-portal-light bg-portal-light px-4 py-2 text-body-sm font-medium text-portal-text">
          View Products
        </span>
      </div>
    </a>
  );
}

export default function Brands() {
  const [query, setQuery] = useState("");

  const visibleTiles = BRAND_DIRECTORY_TILES.map((tile, index) => ({ ...tile, index })).filter(
    (tile) => tile.index === CTA_TILE_INDEX || tile.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <AppShell
      className="bg-white text-portal-text"
      onShowTour={() => { window.location.hash = "#/home/tour"; }}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >
      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 lg:px-[120px]">
        <div className="flex w-full flex-col items-start gap-4 border-b border-portal-border pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a>
            <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
            <span className="text-portal-muted">Brands</span>
          </nav>

          <h1 className="track-section w-full text-body-md font-medium uppercase">Brands</h1>

          <div className="flex w-[343px] max-w-full items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2">
            <Search aria-hidden="true" size={16} className="shrink-0 text-portal-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find brands"
              aria-label="Find brands"
              className="w-full bg-transparent text-body-sm text-portal-text outline-none placeholder:text-portal-muted"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6 py-6 sm:grid-cols-3 lg:grid-cols-5">
          {visibleTiles.map((tile) =>
            tile.index === CTA_TILE_INDEX ? (
              <BrandTileLink key="cta" href="#/shop/browse" label="Browse all products" image={tile.image} />
            ) : (
              <BrandTileLink
                key={`${tile.name}-${tile.index}`}
                href={`#/shop/brand/${encodeURIComponent(tile.name)}`}
                label={`View products from ${tile.name}`}
                image={tile.image}
              />
            ),
          )}
        </div>
      </main>
    </AppShell>
  );
}
