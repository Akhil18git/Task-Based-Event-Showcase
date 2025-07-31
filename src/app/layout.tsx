import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // Skip Clerk initialization during prerendering if key is missing
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <html lang="en">
        <body>
          <div className="p-4 text-red-500">
            Clerk authentication is not configured. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.
          </div>
          {children}
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}