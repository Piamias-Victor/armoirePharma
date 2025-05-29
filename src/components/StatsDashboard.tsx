'use client'

import StatCard from './ui/StatCard'
import { StatsArmoire } from '@/types/medicament'

interface StatsDashboardProps {
  stats: StatsArmoire
  onStatClick?: (statType: string) => void
  className?: string
}

export default function StatsDashboard({ stats, onStatClick, className }: StatsDashboardProps) {
  const statCards = [
    {
      key: 'total',
      title: 'Total médicaments',
      value: stats.totalMedicaments,
      subtitle: `${stats.categoriesCount} catégorie${stats.categoriesCount > 1 ? 's' : ''}`,
      color: 'blue' as const,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      key: 'valid',
      title: 'Médicaments valides',
      value: stats.medicamentsValides,
      subtitle: 'En bon état',
      color: 'green' as const,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: 'warning',
      title: 'Bientôt périmés',
      value: stats.medicamentsBientotExpires,
      subtitle: 'À vérifier',
      color: 'orange' as const,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      )
    },
    {
      key: 'expired',
      title: 'Périmés',
      value: stats.medicamentsExpires,
      subtitle: 'À remplacer',
      color: 'red' as const,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    }
  ]

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {statCards.map((stat, index) => (
        <StatCard
          key={stat.key}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          color={stat.color}
          icon={stat.icon}
          onClick={() => onStatClick?.(stat.key)}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` } as any}
        />
      ))}
    </div>
  )
}