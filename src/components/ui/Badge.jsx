const categoryTokens = {
  'Claude Skills': 'bg-blue-50 text-blue-600 border-blue-100',
  'MCP Servers': 'bg-violet-50 text-violet-600 border-violet-100',
  'Prompt Packs': 'bg-teal-50 text-teal-600 border-teal-100',
  Workflows: 'bg-amber-50 text-amber-600 border-amber-100',
  Templates: 'bg-green-50 text-green-600 border-green-100',
  Bundles: 'bg-rose-50 text-rose-600 border-rose-100',
}

export default function Badge({ category, className = '' }) {
  const tokens = categoryTokens[category] ?? 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tokens} ${className}`}
    >
      {category}
    </span>
  )
}
