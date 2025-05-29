'use client'

import { useState, useEffect } from 'react'

export default function SwipeHint() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Afficher l'indice uniquement la première fois
    const hasSeenHint = localStorage.getItem('hasSeenSwipeHint')
    if (!hasSeenHint) {
      setShowHint(true)
      setTimeout(() => {
        setShowHint(false)
        localStorage.setItem('hasSeenSwipeHint', 'true')
      }, 3000)
    }
  }, [])

  if (!showHint) return null

  return (
    <div className="fixed bottom-28 left-4 right-4 z-40 pointer-events-none">
      <div className="glass rounded-2xl p-4 mx-auto max-w-sm border border-blue-200 bg-blue-50/80">
        <div className="text-center">
          <div className="text-blue-600 text-sm font-medium mb-1">
            💡 Astuce
          </div>
          <div className="text-blue-700 text-xs">
            Balayez horizontalement pour naviguer entre les pages
          </div>
          
          {/* Animation swipe */}
          <div className="flex justify-center items-center mt-2 gap-1">
            <div className="w-8 h-1 bg-blue-300 rounded-full animate-pulse"></div>
            <svg className="w-4 h-4 text-blue-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}