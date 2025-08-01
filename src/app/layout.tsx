import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // Always render ClerkProvider, but handle missing key gracefully
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
        >
          {!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
            <div className="p-4 text-red-500">
              Clerk authentication is not configured. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.
            </div>
          )}
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}