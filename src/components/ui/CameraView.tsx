'use client'

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>
  onClose: () => void
  error?: string | null
}

export default function CameraView({ videoRef, onClose, error }: CameraViewProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 m-0 p-0">
      
      {/* Header avec bouton fermer - position absolue depuis le vrai top */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          <span className="text-white text-sm font-medium">
            Caméra active
          </span>
        </div>
      </div>

      {/* Vidéo en plein écran - reset complet */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* Overlay avec cadre de scan - vraiment centré */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-64 h-64 border-4 border-white/50 rounded-3xl relative">
          {/* Coins décoratifs */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-blue-400 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-blue-400 rounded-br-lg" />
        </div>
      </div>

      {/* Instructions - depuis le vrai bottom */}
      <div className="absolute bottom-8 left-4 right-4 text-center z-20">
        <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
          Pointez vers un QR code
        </p>
      </div>

      {/* Erreur si problème - vraiment centré */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 m-0 p-4">
          <div className="bg-red-500 text-white p-4 rounded-lg mx-4 text-center max-w-sm">
            <div className="font-semibold mb-2">Erreur caméra</div>
            <div className="text-sm mb-3">{error}</div>
            <button 
              onClick={onClose}
              className="bg-white text-red-500 px-4 py-2 rounded-lg font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  )
}