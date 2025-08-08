import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'ShowEvents - Discover Amazing Events',
  description: 'Join exclusive events, connect with amazing people, and create unforgettable memories. Your gateway to extraordinary experiences.',
  keywords: 'events, exclusive events, premium events, community, networking',
  authors: [{ name: 'ShowEvents Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
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
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
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
          {!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
            <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center z-50">
              Clerk authentication is not configured. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.
            </div>
          )}
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}