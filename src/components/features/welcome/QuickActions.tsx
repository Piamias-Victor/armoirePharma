'use client'

import { ActionButton } from "@/components/ui"

interface QuickActionsProps {
  className?: string
}

export default function QuickActions({ className }: QuickActionsProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 animate-fade-in-up ${className}`}>
      <ActionButton action="scanner" />
      <ActionButton action="manual" />
    </div>
  )
}