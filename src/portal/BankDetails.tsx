import { useState, useSyncExternalStore } from "react";
import FieldGrid from "./components/FieldGrid";
import SetupStep from "./components/SetupStep";
import { BANK_FIELDS, isBankAccountComplete, payoutCurrencyFor, saveBankAccount } from "./bank-account";
import { getSelectedCountry, subscribeToSelectedCountry } from "./country-status";

type BankDetailsProps = {
  onAddAccount: () => void;
  onBack: () => void;
  onSkip: () => void;
};

/** Step 4 of profile setup — the payout account (Figma `2574:45724`,
 *  `2574:45968`, `2574:46009` in the main design file, one per market). This
 *  is where the shop's earnings are paid, so it is the last thing standing
 *  between the creator and a publishable shop. */
export default function BankDetails({
  onAddAccount,
  onBack,
  onSkip,
}: BankDetailsProps) {
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);

  // Until the creator picks one, the payout currency is their market's.
  const formValues = { ...values, payoutCurrency: values.payoutCurrency || payoutCurrencyFor(country) };

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
        if (!isBankAccountComplete(formValues)) return;
        saveBankAccount(formValues);
        onAddAccount();
      }}
    >
      <FieldGrid
        fields={BANK_FIELDS}
        values={formValues}
        showErrors={showErrors}
        onChange={setField}
      />
    </SetupStep>
  );
}
