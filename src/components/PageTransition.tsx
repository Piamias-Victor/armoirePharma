'use client'

import { useEffect, useState } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
  isActive: boolean
  direction?: 'left' | 'right' | 'fade'
}

export default function PageTransition({ 
  children, 
  isActive, 
  direction = 'fade' 
}: PageTransitionProps) {
  const [shouldRender, setShouldRender] = useState(isActive)
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    if (isActive) {
      setShouldRender(true)
      // Animation d'entrée avec délai pour transition fluide
      setTimeout(() => {
        switch (direction) {
          case 'left':
            setAnimationClass('animate-slide-in-left')
            break
          case 'right':
            setAnimationClass('animate-slide-in-right')
            break
          default:
            setAnimationClass('animate-fade-in-up')
        }
      }, 50)
    } else {
      // Animation de sortie
      setAnimationClass('animate-fade-out')
      setTimeout(() => setShouldRender(false), 200)
    }
  }, [isActive, direction])

  if (!shouldRender) return null

  return (
    <div className={`transition-all duration-300 ease-out ${animationClass}`}>
      {children}
    </div>
  )
}