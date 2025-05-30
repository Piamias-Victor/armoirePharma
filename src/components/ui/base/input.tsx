'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'search' | 'modal'
  icon?: React.ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, variant = 'default', icon, fullWidth = true, ...props }, ref) => {
    
    const variants = {
      default: 'bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
      search: 'bg-white border border-gray-200 focus:ring-0 focus:outline-none border-0 bg-transparent',
      modal: 'bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
    }

    const baseClasses = 'px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              baseClasses,
              variants[variant],
              icon && 'pl-10',
              fullWidth && 'w-full',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input