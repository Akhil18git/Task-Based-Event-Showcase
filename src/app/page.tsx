import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Show Events Platform</h1>
      <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 bg-blue-700 text-white rounded">
            Sign In / Register
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <a href="/events"
           className="px-4 py-2 bg-green-700 text-white rounded">
          Go to Events
        </a>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </main>
  )
}
