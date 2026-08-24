import { useState } from 'react'
import { Icon } from './Icon'

export type AccordionItem = { icon: string; title: string; body: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null)

  return (
    <div className="flex w-full flex-col">
      {items.map((item) => {
        const isOpen = openTitle === item.title
        return (
          <div key={item.title} className="w-full border-b border-border-default">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenTitle(isOpen ? null : item.title)}
              className="flex w-full items-center justify-between px-md py-lg"
            >
              <span className="flex items-center gap-md-sm">
                <Icon name={item.icon} size={24} />
                <span className="text-body-md font-medium text-text-secondary-1000">
                  {item.title}
                </span>
              </span>
              <Icon
                name="chevron-down"
                size={24}
                className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
              />
            </button>
            {isOpen && (
              <p className="px-md pb-lg text-body-sm text-text-secondary-700">{item.body}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
