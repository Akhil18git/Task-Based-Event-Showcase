const tierColors = {
  free: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md',
  silver: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 shadow-md',
  gold: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 shadow-lg',
  platinum: 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white shadow-lg',
}

export function TierBadge({ tier }: { tier: string }) {
  // @ts-expect-error
  const className = tierColors[tier] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
  return (
    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${className} transform hover:scale-105 transition-transform duration-200`}>
      {tier}
    </span>
  )
}