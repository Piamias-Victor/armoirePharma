'use client'

import { cn } from '@/lib/utils'

interface StatusFilterProps {
  selectedStatus: string | null
  onStatusChange: (status: string | null) => void
  statusCounts: {
    all: number
    valid: number
    warning: number
    expired: number
  }
  className?: string
}

export default function StatusFilter({ 
  selectedStatus, 
  onStatusChange, 
  statusCounts,
  className 
}: StatusFilterProps) {

  const filters = [
    { 
      key: null, 
      label: 'Tous', 
      count: statusCounts.all,
      color: 'bg-gray-500'
    },
    { 
      key: 'valid', 
      label: 'Valides', 
      count: statusCounts.valid,
      color: 'bg-green-500'
    },
    { 
      key: 'warning', 
      label: 'Bientôt exp.', 
      count: statusCounts.warning,
      color: 'bg-orange-500'
    },
    { 
      key: 'expired', 
      label: 'Périmés', 
      count: statusCounts.expired,
      color: 'bg-red-500'
    }
  ]

  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide py-1', className)}>
      {filters.map((filter) => (
        <button
          key={filter.key || 'all'}
          onClick={() => onStatusChange(filter.key)}
          className={cn(
            'flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 border',
            selectedStatus === filter.key
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          )}
        >
          {/* Point coloré pour le statut */}
          <div className={cn('w-2 h-2 rounded-full', filter.color)} />
          
          {/* Label et nombre */}
          <span className="truncate">
            {filter.label}
          </span>
          
          {/* Badge de count */}
          {filter.count > 0 && (
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-xs font-medium',
              selectedStatus === filter.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            )}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}