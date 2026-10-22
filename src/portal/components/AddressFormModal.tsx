import { useState, useSyncExternalStore } from "react";
import FieldGrid from "./FieldGrid";
import FormModal from "./FormModal";
import { DefaultCheckbox } from "./SetDefaultsModal";
import { getSelectedCountry, subscribeToSelectedCountry } from "../country-status";
import { addressModalFields, dialCodeFor, toLineFields, type ShippingAddress } from "../shipping-addresses";

/**
 * Add / Edit address (Figma `2574:47209` Singapore, `2574:47506` Malaysia,
 * `2574:47575` Indonesia). Manage Account opens it from its Addresses section
 * and the Request a sample modal from its "No shipping address available"
 * state; both hand the finished address back through `onSave` and decide
 * where it goes.
 *
 * Country is locked to the creator's market and the fields follow that
 * market's address format. The phone is typed without its dial code, which
 * the field shows ahead of it and the saved address carries.
 *
 * A default is only ever moved, never dropped, so a default this address
 * already holds — or both, for the first address — shows ticked and locked.
 */
export default function AddressFormModal({
  address,
  isFirst = false,
  onSave,
  onClose,
}: {
  /** The address being edited; omitted when adding a new one. */
  address?: ShippingAddress;
  /** Adding to an empty address book: the address takes both defaults. */
  isFirst?: boolean;
  onSave: (address: ShippingAddress) => void;
  onClose: () => void;
}) {
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const dialCode = dialCodeFor(country);
  const [draft, setDraft] = useState<ShippingAddress>((): ShippingAddress => {
    if (!address) {
      return { id: "", isDefaultShipping: isFirst, isDefaultBilling: isFirst, fields: { label: "Home" } };
    }
    const fields: Record<string, string> = toLineFields(address.fields);
    const saved = fields.phone ?? "";
    const phone = dialCode && saved.startsWith(dialCode) ? saved.slice(dialCode.length).trim() : saved;
    return { ...address, fields: { ...fields, phone } };
  });
  const [showErrors, setShowErrors] = useState(false);
  const shippingLocked = isFirst || Boolean(address?.isDefaultShipping);
  const billingLocked = isFirst || Boolean(address?.isDefaultBilling);

  const fields = addressModalFields(country, draft.fields.state);
  const values: Record<string, string> = { ...draft.fields, country };

  return (
    <FormModal
      title={draft.id ? "Edit address" : "Add address"}
      submitLabel="Save Address"
      onSubmit={() => {
        setShowErrors(true);
        const complete = fields.every((field) => field.optional || (values[field.name] ?? "").trim());
        if (!complete) return;
        const phone = values.phone?.trim() ? `${dialCode} ${values.phone.trim()}` : "";
        onSave({
          ...draft,
          fields: { ...Object.fromEntries(fields.map((field) => [field.name, values[field.name] ?? ""])), phone },
        });
      }}
      onClose={onClose}
    >
      <FieldGrid
        fields={fields}
        values={values}
        showErrors={showErrors}
        onChange={(name, value) =>
          setDraft((current) => ({
            ...current,
            fields: {
              ...current.fields,
              [name]: value,
              // A new state's city list may not hold the old city.
              ...(name === "state" && value !== current.fields.state ? { city: "" } : {}),
            },
          }))
        }
      />
      <DefaultCheckbox
        label="Set as default shipping address"
        checked={draft.isDefaultShipping}
        disabled={shippingLocked}
        onChange={(checked) => setDraft((current) => ({ ...current, isDefaultShipping: checked }))}
      />
      <DefaultCheckbox
        label="Set as default billing address"
        checked={draft.isDefaultBilling}
        disabled={billingLocked}
        onChange={(checked) => setDraft((current) => ({ ...current, isDefaultBilling: checked }))}
      />
    </FormModal>
  );
}
