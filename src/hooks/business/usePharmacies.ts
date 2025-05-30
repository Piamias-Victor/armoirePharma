'use client'

import { Pharmacie } from '@/types'
import { useState, useEffect } from 'react'


export function usePharmacies() {
  const [pharmacies, setPharmacies] = useState<Pharmacie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Import dynamique pour éviter les problèmes de circularité
    const loadPharmacies = async () => {
      try {
        const { pharmaciesProches } = await import('@/data/pharmacies')
        setPharmacies(pharmaciesProches)
      } catch (error) {
        console.error('Erreur chargement pharmacies:', error)
        setPharmacies([])
      } finally {
        setIsLoading(false)
      }
    }

    // Simuler un chargement des pharmacies proches
    const timer = setTimeout(() => {
      loadPharmacies()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const pharmaciePlusProche = pharmacies.length > 0 ? pharmacies[0] : null

  const appellerPharmacie = (telephone: string) => {
    // Simuler un appel (dans un vrai projet : window.location.href = `tel:${telephone}`)
    alert(`Appel vers ${telephone}\n\n(Simulation - dans l'app réelle, cela ouvrirait l'app téléphone)`)
  }

  const ouvrirItineraire = (coordonnees: { lat: number; lng: number }, nom: string) => {
    // Simuler ouverture GPS (dans un vrai projet : Google Maps / Apple Maps)
    alert(`Ouverture de l'itinéraire vers ${nom}\n\nCoordonnées: ${coordonnees.lat}, ${coordonnees.lng}\n\n(Simulation - dans l'app réelle, cela ouvrirait l'app GPS)`)
  }

  return {
    pharmacies,
    pharmaciePlusProche,
    isLoading,
    appellerPharmacie,
    ouvrirItineraire
  }
}