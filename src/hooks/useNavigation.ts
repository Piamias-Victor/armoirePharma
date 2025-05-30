'use client'

import { useState, useCallback } from 'react'

export type TabType = 'armoire' | 'accueil' | 'scanner'

const tabs: TabType[] = ['armoire', 'accueil', 'scanner']

export function useNavigation() {
  const [activeTab, setActiveTab] = useState<TabType>('accueil') // Accueil reste par défaut
  const [isTransitioning, setIsTransitioning] = useState(false)

  const changeTab = useCallback((newTab: TabType) => {
    if (newTab === activeTab || isTransitioning) return
    
    setIsTransitioning(true)
    
    // Transition courte pour mobile
    setTimeout(() => {
      setActiveTab(newTab)
      setIsTransitioning(false)
    }, 150)
  }, [activeTab, isTransitioning])

  // Navigation swipe : aller au suivant
  const goToNext = useCallback(() => {
    const currentIndex = tabs.indexOf(activeTab)
    const nextIndex = (currentIndex + 1) % tabs.length
    changeTab(tabs[nextIndex])
  }, [activeTab, changeTab])

  // Navigation swipe : aller au précédent
  const goToPrevious = useCallback(() => {
    const currentIndex = tabs.indexOf(activeTab)
    const previousIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
    changeTab(tabs[previousIndex])
  }, [activeTab, changeTab])

  // Navigation programmatique vers onglets spécifiques
  const goToScanner = useCallback(() => {
    changeTab('scanner')
  }, [changeTab])

  const goToArmoire = useCallback(() => {
    changeTab('armoire')
  }, [changeTab])

  const goToAccueil = useCallback(() => {
    changeTab('accueil')
  }, [changeTab])

  return {
    activeTab,
    isTransitioning,
    changeTab,
    goToNext,
    goToPrevious,
    goToScanner,
    goToArmoire,
    goToAccueil
  }
}