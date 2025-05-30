'use client'

import { useRef, useCallback } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  const minSwipeDistance = 50 // Distance minimum pour déclencher un swipe
  const maxVerticalMovement = 100 // Maximum de mouvement vertical autorisé

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchStartX.current - touchEndX.current
    const deltaY = Math.abs(touchStartY.current - touchEndY.current)
    
    // Vérifier que le mouvement vertical n'est pas trop important (scroll vs swipe)
    if (deltaY > maxVerticalMovement) return

    // Swipe vers la gauche (suivant)
    if (deltaX > minSwipeDistance && onSwipeLeft) {
      onSwipeLeft()
    }
    
    // Swipe vers la droite (précédent)
    if (deltaX < -minSwipeDistance && onSwipeRight) {
      onSwipeRight()
    }
  }, [onSwipeLeft, onSwipeRight])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}