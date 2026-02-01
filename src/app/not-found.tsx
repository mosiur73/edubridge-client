import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated 404 Header */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
              <span className="absolute inset-0 flex items-center justify-center text-2xl">🚀</span>
            </div>
          </div>
          <p className="text-xl text-white/80 font-medium">
            Oops! Looks like this page blasted off into space.
          </p>
        </div>

        {/* Static Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-2">
          <p className="text-white/70 text-sm">Lost pages found today: 0</p>
          <p className="text-white/70 text-sm">Pro tip: Click the button to summon the rescue team!</p>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Rescue Me Home 🏠
        </Link>

       
      </div>
    </div>
  )
}