import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface HistoryItem {
  id: string
  type: 'command' | 'output' | 'error' | 'info'
  content: string
  timestamp: number
  metadata?: Record<string, any>
}

interface TerminalSettings {
  theme: 'dark' | 'light' | 'matrix' | 'cyber'
  fontSize: number
  fontFamily: 'mono' | 'terminal'
  showTimestamps: boolean
  autoComplete: boolean
  soundEnabled: boolean
  maxHistoryItems: number
  typingSpeed: number
  cursorBlinkSpeed: number
}

interface TerminalState {
  // History
  history: HistoryItem[]
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  removeHistoryItem: (id: string) => void
  
  // Current command
  currentCommand: string
  setCurrentCommand: (command: string) => void
  
  // Cursor
  cursorPosition: number
  setCursorPosition: (position: number) => void
  
  // Typing state
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
  
  // Terminal state
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  
  // Command history for navigation
  commandHistory: string[]
  historyIndex: number
  setHistoryIndex: (index: number) => void
  addToCommandHistory: (command: string) => void
  getPreviousCommand: () => string | null
  getNextCommand: () => string | null
  resetCommandHistory: () => void
  
  // Terminal settings
  settings: TerminalSettings
  updateSettings: (settings: Partial<TerminalSettings>) => void
  resetSettings: () => void
  
  // Performance metrics
  metrics: {
    commandsExecuted: number
    totalUptime: number
    lastActivity: number
  }
  updateMetrics: (metrics: Partial<TerminalState['metrics']>) => void
  
  // Error handling
  lastError: string | null
  setLastError: (error: string | null) => void
  
  // Utility methods
  exportHistory: () => string
  importHistory: (data: string) => void
  searchHistory: (query: string) => HistoryItem[]
}

const defaultSettings: TerminalSettings = {
  theme: 'dark',
  fontSize: 14,
  fontFamily: 'mono',
  showTimestamps: true,
  autoComplete: true,
  soundEnabled: false,
  maxHistoryItems: 1000,
  typingSpeed: 50,
  cursorBlinkSpeed: 500,
}

export const useTerminalStore = create<TerminalState>()(
  devtools(
    persist(
      (set, get) => ({
        // History
        history: [],
        addToHistory: (item) => {
          const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
          const timestamp = Date.now()
          const newItem: HistoryItem = { ...item, id, timestamp }
          
          set((state) => {
            const newHistory = [...state.history, newItem]
            const maxItems = state.settings.maxHistoryItems
            
            if (newHistory.length > maxItems) {
              return { 
                history: newHistory.slice(-maxItems),
                metrics: {
                  ...state.metrics,
                  lastActivity: timestamp
                }
              }
            }
            
            return { 
              history: newHistory,
              metrics: {
                ...state.metrics,
                lastActivity: timestamp
              }
            }
          })
        },
        clearHistory: () => set({ history: [] }),
        removeHistoryItem: (id) =>
          set((state) => ({
            history: state.history.filter(item => item.id !== id)
          })),

        // Current command
        currentCommand: '',
        setCurrentCommand: (command) => set({ currentCommand: command }),

        // Cursor
        cursorPosition: 0,
        setCursorPosition: (position) => set({ cursorPosition: position }),

        // Typing state
        isTyping: false,
        setIsTyping: (typing) => set({ isTyping: typing }),

        // Terminal state
        isVisible: false,
        setIsVisible: (visible) => set({ isVisible: visible }),

        // Command history for navigation
        commandHistory: [],
        historyIndex: -1,
        setHistoryIndex: (index) => set({ historyIndex: index }),
        addToCommandHistory: (command) => {
          if (!command.trim()) return
          
          set((state) => {
            const filtered = state.commandHistory.filter(cmd => cmd !== command)
            const newHistory = [...filtered, command]
            const maxItems = 50 // Keep last 50 commands
            
            return {
              commandHistory: newHistory.slice(-maxItems),
              historyIndex: -1,
              metrics: {
                ...state.metrics,
                commandsExecuted: state.metrics.commandsExecuted + 1
              }
            }
          })
        },
        getPreviousCommand: () => {
          const { commandHistory, historyIndex } = get()
          const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
          if (newIndex >= 0 && commandHistory[newIndex]) {
            set({ historyIndex: newIndex })
            return commandHistory[commandHistory.length - 1 - newIndex] || null
          }
          return null
        },
        getNextCommand: () => {
          const { commandHistory, historyIndex } = get()
          const newIndex = historyIndex - 1
          if (newIndex >= 0 && commandHistory[newIndex]) {
            set({ historyIndex: newIndex })
            return commandHistory[commandHistory.length - 1 - newIndex] || null
          }
          set({ historyIndex: -1 })
          return null
        },
        resetCommandHistory: () => set({ commandHistory: [], historyIndex: -1 }),

        // Settings
        settings: defaultSettings,
        updateSettings: (newSettings) =>
          set((state) => ({
            settings: { ...state.settings, ...newSettings }
          })),
        resetSettings: () => set({ settings: defaultSettings }),

        // Metrics
        metrics: {
          commandsExecuted: 0,
          totalUptime: 0,
          lastActivity: Date.now(),
        },
        updateMetrics: (newMetrics) =>
          set((state) => ({
            metrics: { ...state.metrics, ...newMetrics }
          })),

        // Error handling
        lastError: null,
        setLastError: (error) => set({ lastError: error }),

        // Utility methods
        exportHistory: () => {
          const { history } = get()
          return JSON.stringify(history, null, 2)
        },
        importHistory: (data) => {
          try {
            const imported = JSON.parse(data) as HistoryItem[]
            if (Array.isArray(imported)) {
              set({ history: imported })
            }
          } catch (error) {
            console.error('Failed to import history:', error)
          }
        },
        searchHistory: (query) => {
          const { history } = get()
          const lowercaseQuery = query.toLowerCase()
          return history.filter(item =>
            item.content.toLowerCase().includes(lowercaseQuery) ||
            item.type.toLowerCase().includes(lowercaseQuery)
          )
        },
      }),
      {
        name: 'devspace-terminal-storage',
        partialize: (state) => ({
          commandHistory: state.commandHistory,
          settings: state.settings,
          metrics: state.metrics,
        }),
      }
    )
  )
)