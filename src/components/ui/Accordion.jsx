import { useState } from 'react'
import { Plus } from 'lucide-react'

function AccordionItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`
  const buttonId = `faq-btn-${item.id}`

  return (
    <div className={`border-l-2 transition-colors duration-300 ${isOpen ? 'border-accent' : 'border-transparent'}`}>
      <div className="border-b border-border">
        <button
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 px-4 text-left transition-colors duration-150 hover:text-accent"
        >
          <span className="text-[15px] font-semibold text-primary leading-snug">{item.question}</span>
          <Plus
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className={`flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-45 text-accent' : 'text-muted'}`}
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: isOpen ? '400px' : '0' }}
        >
          <p className="pb-5 px-4 text-[15px] text-dark-mid leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="divide-y-0">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
      ))}
    </div>
  )
}
