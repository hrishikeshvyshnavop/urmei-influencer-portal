import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "accent"
  | "light"
  | "portal"
  | "portalBlock"
  | "portalLg"
  | "portalOutline"
  | "portalOutlineLg"
  | "portalGhostLg"
  | "portalMuted"
  | "portalLink";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: "rounded-full bg-brand px-[18px] py-[14px] text-base text-white cursor-pointer",
  accent:
    "rounded-[12px] bg-[rgb(255,64,0)] px-[18px] py-[14px] text-base text-white cursor-pointer",
  light:
    "inline-flex items-center gap-1 rounded-[12px] bg-white px-[18px] py-[10px] text-[14px] text-black shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px] cursor-pointer",
  portal:
    "border border-solid border-transparent flex items-center justify-center gap-2 rounded-lg bg-portal-dark px-4 py-2 text-body-sm capitalize text-portal-light cursor-pointer disabled:cursor-not-allowed disabled:bg-portal-surface disabled:text-portal-disabled disabled:hover:opacity-100",
  portalBlock:
    "border border-solid border-transparent flex w-full items-center justify-center gap-2 rounded-lg bg-portal-dark px-4 py-3 text-body-sm capitalize text-portal-light cursor-pointer disabled:cursor-not-allowed disabled:bg-portal-surface disabled:text-portal-disabled disabled:hover:opacity-100",
  portalLg:
    "border border-solid border-transparent flex items-center justify-center gap-2 rounded-lg bg-portal-dark px-4 py-3 text-body-sm capitalize text-portal-light cursor-pointer disabled:cursor-not-allowed disabled:bg-portal-surface disabled:text-portal-disabled disabled:hover:opacity-100",
  portalOutline:
    "flex items-center justify-center gap-2 rounded-lg border border-solid border-portal-border px-4 py-2 text-body-sm text-portal-text cursor-pointer",
  portalOutlineLg:
    "flex items-center justify-center gap-2 rounded-lg border border-solid border-portal-border px-4 py-3 text-body-sm text-portal-text cursor-pointer",
  portalGhostLg:
    "flex items-center justify-center gap-2 rounded-lg border border-solid border-transparent px-4 py-3 text-body-sm capitalize text-portal-text cursor-pointer",
  portalMuted:
    "border border-solid border-transparent flex items-center justify-center gap-2 rounded-lg bg-portal-surface px-4 py-2 text-body-sm text-portal-disabled cursor-pointer",
  portalLink:
    "flex items-center gap-2 overflow-clip rounded-lg text-body-md capitalize text-portal-text cursor-pointer",
};

export default function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`font-medium transition-opacity hover:opacity-90 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
