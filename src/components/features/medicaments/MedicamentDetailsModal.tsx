'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Badge } from '@/components/ui/base/badge'
import { Medicament } from '@/types/medicament'
import { formatDateFrench } from '@/lib/formatting'
import { getExpiryStatus } from '@/lib/utils'

interface MedicamentDetailsModalProps {
 isOpen: boolean
 onClose: () => void
 medicament: Medicament | null
}

export default function MedicamentDetailsModal({ 
 isOpen, 
 onClose, 
 medicament 
}: MedicamentDetailsModalProps) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
   setMounted(true)
   return () => setMounted(false)
 }, [])

 if (!mounted || !isOpen || !medicament) return null

 // DONNÉES HARD-CODÉES DOLIPRANE (peu importe le médicament cliqué)
 const dolipraneMock = {
   nom: 'Doliprane 1000mg',
   marque: 'Sanofi',
   categorie: 'Antidouleurs',
   datePeremption: new Date('2024-08-15'),
   quantite: 2,
   photo: 'https://www.pharma-gdd.com/images/catalog/pictures/thumbnails/doliprane-1000-mg-comprimes-pellicules-plaquettes-thermoformees-pvc-pvdc-aluminium-de-8-comprimes-boite-de-1-face.png',
   description: 'Médicament à base de paracétamol indiqué dans le traitement symptomatique des douleurs d\'intensité légère à modérée et/ou des états fébriles.',
   posologie: '1 comprimé toutes les 6 heures maximum, sans dépasser 4 comprimés par jour',
   instructionsUsage: 'À prendre avec un verre d\'eau, de préférence entre les repas',
   contreIndications: [
     'Allergie au paracétamol',
     'Insuffisance hépatique grave',
     'Enfants de moins de 27 kg'
   ],
   pictogrammes: ['alcool', 'enfants'] as const,
   numeroLot: 'LOT240815'
 }

 // Utiliser les données hard-codées au lieu du médicament passé
 const displayedMedicament = dolipraneMock
 const status = getExpiryStatus(displayedMedicament.datePeremption)

 const pictogrammeIcons = {
   grossesse: '🤰',
   alcool: '🍷',
   conduite: '🚗',
   soleil: '☀️',
   enfants: '🧒',
   cardiaque: '❤️'
 }

 const pictogrammeLabels = {
   grossesse: 'Grossesse/Allaitement',
   alcool: 'Éviter l\'alcool',
   conduite: 'Prudence au volant',
   soleil: 'Éviter le soleil',
   enfants: 'Tenir hors de portée',
   cardiaque: 'Attention cœur'
 }

 const statusConfig = {
   valid: { color: 'bg-green-100 text-green-700 border-green-300', label: 'Valide' },
   warning: { color: 'bg-orange-100 text-orange-700 border-orange-300', label: 'Bientôt périmé' },
   expired: { color: 'bg-red-100 text-red-700 border-red-300', label: 'Périmé' }
 }

 const modalContent = (
   <div 
     className="fixed inset-0 z-[9999] m-0 p-0"
     style={{ 
       position: 'fixed',
       top: 0,
       left: 0,
       right: 0, 
       bottom: 0,
       backdropFilter: 'blur(12px)',
       backgroundColor: 'rgba(0, 0, 0, 0.4)'
     }}
   >
     <div className="flex items-center justify-center min-h-screen p-4">
       <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl w-full max-w-md animate-fade-in-up shadow-2xl max-h-[90vh] overflow-y-auto">
         
         {/* Header avec photo */}
         <div className="relative">
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
           >
             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>

           {/* Photo du médicament */}
           <div className="p-6 pb-4">
             <div className="w-32 h-32 mx-auto bg-gray-100 rounded-2xl overflow-hidden mb-4">
               {displayedMedicament.photo ? (
                 <img 
                   src={displayedMedicament.photo} 
                   alt={displayedMedicament.nom}
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     // Fallback si l'image ne charge pas
                     e.currentTarget.style.display = 'none'
                     const fallback = e.currentTarget.nextElementSibling as HTMLElement
                     if (fallback) fallback.style.display = 'flex'
                   }}
                 />
               ) : null}
               <div className="w-full h-full bg-blue-50 flex items-center justify-center" style={{ display: displayedMedicament.photo ? 'none' : 'flex' }}>
                 <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                 </svg>
               </div>
             </div>

             {/* Nom et marque */}
             <div className="text-center mb-4">
               <h2 className="text-xl font-bold text-gray-900 mb-1">
                 {displayedMedicament.nom}
               </h2>
               {displayedMedicament.marque && (
                 <p className="text-gray-600 text-sm">{displayedMedicament.marque}</p>
               )}
             </div>

             {/* Badges statut et catégorie */}
             <div className="flex gap-2 justify-center mb-4">
               <Badge className={`${statusConfig[status].color} border`}>
                 {statusConfig[status].label}
               </Badge>
               <Badge variant="secondary">
                 {displayedMedicament.categorie}
               </Badge>
             </div>
           </div>
         </div>

         {/* Contenu principal */}
         <div className="px-6 pb-6 space-y-4">
           
           {/* Informations essentielles */}
           <div className="bg-gray-50 text-black rounded-lg p-4 space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-gray-600">Expire le</span>
               <span className="font-medium">{formatDateFrench(displayedMedicament.datePeremption)}</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-gray-600">Quantité</span>
               <span className="font-medium">{displayedMedicament.quantite}</span>
             </div>
           </div>

           {/* Description */}
           {displayedMedicament.description && (
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
               <p className="text-gray-700 text-sm leading-relaxed">
                 {displayedMedicament.description}
               </p>
             </div>
           )}

           {/* Posologie */}
           {displayedMedicament.posologie && (
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">💊 Posologie</h3>
               <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                 {displayedMedicament.posologie}
               </p>
             </div>
           )}

           {/* Instructions d'usage */}
           {displayedMedicament.instructionsUsage && (
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">📋 Mode d'emploi</h3>
               <p className="text-gray-700 text-sm">
                 {displayedMedicament.instructionsUsage}
               </p>
             </div>
           )}

           {/* Pictogrammes */}
           {displayedMedicament.pictogrammes && displayedMedicament.pictogrammes.length > 0 && (
             <div>
               <h3 className="font-semibold text-gray-900 mb-3">⚠️ Précautions</h3>
               <div className="grid grid-cols-2 gap-2">
                 {displayedMedicament.pictogrammes.map((picto) => (
                   <div key={picto} className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
                     <span className="text-lg">{pictogrammeIcons[picto]}</span>
                     <span className="text-xs text-orange-700 font-medium">
                       {pictogrammeLabels[picto]}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Contre-indications */}
           {displayedMedicament.contreIndications && displayedMedicament.contreIndications.length > 0 && (
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">🚫 Contre-indications</h3>
               <div className="space-y-1">
                 {displayedMedicament.contreIndications.map((ci, index) => (
                   <div key={index} className="flex items-start gap-2 text-sm">
                     <span className="text-red-500 mt-0.5">•</span>
                     <span className="text-gray-700">{ci}</span>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Message pharmacien */}
           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
             <div className="text-blue-800 font-medium text-sm mb-2">
               👨‍⚕️ Conseil professionnel
             </div>
             <p className="text-blue-700 text-xs leading-relaxed">
               Pour toute question sur ce médicament, consultez votre pharmacien ou votre médecin.
             </p>
           </div>

         </div>
       </div>
     </div>
   </div>
 )

 return createPortal(modalContent, document.body)
}