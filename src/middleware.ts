import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run on root path
    '/(api|trpc)(.*)', // Run on API routes
    '/events(.*)' // Explicitly protect events routes
  ],
};