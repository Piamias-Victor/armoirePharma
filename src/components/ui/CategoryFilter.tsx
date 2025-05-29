'use client'

import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  className?: string
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className 
}: CategoryFilterProps) {

  // Raccourcir les noms trop longs
  const shortenCategoryName = (name: string) => {
    if (name.length <= 12) return name
    return name.substring(0, 10) + '...'
  }

  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide py-1', className)}>
      {/* Bouton "Tous" */}
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          'flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 border',
          selectedCategory === null
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
        )}
      >
        Tous
      </button>

      {/* Boutons catégories */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          title={category} // Tooltip pour voir le nom complet
          className={cn(
            'flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 border max-w-[120px]',
            selectedCategory === category
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          )}
        >
          <span className="truncate">
            {shortenCategoryName(category)}
          </span>
        </button>
      ))}
    </div>
  )
}