import { useMedicaments, usePharmacies } from "@/hooks"
import { WelcomeHeader, QuickActions, NearbyPharmacy } from "../features"
import { LoadingSpinner } from "../ui"


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
      
      {/* En-tête de bienvenue */}
      <WelcomeHeader 
        stats={stats}
        alertesTotal={alertesTotal}
      />

      {/* Actions principales */}
      <QuickActions />

      {/* Pharmacie proche */}
      {pharmaciePlusProche && (
        <NearbyPharmacy
          pharmacie={pharmaciePlusProche}
          onCall={appellerPharmacie}
          onNavigate={ouvrirItineraire}
        />
      )}

    </div>
  )
}