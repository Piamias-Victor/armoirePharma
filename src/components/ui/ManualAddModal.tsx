'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './button'
import Input from './input'


interface ManualAddModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (medicament: NewMedicament & { categorie: string }) => void
}

interface NewMedicament {
  nom: string
  datePeremption: string
  quantite: number
}

const CATEGORIES = [
  'Antidouleurs',
  'Premiers secours', 
  'Vitamines',
  'Allergies',
  'Antibiotiques',
  'Troubles digestifs',
  'Respiratoire',
  'Dermatologie'
]

export default function ManualAddModal({ isOpen, onClose, onAdd }: ManualAddModalProps) {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<NewMedicament>({
    nom: '',
    datePeremption: '',
    quantite: 1
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nom && formData.datePeremption) {
      // Catégorie automatique au hasard
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
      
      onAdd({
        ...formData,
        categorie: randomCategory
      })
      
      // Reset formulaire
      setFormData({
        nom: '',
        datePeremption: '',
        quantite: 1
      })
      onClose()
    }
  }

  const updateField = (field: keyof NewMedicament, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!mounted || !isOpen) return null

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
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl w-full max-w-sm animate-fade-in-up shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Ajouter un médicament
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Nom ou code du produit */}
            <Input
              label="Nom ou code du produit"
              type="text"
              value={formData.nom}
              onChange={(e) => updateField('nom', e.target.value)}
              placeholder="Ex: Doliprane 1000mg"
              variant="modal"
              required
            />

            {/* Date de péremption */}
            <Input
              label="Date de péremption"
              type="date"
              value={formData.datePeremption}
              onChange={(e) => updateField('datePeremption', e.target.value)}
              variant="modal"
              required
            />

            {/* Quantité */}
            <Input
              label="Quantité"
              type="number"
              min="1"
              value={formData.quantite.toString()}
              onChange={(e) => updateField('quantite', parseInt(e.target.value) || 1)}
              variant="modal"
            />

            {/* Info catégorie automatique */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-700 text-xs">
                ℹ️ La catégorie sera automatiquement déterminée
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                size="md"
                fullWidth
              >
                Annuler
              </Button>
              
              <Button
                type="submit"
                disabled={!formData.nom || !formData.datePeremption}
                variant="primary"
                size="md"
                fullWidth
              >
                Ajouter
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )

  // Portal vers document.body
  return createPortal(modalContent, document.body)
}