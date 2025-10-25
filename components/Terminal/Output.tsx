'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface HistoryItem {
  id: string
  type: 'command' | 'output' | 'error' | 'info'
  content: string
  timestamp: number
  metadata?: Record<string, any>
}

interface OutputProps {
  history: HistoryItem[]
  isTyping: boolean
  className?: string
}

export const Output: React.FC<OutputProps> = ({ history, isTyping, className = '' }) => {
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new content is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history, isTyping])

  const formatContent = (content: string, type: string) => {
    // Check if content is JSON
    if (type === 'output' && content.startsWith('{') && content.endsWith('}')) {
      try {
        const parsed = JSON.parse(content)
        return JSON.stringify(parsed, null, 2)
      } catch {
        return content
      }
    }

    // Check if content is code (basic detection)
    if (content.includes('```') || content.includes('function') || content.includes('const')) {
      return content
    }

    return content
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'command':
        return '>'
      case 'error':
        return '✗'
      case 'info':
        return 'ℹ'
      case 'output':
      default:
        return '•'
    }
  }

  const getItemClass = (type: string) => {
    switch (type) {
      case 'command':
        return 'output-command'
      case 'error':
        return 'output-error'
      case 'info':
        return 'output-info'
      case 'output':
      default:
        return 'output-content'
    }
  }

  const renderContent = (item: HistoryItem) => {
    const formattedContent = formatContent(item.content, item.type)
    
    // Check if it's a code block
    if (formattedContent.includes('```')) {
      const codeMatch = formattedContent.match(/```(\w+)?\n([\s\S]*?)```/)
      if (codeMatch) {
        const language = codeMatch[1] || 'javascript'
        const code = codeMatch[2] || ''
        return (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              background: 'transparent',
              padding: 0,
              margin: 0,
              fontSize: '0.9rem',
            }}
            children={code}
          />
        )
      }
    }

    // Check if it's JSON
    if (item.type === 'output' && formattedContent.startsWith('{')) {
      return (
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            fontSize: '0.9rem',
          }}
        >
          {formattedContent}
        </SyntaxHighlighter>
      )
    }

    // Regular text content
    return (
      <pre className="output-text">
        {formattedContent.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < formattedContent.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </pre>
    )
  }

  return (
    <div ref={outputRef} className={`terminal-output ${className}`}>
      <AnimatePresence>
        {history.map((item, index) => (
          <motion.div
            key={index}
            className={`output-item ${getItemClass(item.type)}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="output-header">
              <span className="output-icon">{getItemIcon(item.type)}</span>
              <span className="output-timestamp">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="output-body">
              {renderContent(item)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      {isTyping && (
        <motion.div
          className="output-typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {history.length === 0 && !isTyping && (
        <motion.div
          className="output-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="empty-message">
            <span className="empty-icon">⚡</span>
            <span className="empty-text">Welcome to devspace-terminal</span>
            <span className="empty-subtext">Type 'help' to get started</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

