import { setupAddressFields, type FieldSpec } from "./form-fields";

/**
 * The creator's saved shipping addresses — one record shared by Manage
 * Account's Shipping Address section and the Request a sample modal, so an
 * address added in either place is there in the other.
 */

/**
 * A saved address: its own id, the two defaults it may hold, plus the form's
 * own values. One address book (Figma `786:28085`): exactly one address is the
 * default shipping address — where brands send samples — and exactly one the
 * default billing address; the same address may be both.
 */
export type ShippingAddress = {
  id: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  fields: Record<string, string>;
};

export type AddressDefaults = { shipping: boolean; billing: boolean };

export const SHIPPING_ADDRESSES_KEY = "urmei.shipping-addresses";

/** An address's type, kept in its `label` field. */
export const ADDRESS_TYPES = ["Home", "Work"];

/** International dial codes, shown ahead of the recipient phone. */
const DIAL_CODES: Record<string, string> = {
  Singapore: "+65",
  Malaysia: "+60",
  Indonesia: "+62",
  Thailand: "+66",
  Vietnam: "+84",
};

export function dialCodeFor(country: string) {
  return DIAL_CODES[country] ?? "";
}

/**
 * The Add / Edit address modal's fields (Figma `2574:47209` Singapore,
 * `2574:47506` Malaysia, `2574:47575` Indonesia): the same per-market address
 * schema profile setup collects (country locked to the market), the
 * recipient's phone across the row under the address lines, then the Address
 * type, Home by default.
 */
export function addressModalFields(country: string, state = ""): FieldSpec[] {
  return [
    ...setupAddressFields(country, state),
    {
      name: "phone",
      label: "Recipient phone",
      placeholder: "",
      type: "tel",
      autoComplete: "tel-national",
      prefix: dialCodeFor(country),
      optional: true,
      fullWidth: true,
    },
    {
      name: "label",
      label: "Address type",
      placeholder: "",
      options: ADDRESS_TYPES,
      required: true,
      fullWidth: true,
    },
  ];
}

/**
 * An address's fields in the current two-line schema. Addresses saved under
 * the older Singapore schema (block, street, building, floor, unit) are folded
 * into Address line 1 and 2, and a free-text label becomes an Address type.
 */
export function toLineFields(fields: Record<string, string>): Record<string, string> {
  const label = ADDRESS_TYPES.includes(fields.label) ? fields.label : "Work";
  if (fields.addressLine1 !== undefined) return { ...fields, label: fields.label ? label : "Home" };
  const floorUnit = fields.floorNo || fields.unitNumber ? `#${[fields.floorNo, fields.unitNumber].filter(Boolean).join("-")}` : "";
  return {
    label: fields.label ? label : "Home",
    phone: fields.phone ?? "",
    country: fields.country ?? "",
    postalCode: fields.postalCode ?? "",
    addressLine1: [fields.blockNo, fields.street].filter(Boolean).join(" "),
    addressLine2: [fields.building, floorUnit].filter(Boolean).join(" "),
  };
}

/** What a creator has before they touch the section — the design's three
 *  addresses (Figma `2574:47261`): Home ships, Work bills. */
const INITIAL_ADDRESSES: ShippingAddress[] = [
  {
    id: "a1",
    isDefaultShipping: true,
    isDefaultBilling: false,
    fields: { label: "Home", addressLine1: "12A Orchard Boulevard", addressLine2: "Camden Medical Centre #03-28", postalCode: "520101", country: "Singapore", phone: "+65 9123 4567" },
  },
  {
    id: "a2",
    isDefaultShipping: false,
    isDefaultBilling: true,
    fields: { label: "Work", addressLine1: "8 Marina View", addressLine2: "Asia Square Tower 1 #43-01", postalCode: "018960", country: "Singapore", phone: "+65 6555 0100" },
  },
  {
    id: "a3",
    isDefaultShipping: false,
    isDefaultBilling: false,
    fields: { label: "Work", addressLine1: "71 Ayer Rajah Crescent", addressLine2: "#02-18", postalCode: "139951", country: "Singapore", phone: "+65 9123 4567" },
  },
];

/** Keeps each default held by exactly one address: the first holder wins,
 *  and an address book with no holder hands it to its first address. */
function withOneOfEachDefault(addresses: ShippingAddress[]): ShippingAddress[] {
  const shippingId = (addresses.find((address) => address.isDefaultShipping) ?? addresses[0])?.id;
  const billingId = (addresses.find((address) => address.isDefaultBilling) ?? addresses[0])?.id;
  return addresses.map((address) => ({
    ...address,
    isDefaultShipping: address.id === shippingId,
    isDefaultBilling: address.id === billingId,
  }));
}

