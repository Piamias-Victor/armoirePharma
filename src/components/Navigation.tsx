'use client'

import { useState } from 'react'

interface NavigationProps {
  activeTab: 'armoire' | 'accueil' | 'scanner'
  onTabChange: (tab: 'armoire' | 'accueil' | 'scanner') => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [pressedTab, setPressedTab] = useState<string | null>(null)

  const tabs = [
    { 
      id: 'armoire', 
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ), 
      label: 'Armoire' 
    },
    { 
      id: 'accueil', 
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
        </svg>
      ), 
      label: 'Accueil' 
    },
    { 
      id: 'scanner', 
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75V16.5ZM16.5 6.75h.75v.75H16.5v-.75ZM13.5 13.5h4.5v4.5h-4.5V13.5Z" />
        </svg>
      ), 
      label: 'Scanner' 
    },
  ] as const

  const handleTabPress = (tabId: 'armoire' | 'accueil' | 'scanner') => {
    setPressedTab(tabId)
    setTimeout(() => setPressedTab(null), 150)
    onTabChange(tabId)
  }

  return (
    <nav className="glass-intense border-t border-white/30 shadow-xl animate-fade-in-up">
      <div className="flex justify-around py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isPressed = pressedTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabPress(tab.id)}
              className={`
                flex flex-col items-center min-w-[50px] py-1.5 px-2 rounded-lg 
                transition-all duration-200 relative overflow-hidden
                ${isActive 
                  ? 'bg-blue-500/20 text-blue-600 shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100/30'
                }
                ${isPressed ? 'scale-90 bg-blue-500/30' : 'scale-100'}
              `}
            >
              {/* Effet de ripple pour feedback tactile */}
              {isPressed && (
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-ping" />
              )}
              
              {/* Indicateur de sélection */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full animate-fade-in-up" />
              )}
              
              {/* Contenu du tab */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-0.5">{tab.icon(isActive)}</div>
                <span className={`text-xs font-medium transition-all duration-200 ${
                  isActive ? 'font-semibold' : ''
                }`}>
                  {tab.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}