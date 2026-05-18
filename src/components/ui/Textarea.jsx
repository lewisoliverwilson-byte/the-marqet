export default function Textarea({ label, error, className = '', rows = 4, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[13px] font-semibold text-primary">
          {label}
          {props.required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-150 disabled:opacity-60 resize-y ${error ? 'border-rose-400 focus:border-rose-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[13px] text-rose-500">{error}</p>}
    </div>
  )
}
