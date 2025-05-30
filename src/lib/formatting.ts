/**
 * Utilitaires de formatage pour l'application pharmacie
 */

// Formatage des dates
export function formatDateFrench(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  }).format(dateObj)
}

export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffTime = dateObj.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    if (absDays === 0) return "Aujourd'hui"
    if (absDays === 1) return "Hier"
    if (absDays < 7) return `Il y a ${absDays} jours`
    if (absDays < 30) return `Il y a ${Math.floor(absDays / 7)} semaine${Math.floor(absDays / 7) > 1 ? 's' : ''}`
    return `Il y a ${Math.floor(absDays / 30)} mois`
  }
  
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Demain"
  if (diffDays < 7) return `Dans ${diffDays} jours`
  if (diffDays < 30) return `Dans ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`
  return `Dans ${Math.floor(diffDays / 30)} mois`
}

// Formatage des quantités
export function formatQuantity(quantity: number, unit?: string): string {
  if (quantity === 0) return 'Aucun'
  if (quantity === 1) return unit ? `1 ${unit}` : '1'
  return unit ? `${quantity} ${unit}s` : quantity.toString()
}

export function formatQuantityShort(quantity: number): string {
  if (quantity === 0) return '0'
  if (quantity < 1000) return quantity.toString()
  return `${(quantity / 1000).toFixed(1)}k`
}

// Formatage des noms
export function formatMedicamentName(name: string, maxLength: number = 30): string {
  const trimmed = name.trim()
  if (trimmed.length <= maxLength) return trimmed
  return trimmed.substring(0, maxLength - 3) + '...'
}

export function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
}

// Formatage des messages d'alerte
export function formatExpiryMessage(daysUntilExpiry: number, medicamentName: string): string {
  if (daysUntilExpiry < 0) {
    const daysPast = Math.abs(daysUntilExpiry)
    return `${medicamentName} a expiré il y a ${daysPast} jour${daysPast > 1 ? 's' : ''}`
  }
  
  if (daysUntilExpiry === 0) {
    return `${medicamentName} expire aujourd'hui`
  }
  
  if (daysUntilExpiry === 1) {
    return `${medicamentName} expire demain`
  }
  
  return `${medicamentName} expire dans ${daysUntilExpiry} jours`
}

// Formatage des statistiques
export function formatStatsMessage(stats: {
  totalMedicaments: number
  medicamentsExpires: number
  medicamentsBientotExpires: number
}): string {
  const { totalMedicaments, medicamentsExpires, medicamentsBientotExpires } = stats
  
  if (totalMedicaments === 0) {
    return "Votre armoire est vide"
  }
  
  if (medicamentsExpires === 0 && medicamentsBientotExpires === 0) {
    return `${totalMedicaments} médicament${totalMedicaments > 1 ? 's' : ''} en bon état`
  }
  
  const alertes = medicamentsExpires + medicamentsBientotExpires
  return `${totalMedicaments} médicament${totalMedicaments > 1 ? 's' : ''}, ${alertes} à vérifier`
}

// Formatage des pourcentages
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%'
  const percentage = (value / total) * 100
  return `${Math.round(percentage)}%`
}

// Formatage des durées
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes === 0 ? `${hours}h` : `${hours}h${remainingMinutes}`
}