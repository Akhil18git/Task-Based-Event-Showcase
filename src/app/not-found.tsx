import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Return Home
      </Link>
    </div>
  )
}