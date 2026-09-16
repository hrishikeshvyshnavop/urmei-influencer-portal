/** A saved address: its own id and default flag, plus the form's own values
 *  (schema varies by country — see `ADDRESS_FIELDS_BY_COUNTRY`). */
export type ShippingAddress = { id: string; isDefault: boolean; fields: Record<string, string> };

const SHIPPING_ADDRESSES_KEY = "urmei:shipping-addresses";

/** Manage Account's original fixture, kept as the first-load seed so the
 *  page still demos with real-looking addresses rather than starting empty. */
function seedShippingAddresses(): ShippingAddress[] {
  return [
    {
      id: "a1",
      isDefault: true,
      fields: { label: "Home", blockNo: "12A", street: "Orchard Boulevard", building: "Camden Medical Centre", floorNo: "03", unitNumber: "28", postalCode: "520101", country: "Singapore", phone: "+65 9123 4567" },
    },
    {
      id: "a2",
      isDefault: false,
      fields: { label: "Vietnam studio", blockNo: "88", street: "Nguyen Hue, District 1", building: "", floorNo: "", unitNumber: "", postalCode: "700000", country: "Vietnam", phone: "+84 90 123 4567" },
    },
  ];
}

export function loadShippingAddresses(): ShippingAddress[] {
  try {
    const raw = window.localStorage.getItem(SHIPPING_ADDRESSES_KEY);
    if (!raw) {
      const seeded = seedShippingAddresses();
      saveShippingAddresses(seeded);
      return seeded;
    }
    return JSON.parse(raw) as ShippingAddress[];
  } catch {
    return [];
  }
}

export function saveShippingAddresses(addresses: ShippingAddress[]) {
  try {
    window.localStorage.setItem(SHIPPING_ADDRESSES_KEY, JSON.stringify(addresses));
  } catch {
    // The current session still works when storage is unavailable.
  }
}

/** A one-line, human-readable rendering of a saved address's fields — used
 *  wherever an address needs to read as a summary rather than a form. */
export function formatAddress(fields: Record<string, string>): string {
  const unit = fields.floorNo && fields.unitNumber ? `#${fields.floorNo}-${fields.unitNumber}` : undefined;
  return [fields.blockNo, fields.street, fields.building, unit, fields.postalCode, fields.country]
    .filter((part) => part && part.trim().length > 0)
    .join(", ");
}

/** The address samples ship to: whichever one Manage Account has marked "For
 *  sample shipping" (`isDefault`), or the first saved address if none is
 *  marked, or null if the creator hasn't saved one yet. Read by the
 *  sample-request flow so a creator with an address on file never has to
 *  retype it. */
export function defaultShippingAddress(): ShippingAddress | null {
  const addresses = loadShippingAddresses();
  return addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;
}
