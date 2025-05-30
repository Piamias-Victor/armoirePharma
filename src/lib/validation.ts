/**
 * Utilitaires de validation pour l'application pharmacie
 */

// Validation des dates
export function isValidDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

export function isDateInFuture(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to compare dates only
  return dateObj.getTime() >= today.getTime()
}

export function isDateTooFarInFuture(date: string | Date, maxYears: number = 10): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + maxYears)
  return dateObj.getTime() > maxDate.getTime()
}

// Validation des noms de médicaments
export function isValidMedicamentName(name: string): boolean {
  if (!name || typeof name !== 'string') return false
  
  const trimmed = name.trim()
  if (trimmed.length < 2) return false
  if (trimmed.length > 100) return false
  
  // Autorise lettres, chiffres, espaces, tirets, parenthèses
  const validPattern = /^[a-zA-ZÀ-ÿ0-9\s\-()]+$/
  return validPattern.test(trimmed)
}

// Validation des quantités
export function isValidQuantity(quantity: number | string): boolean {
  const num = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity
  return Number.isInteger(num) && num >= 0 && num <= 999
}

// Validation des catégories
export function isValidCategory(category: string): boolean {
  if (!category || typeof category !== 'string') return false
  
  const trimmed = category.trim()
  return trimmed.length >= 2 && trimmed.length <= 50
}

// Validation complète d'un médicament
export interface MedicamentValidationResult {
  isValid: boolean
  errors: {
    nom?: string
    datePeremption?: string
    quantite?: string
    categorie?: string
  }
}

export function validateMedicament(data: {
  nom: string
  datePeremption: string
  quantite: number | string
  categorie: string
}): MedicamentValidationResult {
  const errors: MedicamentValidationResult['errors'] = {}
  
  // Validation nom
  if (!isValidMedicamentName(data.nom)) {
    errors.nom = 'Le nom doit contenir entre 2 et 100 caractères valides'
  }
  
  // Validation date
  if (!isValidDate(data.datePeremption)) {
    errors.datePeremption = 'Date invalide'
  } else if (isDateTooFarInFuture(data.datePeremption)) {
    errors.datePeremption = 'Date trop éloignée dans le futur'
  }
  
  // Validation quantité
  if (!isValidQuantity(data.quantite)) {
    errors.quantite = 'La quantité doit être un nombre entre 0 et 999'
  }
  
  // Validation catégorie
  if (!isValidCategory(data.categorie)) {
    errors.categorie = 'Catégorie invalide'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Utilitaires de nettoyage
export function sanitizeMedicamentName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

export function sanitizeCategory(category: string): string {
  return category.trim()
}