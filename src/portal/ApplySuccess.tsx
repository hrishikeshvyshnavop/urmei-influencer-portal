import Button from "../components/Button";
import PortalLayout from "./components/PortalLayout";

export default function ApplySuccess({ onBackToLogin }: { onBackToLogin: () => void }) {
  return (
    <PortalLayout>
      <div className="flex w-full max-w-[375px] flex-col items-start justify-center gap-[14px]">
        <div className="flex w-full flex-col items-start justify-center gap-[6px]">
          <div className="flex size-[48px] flex-col items-center justify-center">
            <span className="relative size-[40px] shrink-0 overflow-clip">
              <span className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
                <span className="absolute inset-[-3.63%_-2.49%]">
                  <img
                    src="/urmei/icon-check.svg"
                    alt=""
                    className="block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          </div>
          <h1 className="text-h3 uppercase text-portal-text">
            We&#39;ve received
            <br />
            your application
          </h1>
          <p className="w-full text-body-sm text-portal-muted">
            Thank you, Charlotte! We will evaluate your application and get back to
            you via email shortly.
          </p>
        </div>
        <Button variant="portalOutlineLg" onClick={onBackToLogin}>
          Back to Login
        </Button>
      </div>
    </PortalLayout>
  );
}
