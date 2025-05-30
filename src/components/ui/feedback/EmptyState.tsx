'use client'

import Button from "../base/button"
import ActionButton from "../form/ActionButton"


interface EmptyStateProps {
  type: 'empty-armoire' | 'no-results'
  onResetFilters?: () => void
  className?: string
}

export default function EmptyState({ type, onResetFilters, className }: EmptyStateProps) {
  
  if (type === 'empty-armoire') {
    return (
      <div className={`text-center py-16 animate-fade-in-up ${className}`}>
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-50 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Votre armoire est vide
        </h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Commencez par ajouter vos médicaments via l&apos;onglet Scanner ou saisie manuelle
        </p>
        
        {/* Boutons unifiés */}
        <div className="flex gap-3 justify-center">
          <ActionButton action="scanner" />
          <ActionButton action="manual" />
        </div>
      </div>
    )
  }

  // État "aucun résultat" pour filtres
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Aucun médicament trouvé
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Essayez d&apos;ajuster vos filtres
      </p>
      {onResetFilters && (
        <Button 
          onClick={onResetFilters}
          variant="ghost"
          size="sm"
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  )
}