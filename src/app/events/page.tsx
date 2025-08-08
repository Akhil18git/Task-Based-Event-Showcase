'use client'
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { EventCard } from './components/EventCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { isTier, Tier, tiers, tierValue } from '@/lib/tiers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string
  tier: Tier
}

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userTier, setUserTier] = useState<Tier>('free')
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    if (user) {
    const tierFromMetadata = user.unsafeMetadata.tier as Tier | undefined
    // Validate and default to 'free' if not valid
    if (tierFromMetadata && isTier(tierFromMetadata)) {
      setUserTier(tierFromMetadata)
    } else {
      setUserTier('free')
    }
  }
  }, [user])

  const fetchEvents = useCallback(async () => {
    setLoading(true); setError('');
    try{
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
      if (supabaseError) setError(supabaseError.message)
      else setEvents(data || [])
    }catch(err){
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally{
    setLoading(false)
    }
  }, [])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const handleUpgrade = async () => {
    setUpgrading(true)
    const i = Math.min(tierValue(userTier) + 1, tiers.length - 1)
    const nextTier = tiers[i]
    try {
      if(user){
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            tier: nextTier
          }
        });
        setUserTier(nextTier)
      }
      
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error upgrading');
    } finally {
      setUpgrading(false)
    }
  }

  if (!isLoaded) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShowEvents
              </span>
            </Link>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome back,</span>
                  <span className="font-semibold text-gray-900">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SignedIn>
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover Events
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore exclusive events and experiences tailored just for you
            </p>
          </div>

          {/* User Tier Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-slide-in">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Your Membership</h2>
                  <p className="text-gray-600">Current tier: <span className="font-semibold text-indigo-600">{userTier.toUpperCase()}</span></p>
                </div>
              </div>
              
              <button
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpgrade}
                disabled={userTier === 'platinum' || upgrading}
              >
                {userTier === 'platinum' ? (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Max Tier Reached</span>
                  </span>
                ) : upgrading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span>Upgrading...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Upgrade Tier</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="animate-fade-in">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 font-semibold">Error Loading Events</span>
                </div>
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => {
                  const allowed = tierValue(event.tier) <= tierValue(userTier)
                  return (
                    <div 
                      key={event.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EventCard
                        event={event}
                        userTier={userTier}
                        canAccess={allowed}
                        onUpgrade={allowed ? undefined : handleUpgrade}
                      />
                    </div>
                  )
                })}
              </div>
            )}

            {!loading && !error && events.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
                <p className="text-gray-600">Check back later for new events!</p>
              </div>
            )}
          </div>
        </SignedIn>
        
        <SignedOut>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">Please sign in to view and access exclusive events.</p>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </SignedOut>
      </main>
    </div>
  )
}
