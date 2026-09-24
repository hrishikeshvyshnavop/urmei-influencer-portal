import { useState } from "react";
import FieldGrid from "./FieldGrid";
import FormModal from "./FormModal";
import { DefaultCheckbox } from "./SetDefaultsModal";
import { ADDRESS_MODAL_FIELDS, EMPTY_ADDRESS_FIELDS, type ShippingAddress } from "../shipping-addresses";

/**
 * Add / Edit address (Figma `786:28048`). Manage Account opens it from its
 * Addresses section and the Request a sample modal from its "No shipping
 * address available" state; both hand the finished address back through
 * `onSave` and decide where it goes.
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
  const [draft, setDraft] = useState<ShippingAddress>(() =>
    address
      ? { ...address, fields: { ...address.fields } }
      : { id: "", isDefaultShipping: isFirst, isDefaultBilling: isFirst, fields: { ...EMPTY_ADDRESS_FIELDS } },
  );
  const [showErrors, setShowErrors] = useState(false);
  const shippingLocked = isFirst || Boolean(address?.isDefaultShipping);
  const billingLocked = isFirst || Boolean(address?.isDefaultBilling);

  return (
    <FormModal
      title={draft.id ? "Edit address" : "Add address"}
      submitLabel="Save Address"
      onSubmit={() => {
        setShowErrors(true);
        const complete = ADDRESS_MODAL_FIELDS.every((field) => field.optional || (draft.fields[field.name] ?? "").trim());
        if (complete) onSave(draft);
      }}
      onClose={onClose}
    >
      <FieldGrid
        fields={ADDRESS_MODAL_FIELDS}
        values={draft.fields}
        showErrors={showErrors}
        onChange={(name, value) => setDraft((current) => ({ ...current, fields: { ...current.fields, [name]: value } }))}
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
      {isFirst ? (
        <p className="text-[13px] leading-[18px] text-portal-muted">
          This is your first address, so it is set as both by default. You can change either later.
        </p>
      ) : null}
    </FormModal>
  );
}
