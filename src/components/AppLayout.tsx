'use client'

import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import AccueilPage from './pages/AccueilPage'
import ArmoirePage from './pages/ArmoirePage'
import ScannerPage from './pages/ScannerPage'
import LoadingSpinner from './ui/LoadingSpinner'
import { useNavigation } from '@/hooks/useNavigation'
import { useSwipe } from '@/hooks/useSwipe'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { activeTab, isTransitioning, changeTab, goToNext, goToPrevious } = useNavigation()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Chargement initial simulé
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Configuration des gestes swipe
  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,     // Swipe gauche = page suivante
    onSwipeRight: goToPrevious  // Swipe droite = page précédente
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
          {/* Logo animé */}
          <div className="w-24 h-24 mx-auto glass rounded-3xl flex items-center justify-center animate-float">
            <span className="text-4xl">💊</span>
          </div>
          
          {/* Titre avec animation */}
          <div className="space-y-2 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-800">
              Mon Armoire à Pharmacie
            </h1>
            <p className="text-gray-600">
              Initialisation en cours...
            </p>
          </div>
          
          {/* Spinner */}
          <LoadingSpinner text="" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative animate-fade-in-up">
      {/* Contenu principal avec padding pour la navigation */}
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
                {['accueil', 'armoire', 'scanner'].map((tab) => (
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

      {/* Navigation fixe en bas */}
      <Navigation activeTab={activeTab} onTabChange={changeTab} />
    </div>
  )
}