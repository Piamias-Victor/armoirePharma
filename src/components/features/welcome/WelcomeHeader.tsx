'use client'

import { Card, CardContent } from "@/components/ui"
import { StatsArmoire } from "@/types"


interface WelcomeHeaderProps {
  stats: StatsArmoire
  alertesTotal: number
  className?: string
}

export default function WelcomeHeader({ stats, alertesTotal, className }: WelcomeHeaderProps) {
  return (
    <Card className={`glass border-gray-200 glass-hover animate-fade-in-up ${className}`}>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          
          {stats.totalMedicaments === 0 ? (
            // État vide élégant
            <>
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Bienvenue ! 👋
              </h2>
              <p className="text-gray-600 text-sm">
                Votre armoire à pharmacie est vide.<br/>
                Commencez par ajouter vos premiers médicaments.
              </p>
            </>
          ) : (
            // État avec médicaments
            <>
              <div className="text-3xl font-bold text-gray-800">
                {stats.totalMedicaments}
              </div>
              <div className="text-gray-600">
                {stats.totalMedicaments === 1 ? 'médicament dans votre armoire' :
                 'médicaments dans votre armoire'}
              </div>
              
              {/* Alerte simple si nécessaire */}
              {alertesTotal > 0 && (
                <div className="mt-4 p-3 bg-orange-50/50 border border-orange-200 rounded-lg">
                  <div className="text-orange-800 font-medium text-sm">
                    ⚠️ {alertesTotal} médicament{alertesTotal > 1 ? 's' : ''} à vérifier
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}