"use client"

import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
  language: 'pl' | 'en'
  onToggle: () => void
}

export function LanguageToggle({ className, language, onToggle }: LanguageToggleProps) {
  const isPolish = language === 'pl'
  
  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        "bg-transparent border border-white/20 backdrop-blur-sm",
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
              ? "transform translate-x-0 bg-white/10 backdrop-blur-sm text-white" 
              : "transform translate-x-8 bg-white/20 backdrop-blur-sm text-white"
          )}
        >
          {isPolish ? "PL" : "EN"}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 text-xs font-medium",
            isPolish 
              ? "bg-transparent text-white/60" 
              : "transform -translate-x-8 text-white/60"
          )}
        >
          {isPolish ? "EN" : "PL"}
        </div>
      </div>
    </div>
  )
}