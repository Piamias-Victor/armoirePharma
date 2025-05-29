export interface Medicament {
  id: string
  nom: string
  datePeremption: Date
  categorie: string
  photo?: string
  instructionsUsage?: string
  posologie?: string
  interactions?: string
  quantite: number
  statut: 'valide' | 'bientot_expire' | 'expire'
  marque?: string
  numeroLot?: string
  codeBarres?: string
}

export interface Categorie {
  id: string
  nom: string
  icone: string
  couleur: string
  description?: string
}

export type StatutExpiration = 'valid' | 'warning' | 'expired'

export interface StatsArmoire {
  totalMedicaments: number
  medicamentsValides: number
  medicamentsBientotExpires: number
  medicamentsExpires: number
  categoriesCount: number
}