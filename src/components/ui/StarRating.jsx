import { Star } from 'lucide-react'

export default function StarRating({ value = 0, onChange, size = 16, readOnly = false }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => !readOnly && onChange?.(n)}
          disabled={readOnly}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          aria-label={readOnly ? undefined : `Rate ${n} star${n !== 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={n <= value ? 'text-amber-400 fill-amber-400' : 'text-border fill-transparent'}
          />
        </button>
      ))}
    </div>
  )
}
