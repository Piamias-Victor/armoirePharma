'use client'

import { cn } from '@/lib/utils'

interface TrendIndicatorProps {
  value: number
  previousValue: number
  label: string
  format?: 'number' | 'percentage'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export default function TrendIndicator({
  value,
  previousValue,
  label,
  format = 'number',
  size = 'md',
  showIcon = true,
  className
}: TrendIndicatorProps) {
  
  const difference = value - previousValue
  const percentageChange = previousValue !== 0 ? (difference / previousValue) * 100 : 0
  const isPositive = difference > 0
  const isNeutral = difference === 0

  const formatValue = (val: number) => {
    if (format === 'percentage') {
      return `${val.toFixed(1)}%`
    }
    return val.toString()
  }

  const sizes = {
    sm: {
      value: 'text-lg',
      label: 'text-xs',
      trend: 'text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      value: 'text-xl',
      label: 'text-sm',
      trend: 'text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      value: 'text-2xl',
      label: 'text-base',
      trend: 'text-base',
      icon: 'w-5 h-5'
    }
  }

  const currentSize = sizes[size]

  return (
    <div className={cn('space-y-1', className)}>
      {/* Valeur principale */}
      <div className={cn('font-bold text-gray-800', currentSize.value)}>
        {formatValue(value)}
      </div>
      
      {/* Label */}
      <div className={cn('text-gray-600 font-medium', currentSize.label)}>
        {label}
      </div>
      
      {/* Tendance */}
      {!isNeutral && (
        <div className={cn(
          'flex items-center gap-1',
          currentSize.trend,
          isPositive ? 'text-green-600' : 'text-red-600'
        )}>
          {showIcon && (
            <svg 
              className={cn(
                currentSize.icon,
                'transition-transform duration-200',
                !isPositive && 'rotate-180'
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 11l5-5m0 0l5 5m-5-5v12" 
              />
            </svg>
          )}
          
          <span className="font-medium">
            {isPositive ? '+' : ''}{difference} 
            ({isPositive ? '+' : ''}{percentageChange.toFixed(1)}%)
          </span>
        </div>
      )}
      
      {/* Comparaison avec période précédente */}
      <div className={cn('text-gray-500', currentSize.trend)}>
        vs. période précédente: {formatValue(previousValue)}
      </div>
    </div>
  )
}