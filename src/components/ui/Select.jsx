import { ChevronDown } from 'lucide-react'

export default function Select({ label, error, options = [], placeholder, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[13px] font-semibold text-primary">
          {label}
          {props.required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-xl border border-border bg-white px-4 py-3 text-[15px] focus:border-accent focus:outline-none transition-colors duration-150 disabled:opacity-60 pr-10 ${error ? 'border-rose-400' : ''} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      </div>
      {error && <p className="text-[13px] text-rose-500">{error}</p>}
    </div>
  )
}
