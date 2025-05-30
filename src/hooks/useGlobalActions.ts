'use client'

export function useGlobalActions() {
  
  // Action pour ouvrir directement la caméra
  const openScanner = () => {
    // Déclencher l'événement global pour ouvrir la caméra
    window.dispatchEvent(new CustomEvent('openCamera'))
  }

  // Action pour ouvrir directement le modal d'ajout
  const openManualAdd = () => {
    // Déclencher l'événement global pour ouvrir le modal
    window.dispatchEvent(new CustomEvent('openManualAddModal'))
  }

  return {
    openScanner,
    openManualAdd
  }
}