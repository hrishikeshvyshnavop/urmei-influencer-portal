import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import AppShell from "./components/AppShell";
import { requestProductTour } from "./tour-status";
import { BRAND_DIRECTORY_TILES } from "../shop/data/brand-directory";

export default function Brands() {
  const [query, setQuery] = useState("");

  const visibleTiles = BRAND_DIRECTORY_TILES.filter((tile) =>
    tile.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <AppShell
      className="bg-white text-portal-text"
      onShowTour={requestProductTour}
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
          {visibleTiles.map((tile, index) => (
            <a
              key={`${tile.name}-${index}`}
              href={`#/shop/brand/${encodeURIComponent(tile.name)}`}
              aria-label={`View products from ${tile.name}`}
              className="group flex aspect-[224/172] flex-col gap-2 overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"
            >
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg">
                <img src={tile.image} alt={tile.name} className="size-full object-cover" />
              </div>
              <div className="grid shrink-0 grid-rows-[0fr] transition-[grid-template-rows] duration-200 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="flex items-center justify-center gap-2 rounded-md border border-portal-border px-4 py-2 text-body-sm font-medium text-portal-text">
                    View Products
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
