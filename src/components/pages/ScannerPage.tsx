import { useCamera, useMedicaments } from "@/hooks"
import { useState } from "react"
import { CameraPortal, ManualAddModal, SuccessNotification, ScannerInterface, ManualAddInterface } from "../features"
interface NewMedicament {
  nom: string
  datePeremption: string
  quantite: number
}

export default function ScannerPage() {
  const { isOpen, error, videoRef, startCamera, stopCamera } = useCamera()
  const { addMedicament } = useMedicaments()
  const [showManualModal, setShowManualModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastAdded, setLastAdded] = useState<string>('')

  const handleManualAdd = (medicament: NewMedicament & { categorie: string }) => {
    // Ajouter à l'armoire via le hook
    addMedicament({
      nom: medicament.nom,
      categorie: medicament.categorie,
      datePeremption: medicament.datePeremption,
      quantite: medicament.quantite
    })
    
    // Feedback utilisateur
    setLastAdded(medicament.nom)
    setShowSuccess(true)
    
    // Cacher le message après 3 secondes
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      
      {/* Portal pour caméra - rendu hors de AppLayout */}
      {isOpen && (
        <CameraPortal
          videoRef={videoRef}
          onClose={stopCamera}
          error={error}
        />
      )}

      {/* Modal saisie manuelle */}
      <ManualAddModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
        onAdd={handleManualAdd}
      />

      {/* Notification de succès */}
      <SuccessNotification
        isVisible={showSuccess}
        medicamentName={lastAdded}
        onClose={() => setShowSuccess(false)}
      />
      
      {/* Interface scanner */}
      <ScannerInterface />

      {/* Interface ajout manuel */}
      <ManualAddInterface />

    </div>
  )
}