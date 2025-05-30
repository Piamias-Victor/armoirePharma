'use client'

import { Card, CardContent } from "@/components/ui"
import { getExpiryStatus, getDaysUntilExpiry, cn, formatDate } from "@/lib"
import { Medicament } from "@/types"

interface MedicamentCardProps {
  medicament: Medicament
  onClick?: () => void
  className?: string
}

export default function MedicamentCard({ medicament, onClick, className }: MedicamentCardProps) {
  const status = getExpiryStatus(medicament.datePeremption)
  const daysUntil = getDaysUntilExpiry(medicament.datePeremption)

  const statusConfig = {
    valid: {
      dotClass: 'bg-green-500',
      textClass: 'text-green-700'
    },
    warning: {
      dotClass: 'bg-orange-500',
      textClass: 'text-orange-700'
    },
    expired: {
      dotClass: 'bg-red-500',
      textClass: 'text-red-700'
    }
  }

  const config = statusConfig[status]

  const getStatusText = () => {
    if (status === 'expired') return 'Périmé'
    if (status === 'warning') return `${Math.abs(daysUntil)}j`
    return 'Valide'
  }

  return (
    <Card 
      className={cn(
        'bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          
          {/* Informations principales */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-base mb-1 truncate">
              {medicament.nom}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{medicament.categorie}</span>
              <span>•</span>
              <span>{formatDate(medicament.datePeremption)}</span>
            </div>
          </div>
          
          {/* Statut épuré */}
          <div className="flex items-center gap-2 ml-3">
            <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
            <span className={cn('text-sm font-medium', config.textClass)}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}