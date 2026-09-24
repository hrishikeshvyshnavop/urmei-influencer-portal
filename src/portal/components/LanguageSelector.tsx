import { useState, useSyncExternalStore } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  COUNTRIES as countries,
  getSelectedCountry,
  subscribeToSelectedCountry,
} from "../country-status";
import Button from "./Button";
import CountryModal, { CountryFlag } from "./CountryModal";

const languages = [
  { code: "EN", label: "English - EN" },
  { code: "ZH", label: "简体中文 - ZH" },
  { code: "MS", label: "Melayu - MS" },
  { code: "TA", label: "தமிழ் - TA" },
];

type LanguageSelectorProps = {
  /** Renders the panel's "Change Country" CTA disabled, leaving the language
   *  list and the "Your storefront region is …" line untouched.
   *
   *  Set on the creator portal's own header, where the storefront region is a
   *  property of the creator's account rather than something to flip from a
   *  dropdown — the panel still reports which region that is, it just doesn't
   *  offer to reassign it.
   *
   *  Deliberately left off on the shopper-facing surfaces (`StorefrontHeader`
   *  in the shop preview, `StorefrontPublicHeader` on the live storefront).
   *  There the control means something different — it's the *shopper's* region,
   *  and it drives which products read as available (`product.regions`), so
   *  switching it is the whole point. */
  disableCountryChange?: boolean
}

/**
 * The header's language panel, and — everywhere it isn't disabled above — the
 * way into the app's country switcher (`CountryModal`, which the storefront's
 * no-availability notice also opens).
 *
 * One component serves both the creator portal and the two shopper-facing
 * storefront headers, which is why the country half is a prop rather than a
 * fork: the panel's markup, language list and region line are identical in all
 * three, and only the authority to change the region differs.
 */
export default function LanguageSelector({ disableCountryChange = false }: LanguageSelectorProps) {
  const [language, setLanguage] = useState("EN");
  const selectedCountryName = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const selectedCountry =
    countries.find((item) => item.name === selectedCountryName) ?? countries[0];
  const country = selectedCountry.id;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="hidden h-12 cursor-pointer items-center gap-[6px] px-2 text-body-md font-medium sm:flex"
            aria-label={`Language: ${language}; country: ${selectedCountry.name}`}
          >
            <CountryFlag country={country} size={20} />
            <span>{language}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[330px]">
          <div className="border-b border-portal-border p-4 text-body-md font-medium text-portal-text">
            Change Language
          </div>
          {languages.map((item) => (
            <DropdownMenuItem
              key={item.code}
              onSelect={() => setLanguage(item.code)}
              className="gap-2 border-b border-portal-surface p-4 text-body-sm font-medium text-portal-text"
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-portal-placeholder">
                {language === item.code ? <span className="size-2 rounded-full bg-portal-dark" /> : null}
              </span>
              {item.label}
            </DropdownMenuItem>
          ))}
          <div className="flex flex-col items-start gap-3 p-4">
            <p className="text-body-sm text-portal-text">
              Your storefront region is {selectedCountry.name}
            </p>
            <Button
              variant="portalOutline"
              disabled={disableCountryChange}
              onClick={() => setCountryModalOpen(true)}
            >
              Change Country
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <CountryModal open={countryModalOpen} onClose={() => setCountryModalOpen(false)} />
    </>
  );
}
