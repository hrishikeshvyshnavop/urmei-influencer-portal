import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  leftIcon?: ReactNode
  children: ReactNode
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-surface-primary-500 text-text-secondary-100',
  outline: 'border border-border-default bg-surface-secondary-100 text-text-secondary-1000',
  ghost: 'bg-surface-secondary-300 text-text-secondary-1000',
}

export function Button({
  variant = 'primary',
  leftIcon,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'flex items-center justify-center gap-sm rounded-md px-md py-sm',
        'text-body-sm font-medium capitalize',
        // Disabled fully replaces the variant's own colors (not layered on top of
        // them) — otherwise the variant's text/background utility and this one
        // both target the same CSS property, and whichever Tailwind happens to
        // emit last in its generated stylesheet wins, not whichever is written
        // last in this class list.
        disabled ? 'cursor-default bg-surface-secondary-300 text-text-secondary-500' : VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  )
}
