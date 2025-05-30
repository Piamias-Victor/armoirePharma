'use client'

import { useState, useEffect, useCallback } from 'react'
import { Medicament, StatsArmoire } from '@/types/medicament'
import { getExpiryStatus } from '@/lib/utils'

const STORAGE_KEY = 'armoire_medicaments'

export function useMedicaments() {
  const [medicaments, setMedicaments] = useState<Medicament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ✅ CORRIGÉ : Fonction pour mapper les statuts anglais vers français
  const mapStatusToFrench = (status: 'valid' | 'warning' | 'expired'): 'valide' | 'bientot_expire' | 'expire' => {
    const mapping = {
      'valid': 'valide' as const,
      'warning': 'bientot_expire' as const,
      'expired': 'expire' as const
    }
    return mapping[status]
  }

  // Charger les données depuis localStorage ou commencer vide
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Convertir les dates string en objets Date
        const withDates = parsed.map((med: any) => ({
          ...med,
          datePeremption: new Date(med.datePeremption)
        }))
        setMedicaments(withDates)
      } else {
        // Première utilisation : armoire vide
        setMedicaments([])
      }
    } catch (error) {
      console.error('Erreur chargement médicaments:', error)
      setMedicaments([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sauvegarder dans localStorage à chaque changement
  const saveMedicaments = useCallback((newMedicaments: Medicament[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMedicaments))
      setMedicaments(newMedicaments)
    } catch (error) {
      console.error('Erreur sauvegarde médicaments:', error)
    }
  }, [])

  // Ajouter un nouveau médicament
  const addMedicament = useCallback((newMedicament: {
    nom: string
    categorie: string
    datePeremption: string
    quantite: number
  }) => {
    const expiryStatus = getExpiryStatus(new Date(newMedicament.datePeremption))
    
    const medicament: Medicament = {
      id: Date.now().toString(),
      nom: newMedicament.nom,
      datePeremption: new Date(newMedicament.datePeremption),
      categorie: newMedicament.categorie,
      quantite: newMedicament.quantite,
      statut: mapStatusToFrench(expiryStatus) // ✅ CORRIGÉ : Mapping du statut
    }

    const updatedMedicaments = [...medicaments, medicament]
    saveMedicaments(updatedMedicaments)
  }, [medicaments, saveMedicaments])

  // Calculer les statistiques
  const getStats = useCallback((): StatsArmoire => {
    const stats = medicaments.reduce((acc, med) => {
      const status = getExpiryStatus(med.datePeremption)
      
      acc.totalMedicaments++
      
      switch (status) {
        case 'valid':
          acc.medicamentsValides++
          break
        case 'warning':
          acc.medicamentsBientotExpires++
          break
        case 'expired':
          acc.medicamentsExpires++
          break
      }
      
      return acc
    }, {
      totalMedicaments: 0,
      medicamentsValides: 0,
      medicamentsBientotExpires: 0,
      medicamentsExpires: 0,
      categoriesCount: 0
    })

    // Compter les catégories uniques
    const categories = new Set(medicaments.map(med => med.categorie))
    stats.categoriesCount = categories.size

    return stats
  }, [medicaments])

  // Obtenir les médicaments par statut
  const getMedicamentsByStatus = useCallback((status: 'valid' | 'warning' | 'expired') => {
    return medicaments.filter(med => getExpiryStatus(med.datePeremption) === status)
  }, [medicaments])

  // Obtenir les catégories vides
  const getCategoriesVides = useCallback(() => {
    const categoriesAvecMedicaments = new Set(medicaments.map(med => med.categorie))
    const toutesCategories = ['Antidouleurs', 'Premiers secours', 'Vitamines', 'Allergies', 'Antibiotiques', 'Troubles digestifs']
    return toutesCategories.filter(cat => !categoriesAvecMedicaments.has(cat))
  }, [medicaments])

  return {
    medicaments,
    isLoading,
    stats: getStats(),
    saveMedicaments,
    addMedicament,
    getMedicamentsByStatus,
    getCategoriesVides
  }
}