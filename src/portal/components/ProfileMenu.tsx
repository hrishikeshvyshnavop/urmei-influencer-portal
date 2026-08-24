import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, CircleHelp, Info, LogOut, X } from "lucide-react";
import Button from "./Button";
import ProfilePhoto from "./ProfilePhoto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileMenu({
  onShowProfile,
  onShowTour,
  onShowHelp,
  onLogout,
}: {
  onShowProfile: () => void;
  onShowTour: () => void;
  onShowHelp: () => void;
  onLogout: () => void;
}) {
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (!confirmLogout) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [confirmLogout]);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Open profile menu"
            className="relative block size-9 cursor-pointer overflow-hidden rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"
          >
            <ProfilePhoto
              fallback="/urmei/home/profile-dropdown-avatar.png"
              alt="Tan Ah Beng"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[330px] max-w-[calc(100vw-32px)]"
        >
          <DropdownMenuItem
            onSelect={onShowProfile}
            className="flex w-full cursor-pointer items-center gap-3 border-b border-portal-surface px-4 py-5 text-left"
          >
            <span className="relative size-[42px] shrink-0 overflow-hidden rounded-full">
              <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
            </span>
            <span className="min-w-0 flex-1 text-body-md font-medium">
              <span className="block truncate text-portal-text">Tan Ah Beng</span>
              <span className="block truncate text-portal-muted">tanahbeng@gmail.com</span>
            </span>
            <ChevronRight aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={1.5} />
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={onShowTour}
            className="flex w-full cursor-pointer items-center gap-2 border-b border-portal-surface p-4 text-body-md font-medium text-portal-text"
          >
            <Info aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={1.5} />
            How does this work?
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onShowHelp}
            className="flex w-full cursor-pointer items-center gap-2 border-b border-portal-surface p-4 text-body-md font-medium text-portal-text"
          >
            <CircleHelp aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={1.5} />
            Help Center
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setConfirmLogout(true)}
            className="flex w-full cursor-pointer items-center gap-2 p-4 text-body-md font-medium text-portal-text"
          >
            <LogOut aria-hidden="true" className="size-[22px] shrink-0" strokeWidth={1.5} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {confirmLogout
        ? createPortal(
            <div
              className="motion-modal-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
              onKeyDown={(event) => {
                if (event.key === "Escape") setConfirmLogout(false);
              }}
            >
              <div className="motion-modal-panel w-[444px] max-w-full overflow-hidden rounded-[10px] border border-portal-border bg-portal-light">
                <div className="flex items-center justify-between border-b border-portal-border px-6 py-4">
                  <h2
                    id="logout-title"
                    className="min-w-0 flex-1 text-[20px] leading-[30px] font-semibold text-portal-text"
                  >
                    Confirm logout?
                  </h2>
                  <button
                    type="button"
                    onClick={() => setConfirmLogout(false)}
                    aria-label="Close logout confirmation"
                    autoFocus
                    className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
                  >
                    <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 px-6 pt-4 pb-6">
                  <p className="text-body-sm text-portal-muted">
                    You will need to log back in to access your campaign
                    information.
                  </p>
                  <div className="flex w-full gap-2">
                    <Button
                      variant="portalOutline"
                      className="min-w-0 flex-1"
                      onClick={() => setConfirmLogout(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="portal"
                      className="min-w-0 flex-1"
                      onClick={() => {
                        setConfirmLogout(false);
                        onLogout();
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
