export interface HorairesJour {
  type: 'continu' | 'coupure' | 'ferme'
  ouverture?: string
  fermeture?: string
  // Pour les horaires avec coupure
  matin?: string
  apresmidi?: string
}

export interface Pharmacie {
  id: string
  nom: string
  adresse: string
  distance: string
  tempsTrajet: string
  telephone: string
  horaires: {
    lundi: HorairesJour
    mardi: HorairesJour
    mercredi: HorairesJour
    jeudi: HorairesJour
    vendredi: HorairesJour
    samedi: HorairesJour
    dimanche: HorairesJour
  }
  horairesAujourdhui?: HorairesJour // Pour simplifier l'affichage
  ouvert: boolean
  coordonnees: { lat: number; lng: number }
}