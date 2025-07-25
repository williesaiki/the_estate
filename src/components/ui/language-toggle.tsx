"use client"

import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
  language: 'pl' | 'en'
  onToggle: () => void
  toggleColors?: {
    text: string
    border: string
  }
}

export function LanguageToggle({ className, language, onToggle, toggleColors }: LanguageToggleProps) {
  const isPolish = language === 'pl'
  const colors = toggleColors || { text: 'text-white', border: 'border-white/20' }
  
  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        `bg-transparent ${colors.border} backdrop-blur-sm`,
        className
      )}
      onClick={onToggle}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 text-xs font-bold",
            isPolish 
              ? `transform translate-x-0 bg-primary/20 backdrop-blur-sm ${colors.text === 'text-white' ? 'text-white' : 'text-primary'}` 
              : `transform translate-x-8 bg-primary/20 backdrop-blur-sm ${colors.text === 'text-white' ? 'text-white' : 'text-primary'}`
          )}
        >
          {isPolish ? "PL" : "EN"}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 text-xs font-medium",
            isPolish 
              ? `bg-transparent ${colors.text === 'text-white' ? 'text-white/70' : 'text-muted-foreground'}` 
              : `transform -translate-x-8 ${colors.text === 'text-white' ? 'text-white/70' : 'text-muted-foreground'}`
          )}
        >
          {isPolish ? "EN" : "PL"}
        </div>
      </div>
    </div>
  )
}