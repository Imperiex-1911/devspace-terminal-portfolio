'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Theme, initializeTheme, applyTheme, storeTheme } from '@/utils/theme'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Initialize theme on mount
    const initialTheme = initializeTheme()
    setThemeState(initialTheme)
    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    storeTheme(newTheme)
  }

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['dark', 'light', 'matrix']
    const currentIndex = themeOrder.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    const nextTheme = themeOrder[nextIndex]
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-terminal-bg">{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="min-h-screen bg-terminal-bg" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

