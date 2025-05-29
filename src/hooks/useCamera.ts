'use client'

import { useRef, useState, useCallback } from 'react'

export function useCamera() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      
      // Demander permission et stream caméra
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Caméra arrière sur mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      })

      // Connecter le stream à la vidéo
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      streamRef.current = stream
      setHasPermission(true)
      setIsOpen(true)
      
    } catch (err) {
      console.error('Erreur caméra:', err)
      setHasPermission(false)
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Permission caméra refusée')
        } else if (err.name === 'NotFoundError') {
          setError('Aucune caméra trouvée')
        } else {
          setError('Erreur d\'accès à la caméra')
        }
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    // Arrêter tous les tracks du stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      streamRef.current = null
    }

    // Nettoyer la vidéo
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsOpen(false)
    setError(null)
  }, [])

  return {
    isOpen,
    hasPermission,
    error,
    videoRef,
    startCamera,
    stopCamera
  }
}