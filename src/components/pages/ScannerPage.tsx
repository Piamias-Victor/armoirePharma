import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import ActionButton from "@/components/ui/ActionButton"
import Button from "@/components/ui/button"
import { useCamera } from "@/hooks/useCamera"
import { useMedicaments } from "@/hooks/useMedicaments"
import CameraPortal from "@/components/ui/CameraPortal"
import ManualAddModal from "@/components/ui/ManualAddModal"

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

      {/* Message de succès */}
      {showSuccess && (
        <div className="glass border-green-300 bg-green-50/80 p-4 rounded-xl animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-green-800 text-sm">
                Médicament ajouté !
              </div>
              <div className="text-green-700 text-xs">
                {lastAdded} a été ajouté à votre armoire
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Carte principale scanner */}
      <Card className="glass border-gray-200">
        <CardContent className="p-8 text-center">
          
          {/* Icône scanner */}
          <div className="w-24 h-24 mx-auto mb-6 border-4 border-dashed border-blue-300 rounded-2xl flex items-center justify-center bg-blue-50/50">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            </svg>
          </div>
          
          {/* Titre */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Scanner un QR code
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-6">
            Scannez le code QR de votre médicament
          </p>
          
          {/* BOUTON UNIFIÉ */}
          <ActionButton action="scanner" />
          
        </CardContent>
      </Card>

      {/* Carte ajout manuel */}
      <Card className="glass border-gray-200">
        <CardContent className="p-6">
          
          <h3 className="font-semibold text-gray-900 mb-2">
            Pas de QR code ?
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            Ajoutez le médicament manuellement
          </p>
          
          {/* BOUTON UNIFIÉ */}
          <ActionButton action="manual" fullWidth />
          
        </CardContent>
      </Card>

    </div>
  )
}