import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedButton from "@/components/ui/AnimatedButton"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const simulateScan = () => {
    setIsScanning(true)
    setScanResult(null)
    
    // Simulation de scan (2 secondes)
    setTimeout(() => {
      setIsScanning(false)
      // Résultats aléatoires pour simulation
      const mockResults = [
        'Doliprane 500mg',
        'Aspégic 100mg', 
        'Cetirizine 10mg',
        'Ventoline',
        'Smecta'
      ]
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setScanResult(randomResult)
    }, 2000)
  }

  const resetScan = () => {
    setScanResult(null)
    setIsScanning(false)
  }

  return (
    <div className="space-y-6">
      
      {/* Zone de scan principale */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-8 text-center">
          
          {/* États différents selon le scan */}
          {!isScanning && !scanResult && (
            <>
              {/* État initial */}
              <div className="w-24 h-24 mx-auto mb-6 border-4 border-dashed border-blue-300 rounded-2xl flex items-center justify-center bg-blue-50">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75V16.5ZM16.5 6.75h.75v.75H16.5v-.75ZM13.5 13.5h4.5v4.5h-4.5V13.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Scanner un code-barres
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Pointez vers le code-barres du médicament
              </p>
              <AnimatedButton 
                onClick={simulateScan}
                className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                }
              >
                Démarrer le scan
              </AnimatedButton>
            </>
          )}

          {/* État scanning */}
          {isScanning && (
            <>
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Scan en cours...
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Analysing du code-barres
              </p>
              <LoadingSpinner size="md" text="" />
            </>
          )}

          {/* État résultat */}
          {scanResult && (
            <>
              <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Médicament trouvé !
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Résultat du scan :
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="font-semibold text-gray-900 text-lg">
                  {scanResult}
                </div>
              </div>
              
              <div className="flex gap-3">
                <AnimatedButton 
                  onClick={resetScan}
                  className="flex-1 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  variant="outline"
                >
                  Scanner un autre
                </AnimatedButton>
                <AnimatedButton 
                  className="flex-1 bg-green-500 text-white border-green-500 hover:bg-green-600"
                >
                  Ajouter à l'armoire
                </AnimatedButton>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Ajout manuel */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            Pas de code-barres ?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Ajoutez le médicament manuellement
          </p>
          <AnimatedButton 
            className="w-full bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            variant="outline"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
          >
            Saisie manuelle
          </AnimatedButton>
        </CardContent>
      </Card>

      {/* Historique récent */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Récemment ajoutés
          </h3>
          <div className="space-y-3">
            {['Doliprane 1000mg', 'Vitamin D3'].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">{item}</span>
                <button className="text-blue-600 text-sm font-medium">
                  Ajouter de nouveau
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}