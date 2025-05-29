'use client'

import { Button } from './button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

export default function AnimatedButton({ 
  children, 
  className,
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  icon
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    if (disabled || loading) return
    
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    
    if (onClick) onClick()
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <Button
      className={cn(
        'btn-press glass border-white/20 transition-all duration-200 relative overflow-hidden',
        sizeClasses[size],
        isPressed && 'scale-95',
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      variant={variant}
      onClick={handlePress}
      disabled={disabled || loading}
    >
      {/* Effet de ripple au clic */}
      {isPressed && (
        <div className="absolute inset-0 bg-white/20 animate-ping rounded-xl" />
      )}
      
      {/* Contenu du bouton */}
      <div className="flex items-center gap-2 relative z-10">
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon}
        {children}
      </div>
    </Button>
  )
}