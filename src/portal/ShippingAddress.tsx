import { useState, useSyncExternalStore } from "react";
import FieldGrid from "./components/FieldGrid";
import SetupStep from "./components/SetupStep";
import { getSelectedCountry, subscribeToSelectedCountry } from "./country-status";
import { setupAddressFields } from "./form-fields";
import { readSetupAddressFields, saveSetupAddress } from "./shipping-addresses";

type ShippingAddressProps = {
  onAddAddress: () => void;
  onBack: () => void;
  onSkip: () => void;
};

/**
 * Step 3 of profile setup: the shipping address brands send samples to
 * (Figma `2574:45764` Singapore, `2574:45799` Malaysia, `2574:45837`
 * Indonesia).
 *
 * Country can be selected on this profile page. The rest of the form follows
 * the selected country's address format (see `setupAddressFields`). The
 * address is saved as Home.
 */
export default function ShippingAddress({
  onAddAddress,
  onBack,
  onSkip,
}: ShippingAddressProps) {
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const saved = readSetupAddressFields();
    // A saved address only prefills while it's for the same market.
    return saved?.country === getSelectedCountry() ? saved : {};
  });
  const [showErrors, setShowErrors] = useState(false);

  const formCountry = values.country || country;
  const fields = setupAddressFields(formCountry, values.state, false);
  const formValues: Record<string, string> = { ...values, country: formCountry };

  const setField = (name: string, value: string) =>
    setValues((current) => ({
      ...current,
      [name]: value,
      // A new state's city list may not hold the old city.
      ...(name === "state" && value !== current.state ? { city: "" } : {}),
      ...(name === "country" && value !== current.country
        ? { state: "", city: "", postalCode: "" }
        : {}),
    }));

  return (
    <SetupStep
      step={3}
      title="Add your shipping address"
      subtitle="This address helps brands send product samples to you."
      submitLabel="Add Address"
      onBack={onBack}
      onSkip={onSkip}
      onSubmit={() => {
        setShowErrors(true);
        const complete = fields.every(
          (field) => field.optional || (formValues[field.name] ?? "").trim(),
        );
        if (!complete) return;
        saveSetupAddress(
          Object.fromEntries(fields.map((field) => [field.name, formValues[field.name] ?? ""])),
        );
        onAddAddress();
      }}
    >
      <FieldGrid
        fields={fields}
        values={formValues}
        showErrors={showErrors}
        onChange={setField}
      />
    </SetupStep>
  );
}
