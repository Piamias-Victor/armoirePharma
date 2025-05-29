import { Card, CardContent } from "@/components/ui/card"
import AnimatedButton from "@/components/ui/AnimatedButton"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useMedicaments } from "@/hooks/useMedicaments"
import { usePharmacies } from "@/hooks/usePharmacies"

export default function AccueilPage() {
  const { 
    stats, 
    isLoading: medicamentsLoading, 
    getMedicamentsByStatus
  } = useMedicaments()
  
  const { 
    pharmaciePlusProche, 
    isLoading: pharmaciesLoading, 
    appellerPharmacie, 
    ouvrirItineraire 
  } = usePharmacies()

  if (medicamentsLoading || pharmaciesLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner text="Chargement..." />
      </div>
    )
  }

  const medicamentsExpires = getMedicamentsByStatus('expired')
  const medicamentsBientotExpires = getMedicamentsByStatus('warning')
  const alertesTotal = medicamentsExpires.length + medicamentsBientotExpires.length

  return (
    <div className="space-y-6">
      
      {/* Vue d'ensemble simple */}
      <Card className="glass border-gray-200 glass-hover animate-fade-in-up">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-gray-800">
              {stats.totalMedicaments}
            </div>
            <div className="text-gray-600">
              {stats.totalMedicaments === 0 ? 'Aucun médicament' : 
               stats.totalMedicaments === 1 ? 'médicament dans votre armoire' :
               'médicaments dans votre armoire'}
            </div>
            
            {/* Alerte simple si nécessaire */}
            {alertesTotal > 0 && (
              <div className="mt-4 p-3 bg-orange-50/50 border border-orange-200 rounded-lg">
                <div className="text-orange-800 font-medium text-sm">
                  ⚠️ {alertesTotal} médicament{alertesTotal > 1 ? 's' : ''} à vérifier
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions principales */}
      <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' } as any}>
        <AnimatedButton 
          className="h-20 flex-col glass border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
          variant="outline"
          icon={
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            </svg>
          }
        >
          Scanner
        </AnimatedButton>
        
        <AnimatedButton 
          className="h-20 flex-col glass border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          variant="outline"
          icon={
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          }
        >
          Ajouter
        </AnimatedButton>
      </div>

      {/* Pharmacie proche - avec horaires */}
      {pharmaciePlusProche && (
        <Card className="glass border-blue-200 glass-hover animate-fade-in-up" style={{ animationDelay: '200ms' } as any}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">
                  {pharmaciePlusProche.nom}
                </div>
                <div className="text-gray-600 text-xs">
                  {pharmaciePlusProche.distance} • {pharmaciePlusProche.ouvert ? '🟢 Ouvert' : '🔴 Fermé'}
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white/50 p-3 rounded-lg border border-gray-200 mb-4">
              <div className="text-xs font-medium text-gray-700 mb-1">Horaires aujourd'hui</div>
              <div className="text-xs text-gray-600">
                {pharmaciePlusProche.horaires.matin} • {pharmaciePlusProche.horaires.apresmidi}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <AnimatedButton 
                size="sm"
                className="text-blue-700 hover:bg-blue-50 bg-transparent border-blue-300"
                variant="outline"
                onClick={() => appellerPharmacie(pharmaciePlusProche.telephone)}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
                  </svg>
                }
              >
                Appeler
              </AnimatedButton>
              <AnimatedButton 
                size="sm"
                className="text-green-700 hover:bg-green-50 bg-transparent border-green-300"
                variant="outline"
                onClick={() => ouvrirItineraire(pharmaciePlusProche.coordonnees, pharmaciePlusProche.nom)}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 .553-.894L9 2l6 3 5.447-2.724A1 1 0 0 1 21 3.382v10.764a1 1 0 0 1-.553.894L15 18l-6-3Z" />
                  </svg>
                }
              >
                Y aller
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}