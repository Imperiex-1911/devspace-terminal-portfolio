export type Theme = 'dark' | 'light' | 'matrix'

export interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    error: string
    warning: string
    success: string
    info: string
  }
  fonts: {
    primary: string
    secondary: string
    mono: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export const themes: Record<Theme, ThemeConfig> = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '#00ff41',
      secondary: '#0080ff',
      accent: '#ff0080',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      border: '#333333',
      error: '#ff0040',
      warning: '#ffaa00',
      success: '#00ff41',
      info: '#0080ff'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
    }
  },
  light: {
    name: 'Light',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#dc2626',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      error: '#dc2626',
      warning: '#f59e0b',
      success: '#059669',
      info: '#2563eb'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.05)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.05)'
    }
  },
  matrix: {
    name: 'Matrix',
    colors: {
      primary: '#00ff41',
      secondary: '#00ff80',
      accent: '#ff0040',
      background: '#000000',
      surface: '#001100',
      text: '#00ff41',
      textSecondary: '#00aa00',
      border: '#003300',
      error: '#ff0040',
      warning: '#ffff00',
      success: '#00ff41',
      info: '#00ffff'
    },
    fonts: {
      primary: 'Courier New, monospace',
      secondary: 'Courier New, monospace',
      mono: 'Courier New, monospace'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 0 5px rgba(0, 255, 65, 0.3)',
      md: '0 0 10px rgba(0, 255, 65, 0.3)',
      lg: '0 0 15px rgba(0, 255, 65, 0.3)',
      xl: '0 0 20px rgba(0, 255, 65, 0.3)'
    }
  }
}

export const getTheme = (theme: Theme): ThemeConfig => {
  return themes[theme]
}

export const getThemeColors = (theme: Theme) => {
  return themes[theme].colors
}

export const getThemeFonts = (theme: Theme) => {
  return themes[theme].fonts
}

export const applyTheme = (theme: Theme) => {
  const themeConfig = getTheme(theme)
  const root = document.documentElement

  // Apply CSS custom properties
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })

  Object.entries(themeConfig.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value)
  })

  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value)
  })

  Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })

  Object.entries(themeConfig.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })

  // Set theme attribute
  root.setAttribute('data-theme', theme)
}

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  
  const stored = localStorage.getItem('theme') as Theme
  return stored && themes[stored] ? stored : 'dark'
}

export const storeTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('theme', theme)
}

export const initializeTheme = () => {
  const theme = getStoredTheme()
  applyTheme(theme)
  return theme
}

export const toggleTheme = (currentTheme: Theme): Theme => {
  const themeOrder: Theme[] = ['dark', 'light', 'matrix']
  const currentIndex = themeOrder.indexOf(currentTheme)
  const nextIndex = (currentIndex + 1) % themeOrder.length
  const nextTheme = themeOrder[nextIndex] || 'dark'
  
  applyTheme(nextTheme)
  storeTheme(nextTheme)
  
  return nextTheme
}

export const getThemeIcon = (theme: Theme): string => {
  const icons: Record<Theme, string> = {
    dark: '🌙',
    light: '☀️',
    matrix: '💚'
  }
  return icons[theme]
}

export const getThemeDescription = (theme: Theme): string => {
  const descriptions: Record<Theme, string> = {
    dark: 'Classic dark theme with neon accents',
    light: 'Clean light theme with modern colors',
    matrix: 'Matrix-style green terminal theme'
  }
  return descriptions[theme]
}

// CSS-in-JS theme provider
export const createThemeProvider = (theme: Theme) => {
  const themeConfig = getTheme(theme)
  
  return {
    theme: themeConfig,
    colors: themeConfig.colors,
    fonts: themeConfig.fonts,
    spacing: themeConfig.spacing,
    borderRadius: themeConfig.borderRadius,
    shadows: themeConfig.shadows
  }
}

// Theme validation
export const isValidTheme = (theme: string): theme is Theme => {
  return theme in themes
}

// Theme utilities
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  return brightness > 128 ? '#000000' : '#ffffff'
}

export const getThemeVariant = (theme: Theme, variant: 'primary' | 'secondary' | 'accent') => {
  return themes[theme].colors[variant]
}

export const createColorPalette = (baseColor: string) => {
  // Generate a color palette from a base color
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  return {
    50: `rgb(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)})`,
    100: `rgb(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)})`,
    200: `rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)})`,
    300: `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`,
    400: `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`,
    500: baseColor,
    600: `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`,
    700: `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`,
    800: `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`,
    900: `rgb(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)})`
  }
}

