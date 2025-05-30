'use client'

import { Badge, Card, CardContent } from "@/components/ui"
import { cn } from "@/lib"

interface PriorityAlertProps {
  type: 'urgent' | 'attention' | 'info'
  title: string
  message: string
  count?: number
  onAction?: () => void
  actionLabel?: string
  className?: string
  animated?: boolean
  style?: React.CSSProperties
}

export default function PriorityAlert({
  type,
  title,
  message,
  count,
  onAction,
  actionLabel = 'Voir',
  className,
  animated = true
}: PriorityAlertProps) {
  
  const config = {
    urgent: {
      bg: 'bg-red-50/50',
      border: 'border-red-300',
      icon: '🚨',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
      badgeColor: 'bg-red-500/20 text-red-700 border-red-400/30',
      buttonColor: 'bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-300',
      pulseColor: 'animate-pulse'
    },
    attention: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-300', 
      icon: '⚠️',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-800',
      messageColor: 'text-amber-700',
      badgeColor: 'bg-amber-500/20 text-amber-700 border-amber-400/30',
      buttonColor: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 border-amber-300',
      pulseColor: 'animate-pulse-subtle'
    },
    info: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-300',
      icon: 'ℹ️',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700',
      badgeColor: 'bg-blue-500/20 text-blue-700 border-blue-400/30',
      buttonColor: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 border-blue-300',
      pulseColor: ''
    }
  }

  const currentConfig = config[type]

  return (
    <Card className={cn(
      'glass glass-hover transition-all duration-300',
      currentConfig.bg,
      currentConfig.border,
      animated && 'animate-fade-in-up',
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icône avec animation */}
          <div className={cn(
            'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
            currentConfig.iconBg,
            type === 'urgent' && currentConfig.pulseColor
          )}>
            <span className="text-2xl">{currentConfig.icon}</span>
          </div>
          
          {/* Contenu */}
          <div className="flex-1 space-y-2">
            {/* Header avec titre et badge */}
            <div className="flex items-center justify-between">
              <h3 className={cn('font-semibold text-base', currentConfig.titleColor)}>
                {title}
              </h3>
              {count !== undefined && (
                <Badge variant="secondary" className={currentConfig.badgeColor}>
                  {count}
                </Badge>
              )}
            </div>
            
            {/* Message */}
            <p className={cn('text-sm leading-relaxed', currentConfig.messageColor)}>
              {message}
            </p>
            
            {/* Action optionnelle */}
            {onAction && (
              <button
                onClick={onAction}
                className={cn(
                  'mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1',
                  currentConfig.buttonColor
                )}
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}