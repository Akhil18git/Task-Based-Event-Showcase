'use client'
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { EventCard } from './components/EventCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { isTier, Tier, tiers, tierValue } from '@/lib/tiers'

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userTier, setUserTier] = useState<Tier>('free')
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    if (user) {
    const tierFromMetadata = user.publicMetadata.tier
    // Validate and default to 'free' if not valid
    if (isTier(tierFromMetadata)) {
      setUserTier(tierFromMetadata)
    } else {
      setUserTier('free')
    }
  }
  }, [user])

  const fetchEvents = useCallback(async () => {
    setLoading(true); setError('');
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
    if (error) setError(error.message)
    else setEvents(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const handleUpgrade = async () => {
    setUpgrading(true)
    const i = Math.min(tierValue(userTier) + 1, tiers.length - 1)
    const nextTier = tiers[i]
    try {
      await user?.setPublicMetadata({ tier: nextTier })
      setUserTier(nextTier)
    } catch (e) {
      alert('Error upgrading')
    } finally {
      setUpgrading(false)
    }
  }

  if (!isLoaded) return <LoadingSpinner />

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SignedIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Events</h2>
            <span className="text-sm text-gray-500">Your tier: <b>{userTier.toUpperCase()}</b></span>
            <button
              className="ml-3 px-3 py-1 rounded bg-blue-600 text-white"
              onClick={handleUpgrade}
              disabled={userTier === 'platinum' || upgrading}
            >
              {userTier === 'platinum' ? 'Max Tier' : upgrading ? 'Upgrading...' : 'Upgrade Tier'}
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error &&
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(event => {
              const allowed = tierValue(event.tier) <= tierValue(userTier)
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  userTier={userTier}
                  canAccess={allowed}
                  onUpgrade={allowed ? undefined : handleUpgrade}
                />
              )
            })}
          </div>
        }
      </SignedIn>
      <SignedOut>
        <p className="text-center text-xl">Please sign in to view events.</p>
      </SignedOut>
    </main>
  )
}
