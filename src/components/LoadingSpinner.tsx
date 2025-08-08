export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        
        {/* Animated spinner */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        
        {/* Inner gradient ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      <p className="mt-4 text-gray-600 font-medium">Loading events...</p>
    </div>
  )
}
