'use client'

import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui"
import { cn, getDaysUntilExpiry, formatDate } from "@/lib"
import { Medicament } from "@/types"

interface AlertCardProps {
  medicaments: Medicament[]
  type: 'warning' | 'expired'
  className?: string
  onMedicamentClick?: (medicament: Medicament) => void
}

export default function AlertCard({ 
  medicaments, 
  type, 
  className,
  onMedicamentClick 
}: AlertCardProps) {
  if (medicaments.length === 0) return null

  const config = {
    warning: {
      title: '⚠️ Médicaments bientôt périmés',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50/50',
      titleColor: 'text-amber-700',
      badgeClass: 'bg-amber-500/20 text-amber-700 border-amber-400/30'
    },
    expired: {
      title: '🚨 Médicaments périmés', 
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50/50',
      titleColor: 'text-red-700',
      badgeClass: 'bg-red-500/20 text-red-700 border-red-400/30'
    }
  }

  const currentConfig = config[type]

  return (
    <Card className={cn(
      'glass glass-hover animate-fade-in-up',
      currentConfig.borderColor,
      currentConfig.bgColor,
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className={cn('text-base flex items-center gap-2', currentConfig.titleColor)}>
          {currentConfig.title}
          <Badge variant="secondary" className={cn('ml-auto', currentConfig.badgeClass)}>
            {medicaments.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {medicaments.slice(0, 3).map((medicament, index) => {
          const daysUntil = getDaysUntilExpiry(medicament.datePeremption)
          
          return (
            <div 
              key={medicament.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg transition-all duration-200',
                'bg-white/50 border border-white/60',
                onMedicamentClick && 'cursor-pointer hover:bg-white/70 active:scale-95'
              )}
              onClick={() => onMedicamentClick?.(medicament)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  {medicament.nom}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {medicament.marque && `${medicament.marque} • `}
                  Qté: {medicament.quantite}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <Badge 
                  variant={type === 'expired' ? 'destructive' : 'secondary'} 
                  className={currentConfig.badgeClass}
                >
                  {type === 'expired' ? 'Périmé' : `${Math.abs(daysUntil)}j`}
                </Badge>
                <div className="text-xs text-gray-500">
                  {formatDate(medicament.datePeremption)}
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Indicateur s'il y en a plus */}
        {medicaments.length > 3 && (
          <div className="text-center pt-2">
            <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
              +{medicaments.length - 3} autre{medicaments.length - 3 > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}