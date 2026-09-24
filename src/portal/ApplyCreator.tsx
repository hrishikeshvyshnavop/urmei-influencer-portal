import { useEffect, useState, useSyncExternalStore } from "react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import { IdentityVerificationCard } from "./components/IdentityVerificationCard";
import PortalFormLayout from "./components/PortalFormLayout";
import SectionTitle from "./components/SectionTitle";
import SocialAccountRow from "./components/SocialAccountRow";
import type { SocialPlatform } from "./components/SocialAccountRow";
import FieldGrid from "./components/FieldGrid";
import { getSelectedCountry, subscribeToSelectedCountry } from "./country-status";
import type { FieldSpec } from "./form-fields";
import { useIdentityVerification } from "./identity-verification";
import { scrollToFirstError } from "@/lib/form-validation";

function getLatestEligibleBirthday() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  date.setFullYear(date.getFullYear() - 18);
  return date;
}

const latestEligibleBirthday = getLatestEligibleBirthday();

function isValidAdultBirthday(value: string) {
  const birthday = new Date(value);
  return (
    !Number.isNaN(birthday.getTime()) && birthday <= latestEligibleBirthday
  );
}

/** The market being applied for. Driven by the header's country switcher
 *  rather than typed in, so it's locked here and synced from `country-status`
 *  in the component below. Distinct from the shipping address captured later
 *  in profile setup — this one decides which market reviews the application. */
const APPLYING_COUNTRY_FIELD: FieldSpec = {
  name: "country",
  label: "Applying Country",
  placeholder: "Select",
  autoComplete: "country-name",
  options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
  locked: true,
};

/**
 * The application's fields, per Figma `1583:87432`.
 *
 * Deliberately shorter than it used to be. The latest design drops Display
 * Name — profile setup chooses it (`1583:87725`) — and the entire per-country
 * address block, which becomes its own profile-setup step ("Adding shipping
 * address", `1583:88069`). What's left is only what's needed to verify
 * someone and send them an invitation; the schemas for the address step are
 * preserved in `form-fields.ts` rather than deleted.
 */
const personalFields: FieldSpec[] = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "",
    autoComplete: "given-name",
    hint: "Based on your country's valid ID.",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "",
    autoComplete: "family-name",
    hint: "Based on your country's valid ID.",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "",
    type: "email",
    autoComplete: "email",
    hint: "Invitation will be sent to this email.",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "birthday",
    label: "DOB",
    placeholder: "Select",
    icon: "calendar",
    autoComplete: "bday",
    latestDate: latestEligibleBirthday,
  },
  APPLYING_COUNTRY_FIELD,
];


const platforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@CharlotteTan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

/** The apply form's rules beyond "required and empty": a birthday has to be
 *  an adult one, and an email has to look like an email. */
function applyFieldError(field: FieldSpec, value: string) {
  if (field.name === "birthday" && value.trim() && !isValidAdultBirthday(value)) {
    return "You must be at least 18 years old to apply.";
  }
  if (
    field.type === "email" &&
    value.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return "Enter a valid email address.";
  }
  return undefined;
}

type ApplyCreatorProps = {
  onBack: () => void;
  onSubmit: () => void;
};

