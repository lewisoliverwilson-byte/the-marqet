import { faqs } from '../../data/faqs'
import Accordion from '../ui/Accordion'

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] text-center mb-12">
          Questions, answered.
        </h2>

        <div className="mx-auto max-w-[720px] border-t border-border rounded-2xl overflow-hidden">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  )
}
