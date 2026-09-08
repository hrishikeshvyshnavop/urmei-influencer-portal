import { useState } from "react";
import FieldGrid from "./components/FieldGrid";
import SetupStep from "./components/SetupStep";
import { BANK_FIELDS, saveBankAccount } from "./bank-account";

type BankDetailsProps = {
  onAddAccount: () => void;
  onBack: () => void;
  onSkip: () => void;
};

/** Step 4 of profile setup — the payout account (Figma `1583:88109` /
 *  `1583:88149`). This is where the shop's earnings are paid, so it is the
 *  last thing standing between the creator and a publishable shop. */
export default function BankDetails({
  onAddAccount,
  onBack,
  onSkip,
}: BankDetailsProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  return (
    <SetupStep
      step={4}
      title="Add bank details"
      subtitle="To launch your shop and receive payments, add your bank details."
      submitLabel="Add Account"
      onBack={onBack}
      onSkip={onSkip}
      onSubmit={() => {
        setShowErrors(true);
        const complete = BANK_FIELDS.every(
          (field) => field.optional || (values[field.name] ?? "").trim(),
        );
        if (!complete) return;
        saveBankAccount(values);
        onAddAccount();
      }}
    >
      <FieldGrid
        fields={BANK_FIELDS}
        values={values}
        showErrors={showErrors}
        onChange={setField}
      />
    </SetupStep>
  );
}
