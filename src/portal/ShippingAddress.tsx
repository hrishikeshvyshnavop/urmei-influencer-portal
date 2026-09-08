import { useState } from "react";
import FieldGrid from "./components/FieldGrid";
import SetupStep from "./components/SetupStep";
import { ADDRESS_FIELDS_BY_COUNTRY, COUNTRY_FIELD } from "./form-fields";

/** The applying country from the creator's application — the address schema
 *  starts on it rather than on "Select country" as the frame is drawn, since
 *  a country's fields are already on screen and an unset selector next to
 *  them contradicts itself. */
const DEFAULT_COUNTRY = "Singapore";

type ShippingAddressProps = {
  onAddAddress: () => void;
  onBack: () => void;
  onSkip: () => void;
};

/**
 * Step 3 of profile setup — the shipping address brands post samples to
 * (Figma `1583:88069` / `1583:88189`).
 *
 * The country selector is live: each country asks for its own administrative
 * levels, so switching it swaps the whole field set (see
 * `ADDRESS_FIELDS_BY_COUNTRY`). It is drawn last, after the fields it
 * governs, which is how the frame orders it.
 */
export default function ShippingAddress({
  onAddAddress,
  onBack,
  onSkip,
}: ShippingAddressProps) {
  const [values, setValues] = useState<Record<string, string>>({
    country: DEFAULT_COUNTRY,
  });
  const [showErrors, setShowErrors] = useState(false);

  const country = values.country || DEFAULT_COUNTRY;
  const fields = [
    ...(ADDRESS_FIELDS_BY_COUNTRY[country] ?? ADDRESS_FIELDS_BY_COUNTRY[DEFAULT_COUNTRY]),
    // Selectable here, unlike on the apply form where the header's country
    // switch owns it.
    { ...COUNTRY_FIELD, locked: false },
  ];

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

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
          (field) => field.optional || (values[field.name] ?? "").trim(),
        );
        if (!complete) return;
        onAddAddress();
      }}
    >
      <FieldGrid
        fields={fields}
        values={values}
        showErrors={showErrors}
        onChange={setField}
      />
    </SetupStep>
  );
}
