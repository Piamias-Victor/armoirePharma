import { useState } from "react"

import { getExpiryStatus } from "@/lib/utils"
import { Medicament } from "@/types/medicament"
import { useMedicaments } from "@/hooks"
import { SearchAndFilters, MedicamentsList } from "../features"
import MedicamentDetailsModal from "../features/medicaments/MedicamentDetailsModal"
import { LoadingSpinner, EmptyState } from "../ui"

export default function ArmoirePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'expired'>('all')
  const [selectedMedicament, setSelectedMedicament] = useState<Medicament | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
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

  // Filtrage des médicaments
  const filteredMedicaments = medicaments.filter(med => {
    const matchesSearch = med.nom.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || med.categorie === selectedCategory
    
    let matchesStatus = true
    if (statusFilter === 'valid') matchesStatus = getExpiryStatus(med.datePeremption) === 'valid'
    if (statusFilter === 'expired') matchesStatus = getExpiryStatus(med.datePeremption) === 'expired'
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleMedicamentClick = (medicament: Medicament) => {
    setSelectedMedicament(medicament)
    setShowDetailsModal(true)
  }

  const handleResetFilters = () => {
    setStatusFilter('all')
    setSelectedCategory(null)
    setSearchQuery('')
  }

  return (
    <div className="space-y-4">
      
      {/* Modal détails */}
      <MedicamentDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        medicament={selectedMedicament}
      />
      
      {/* Recherche et filtres */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Contenu principal */}
      {medicaments.length === 0 ? (
        <EmptyState type="empty-armoire" />
      ) : filteredMedicaments.length > 0 ? (
        <MedicamentsList
          medicaments={filteredMedicaments}
          onMedicamentClick={handleMedicamentClick}
        />
      ) : (
        <EmptyState 
          type="no-results" 
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  )
}