/**
 * The `FieldSpec` shape used by the portal's field grids, plus the per-country
 * shipping/address schemas.
 *
 * Extracted from `ApplyCreator` when the latest design (Figma `1583:87421`)
 * dropped the address block from the application itself and moved address
 * capture into profile setup as its own step ("Adding shipping address",
 * `1583:88069`). The schemas are the same either way — five countries, each
 * asking for its own administrative levels — so they live here rather than
 * being deleted from one screen and retyped in the next.
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

export const MALAYSIA_STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Pulau Pinang",
  "Perak",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

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
export function setupAddressFields(country: string, state = ""): FieldSpec[] {
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
    { ...COUNTRY_FIELD, placeholder: "", required: true },
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

/** Always the last field in every country's address section — driven by the
 *  header's country selector rather than typed in, so it's locked here and
 *  synced from `country-status` in the component below. */
export const COUNTRY_FIELD: FieldSpec = {
  name: "country",
  label: "Country",
  placeholder: "Select",
  autoComplete: "country-name",
  options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
  locked: true,
};

/** Each country's address form asks for different administrative levels, so
 *  the field set itself — not just validation — changes with the header's
 *  selected country. Field names are unique per country (no shared "street"
 *  etc.) so a value typed for one country's field never bleeds into another
 *  country's field of a similar name after switching back and forth. */
export const ADDRESS_FIELDS_BY_COUNTRY: Record<string, FieldSpec[]> = {
  Singapore: [
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 6,
    },
    {
      name: "blockNo",
      label: "Blk / House No",
      placeholder: "",
      numericOnly: true,
    },
    {
      name: "street",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "building",
      label: "Building Name",
      placeholder: "",
      autoComplete: "address-line2",
      optional: true,
    },
    {
      name: "floorNo",
      label: "Floor No.",
      placeholder: "",
      numericOnly: true,
    },
    {
      name: "unitNumber",
      label: "Unit Number",
      placeholder: "",
      numericOnly: true,
    },
  ],
  Malaysia: [
    {
      name: "myPostcode",
      label: "Postcode",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
    {
      name: "myBlockNo",
      label: "Blk / House / Lot No",
      placeholder: "",
    },
    {
      name: "myStreet",
      label: "Street Name (Jalan)",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "myBuilding",
      label: "Building / Taman",
      placeholder: "",
      autoComplete: "address-line2",
    },
    {
      name: "myFloorNo",
      label: "Floor No.",
      placeholder: "",
      numericOnly: true,
      optional: true,
    },
    {
      name: "myUnitNumber",
      label: "Unit Number",
      placeholder: "",
      numericOnly: true,
      optional: true,
    },
    {
      name: "myCity",
      label: "City",
      placeholder: "",
      autoComplete: "address-level2",
    },
    {
      name: "myState",
      label: "State",
      placeholder: "Select",
      options: MALAYSIA_STATES,
      autoComplete: "address-level1",
    },
  ],
  Thailand: [
    {
      name: "thHouseNo",
      label: "House / Plot No",
      placeholder: "",
    },
    {
      name: "thMoo",
      label: "Moo / Village / Building",
      placeholder: "",
      autoComplete: "address-line2",
    },
    {
      name: "thRoad",
      label: "Road / Alley (Thanon / Soi)",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "thSubDistrict",
      label: "Sub-district (Tambon / Khwaeng)",
      placeholder: "",
    },
    {
      name: "thDistrict",
      label: "District (Amphoe / Khet)",
      placeholder: "",
    },
    {
      name: "thProvince",
      label: "Province (Changwat)",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "thPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
  Vietnam: [
    {
      name: "vnHouseNo",
      label: "House / Alley / Building No",
      placeholder: "",
    },
    {
      name: "vnStreet",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "vnWard",
      label: "Ward / Commune (Phường / Xã)",
      placeholder: "",
    },
    {
      name: "vnDistrict",
      label: "District (Quận / Huyện)",
      placeholder: "",
    },
    {
      name: "vnProvince",
      label: "Province / City (Tỉnh / Thành phố)",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "vnPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
  Indonesia: [
    {
      name: "idHouseNo",
      label: "House / Blk No",
      placeholder: "",
    },
    {
      name: "idStreet",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "idRtRw",
      label: "RT / RW",
      placeholder: "",
    },
    {
      name: "idVillage",
      label: "Village / Sub-district (Kelurahan / Desa)",
      placeholder: "",
    },
    {
      name: "idDistrict",
      label: "District (Kecamatan)",
      placeholder: "",
    },
    {
      name: "idCity",
      label: "City / Regency (Kota / Kabupaten)",
      placeholder: "",
      autoComplete: "address-level2",
    },
    {
      name: "idProvince",
      label: "Province",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "idPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
};
