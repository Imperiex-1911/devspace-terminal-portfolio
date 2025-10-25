'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ThemeSwitcherProps {
  className?: string
}

type Theme = 'dark' | 'light' | 'matrix'

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: 'dark', name: 'Dark', icon: '🌙', description: 'Classic dark theme' },
    { id: 'light', name: 'Light', icon: '☀️', description: 'Clean light theme' },
    { id: 'matrix', name: 'Matrix', icon: '💚', description: 'Matrix-style green' }
  ]

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  const currentTheme = themes.find(t => t.id === theme)

  return (
    <div className={`theme-switcher ${className}`}>
      <motion.button
        className="theme-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <span className="theme-icon">{currentTheme?.icon}</span>
        <span className="theme-name">{currentTheme?.name}</span>
        <motion.span
          className="theme-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <motion.div
        className="theme-dropdown"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          scale: isOpen ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {themes.map((themeOption) => (
          <motion.button
            key={themeOption.id}
            className={`theme-option ${theme === themeOption.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(themeOption.id as Theme)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="option-icon">{themeOption.icon}</span>
            <div className="option-content">
              <span className="option-name">{themeOption.name}</span>
              <span className="option-description">{themeOption.description}</span>
            </div>
            {theme === themeOption.id && (
              <motion.span
                className="option-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="theme-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

