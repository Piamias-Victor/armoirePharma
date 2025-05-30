'use client'

import { Card, CardContent, ActionButton } from "@/components/ui"

interface ManualAddInterfaceProps {
  className?: string
}

export default function ManualAddInterface({ className }: ManualAddInterfaceProps) {
  return (
    <Card className={`glass border-gray-200 ${className}`}>
      <CardContent className="p-6">
        
        <h3 className="font-semibold text-gray-900 mb-2">
          Pas de QR code ?
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          Ajoutez le médicament manuellement
        </p>
        
        {/* Bouton unifié */}
        <ActionButton action="manual" fullWidth />
        
      </CardContent>
    </Card>
  )
}