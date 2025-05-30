'use client'

import { Card, CardContent, Button } from '@/components/ui'
import { formatHoraires } from '@/lib/pharmacy'

interface HorairesJour {
  type: 'continu' | 'coupure' | 'ferme'
  ouverture?: string
  fermeture?: string
  matin?: string
  apresmidi?: string
}

interface Pharmacie {
  id: string
  nom: string
  adresse: string
  distance: string
  tempsTrajet: string
  telephone: string
  horairesAujourdhui: HorairesJour
  ouvert: boolean
  coordonnees: { lat: number; lng: number }
}

interface NearbyPharmacyProps {
  pharmacie: Pharmacie
  onCall: (telephone: string) => void
  onNavigate: (coordonnees: { lat: number; lng: number }, nom: string) => void
  className?: string
}

export default function NearbyPharmacy({ 
  pharmacie, 
  onCall, 
  onNavigate, 
  className 
}: any) {
  return (
    <Card className={`glass border-blue-200 glass-hover animate-fade-in-up ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800 text-sm">
              {pharmacie.nom}
            </div>
            <div className="text-gray-600 text-xs">
              {pharmacie.distance} • {pharmacie.ouvert ? '🟢 Ouvert' : '🔴 Fermé'}
            </div>
          </div>
        </div>

        {/* Horaires flexibles */}
        <div className="bg-white/50 p-3 rounded-lg border border-gray-200 mb-4">
          <div className="text-xs font-medium text-gray-700 mb-1">Horaires aujourd&apos;hui</div>
          <div className="text-xs text-gray-600">
            {formatHoraires(pharmacie.horairesAujourdhui)}
          </div>
          
          {/* Badge spécial pour 24h/24 */}
          {pharmacie.horairesAujourdhui.type === 'continu' && 
           pharmacie.horairesAujourdhui.ouverture === '00h00' && 
           pharmacie.horairesAujourdhui.fermeture === '23h59' && (
            <div className="mt-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                ⏰ Ouvert 24h/24
              </span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="sm"
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:border-green-300 transition-all duration-200"
            onClick={() => onCall(pharmacie.telephone)}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
              </svg>
            }
          >
            Appeler
          </Button>
          <Button 
            size="sm"
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300 transition-all duration-200"
            onClick={() => onNavigate(pharmacie.coordonnees, pharmacie.nom)}
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 .553-.894L9 2l6 3 5.447-2.724A1 1 0 0 1 21 3.382v10.764a1 1 0 0 1-.553.894L15 18l-6-3Z" />
              </svg>
            }
          >
            Y aller
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}