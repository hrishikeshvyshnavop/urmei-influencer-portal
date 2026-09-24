import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "portal" | "portalBlock" | "portalLg" | "portalOutline" | "portalOutlineLg" | "portalGhost" | "portalGhostLg" | "portalMuted" | "portalDestructive" | "portalLink";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; leftIcon?: ReactNode; variant?: ButtonVariant };

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-md border border-transparent bg-surface-primary-500 px-md py-sm text-body-sm capitalize text-text-secondary-100 disabled:bg-surface-secondary-300 disabled:text-text-secondary-500",
  outline: "rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm capitalize text-text-secondary-1000 disabled:bg-surface-secondary-300 disabled:text-text-secondary-500",
  ghost: "rounded-md border border-transparent bg-surface-secondary-300 px-md py-sm text-body-sm capitalize text-text-secondary-1000 disabled:text-text-secondary-500",
  portal: "rounded-lg border border-transparent bg-portal-dark px-4 py-2 text-body-sm capitalize text-portal-light disabled:bg-portal-surface disabled:text-portal-disabled",
  portalBlock: "w-full rounded-lg border border-transparent bg-portal-dark px-4 py-3 text-body-sm capitalize text-portal-light disabled:bg-portal-surface disabled:text-portal-disabled",
  portalLg: "rounded-lg border border-transparent bg-portal-dark px-4 py-3 text-body-sm capitalize text-portal-light disabled:bg-portal-surface disabled:text-portal-disabled",
  portalOutline: "rounded-lg border border-portal-border px-4 py-2 text-body-sm text-portal-text disabled:bg-portal-surface disabled:text-portal-disabled",
  portalOutlineLg: "rounded-lg border border-portal-border px-4 py-3 text-body-sm text-portal-text disabled:bg-portal-surface disabled:text-portal-disabled",
  portalGhost: "rounded-lg border border-transparent px-4 py-2 text-body-sm capitalize text-portal-text",
  portalGhostLg: "rounded-lg border border-transparent px-4 py-3 text-body-sm capitalize text-portal-text",
  portalMuted: "rounded-lg border border-transparent bg-portal-surface px-4 py-2 text-body-sm text-portal-disabled",
  portalDestructive: "rounded-lg border border-portal-alert px-4 py-2 text-body-sm capitalize text-portal-alert disabled:border-transparent disabled:bg-portal-surface disabled:text-portal-disabled",
  portalLink: "overflow-clip rounded-lg text-body-md capitalize text-portal-text",
};

export function Button({ children, className, disabled, leftIcon, type = "button", variant = "primary", ...props }: ButtonProps) {
  return (
    <button type={type} disabled={disabled} className={cn("flex cursor-pointer items-center justify-center gap-2 font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] enabled:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark disabled:cursor-not-allowed disabled:outline-none disabled:ring-0", variants[variant], className)} {...props}>
      {leftIcon}
      {children}
    </button>
  );
}

export default Button;
