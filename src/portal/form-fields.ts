/**
 * The `FieldSpec` shape used by the portal's field grids, plus the per-market
 * address schema that profile setup's shipping step and Manage Account's
 * address modal share (`setupAddressFields`).
 */

export type FieldSpec = {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon?: "calendar";
  autoComplete?: string;
  options?: string[];
  numericOnly?: boolean;
  maxLength?: number;
  latestDate?: Date;
  locked?: boolean;
  /** Locked and muted: the Inputbox's Disabled state (see `TextField`). */
  disabled?: boolean;
  optional?: boolean;
  /** Standing helper line under the input (info icon + copy), e.g. the apply
   *  form's "Based on your country's valid ID." An error message replaces it
   *  while one is showing, so the field's height stays put. */
  hint?: string;
  /** Greyed, fixed text ahead of the value — the Username field's
   *  "urmei.com/shop/". */
  prefix?: string;
  /** Draws the red asterisk beside the label (the bank fields). */
  required?: boolean;
  /** Takes the whole row in a two-column grid rather than one column. */
  fullWidth?: boolean;
};

/** City choices per Malaysian state, for profile setup's optional City
 *  dropdown (Figma `2574:45799`). */
export const MALAYSIA_CITIES: Record<string, string[]> = {
  Johor: ["Johor Bahru", "Batu Pahat", "Kluang", "Muar"],
  Kedah: ["Alor Setar", "Kulim", "Sungai Petani"],
  Kelantan: ["Kota Bharu", "Pasir Mas"],
  Melaka: ["Alor Gajah", "Melaka City"],
  "Negeri Sembilan": ["Port Dickson", "Seremban"],
  Pahang: ["Bentong", "Kuantan", "Temerloh"],
  "Pulau Pinang": ["Bukit Mertajam", "Butterworth", "George Town"],
  Perak: ["Ipoh", "Taiping", "Teluk Intan"],
  Perlis: ["Arau", "Kangar"],
  Sabah: ["Kota Kinabalu", "Sandakan", "Tawau"],
  Sarawak: ["Kuching", "Miri", "Sibu"],
  Selangor: ["Klang", "Petaling Jaya", "Shah Alam", "Subang Jaya"],
  Terengganu: ["Kemaman", "Kuala Terengganu"],
  "Kuala Lumpur": ["Kuala Lumpur"],
  Labuan: ["Victoria"],
  Putrajaya: ["Putrajaya"],
};

/** Provinces and their main cities, for profile setup's required
 *  State/Province and City dropdowns (Figma `2574:45837`). */
export const INDONESIA_CITIES: Record<string, string[]> = {
  "DKI Jakarta": ["Jakarta"],
  "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok"],
  "Jawa Tengah": ["Semarang", "Surakarta"],
  "DI Yogyakarta": ["Yogyakarta"],
  "Jawa Timur": ["Malang", "Surabaya"],
  Banten: ["Serang", "Tangerang"],
  Bali: ["Denpasar"],
  "Sumatera Utara": ["Medan"],
  "Sumatera Selatan": ["Palembang"],
  Riau: ["Pekanbaru"],
  "Kalimantan Timur": ["Balikpapan", "Samarinda"],
  "Sulawesi Selatan": ["Makassar"],
};

/**
 * Profile setup's shipping address (Figma `2574:45764` Singapore, `2574:45799`
 * Malaysia, `2574:45837` Indonesia). Country is locked to the creator's
 * market and sits first, beside Postal code. Then come the market's own
 * State/Province and City dropdowns, if it has them, and two free address
 * lines across the row:
 * - Singapore: no City or State/Province.
 * - Malaysia: State/Province and City are optional.
 * - Indonesia: both are required.
 *
 * City lists the chosen state's cities. Markets without a drawn form
 * (Thailand, Vietnam) take Singapore's.
 */
export function setupAddressFields(country: string, state = "", lockCountry = true): FieldSpec[] {
  const regions =
    country === "Malaysia" ? MALAYSIA_CITIES : country === "Indonesia" ? INDONESIA_CITIES : null;
  const regionsOptional = country === "Malaysia";
  const line = (name: string, label: string, autoComplete: string): FieldSpec => ({
    name,
    label,
    placeholder: "",
    autoComplete,
    required: true,
    fullWidth: true,
  });

  return [
    { ...COUNTRY_FIELD, placeholder: "", required: true, locked: lockCountry, disabled: lockCountry },
    {
      name: "postalCode",
      label: "Postal code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: country === "Singapore" ? 6 : 5,
      required: true,
    },
    ...(regions
      ? [
          {
            name: "state",
            label: "State/Province",
            placeholder: "",
            autoComplete: "address-level1",
            options: Object.keys(regions),
            required: !regionsOptional,
            optional: regionsOptional,
          },
          {
            name: "city",
            label: "City",
            placeholder: "",
            autoComplete: "address-level2",
            // Before a state is picked, every city in the market is offered.
            options: regions[state] ?? Object.values(regions).flat().sort(),
            required: !regionsOptional,
            optional: regionsOptional,
          },
        ]
      : []),
    line("addressLine1", "Address line 1", "address-line1"),
    line("addressLine2", "Address line 2", "address-line2"),
  ];
}

/** The address forms' Country: driven by the header's country selector
 *  rather than typed in, so it's locked. */
export const COUNTRY_FIELD: FieldSpec = {
  name: "country",
  label: "Country",
  placeholder: "Select",
  autoComplete: "country-name",
  options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
  locked: true,
};

