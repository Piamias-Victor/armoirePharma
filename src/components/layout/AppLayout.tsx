'use client'

import { useNavigation, useCamera, useMedicaments, useSwipe } from '@/hooks'
import { useState, useEffect } from 'react'
import { CameraPortal, ManualAddModal } from '../features'
import AccueilPage from '../pages/AccueilPage'
import ArmoirePage from '../pages/ArmoirePage'
import ScannerPage from '../pages/ScannerPage'
import { LoadingSpinner } from '../ui'
import Navigation from './Navigation'


interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { activeTab, isTransitioning, changeTab, goToNext, goToPrevious } = useNavigation()
  const { isOpen: cameraOpen, error, videoRef, stopCamera } = useCamera()
  const { addMedicament } = useMedicaments()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [showGlobalModal, setShowGlobalModal] = useState(false)

  // État global pour modal accessible partout
  useEffect(() => {
    // Écouter l'événement global pour ouvrir le modal
    const handleOpenModal = () => setShowGlobalModal(true)
    window.addEventListener('openManualAddModal', handleOpenModal)
    return () => window.removeEventListener('openManualAddModal', handleOpenModal)
  }, [])

  const handleManualAdd = (medicament: any) => {
    addMedicament(medicament)
    setShowGlobalModal(false)
    
    // Feedback
    alert(`${medicament.nom} ajouté à votre armoire !`)
  }

  // Chargement initial plus rapide
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Configuration des gestes swipe
  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious
  })

  const renderPage = () => {
    switch (activeTab) {
      case 'accueil':
        return <AccueilPage />
      case 'armoire':
        return <ArmoirePage />
      case 'scanner':
        return <ScannerPage />
      default:
        return <AccueilPage />
    }
  }

  // Écran de chargement initial
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto glass rounded-3xl flex items-center justify-center animate-float">
            <span className="text-4xl">💊</span>
          </div>
          
          <div className="space-y-2 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-800">
              Mon Armoire à Pharmacie
            </h1>
            <p className="text-gray-600">
              Prêt à démarrer...
            </p>
          </div>
          
          <LoadingSpinner text="" />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Portals globaux */}
      {cameraOpen && (
        <CameraPortal
          videoRef={videoRef}
          onClose={stopCamera}
          error={error}
        />
      )}

      <ManualAddModal
        isOpen={showGlobalModal}
        onClose={() => setShowGlobalModal(false)}
        onAdd={handleManualAdd}
      />

      {/* Contenu principal SANS navigation */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 animate-fade-in-up">
        <main 
          className="pb-24 pt-4 px-4 min-h-screen"
          {...swipeHandlers}
        >
          <div className="max-w-md mx-auto">
            {/* Header sobre et moderne */}
            <header className="mb-8 animate-fade-in-up">
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                  Armoire Pharmacie
                </h1>
                
                {/* Indicateurs de page minimalistes */}
                <div className="flex justify-center gap-2">
                  {['armoire', 'accueil', 'scanner'].map((tab) => (
                    <div
                      key={tab}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        activeTab === tab 
                          ? 'bg-blue-500 w-8' 
                          : 'bg-gray-300 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </header>

            {/* Contenu de la page avec transition */}
            <div className={`space-y-4 transition-all duration-200 ${
              isTransitioning ? 'opacity-60 scale-98 blur-sm' : 'opacity-100 scale-100 blur-0'
            }`}>
              {children || renderPage()}
            </div>
          </div>
        </main>
      </div>

      {/* Navigation SÉPARÉE au même niveau */}
      <Navigation activeTab={activeTab} onTabChange={changeTab} />
    </>
  )
}