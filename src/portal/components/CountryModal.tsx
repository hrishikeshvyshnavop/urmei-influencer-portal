import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  COUNTRIES as countries,
  type CountryId,
  getSelectedCountry,
  setSelectedCountry,
  subscribeToSelectedCountry,
} from "../country-status";

const asset = (name: string) => `/urmei/country-flags/${name}.svg`;

function Layer({ src, className }: { src: string; className: string }) {
  return (
    <span className={`absolute ${className}`}>
      <img src={asset(src)} alt="" className="absolute inset-0 block size-full max-w-none" />
    </span>
  );
}

export function CountryFlag({ country, size = 32 }: { country: CountryId; size?: number }) {
  if (country === "singapore") {
    return <img src="/urmei/flag-en.svg" alt="" style={{ width: size, height: size }} />;
  }

  return (
    <span className="relative block shrink-0 overflow-hidden" style={{ width: size, height: size }}>
      {country === "indonesia" ? (
        <>
          <Layer src="v16" className="inset-[12.5%_3.13%_46.88%_3.13%] size-auto" />
          <Layer src="v17" className="inset-[50%_3.13%_12.5%_3.13%] size-auto" />
          <Layer src="v2" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v3" className="inset-[15.63%_6.25%_71.88%_6.25%] size-auto" />
        </>
      ) : null}
      {country === "thailand" ? (
        <>
          <Layer src="v11" className="inset-[34.38%_3.13%] size-auto" />
          <Layer src="v12" className="inset-[12.5%_3.13%_62.5%_3.13%] size-auto" />
          <Layer src="v13" className="inset-[62.5%_3.13%_12.5%_3.13%] size-auto rotate-180" />
          <Layer src="v14" className="inset-[28.13%_3.13%_62.5%_3.13%] size-auto" />
          <Layer src="v14" className="inset-[62.5%_3.13%_28.13%_3.13%] size-auto" />
          <Layer src="v15" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v3" className="inset-[15.63%_6.25%_71.88%_6.25%] size-auto" />
        </>
      ) : null}
      {country === "vietnam" ? (
        <>
          <Layer src="v18" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v15" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v3" className="inset-[15.63%_6.25%_71.88%_6.25%] size-auto" />
          <Layer src="v19" className="inset-[31.83%_33.57%_36.92%_33.57%] size-auto" />
        </>
      ) : null}
      {country === "malaysia" ? (
        <>
          <Layer src="v20" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v21" className="inset-[12.5%_5.11%_81.73%_5.13%] size-auto" />
          <Layer src="v22" className="inset-[24.04%_3.13%_70.19%_3.13%] size-auto" />
          <Layer src="v23" className="top-[35.57%] right-[3.13%] left-[3.13%] h-[5.77%] w-auto" />
          <Layer src="v23" className="top-[47.12%] right-[3.13%] left-[3.13%] h-[5.77%] w-auto" />
          <Layer src="v23" className="top-[58.65%] right-[3.13%] left-[3.13%] h-[5.77%] w-auto" />
          <Layer src="v24" className="inset-[70.19%_3.13%_24.04%_3.13%] size-auto" />
          <Layer src="v25" className="inset-[81.73%_5.11%_12.5%_5.13%] size-auto" />
          <Layer src="v26" className="inset-[12.5%_50%_41.35%_3.13%] size-auto" />
          <Layer src="v15" className="inset-[12.5%_3.13%] size-auto" />
          <Layer src="v3" className="inset-[15.63%_6.25%_71.88%_6.25%] size-auto" />
          <Layer src="v27" className="inset-[25.34%_53.64%_54.18%_26.39%] size-auto" />
          <Layer src="v28" className="inset-[23.28%_68.76%_52.14%_11.79%] size-auto" />
        </>
      ) : null}
    </span>
  );
}

/**
 * The app's country switcher, in its own component because two surfaces open
 * it: the header's language panel (`LanguageSelector`) and the storefront's
 * "no picks in this market" notice, whose "Change Country" button is the
 * shopper's way out of an empty market (Figma `1616:66139`).
 *
 * Self-contained on purpose — it reads and writes `country-status` itself, so a
 * host only has to own the open/closed flag.
 */
export default function CountryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const selectedCountryName = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const selectedCountry =
    countries.find((item) => item.name === selectedCountryName) ?? countries[0];
  const country = selectedCountry.id;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousOverflowY = document.body.style.overflowY;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const holdScrollPosition = () => window.scrollTo(scrollX, scrollY);

    document.body.style.overflow = "";
    document.body.style.overflowY = "scroll";
    window.addEventListener("scroll", holdScrollPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", holdScrollPosition);
      document.body.style.overflow = previousOverflow;
      document.body.style.overflowY = previousOverflowY;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-modal-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <section className="motion-modal-panel flex w-[800px] max-w-full flex-col gap-6 rounded-lg bg-white p-6">
        <header className="flex items-center justify-between">
          <h2 id="country-modal-title" className="track-section text-body-md font-medium uppercase">
            Choose a country
          </h2>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close country selector"
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </header>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={country === item.id}
                onClick={() => {
                  setSelectedCountry(item.name);
                  onClose();
                }}
                className={`flex h-16 cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-portal-dark focus-visible:ring-offset-2 ${
                  country === item.id
                    ? "border-portal-placeholder bg-portal-light"
                    : "border-transparent bg-portal-light hover:border-portal-border hover:bg-portal-surface"
                }`}
              >
                <CountryFlag country={item.id} />
                <span>
                  <span className="block text-body-md font-medium text-portal-text">{item.name}</span>
                  <span className="block text-body-sm text-portal-muted">{item.host}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-lg bg-portal-surface p-4 text-body-sm text-portal-muted">
            Your storefront region is {selectedCountry.name}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
