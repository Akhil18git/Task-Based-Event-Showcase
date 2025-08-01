// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  //publicRoutes: ['/', '/sign-in', '/sign-up'],
})

export const config = {
  matcher: [
    // Run middleware on all routes except static files and Next internals
    '/((?!_next|.*\\..*|favicon.ico).*)',
  ],
}
