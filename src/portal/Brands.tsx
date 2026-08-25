import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import AppShell from "./components/AppShell";

type BrandTile = { name: string; image: string };

const brands = {
  etude: { name: "ETUDE", image: "/urmei/brands/brand-01.png" },
  alliesOfSkin: { name: "Allies of Skin", image: "/urmei/brands/brand-02.png" },
  rae: { name: "rae Cosmetics", image: "/urmei/brands/brand-03.png" },
  porcelain: { name: "Porcelain Skincare", image: "/urmei/brands/brand-04.png" },
  klavuu: { name: "KLAVUU", image: "/urmei/brands/brand-05.png" },
  browhaus: { name: "Browhaus", image: "/urmei/brands/brand-06.png" },
  btf: { name: "BTF", image: "/urmei/brands/brand-07.png" },
  sigiSkin: { name: "SIGI SKIN", image: "/urmei/brands/brand-08.png" },
  liht: { name: "Liht", image: "/urmei/brands/brand-09.png" },
  mudoLabs: { name: "MUDO LABS", image: "/urmei/brands/brand-10.png" },
  boundary: { name: "BOUNDARY", image: "/urmei/brands/brand-11.png" },
} as const satisfies Record<string, BrandTile>;

// Reproduces the exact 5x4 grid from Figma, repeats and all — several
// brands recur across rows there rather than each tile being unique. Every
// tile shares one interactive component (Figma 1364:16017 documents its
// hover state — image gives way to a "View Products" button).
const tiles: BrandTile[] = [
  brands.alliesOfSkin,
  brands.rae,
  brands.porcelain,
  brands.klavuu,
  brands.etude,
  brands.etude,
  brands.browhaus,
  brands.etude,
  brands.btf,
  brands.sigiSkin,
  brands.liht,
  brands.etude,
  brands.mudoLabs,
  brands.boundary,
  brands.etude,
  brands.boundary,
  brands.etude,
  brands.btf,
  brands.sigiSkin,
  brands.boundary,
];

export default function Brands() {
  const [query, setQuery] = useState("");

  const visibleTiles = tiles.filter((tile) =>
    tile.name.toLowerCase().includes(query.trim().toLowerCase()),
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
