import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "portal"
  | "portalBlock"
  | "portalLg"
  | "portalOutline"
  | "portalOutlineLg"
  | "portalGhost"
  | "portalGhostLg"
  | "portalMuted"
  | "portalLink";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
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
  portalGhost:
    "flex items-center justify-center gap-2 rounded-lg border border-solid border-transparent px-4 py-2 text-body-sm capitalize text-portal-text cursor-pointer",
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
  variant = "portal",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] enabled:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark disabled:cursor-not-allowed disabled:outline-none disabled:ring-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
