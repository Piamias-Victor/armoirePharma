'use client'

interface SuccessNotificationProps {
  isVisible: boolean
  medicamentName: string
  onClose?: () => void
  className?: string
}

export default function SuccessNotification({ 
  isVisible, 
  medicamentName, 
  onClose, 
  className 
}: SuccessNotificationProps) {
  
  if (!isVisible) return null

  return (
    <div className={`glass border-green-300 bg-green-50/80 p-4 rounded-xl animate-fade-in-up ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-green-800 text-sm">
            Médicament ajouté !
          </div>
          <div className="text-green-700 text-xs">
            {medicamentName} a été ajouté à votre armoire
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-6 h-6 text-green-600 hover:text-green-800 transition-colors"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}