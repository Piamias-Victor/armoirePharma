import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilitaires pour la pharmacie
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  }).format(date)
}

export function getDaysUntilExpiry(expiryDate: Date): number {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getExpiryStatus(expiryDate: Date): 'valid' | 'warning' | 'expired' {
  const daysUntil = getDaysUntilExpiry(expiryDate)
  
  if (daysUntil < 0) return 'expired'
  if (daysUntil <= 30) return 'warning'
  return 'valid'
}