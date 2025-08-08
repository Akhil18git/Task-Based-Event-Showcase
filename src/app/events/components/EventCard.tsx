import { TierBadge } from '@/components/TierBadge'
import Image from 'next/image'
import { Tier } from '@/lib/tiers'

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
  userTier: Tier
  canAccess: boolean
  onUpgrade?: () => void
}) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Tier Badge */}
        <div className="absolute top-4 left-4">
          <TierBadge tier={event.tier} />
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-semibold text-gray-700">
            {new Date(event.event_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        
        {/* Access Status */}
        {!canAccess && (
          <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">
                  {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} Tier Required
                </p>
                <p className="text-xs text-red-600">
                  Upgrade your membership to access this event
                </p>
              </div>
            </div>
            
            {onUpgrade && (
              <button 
                className="w-full mt-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                onClick={onUpgrade}
              >
                Upgrade Now
              </button>
            )}
          </div>
        )}
        
        {canAccess && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">Access Granted</p>
                <p className="text-xs text-green-600">You can view this event</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Overlay for Locked Events */}
      {!canAccess && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center text-white p-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Premium Event</h3>
            <p className="text-sm mb-4 opacity-90">
              Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} tier to unlock
            </p>
            {onUpgrade && (
              <button 
                className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                onClick={onUpgrade}
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
