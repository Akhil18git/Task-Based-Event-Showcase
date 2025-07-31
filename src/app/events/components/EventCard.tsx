import { TierBadge } from '@/components/TierBadge'

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string
  tier: string
}

export function EventCard({
  event,
  userTier,
  canAccess,
  onUpgrade
}: {
  event: Event
  userTier: string
  canAccess: boolean
  onUpgrade?: () => void
}) {
  return (
    <div className="relative bg-white rounded-lg drop-shadow p-4 flex flex-col">
      <img src={event.image_url || "/placeholder.jpg"}
           alt={event.title}
           className="h-40 object-cover rounded mb-3"/>
      <TierBadge tier={event.tier} />
      <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
      <p className="text-gray-500 mt-1 mb-2 line-clamp-2">{event.description}</p>
      <span className="text-xs text-gray-600 mb-2">
        {new Date(event.event_date).toLocaleDateString()}
      </span>
      {!canAccess && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-80 flex flex-col items-center justify-center rounded">
          <span className="font-bold text-gray-700 mb-2">
            Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} to access
          </span>
          {onUpgrade &&
            <button className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={onUpgrade}>
              Upgrade Now
            </button>
          }
        </div>
      )}
    </div>
  )
}
