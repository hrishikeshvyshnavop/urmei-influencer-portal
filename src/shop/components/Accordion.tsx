import { useState, type ReactNode } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'

export type AccordionItem = {
  /** A lucide glyph, or the path of an exported Figma icon where lucide has no
   *  matching glyph (the delivery row's truck). */
  icon: LucideIcon | string
  title: string
  /** Plain copy renders as the standard 14px muted paragraph; a node brings
   *  its own markup (the delivery row's postal-code prompt). */
  body: ReactNode
  /** Starts expanded. The first item that sets it wins. */
  defaultOpen?: boolean
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(
    () => items.find((item) => item.defaultOpen)?.title ?? null,
  )

  return (
    <div className="flex w-full flex-col">
      {items.map((item) => {
        const isOpen = openTitle === item.title
        const ItemIcon = item.icon
        return (
          <div key={item.title} className="w-full border-b border-border-default">
            {/* 16px between an open header and its body, 24px under a closed
                one — the design's open delivery row (Figma `236:19966`, file
                `cehltPtMoGWEtKbF7k3MQQ`) is `gap-16` inside `py-24`. */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenTitle(isOpen ? null : item.title)}
              className={`flex w-full items-center justify-between px-md pt-lg ${isOpen ? 'pb-md' : 'pb-lg'}`}
            >
              <span className="flex items-center gap-md-sm">
                {typeof ItemIcon === 'string' ? (
                  <img src={ItemIcon} alt="" aria-hidden="true" className="block size-[24px] max-w-none" />
                ) : (
                  <ItemIcon aria-hidden="true" size={24} strokeWidth={1.5} />
                )}
                <span className="text-body-md font-medium text-text-secondary-1000">
                  {item.title}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                size={24}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="min-h-0 overflow-hidden">
                {typeof item.body === 'string' ? (
                  <p className="px-md pb-lg text-body-sm text-text-secondary-700">{item.body}</p>
                ) : (
                  <div className="px-md pb-lg">{item.body}</div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
