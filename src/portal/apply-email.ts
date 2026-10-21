/**
 * The email an applicant verified before the apply form (Figma `2660:53965` →
 * `2660:54110`), and the addresses that have already applied.
 *
 * The verified email lives in `sessionStorage`: `App` remounts each route, so
 * the OTP screen can't hand it to the form as state, and a verification
 * shouldn't outlive the tab it was done in. Applied emails go to
 * `localStorage` and stand in for "this email already has an account" until
 * there is a backend to ask.
 */
const VERIFIED_EMAIL_KEY = "urmei-apply-verified-email";
const APPLIED_EMAILS_KEY = "urmei-applied-emails";

const normalise = (email: string) => email.trim().toLowerCase();

export function getVerifiedApplyEmail(): string | null {
  try {
    return window.sessionStorage.getItem(VERIFIED_EMAIL_KEY);
  } catch {
    return null;
  }
}

export function saveVerifiedApplyEmail(email: string) {
  try {
    window.sessionStorage.setItem(VERIFIED_EMAIL_KEY, email.trim());
  } catch {
    // The form falls back to sending the applicant back to verify.
  }
}

function readAppliedEmails(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(APPLIED_EMAILS_KEY) ?? "[]",
    );
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function hasAccount(email: string) {
  return readAppliedEmails().includes(normalise(email));
}

export function recordApplication(email: string) {
  const emails = readAppliedEmails();
  const next = normalise(email);
  if (emails.includes(next)) return;
  try {
    window.localStorage.setItem(
      APPLIED_EMAILS_KEY,
      JSON.stringify([...emails, next]),
    );
  } catch {
    // Without storage the duplicate check simply never fires.
  }
}
