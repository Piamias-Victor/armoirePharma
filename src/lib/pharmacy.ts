import { HorairesJour } from '@/types/pharmacy'

export function formatHoraires(horaires: HorairesJour): string {
  switch (horaires.type) {
    case 'ferme':
      return 'Fermé'
    
    case 'continu':
      if (horaires.ouverture === '00h00' && horaires.fermeture === '23h59') {
        return '24h/24'
      }
      return `${horaires.ouverture} - ${horaires.fermeture}`
    
    case 'coupure':
      return `${horaires.matin} • ${horaires.apresmidi}`
    
    default:
      return 'Horaires non disponibles'
  }
}

export function getJourActuel(): string {
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  return jours[new Date().getDay()]
}

export function getHorairesAujourdhui(pharmacie: any): HorairesJour {
  const jourActuel = getJourActuel() as keyof typeof pharmacie.horaires
  return pharmacie.horaires[jourActuel]
}

export function estOuvert(horaires: HorairesJour): boolean {
  if (horaires.type === 'ferme') return false
  
  const maintenant = new Date()
  const heureActuelle = maintenant.getHours() * 60 + maintenant.getMinutes()
  
  if (horaires.type === 'continu') {
    const [ouvertureH, ouvertureM] = horaires.ouverture!.split('h').map(Number)
    const [fermetureH, fermetureM] = horaires.fermeture!.split('h').map(Number)
    
    const ouverture = ouvertureH * 60 + (ouvertureM || 0)
    const fermeture = fermetureH * 60 + (fermetureM || 0)
    
    // Cas spécial 24h/24
    if (ouverture === 0 && fermeture >= 1439) return true
    
    return heureActuelle >= ouverture && heureActuelle <= fermeture
  }
  
  // Pour les horaires avec coupure, c'est plus complexe...
  // On simplifie en retournant true pour l'exemple
  return true
}