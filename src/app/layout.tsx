import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'ShowEvents - Discover Amazing Events',
  description: 'Join exclusive events, connect with amazing people, and create unforgettable memories. Your gateway to extraordinary experiences.',
  keywords: 'events, exclusive events, premium events, community, networking',
  authors: [{ name: 'ShowEvents Team' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {clerkPublishableKey ? (
          <ClerkProvider
            publishableKey={clerkPublishableKey}
            appearance={{
              variables: {
                colorPrimary: '#6366f1',
                colorBackground: '#ffffff',
                colorText: '#171717',
                borderRadius: '0.5rem',
              },
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105',
                card: 'bg-white rounded-2xl shadow-lg border border-gray-200',
                headerTitle: 'text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
              }
            }}
            afterSignInUrl="/events"
            afterSignUpUrl="/events"
          >
            {children}
          </ClerkProvider>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShowEvents
              </h1>
              <p className="text-gray-600 mb-6">
                Authentication is not configured. Please set the NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <p className="font-semibold mb-2">Setup Required:</p>
                <p>1. Get your Clerk publishable key from <a href="https://dashboard.clerk.com" className="underline hover:text-yellow-900" target="_blank" rel="noopener noreferrer">Clerk Dashboard</a></p>
                <p>2. Add it to your environment variables as NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</p>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}