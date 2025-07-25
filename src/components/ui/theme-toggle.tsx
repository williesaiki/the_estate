"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  isDark: boolean
  onToggle: () => void
  toggleColors?: {
    text: string
    border: string
  }
}

export function ThemeToggle({ className, isDark, onToggle, toggleColors }: ThemeToggleProps) {
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
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-white/10 backdrop-blur-sm" 
              : "transform translate-x-8 bg-white/20 backdrop-blur-sm"
          )}
        >
          {isDark ? (
            <Moon 
              className={`w-4 h-4 ${colors.text === 'text-white' ? 'text-white' : 'text-foreground'}`}
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className={`w-4 h-4 ${colors.text === 'text-white' ? 'text-white' : 'text-foreground'}`}
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun 
              className={`w-4 h-4 ${colors.text === 'text-white' ? 'text-white/70' : 'text-muted-foreground'}`}
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className={`w-4 h-4 ${colors.text === 'text-white' ? 'text-white/70' : 'text-muted-foreground'}`}
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}