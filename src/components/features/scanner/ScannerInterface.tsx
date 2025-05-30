'use client'

import { Card, CardContent, ActionButton } from "@/components/ui"

interface ScannerInterfaceProps {
  className?: string
}

export default function ScannerInterface({ className }: ScannerInterfaceProps) {
  return (
    <Card className={`glass border-gray-200 ${className}`}>
      <CardContent className="p-8 text-center">
        
        {/* Icône scanner */}
        <div className="w-24 h-24 mx-auto mb-6 border-4 border-dashed border-blue-300 rounded-2xl flex items-center justify-center bg-blue-50/50">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          </svg>
        </div>
        
        {/* Titre */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Scanner un QR code
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-6">
          Scannez le code QR de votre médicament
        </p>
        
        {/* Bouton unifié */}
        <ActionButton action="scanner" />
        
      </CardContent>
    </Card>
  )
}