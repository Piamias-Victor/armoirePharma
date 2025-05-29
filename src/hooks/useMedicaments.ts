'use client'

import { useState, useEffect, useCallback } from 'react'
import { Medicament, StatsArmoire } from '@/types/medicament'
import { medicaments as initialData } from '@/data/medicaments'
import { getExpiryStatus, getDaysUntilExpiry } from '@/lib/utils'

const STORAGE_KEY = 'armoire_medicaments'

export function useMedicaments() {
  const [medicaments, setMedicaments] = useState<Medicament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Charger les données depuis localStorage ou utiliser les données de test
  useEffect(() => {
    try {
      // TEMPORAIRE : Forcer mise à jour des données
      const currentVersion = '2.0'
      const savedVersion = localStorage.getItem('armoire_version')
      
      if (savedVersion !== currentVersion) {
        // Nouvelle version, utiliser les nouvelles données
        setMedicaments(initialData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
        localStorage.setItem('armoire_version', currentVersion)
      } else {
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
          // Première utilisation : utiliser les données de test
          setMedicaments(initialData)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
          localStorage.setItem('armoire_version', currentVersion)
        }
      }
    } catch (error) {
      console.error('Erreur chargement médicaments:', error)
      setMedicaments(initialData)
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
    getMedicamentsByStatus,
    getCategoriesVides
  }
}