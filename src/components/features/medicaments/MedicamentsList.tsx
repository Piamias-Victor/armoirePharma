'use client'

import { Medicament } from "@/types"
import { MedicamentCard } from ".."


interface MedicamentsListProps {
  medicaments: Medicament[]
  onMedicamentClick?: (medicament: Medicament) => void
  className?: string
}

export default function MedicamentsList({ 
  medicaments, 
  onMedicamentClick, 
  className 
}: MedicamentsListProps) {
  
  if (medicaments.length === 0) {
    return null
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {medicaments.map((medicament) => (
        <MedicamentCard
          key={medicament.id}
          medicament={medicament}
          onClick={() => onMedicamentClick?.(medicament)}
        />
      ))}
    </div>
  )
}