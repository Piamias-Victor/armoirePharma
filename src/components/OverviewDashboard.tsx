'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import PriorityAlert from './ui/PriorityAlert'
import TrendIndicator from './ui/TrendIndicator'
import { StatsArmoire, Medicament } from '@/types/medicament'
import { getDaysUntilExpiry } from '@/lib/utils'

interface OverviewDashboardProps {
  stats: StatsArmoire
  medicamentsExpires: Medicament[]
  medicamentsBientotExpires: Medicament[]
  onViewExpired?: () => void
  onViewWarning?: () => void
  onAddMedicament?: () => void
  className?: string
}

export default function OverviewDashboard({
  stats,
  medicamentsExpires,
  medicamentsBientotExpires,
  onViewExpired,
  onViewWarning,
  onAddMedicament,
  className
}: OverviewDashboardProps) {

  // Simulation de données de tendance (en réalité viendraient de l'historique)
  const previousStats = {
    totalMedicaments: stats.totalMedicaments - 2,
    medicamentsBientotExpires: stats.medicamentsBientotExpires + 1,
    medicamentsExpires: stats.medicamentsExpires - 1
  }

  // Médicament expirant le plus tôt
  const prochainExpiration = medicamentsBientotExpires
    .sort((a, b) => new Date(a.datePeremption).getTime() - new Date(b.datePeremption).getTime())[0]

  // Déterminer la priorité des alertes
  const getAlertPriority = () => {
    if (medicamentsExpires.length > 3) return 'urgent'
    if (medicamentsExpires.length > 0 || medicamentsBientotExpires.length > 2) return 'attention'
    return 'info'
  }

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Alerte de priorité principale */}
      {(medicamentsExpires.length > 0 || medicamentsBientotExpires.length > 0) && (
        <PriorityAlert
          type={getAlertPriority()}
          title={medicamentsExpires.length > 0 ? 'Médicaments périmés détectés' : 'Vérification nécessaire'}
          message={
            medicamentsExpires.length > 0 
              ? `${medicamentsExpires.length} médicament${medicamentsExpires.length > 1 ? 's ont' : ' a'} périmé et ${medicamentsBientotExpires.length > 0 ? `${medicamentsBientotExpires.length} expire${medicamentsBientotExpires.length > 1 ? 'nt' : ''} bientôt` : 'doit être retiré de votre armoire'}.`
              : `${medicamentsBientotExpires.length} médicament${medicamentsBientotExpires.length > 1 ? 's expirent' : ' expire'} dans les 30 prochains jours.`
          }
          count={medicamentsExpires.length + medicamentsBientotExpires.length}
          onAction={medicamentsExpires.length > 0 ? onViewExpired : onViewWarning}
          actionLabel={medicamentsExpires.length > 0 ? 'Voir périmés' : 'Vérifier dates'}
          className="animate-fade-in-up"
        />
      )}

      {/* Prochaine expiration urgente */}
      {prochainExpiration && getDaysUntilExpiry(prochainExpiration.datePeremption) <= 7 && (
        <Card className="glass border-orange-300 bg-orange-50/50 animate-fade-in-up" style={{ animationDelay: '100ms' } as any}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center animate-pulse-subtle">
                <span className="text-orange-600 text-lg">⏰</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-orange-800 text-sm">
                  Expiration imminente
                </div>
                <div className="text-orange-700 text-xs">
                  <strong>{prochainExpiration.nom}</strong> expire dans{' '}
                  <strong>{Math.abs(getDaysUntilExpiry(prochainExpiration.datePeremption))} jour{Math.abs(getDaysUntilExpiry(prochainExpiration.datePeremption)) > 1 ? 's' : ''}</strong>
                </div>
              </div>
              <button
                onClick={onViewWarning}
                className="text-orange-600 text-xs hover:text-orange-800 transition-colors"
              >
                Voir →
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Indicateurs de tendance */}
      <Card className="glass border-gray-200 glass-hover animate-fade-in-up" style={{ animationDelay: '200ms' } as any}>
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 text-base">
            Évolution de votre armoire
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <TrendIndicator
            value={stats.totalMedicaments}
            previousValue={previousStats.totalMedicaments}
            label="Total"
            size="sm"
          />
          <TrendIndicator
            value={stats.medicamentsBientotExpires}
            previousValue={previousStats.medicamentsBientotExpires}
            label="À vérifier"
            size="sm"
          />
          <TrendIndicator
            value={stats.medicamentsExpires}
            previousValue={previousStats.medicamentsExpires}
            label="Périmés"
            size="sm"
          />
        </CardContent>
      </Card>

      {/* Message encourageant si armoire bien gérée */}
      {medicamentsExpires.length === 0 && medicamentsBientotExpires.length <= 1 && stats.totalMedicaments > 0 && (
        <PriorityAlert
          type="info"
          title="Excellente gestion ! 👍"
          message={`Votre armoire à pharmacie est bien entretenue avec ${stats.totalMedicaments} médicament${stats.totalMedicaments > 1 ? 's' : ''} en bon état.`}
          onAction={onAddMedicament}
          actionLabel="Ajouter un médicament"
          className="animate-fade-in-up"
          style={{ animationDelay: '300ms' } as any}
        />
      )}

      {/* Encouragement si armoire vide */}
      {stats.totalMedicaments === 0 && (
        <PriorityAlert
          type="info"
          title="Commençons ensemble ! 🚀"
          message="Votre armoire à pharmacie est vide. Ajoutez vos premiers médicaments pour commencer le suivi."
          onAction={onAddMedicament}
          actionLabel="Ajouter le premier médicament"
          className="animate-fade-in-up"
        />
      )}
    </div>
  )
}