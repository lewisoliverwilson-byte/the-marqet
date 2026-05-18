const CATEGORY_MAP = {
  claude_skill: { label: 'Claude Skills', tokens: 'bg-blue-50 text-blue-600 border-blue-100' },
  mcp_server: { label: 'MCP Servers', tokens: 'bg-violet-50 text-violet-600 border-violet-100' },
  prompt_pack: { label: 'Prompt Packs', tokens: 'bg-teal-50 text-teal-600 border-teal-100' },
  workflow: { label: 'Workflows', tokens: 'bg-amber-50 text-amber-600 border-amber-100' },
  template: { label: 'Templates', tokens: 'bg-green-50 text-green-600 border-green-100' },
  bundle: { label: 'Bundles', tokens: 'bg-rose-50 text-rose-600 border-rose-100' },
  // Legacy dash-id support (used by landing page static data)
  'Claude Skills': { label: 'Claude Skills', tokens: 'bg-blue-50 text-blue-600 border-blue-100' },
  'MCP Servers': { label: 'MCP Servers', tokens: 'bg-violet-50 text-violet-600 border-violet-100' },
  'Prompt Packs': { label: 'Prompt Packs', tokens: 'bg-teal-50 text-teal-600 border-teal-100' },
  Workflows: { label: 'Workflows', tokens: 'bg-amber-50 text-amber-600 border-amber-100' },
  Templates: { label: 'Templates', tokens: 'bg-green-50 text-green-600 border-green-100' },
  Bundles: { label: 'Bundles', tokens: 'bg-rose-50 text-rose-600 border-rose-100' },
}

export default function Badge({ category, className = '' }) {
  const config = CATEGORY_MAP[category] ?? { label: category, tokens: 'bg-gray-50 text-gray-600 border-gray-100' }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${config.tokens} ${className}`}>
      {config.label}
    </span>
  )
}
