'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  fullWidth = false
}: ButtonProps) { // ✅ CORRIGÉ : Utilisation de l'interface au lieu de 'any'
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    if (disabled || loading) return
    
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    
    if (onClick) onClick()
  }

  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  }

  return (
    <button
      type={type}
      onClick={handlePress}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variants[variant], // ✅ TypeScript sait maintenant que variant est typé
        sizes[size],       // ✅ TypeScript sait maintenant que size est typé
        fullWidth && 'w-full',
        isPressed && 'scale-95',
        className
      )}
    >
      {loading ? (
        <>
          <svg className={cn('animate-spin', iconSizes[size])} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Chargement...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={iconSizes[size]}>{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={iconSizes[size]}>{icon}</span>
          )}
        </>
      )}
    </button>
  )
}