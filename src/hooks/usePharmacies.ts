'use client'

import { useState, useEffect } from 'react'
import { pharmaciesProches } from '@/data/medicaments'

interface Pharmacie {
  id: string
  nom: string
  adresse: string
  distance: string
  tempsTrajet: string
  telephone: string
  horaires: {
    matin: string
    apresmidi: string
  }
  ouvert: boolean
  coordonnees: { lat: number; lng: number }
}

export function usePharmacies() {
  const [pharmacies, setPharmacies] = useState<Pharmacie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement des pharmacies proches
    const timer = setTimeout(() => {
      setPharmacies(pharmaciesProches)
      setIsLoading(false)
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