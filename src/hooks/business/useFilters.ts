'use client'

import { useState, useCallback, useMemo } from 'react'
import { Medicament } from '@/types/medicament'
import { getExpiryStatus } from '@/lib/utils'

export type StatusFilter = 'all' | 'valid' | 'warning' | 'expired'
export type SortOption = 'name' | 'expiry' | 'quantity' | 'category'
export type SortOrder = 'asc' | 'desc'

interface UseFiltersProps {
  medicaments: Medicament[]
}

export function useFilters({ medicaments }: UseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  // Obtenir les catégories disponibles
  const availableCategories = useMemo(() => {
    return Array.from(new Set(medicaments.map(med => med.categorie))).sort()
  }, [medicaments])

  // Filtrage et tri des médicaments
  const filteredMedicaments = useMemo(() => {
    let filtered = medicaments.filter(med => {
      // Filtre de recherche
      const matchesSearch = med.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           med.marque?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           med.categorie.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Filtre de catégorie
      const matchesCategory = selectedCategory === null || med.categorie === selectedCategory
      
      // Filtre de statut
      let matchesStatus = true
      const status = getExpiryStatus(med.datePeremption)
      
      switch (statusFilter) {
        case 'valid':
          matchesStatus = status === 'valid'
          break
        case 'warning':
          matchesStatus = status === 'warning'
          break
        case 'expired':
          matchesStatus = status === 'expired'
          break
        case 'all':
        default:
          matchesStatus = true
      }
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Tri des résultats
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.nom.localeCompare(b.nom)
          break
        case 'expiry':
          comparison = new Date(a.datePeremption).getTime() - new Date(b.datePeremption).getTime()
          break
        case 'quantity':
          comparison = a.quantite - b.quantite
          break
        case 'category':
          comparison = a.categorie.localeCompare(b.categorie)
          break
      }
      
      return sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [medicaments, searchQuery, selectedCategory, statusFilter, sortBy, sortOrder])

  // Statistiques des filtres
  const filterStats = useMemo(() => {
    const stats = medicaments.reduce((acc, med) => {
      const status = getExpiryStatus(med.datePeremption)
      acc.all++
      
      switch (status) {
        case 'valid':
          acc.valid++
          break
        case 'warning':
          acc.warning++
          break
        case 'expired':
          acc.expired++
          break
      }
      
      return acc
    }, { all: 0, valid: 0, warning: 0, expired: 0 })

    return stats
  }, [medicaments])

  // Actions de filtrage
  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory(null)
    setStatusFilter('all')
    setSortBy('name')
    setSortOrder('asc')
  }, [])

  const setSort = useCallback((newSortBy: SortOption, newSortOrder?: SortOrder) => {
    setSortBy(newSortBy)
    if (newSortOrder) {
      setSortOrder(newSortOrder)
    } else {
      // Si même critère, inverser l'ordre
      if (sortBy === newSortBy) {
        setSortOrder(current => current === 'asc' ? 'desc' : 'asc')
      } else {
        setSortOrder('asc')
      }
    }
  }, [sortBy])

  // Filtrage rapide par statut
  const setQuickFilter = useCallback((status: StatusFilter) => {
    setStatusFilter(status)
    setSearchQuery('')
    setSelectedCategory(null)
  }, [])

  return {
    // État des filtres
    searchQuery,
    selectedCategory,
    statusFilter,
    sortBy,
    sortOrder,
    
    // Données filtrées
    filteredMedicaments,
    availableCategories,
    filterStats,
    
    // Actions
    setSearchQuery,
    setSelectedCategory,
    setStatusFilter,
    setSort,
    resetFilters,
    setQuickFilter
  }
}