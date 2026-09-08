import type { FieldSpec } from "./form-fields";

/** Where the payout account lives, and how the partner popup announces one. */
export const PAYMENT_STORAGE_KEY = "urmei:payment-result";
export const PAYMENT_MESSAGE_TYPE = "urmei:payment-complete";

/**
 * The payout account, as the design's "Add bank details" form collects it
 * (Figma `1619:59252`) and its connected card reads it back (`1619:59353`).
 *
 * It rides along in the marker `PAYMENT_STORAGE_KEY` already held — the one
 * `SetupBanner` and `Onboarding` ask "is a payout account on file?" — so
 * details added during setup, details added from Manage Account and the demo
 * account the provider popup lands are all the same record. A record with no
 * fields at all (what the popup used to write) reads as *not added* here,
 * while `SetupBanner` still counts it as done.
 */
export type BankAccount = {
  accountHolderName: string;
  bankName: string;
  bankAccountNumber: string;
  bankCode: string;
  accountHolderType: string;
  accountType: string;
  payoutCurrency: string;
};

export const EMPTY_BANK_ACCOUNT: BankAccount = {
  accountHolderName: "",
  bankName: "",
  bankAccountNumber: "",
  bankCode: "",
  accountHolderType: "",
  accountType: "",
  payoutCurrency: "",
};

/**
 * The saved account, or `null` while no payout account is on file.
 *
 * A marker with no details behind it (what the provider popup used to write,
 * before the design moved bank entry in-app) reads as no account rather than
 * as an account with blank fields — otherwise its card renders as a row of
 * empty labels.
 */
export function readBankAccount(): BankAccount | null {
  try {
    const saved = window.localStorage.getItem(PAYMENT_STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved) as { status?: string } & Partial<BankAccount>;
    if (parsed.status !== "complete") return null;
    const account = { ...EMPTY_BANK_ACCOUNT, ...parsed };
    if (!account.accountHolderName.trim() && !account.bankAccountNumber.trim()) return null;
    return account;
  } catch {
    return null;
  }
}

export function saveBankAccount(account: Partial<BankAccount>) {
  try {
    window.localStorage.setItem(
      PAYMENT_STORAGE_KEY,
      JSON.stringify({
        ...EMPTY_BANK_ACCOUNT,
        ...account,
        status: "complete",
        completedAt: Date.now(),
      }),
    );
  } catch {
    // Without storage the shop just keeps prompting to add payout details.
  }
}

/**
 * Figma `1583:88109` (the frame is misnamed "Adding shipping address"; its
 * content is the bank step). Asterisked labels are the design's required
 * fields; bank code, payout currency and account type carry none. Payout
 * currency has no chevron in either frame, so it's a plain input rather than
 * a select.
 */
export const BANK_FIELDS: FieldSpec[] = [
  {
    name: "accountHolderName",
    label: "Account holder name",
    placeholder: "",
    required: true,
    autoComplete: "name",
  },
  { name: "bankName", label: "Bank name", placeholder: "", required: true },
  {
    name: "bankAccountNumber",
    label: "Bank account number",
    placeholder: "",
    required: true,
  },
  { name: "bankCode", label: "Bank code", placeholder: "", optional: true },
  {
    name: "accountHolderType",
    label: "Account holder type",
    placeholder: "Choose account holder type",
    required: true,
    options: ["Individual", "Business"],
  },
  {
    name: "payoutCurrency",
    label: "Payout currency",
    placeholder: "",
    optional: true,
  },
  {
    name: "accountType",
    label: "Account type",
    placeholder: "Choose account type",
    optional: true,
    options: ["Savings", "Current"],
  },
];
