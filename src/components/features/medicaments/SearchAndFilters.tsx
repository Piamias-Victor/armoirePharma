'use client'

import { Input } from "@/components/ui"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: 'all' | 'valid' | 'expired'
  onStatusFilterChange: (filter: 'all' | 'valid' | 'expired') => void
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  categories: string[]
  className?: string
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedCategory,
  onCategoryChange,
  categories,
  className
}: SearchAndFiltersProps) {
  
  const shortenCategoryName = (name: string) => {
    if (name.length <= 12) return name
    return name.substring(0, 10) + '...'
  }

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Barre de recherche */}
      <div 
        className="bg-white rounded-xl border border-gray-200 p-1"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <Input 
          variant="search"
          placeholder="Rechercher..."
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      {/* Filtres de statut */}
      <div className="flex gap-2">
        <button
          onClick={() => onStatusFilterChange('all')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'all' 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => onStatusFilterChange('valid')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'valid' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Valides
        </button>
        <button
          onClick={() => onStatusFilterChange('expired')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'expired' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Périmés
        </button>
      </div>

      {/* Filtres catégories */}
      {categories.length > 0 && (
        <div 
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === null 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            Toutes catégories
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              title={category}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <span className="truncate">
                {shortenCategoryName(category)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}