'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CommandLine } from './CommandLine'
import { Output } from './Output'
import { ASCII } from './ASCII'
import { useTerminalStore } from '@/store/terminal'
import { commandRegistry } from '@/lib/commands'

interface TerminalProps {
  className?: string
  autoFocus?: boolean
  showHeader?: boolean
  showFooter?: boolean
}

export const Terminal: React.FC<TerminalProps> = ({ 
  className = '',
  autoFocus = true,
  showHeader = true,
  showFooter = true
}) => {
  const {
    history,
    currentCommand,
    isTyping,
    cursorPosition,
    commandHistory,
    historyIndex,
    addToHistory,
    setCurrentCommand,
    setIsTyping,
    setCursorPosition,
    clearHistory,
    setHistoryIndex,
  } = useTerminalStore()

  const [isVisible, setIsVisible] = useState(false)
  const [showASCII, setShowASCII] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const commandTimeoutRef = useRef<NodeJS.Timeout>()

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    // Show terminal with animation
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Hide ASCII after initial load
    const timer = setTimeout(() => setShowASCII(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-focus input when terminal becomes visible
  useEffect(() => {
    if (isVisible && autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isVisible, autoFocus])

  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim()) return

    const trimmedCommand = command.trim()
    const commandParts = trimmedCommand.split(' ')
    const commandName = commandParts[0]?.toLowerCase() || ''
    const args = commandParts.slice(1)

    // Clear any existing timeout
    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current)
    }

    // Add command to history
    addToHistory({
      type: 'command',
      content: trimmedCommand,
    })

    // Process command with timeout
    setIsTyping(true)
    
    try {
      const commandPromise = commandRegistry.execute(commandName, args)
      const timeoutPromise = new Promise<never>((_, reject) => {
        commandTimeoutRef.current = setTimeout(() => {
          reject(new Error('Command timeout (10s)'))
        }, 10000)
      })

      const result = await Promise.race([commandPromise, timeoutPromise])
      
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current)
      }
      
      // Add result to history
      addToHistory({
        type: 'output',
        content: String(result || 'Command completed'),
      })
    } catch (error) {
      addToHistory({
        type: 'error',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    } finally {
      setIsTyping(false)
      setCurrentCommand('')
      setHistoryIndex(-1)
    }
  }, [addToHistory, setIsTyping, setCurrentCommand, setHistoryIndex])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(currentCommand)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Auto-complete logic could go here
      const suggestions = commandRegistry.getSuggestions(currentCommand)
      if (suggestions.length === 1 && suggestions[0]) {
        setCurrentCommand(suggestions[0])
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      if (newIndex >= 0 && commandHistory[newIndex]) {
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = historyIndex - 1
      if (newIndex >= 0 && commandHistory[newIndex]) {
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      clearHistory()
      } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        if (isTyping) {
          setIsTyping(false)
          addToHistory({
            type: 'error',
            content: '^C - Command interrupted',
          })
        }
      }
    }, [currentCommand, historyIndex, commandHistory, handleCommand, setCurrentCommand, setHistoryIndex, clearHistory, isTyping, setIsTyping, addToHistory])

  const focusInput = useCallback(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus()
    }
  }, [isTyping])

  const terminalControls = useMemo(() => (
    <div className="terminal-controls">
      <button 
        className="control close"
        aria-label="Close terminal"
        onClick={() => setIsVisible(false)}
      />
      <button 
        className="control minimize"
        aria-label="Minimize terminal"
        onClick={() => {}} // Could implement minimize functionality
      />
      <button 
        className="control maximize"
        aria-label="Maximize terminal"
        onClick={() => {}} // Could implement maximize functionality
      />
    </div>
  ), [])

  const footerTime = useMemo(() => 
    currentTime.toLocaleTimeString('en-US', { hour12: false }), 
    [currentTime]
  )

  return (
    <motion.div
      ref={terminalRef}
      className={`terminal-container ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={focusInput}
      role="application"
      aria-label="DevSpace Terminal"
    >
      {/* Terminal Header */}
      {showHeader && (
        <div className="terminal-header">
          {terminalControls}
          <div className="terminal-title">
            <span className="terminal-icon" role="img" aria-label="Terminal">⚡</span>
            devspace-terminal
          </div>
          <div className="terminal-status">
            <span 
              className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
              aria-label={isOnline ? 'Online' : 'Offline'}
            />
            <span className="status-text">{isOnline ? 'online' : 'offline'}</span>
          </div>
        </div>
      )}

      {/* Terminal Body */}
      <div className="terminal-body">
        <AnimatePresence>
          {showASCII && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <ASCII />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="terminal-content">
          <Output history={history} isTyping={isTyping} />
          <CommandLine
            ref={inputRef}
            command={currentCommand}
            onCommandChange={setCurrentCommand}
            onKeyDown={handleKeyDown}
            cursorPosition={cursorPosition}
            onCursorChange={setCursorPosition}
            isTyping={isTyping}
          />
        </div>
      </div>

      {/* Terminal Footer */}
      {showFooter && (
        <div className="terminal-footer">
          <div className="terminal-info">
            <span className="info-item">
              <span className="info-label">User:</span>
              <span className="info-value">developer</span>
            </span>
            <span className="info-item">
              <span className="info-label">Host:</span>
              <span className="info-value">devspace-terminal</span>
            </span>
            <span className="info-item">
              <span className="info-label">Time:</span>
              <span className="info-value">{footerTime}</span>
            </span>
          </div>
          <div className="terminal-help">
            <span className="help-text">Type 'help' for available commands</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

