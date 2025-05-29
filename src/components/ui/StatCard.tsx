'use client'

import { Card, CardContent } from './card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray'
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  onClick?: () => void
  animated?: boolean
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'blue',
  trend,
  className,
  onClick,
  animated = true
}: StatCardProps) {
  const colorClasses = {
    blue: {
      border: 'border-blue-200',
      value: 'text-blue-600',
      icon: 'text-blue-500',
      bg: 'bg-blue-50/50'
    },
    green: {
      border: 'border-green-200',
      value: 'text-green-600',
      icon: 'text-green-500',
      bg: 'bg-green-50/50'
    },
    orange: {
      border: 'border-orange-200',
      value: 'text-orange-600',
      icon: 'text-orange-500',
      bg: 'bg-orange-50/50'
    },
    red: {
      border: 'border-red-200',
      value: 'text-red-600',
      icon: 'text-red-500',
      bg: 'bg-red-50/50'
    },
    purple: {
      border: 'border-purple-200',
      value: 'text-purple-600',
      icon: 'text-purple-500',
      bg: 'bg-purple-50/50'
    },
    gray: {
      border: 'border-gray-200',
      value: 'text-gray-600',
      icon: 'text-gray-500',
      bg: 'bg-gray-50/50'
    }
  }

  const colors = colorClasses[color]

  return (
    <Card 
      className={cn(
        'glass glass-hover transition-all duration-300 cursor-pointer',
        colors.border,
        colors.bg,
        animated && 'animate-fade-in-up',
        onClick && 'active:scale-95',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Valeur principale */}
            <div className={cn('text-2xl font-bold mb-1', colors.value)}>
              {value}
            </div>
            
            {/* Titre */}
            <div className="text-gray-600 text-sm font-medium mb-1">
              {title}
            </div>
            
            {/* Sous-titre optionnel */}
            {subtitle && (
              <div className="text-gray-500 text-xs">
                {subtitle}
              </div>
            )}
            
            {/* Tendance optionnelle */}
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-xs mt-2',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                <svg 
                  className={cn(
                    'w-3 h-3',
                    trend.isPositive ? 'rotate-0' : 'rotate-180'
                  )} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          
          {/* Icône optionnelle */}
          {icon && (
            <div className={cn('p-2 rounded-lg', colors.bg)}>
              <div className={cn('w-6 h-6', colors.icon)}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}