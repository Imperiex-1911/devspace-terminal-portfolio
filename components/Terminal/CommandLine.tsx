'use client'

import React, { forwardRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CommandLineProps {
  command: string
  onCommandChange: (command: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  cursorPosition: number
  onCursorChange: (position: number) => void
  isTyping: boolean
  className?: string
  prompt?: string
  disabled?: boolean
}

export const CommandLine = forwardRef<HTMLInputElement, CommandLineProps>(
  ({ 
    command, 
    onCommandChange, 
    onKeyDown, 
    cursorPosition, 
    onCursorChange, 
    isTyping, 
    className = '',
    prompt = 'developer@devspace:~$',
    disabled = false
  }, ref) => {
    const [showCursor, setShowCursor] = useState(true)
    const [isFocused, setIsFocused] = useState(false)

    // Cursor blinking effect
    useEffect(() => {
      if (!isFocused && !isTyping) {
        setShowCursor(false)
        return
      }

      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      
      return () => clearInterval(interval)
    }, [isFocused, isTyping])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onCommandChange(e.target.value)
        onCursorChange(e.target.selectionStart || 0)
      }
    }, [onCommandChange, onCursorChange, disabled])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }

      // Update cursor position on navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setTimeout(() => {
          const input = e.target as HTMLInputElement
          onCursorChange(input.selectionStart || 0)
        }, 0)
      }

      // Call parent handler
      onKeyDown(e)
    }, [onKeyDown, onCursorChange, disabled])

    const handleFocus = useCallback(() => {
      setIsFocused(true)
      setShowCursor(true)
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocused(false)
    }, [])

    const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        const input = e.target as HTMLInputElement
        onCursorChange(input.selectionStart || 0)
      }
    }, [onCursorChange, disabled])

    const displayCommand = useMemo(() => {
      if (isTyping) {
        return command + (showCursor ? '|' : ' ')
      }
      
      const beforeCursor = command.slice(0, cursorPosition)
      const afterCursor = command.slice(cursorPosition)
      const cursor = showCursor && isFocused ? '|' : ' '
      
      return beforeCursor + cursor + afterCursor
    }, [command, cursorPosition, showCursor, isFocused, isTyping])

    const promptElement = useMemo(() => (
      <span className="command-prompt" aria-label="Command prompt">
        <span className="prompt-user">developer</span>
        <span className="prompt-separator">@</span>
        <span className="prompt-host">devspace</span>
        <span className="prompt-separator">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-symbol">$</span>
      </span>
    ), [])

    return (
      <motion.div 
        className={`command-line-container ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="command-line">
          {promptElement}
          <div className="command-input-wrapper">
            <input
              ref={ref}
              type="text"
              value={command}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onClick={handleClick}
              className="command-input"
              disabled={disabled || isTyping}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Terminal command input"
              aria-describedby="command-help"
            />
            <div 
              className="command-display"
              aria-hidden="true"
            >
              <span className="command-text">{displayCommand}</span>
            </div>
          </div>
        </div>
        
        {isTyping && (
          <motion.div 
            className="typing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="typing-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="typing-text">Processing command...</span>
          </motion.div>
        )}

        <div id="command-help" className="sr-only">
          Type commands and press Enter to execute. Use Tab for autocomplete, Up/Down arrows for history.
        </div>
      </motion.div>
    )
  }
)

CommandLine.displayName = 'CommandLine'