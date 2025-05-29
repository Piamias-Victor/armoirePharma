import { Card, CardContent } from "@/components/ui/card"
import { useCamera } from "@/hooks/useCamera"
import CameraPortal from "@/components/ui/CameraPortal"

export default function ScannerPage() {
  const { isOpen, error, videoRef, startCamera, stopCamera } = useCamera()

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
          
          {/* Bouton principal */}
          <button 
            onClick={startCamera}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            </svg>
            Ouvrir la caméra
          </button>
          
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
          
          <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-xl border-2 border-gray-300 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Saisie manuelle
          </button>
          
        </CardContent>
      </Card>

      {/* Historique récent */}
      <Card className="glass border-gray-200">
        <CardContent className="p-6">
          
          <h3 className="font-semibold text-gray-900 mb-4">
            Récemment ajoutés
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 text-sm">Doliprane 1000mg</span>
              <button className="text-blue-600 text-sm font-medium">
                Ajouter de nouveau
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 text-sm">Vitamin D3</span>
              <button className="text-blue-600 text-sm font-medium">
                Ajouter de nouveau
              </button>
            </div>
          </div>
          
        </CardContent>
      </Card>

    </div>
  )
}