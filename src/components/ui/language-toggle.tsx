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
        "bg-transparent border border-border/30 backdrop-blur-sm",
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
              ? "transform translate-x-0 bg-primary/20 backdrop-blur-sm text-primary" 
              : "transform translate-x-8 bg-primary/20 backdrop-blur-sm text-primary"
          )}
        >
          {isPolish ? "PL" : "EN"}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 text-xs font-medium",
            isPolish 
              ? "bg-transparent text-muted-foreground" 
              : "transform -translate-x-8 text-muted-foreground"
          )}
        >
          {isPolish ? "EN" : "PL"}
        </div>
      </div>
    </div>
  )
}