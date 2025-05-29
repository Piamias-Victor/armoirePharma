import { useState } from "react"
import { Input } from "@/components/ui/input"
import MedicamentCard from "@/components/ui/MedicamentCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useMedicaments } from "@/hooks/useMedicaments"
import { getExpiryStatus } from "@/lib/utils"

export default function ArmoirePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'expired'>('all')
  const { medicaments, isLoading } = useMedicaments()

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner text="Chargement..." />
      </div>
    )
  }

  // Obtenir les catégories disponibles
  const categories = Array.from(new Set(medicaments.map(med => med.categorie)))

  // Filtrage
  const filteredMedicaments = medicaments.filter(med => {
    const matchesSearch = med.nom.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || med.categorie === selectedCategory
    
    let matchesStatus = true
    if (statusFilter === 'valid') matchesStatus = getExpiryStatus(med.datePeremption) === 'valid'
    if (statusFilter === 'expired') matchesStatus = getExpiryStatus(med.datePeremption) === 'expired'
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleMedicamentClick = (medicament: any) => {
    console.log(`Voir détails de ${medicament.nom}`)
  }

  return (
    <div className="space-y-4">
      
      {/* Recherche */}
      <div 
        className="bg-white rounded-xl border border-gray-200 p-1"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <Input 
          className="border-0 bg-transparent text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none" 
          placeholder="Rechercher..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtre de statut - horizontal en haut */}
      <div className="flex gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'all' 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setStatusFilter('valid')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'valid' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Valides
        </button>
        <button
          onClick={() => setStatusFilter('expired')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            statusFilter === 'expired' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Périmés
        </button>
      </div>

      {/* Filtres catégories - scroll horizontal SANS conflit swipe */}
      {categories.length > 0 && (
        <div 
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedCategory(null)}
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
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {category.length > 12 ? category.substring(0, 10) + '...' : category}
            </button>
          ))}
        </div>
      )}

      {/* Liste */}
      {filteredMedicaments.length > 0 ? (
        <div className="space-y-2">
          {filteredMedicaments.map((medicament) => (
            <MedicamentCard
              key={medicament.id}
              medicament={medicament}
              onClick={() => handleMedicamentClick(medicament)}
            />
          ))}
        </div>
      ) : (
        /* État vide */
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun médicament trouvé
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Essayez d'ajuster vos filtres
          </p>
          <button 
            onClick={() => {
              setStatusFilter('all')
              setSelectedCategory(null)
              setSearchQuery('')
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}