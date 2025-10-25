'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatbotProps {
  className?: string
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const generateBotResponse = (input: string): string => {
    const responses = {
      greeting: [
        "Hello! Great to meet you! 👋",
        "Hi there! How can I assist you today?",
        "Hey! Welcome to the devspace terminal!",
        "Greetings! What brings you here?"
      ],
      about: [
        "I'm an AI assistant created to help visitors learn about this portfolio. I can answer questions about projects, skills, and more!",
        "This is a terminal-themed portfolio showcasing modern web development with 3D elements and interactive features.",
        "The developer behind this site specializes in React, TypeScript, Three.js, and creating immersive web experiences."
      ],
      projects: [
        "Here are some featured projects: DevSpace Terminal (current), 3D Portfolio, Real-time Chat App, and ML Dashboard.",
        "The projects showcase various technologies including Next.js, Three.js, Node.js, and Python.",
        "You can explore the projects section to see detailed information about each one."
      ],
      skills: [
        "The developer's skills include React, TypeScript, Three.js, Node.js, Python, and many more modern technologies.",
        "Frontend: React, Next.js, TypeScript, Three.js, WebGL, Tailwind CSS",
        "Backend: Node.js, Python, PostgreSQL, MongoDB, Docker, AWS",
        "Tools: Git, VS Code, Figma, Blender, Linux"
      ],
      contact: [
        "You can reach out via email at developer@example.com or through the contact form.",
        "Social media links are available in the footer: GitHub, LinkedIn, Twitter, Discord.",
        "Feel free to ask about collaboration opportunities or just say hello!"
      ],
      default: [
        "That's an interesting question! Let me think about that...",
        "I'm not sure about that specific topic, but I can help with questions about this portfolio.",
        "Could you rephrase that? I want to make sure I understand correctly.",
        "I'm still learning! Try asking about projects, skills, or the developer's background."
      ]
    }

    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)] || "Hello! How can I help you?"
    }
    
    if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('what')) {
      return responses.about[Math.floor(Math.random() * responses.about.length)] || "I'm a developer passionate about creating amazing web experiences."
    }
    
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return responses.projects[Math.floor(Math.random() * responses.projects.length)] || "Check out my projects section to see my latest work!"
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('technology')) {
      return responses.skills[Math.floor(Math.random() * responses.skills.length)] || "I work with modern web technologies like React, TypeScript, and Node.js."
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
      return responses.contact[Math.floor(Math.random() * responses.contact.length)] || "You can reach me through the contact section!"
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)] || "I'm not sure how to respond to that. Try asking about my projects or skills!"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`chatbot ${className}`}>
      {/* Chat button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        <span className="chat-icon">💬</span>
        <span className="chat-text">AI Assistant</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="chat-header">
              <div className="chat-title">
                <span className="title-icon">🤖</span>
                <span className="title-text">AI Assistant</span>
              </div>
              <div className="chat-status">
                <span className="status-dot online"></span>
                <span className="status-text">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="message bot typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input">
              <div className="input-container">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about this portfolio..."
                  className="message-input"
                  rows={1}
                />
                <motion.button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="send-icon">🚀</span>
                </motion.button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="chat-actions">
              <span className="actions-label">Quick questions:</span>
              <div className="action-buttons">
                {[
                  'Tell me about the projects',
                  'What skills do you have?',
                  'How can I contact you?',
                  'What is this website about?'
                ].map((question, index) => (
                  <motion.button
                    key={index}
                    className="action-button"
                    onClick={() => setInputValue(question)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

