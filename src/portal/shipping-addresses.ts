import { ADDRESS_FIELDS_BY_COUNTRY, type FieldSpec } from "./form-fields";

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

/**
 * The address modal's fields (Figma `1619:58187`): a label of its own, then the
 * same street schema profile setup collects, then country and the recipient's
 * phone.
 */
export const ADDRESS_MODAL_FIELDS: FieldSpec[] = [
  { name: "label", label: "Address Label", placeholder: "", fullWidth: true },
  ...ADDRESS_FIELDS_BY_COUNTRY.Singapore.map((field) => {
    // Floor and unit are optional here — plenty of addresses have neither —
    // and a house number is not a number ("12A", the design's own value).
    if (field.name === "floorNo" || field.name === "unitNumber") return { ...field, optional: true };
    if (field.name === "blockNo") return { ...field, numericOnly: false };
    return field;
  }),
  {
    name: "country",
    label: "Country",
    placeholder: "Select",
    autoComplete: "country-name",
    options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
  },
  // Beside Country, not across the row (Figma `786:28048`).
  {
    name: "phone",
    label: "Recipient phone",
    placeholder: "",
    type: "tel",
    autoComplete: "tel",
  },
];

export const EMPTY_ADDRESS_FIELDS: Record<string, string> = { label: "", blockNo: "", street: "", building: "", floorNo: "", unitNumber: "", postalCode: "", country: "Singapore", phone: "" };

/** What a creator has before they touch the section — the design's three
 *  addresses (Figma `786:28085`): Home ships, Office bills. */
const INITIAL_ADDRESSES: ShippingAddress[] = [
  {
    id: "a1",
    isDefaultShipping: true,
    isDefaultBilling: false,
    fields: { label: "Home", blockNo: "12A", street: "Orchard Boulevard", building: "Camden Medical Centre", floorNo: "03", unitNumber: "28", postalCode: "520101", country: "Singapore", phone: "+65 9123 4567" },
  },
  {
    id: "a2",
    isDefaultShipping: false,
    isDefaultBilling: true,
    fields: { label: "Office", blockNo: "8", street: "Marina View", building: "Asia Square Tower 1", floorNo: "43", unitNumber: "01", postalCode: "018960", country: "Singapore", phone: "+65 6555 0100" },
  },
  {
    id: "a3",
    isDefaultShipping: false,
    isDefaultBilling: false,
    fields: { label: "Studio", blockNo: "71", street: "Ayer Rajah Crescent", building: "", floorNo: "02", unitNumber: "18", postalCode: "139951", country: "Singapore", phone: "+65 9123 4567" },
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
  const street = [[fields.blockNo, fields.street].filter(Boolean).join(" "), fields.building].filter(Boolean).join(", ");
  const within = [
    fields.floorNo ? `Floor ${fields.floorNo}` : "",
    fields.unitNumber ? `Unit ${fields.unitNumber}` : "",
    [fields.country, fields.postalCode].filter(Boolean).join(" "),
  ].filter(Boolean).join(", ");
  return [street, within].filter(Boolean);
}