export function readShippingAddresses(): ShippingAddress[] {
  try {
    const stored = window.localStorage.getItem(SHIPPING_ADDRESSES_KEY);
    if (stored === null) return INITIAL_ADDRESSES;
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return INITIAL_ADDRESSES;
    // Records saved before billing existed carry a single `isDefault` — the
    // samples address — which becomes both defaults.
    return withOneOfEachDefault(
      parsed.map((address: ShippingAddress & { isDefault?: boolean }) => ({
        id: address.id,
        fields: address.fields,
        isDefaultShipping: address.isDefaultShipping ?? address.isDefault ?? false,
        isDefaultBilling: address.isDefaultBilling ?? address.isDefault ?? false,
      })),
    );
  } catch {
    return INITIAL_ADDRESSES;
  }
}

export function saveShippingAddresses(addresses: ShippingAddress[]) {
  try {
    window.localStorage.setItem(SHIPPING_ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}

/** Moves the defaults `address` claims onto it. A default is only ever moved,
 *  never dropped, so turning one off here leaves it where it was. */
function claimDefaults(addresses: ShippingAddress[], id: string, defaults: AddressDefaults) {
  return withOneOfEachDefault(
    addresses.map((item) => ({
      ...item,
      isDefaultShipping: defaults.shipping ? item.id === id : item.isDefaultShipping,
      isDefaultBilling: defaults.billing ? item.id === id : item.isDefaultBilling,
    })),
  );
}

/** Adds or replaces `address`. The first address saved holds both defaults. */
export function upsertShippingAddress(current: ShippingAddress[], address: ShippingAddress) {
  const id = address.id || `address-${Date.now()}`;
  const saved = { ...address, id };
  const next = address.id ? current.map((item) => (item.id === address.id ? saved : item)) : [...current, saved];
  const addresses = claimDefaults(next, id, { shipping: saved.isDefaultShipping, billing: saved.isDefaultBilling });
  return { addresses, saved: addresses.find((item) => item.id === id)! };
}

/** "Set As" (Figma `786:28154`): makes `id` the default shipping and/or
 *  billing address. */
export function setAddressDefaults(current: ShippingAddress[], id: string, defaults: AddressDefaults) {
  return claimDefaults(current, id, defaults);
}

/** Deletes an address; any default it held passes to the first one left. */
export function removeShippingAddress(current: ShippingAddress[], id: string) {
  const removed = current.find((item) => item.id === id);
  const remaining = current.filter((item) => item.id !== id).map((item) => ({
    ...item,
    isDefaultShipping: removed?.isDefaultShipping ? false : item.isDefaultShipping,
    isDefaultBilling: removed?.isDefaultBilling ? false : item.isDefaultBilling,
  }));
  return withOneOfEachDefault(remaining);
}

const SETUP_ADDRESS_ID = "setup-home";

/** The address profile setup saved, if any — prefills step 3 on the way back. */
export function readSetupAddressFields(): Record<string, string> | null {
  return readShippingAddresses().find((address) => address.id === SETUP_ADDRESS_ID)?.fields ?? null;
}

/**
 * Saves profile setup's address. The step asks no Address Type, so it is
 * saved as Home (the creator can rename it in Manage Account). It's the
 * creator's first address, so the demo addresses that stand in before
 * anything is saved are dropped. Submitting the step again updates the same
 * record instead of adding another Home.
 */
export function saveSetupAddress(fields: Record<string, string>) {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(SHIPPING_ADDRESSES_KEY);
  } catch {
    // Treated as an empty address book below.
  }
  const current = stored === null ? [] : readShippingAddresses();
  const existing = current.find((address) => address.id === SETUP_ADDRESS_ID);
  const next = existing
    ? current.map((address) =>
        address.id === SETUP_ADDRESS_ID ? { ...address, fields: { ...address.fields, ...fields } } : address,
      )
    : [
        ...current,
        {
          id: SETUP_ADDRESS_ID,
          isDefaultShipping: false,
          isDefaultBilling: false,
          fields: { label: "Home", phone: "", ...fields },
        },
      ];
  saveShippingAddresses(withOneOfEachDefault(next));
}

/** The address samples go to: the default shipping address. */
export function defaultShippingAddress(addresses: ShippingAddress[]) {
  return addresses.find((address) => address.isDefaultShipping) ?? addresses[0] ?? null;
}

/**
 * The two lines the design prints under an address label: the street, then
 * everything that locates it inside the street. Both drop what is missing, so
 * an address with no floor, unit or building still reads cleanly.
 */
export function addressLines(fields: Record<string, string>) {
  // Profile setup's address is two free lines, then city, state and country.
  if (fields.addressLine1 !== undefined) {
    return [
      [fields.addressLine1, fields.addressLine2].filter(Boolean).join(", "),
      [fields.city, fields.state, [fields.country, fields.postalCode].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", "),
    ].filter(Boolean);
  }
  const street = [[fields.blockNo, fields.street].filter(Boolean).join(" "), fields.building].filter(Boolean).join(", ");
  const within = [
    fields.floorNo ? `Floor ${fields.floorNo}` : "",
    fields.unitNumber ? `Unit ${fields.unitNumber}` : "",
    [fields.country, fields.postalCode].filter(Boolean).join(" "),
  ].filter(Boolean).join(", ");
  return [street, within].filter(Boolean);
}
