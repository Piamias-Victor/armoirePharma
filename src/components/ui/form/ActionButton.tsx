'use client'

import { useGlobalActions } from '@/hooks'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ActionButtonProps {
  action: 'scanner' | 'manual'
  className?: string
  fullWidth?: boolean
}

export default function ActionButton({ action, className, fullWidth }: ActionButtonProps) {
  const { openScanner, openManualAdd } = useGlobalActions()
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = (onClick: () => void) => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onClick()
  }

  const baseClasses = 'glass inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 min-h-[50px]'

  if (action === 'scanner') {
    return (
      <button
        onClick={() => handlePress(openScanner)}
        className={cn(
          baseClasses,
          'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 focus:ring-blue-500 shadow-lg',
          fullWidth && 'w-full',
          isPressed && 'scale-95',
          className
        )}
        style={{ backgroundColor: '#2563eb', color: 'white' }} // Force le style
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        </svg>
        Scanner
      </button>
    )
  }

  return (
    <button
      onClick={() => handlePress(openManualAdd)}
      className={cn(
        baseClasses,
        'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-400 focus:ring-gray-500 shadow-lg',
        fullWidth && 'w-full',
        isPressed && 'scale-95',
        className
      )}
      style={{ backgroundColor: 'white', color: '#111827' }} // Force le style
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Ajouter
    </button>
  )
}