import { useState } from "react";
import PortalLayout from "./components/PortalLayout";
import { scrollToFirstError } from "@/lib/form-validation";

/** Stand-in for the availability check the API will do. */
const takenUsernames = ["charlotte", "urmei", "admin", "rachel"];

export default function ChooseUsername({
  onSubmit,
}: {
  onSubmit: (username: string) => void;
}) {
  const [username, setUsername] = useState("rachel012");
  const [checked, setChecked] = useState<"available" | "taken" | "empty" | null>(null);

  const isTaken = takenUsernames.includes(username.trim().toLowerCase());

  const submit = () => {
    if (!username.trim()) {
      setChecked("empty");
      return;
    }
    if (isTaken) {
      setChecked("taken");
      return;
    }
    setChecked("available");
    onSubmit(username.trim());
  };

  const borderColor =
    checked === "available"
      ? "border-portal-success"
      : checked === "taken" || checked === "empty"
        ? "border-portal-alert"
        : "border-portal-border";

  return (
    <PortalLayout withPanel={false} hideLanguageSelector>
      <form
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        className="flex w-full max-w-[380px] flex-col items-center gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start gap-[6px] text-center">
            <h1 className="w-full text-body-xxl text-portal-text">
              Choose your username
            </h1>
            <p className="w-full text-body-md text-portal-muted">
              This will be your unique shop URL on URMEI
            </p>
          </div>
        </div>

        {/* relative + absolute helper text below: the helper reserves no
            flow height, so it appearing/disappearing never shifts the
            vertically-centred form column. */}
        <div className="relative w-full">
          <div
            className={`flex w-full items-center gap-[18px] rounded-full border border-solid py-[10px] pr-[10px] pl-[13px] transition-[border-color,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-portal-surface ${borderColor}`}
          >
            <div className="flex min-w-px flex-1 items-center gap-1 text-body-md">
              <span className="whitespace-nowrap text-portal-placeholder">
                urmei.com/shop/
              </span>
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setChecked(null);
                }}
                aria-label="Username"
                aria-invalid={checked === "taken" || checked === "empty"}
                className="w-full min-w-px bg-transparent text-body-md text-portal-text outline-none"
              />
            </div>
            <button
              type="submit"
              aria-label="Check username"
              className="flex shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-full bg-portal-dark p-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:opacity-90 active:translate-y-0 active:scale-95"
            >
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute top-1/4 bottom-1/4 left-[37.5%] right-[37.5%]">
                  <span className="absolute inset-[-8.31%_-16.62%_-8.31%_-16.63%]">
                    <img
                      src="/urmei/icon-chevron-right.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
            </button>
          </div>

          {checked === "available" ? (
            <div className="motion-feedback absolute top-full left-0 mt-6 flex items-center gap-2">
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute inset-[8.33%]">
                  <span className="absolute inset-[-4.99%]">
                    <img
                      src="/urmei/icon-circle-check.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
              <p className="text-body-sm whitespace-nowrap text-portal-success-text">
                Great choice! This username is available.
              </p>
            </div>
          ) : null}

          {checked === "taken" ? (
            <div className="motion-feedback absolute top-full left-0 mt-6 flex items-center gap-2">
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute inset-[8.33%]">
                  <span className="absolute inset-[-4.99%]">
                    <img
                      src="/urmei/icon-circle-alert.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
              <p className="text-body-sm whitespace-nowrap text-portal-alert">
                This username is already taken. Please try another.
              </p>
            </div>
          ) : null}

          {checked === "empty" ? (
            <div className="motion-feedback absolute top-full left-0 mt-6 flex items-center gap-2" role="alert">
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute inset-[8.33%]">
                  <span className="absolute inset-[-4.99%]">
                    <img
                      src="/urmei/icon-circle-alert.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
              <p className="text-body-sm whitespace-nowrap text-portal-alert">
                Username is required.
              </p>
            </div>
          ) : null}
        </div>
      </form>
    </PortalLayout>
  );
}
