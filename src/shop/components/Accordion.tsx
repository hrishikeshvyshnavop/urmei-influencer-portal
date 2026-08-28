import { useState } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'

export type AccordionItem = { icon: LucideIcon; title: string; body: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null)

  return (
    <div className="flex w-full flex-col">
      {items.map((item) => {
        const isOpen = openTitle === item.title
        const ItemIcon = item.icon
        return (
          <div key={item.title} className="w-full border-b border-border-default">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenTitle(isOpen ? null : item.title)}
              className="flex w-full items-center justify-between px-md py-lg"
            >
              <span className="flex items-center gap-md-sm">
                <ItemIcon aria-hidden="true" size={24} strokeWidth={1.5} />
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
                <p className="px-md pb-lg text-body-sm text-text-secondary-700">{item.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
