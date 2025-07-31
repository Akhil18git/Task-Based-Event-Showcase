const tierColors = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-gray-300 text-gray-900',
  gold: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900',
  platinum: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
}

export function TierBadge({ tier }: { tier: string }) {
  // @ts-ignore
  const className = tierColors[tier] || 'bg-gray-400'
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${className}`}>
      {tier}
    </span>
  )
}