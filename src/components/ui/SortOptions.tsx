'use client'

import { cn } from '@/lib/utils'

export type SortOption = 'name' | 'expiry' | 'quantity' | 'category'

interface SortOptionsProps {
  sortBy: SortOption
  sortOrder: 'asc' | 'desc'
  onSortChange: (sortBy: SortOption, sortOrder: 'asc' | 'desc') => void
  className?: string
}

export default function SortOptions({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  className 
}: SortOptionsProps) {

  const sortOptions = [
    { key: 'name' as SortOption, label: 'Nom' },
    { key: 'expiry' as SortOption, label: 'Expiration' },
    { key: 'quantity' as SortOption, label: 'Quantité' },
    { key: 'category' as SortOption, label: 'Catégorie' }
  ]

  const handleSortClick = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      // Si même critère, inverser l'ordre
      onSortChange(newSortBy, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Nouveau critère, ordre par défaut
      onSortChange(newSortBy, newSortBy === 'expiry' ? 'asc' : 'asc')
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-gray-600 font-medium">Trier par:</span>
      
      <div className="flex gap-1">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSortClick(option.key)}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95',
              sortBy === option.key
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            {option.label}
            
            {/* Flèche de tri */}
            {sortBy === option.key && (
              <svg 
                className={cn(
                  'w-3 h-3 transition-transform duration-200',
                  sortOrder === 'desc' && 'rotate-180'
                )} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}