export default function ApplyCreator({
  onBack,
  onSubmit,
}: ApplyCreatorProps) {
  const selectedCountry = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const [values, setValues] = useState<Record<string, string>>({ country: selectedCountry });
  const identity = useIdentityVerification();
  const [connected, setConnected] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [consentedToData, setConsentedToData] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setValues((current) => ({ ...current, country: selectedCountry }));
  }, [selectedCountry]);

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const togglePlatform = (id: string) =>
    setConnected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const allFieldsComplete = personalFields
    .filter((field) => !field.optional)
    .every((field) => (values[field.name] ?? "").trim().length > 0);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "");
  const isAdult = isValidAdultBirthday(values.birthday ?? "");
  const canContinue =
    allFieldsComplete &&
    emailIsValid &&
    isAdult &&
    identity.status === "complete" &&
    connected.length > 0 &&
    agreedToTerms &&
    consentedToData;

  return (
    <PortalFormLayout animate={false}>
      <form
        /* The design's form column (Figma `1583:87424`): the content starts at
           the header's bottom edge — 96px, not a gap below it — with 40px
           between the page header, the sections and the terms block, and 64px
           of tail. */
        className="flex w-full max-w-[940px] flex-col gap-10 px-6 pt-[96px] pb-16 sm:px-12 lg:px-[100px]"
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          setShowErrors(true);
          if (!canContinue) {
            scrollToFirstError(event.currentTarget);
            return;
          }
          onSubmit();
        }}
      >
        <div className="flex w-full max-w-[740px] flex-col items-start gap-[6px]">
          <h1 className="w-full text-body-xxl text-portal-text">
            Apply as Creator
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Complete your details so we can verify you to provide access to
            URMEI Creator Portal
          </p>
        </div>

        <div className="flex w-full max-w-[740px] flex-col items-start gap-[44px]">
          <section className="flex w-full flex-col items-start gap-6">
            <SectionTitle>Personal Info</SectionTitle>
            <FieldGrid
              fields={personalFields}
              values={values}
              showErrors={showErrors}
              onChange={setField}
              // Gated so a half-typed email doesn't accuse the user mid-word;
              // the standing required check is already gated by `showErrors`.
              errorFor={showErrors ? applyFieldError : undefined}
            />
          </section>

          {/* Identity verification sits inside the application now, ahead of
              approval, rather than waiting for post-approval onboarding. */}
          <section className="flex w-full flex-col items-start gap-5">
            <SectionTitle>Identity Verification</SectionTitle>
            <IdentityVerificationCard
              status={identity.status}
              onStart={identity.startVerification}
              onRestart={identity.restartVerification}
            />
            {showErrors && identity.status !== "complete" ? (
              <p className="text-body-xs text-portal-alert" role="alert" aria-invalid="true">
                Verify your identity to continue.
              </p>
            ) : null}
          </section>

          <section className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-2">
              <SectionTitle>Social accounts</SectionTitle>
              <p className="w-full text-body-sm text-portal-muted">
                Connect at least one social account to help verify your reach
                as a creator.
              </p>
            </div>

            <div className="w-full divide-y divide-portal-border overflow-hidden rounded-lg border border-solid border-portal-border">
              {platforms.map((platform) => (
                <SocialAccountRow
                  key={platform.id}
                  platform={platform}
                  connected={connected.includes(platform.id)}
                  onToggle={() => togglePlatform(platform.id)}
                />
              ))}
            </div>
            {showErrors && connected.length === 0 ? (
              <p className="text-body-xs text-portal-alert" role="alert" aria-invalid="true">
                Connect at least one social account.
              </p>
            ) : null}

            <p className="w-full text-body-xxs text-portal-muted opacity-80">
              We keep your accounts safe and secure. We&#39;ll never post
              anything on your behalf or look at your private messages. You can
              disconnect anytime from Settings.
            </p>
          </section>
        </div>

        <div className="flex w-full max-w-[740px] flex-col items-start gap-8">
          <div className="flex w-full flex-col items-start gap-2">
            <Checkbox checked={agreedToTerms} onChange={setAgreedToTerms}>
              I agree to the{" "}
              <span className="underline">Terms &amp; Conditions</span> of using
              this platform
            </Checkbox>
            <Checkbox checked={consentedToData} onChange={setConsentedToData}>
              I consent to how my data is used as outlined in the{" "}
              <span className="underline">Privacy Policy</span>
            </Checkbox>
            {showErrors && (!agreedToTerms || !consentedToData) ? (
              <p className="text-body-xs text-portal-alert" role="alert" aria-invalid="true">
                Accept both agreements to continue.
              </p>
            ) : null}
          </div>

          <div className="flex w-full items-start justify-end gap-3">
            <Button
              variant="portalOutlineLg"
              className="w-[100px]"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="portalLg"
              disabled={!agreedToTerms || !consentedToData}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </form>
    </PortalFormLayout>
  );
}
