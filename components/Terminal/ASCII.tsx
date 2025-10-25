'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ASCIIProps {
  className?: string
}

export const ASCII: React.FC<ASCIIProps> = ({ className = '' }) => {
  const [currentArt, setCurrentArt] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const asciiArts = [
    // Terminal ASCII Art
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    ██████╗ ███████╗██╗   ██╗███████╗██████╗  █████╗  ██████╗ ║
    ║    ██╔══██╗██╔════╝██║   ██║██╔════╝██╔══██╗██╔══██╗██╔════╝ ║
    ║    ██████╔╝███████╗██║   ██║███████╗██████╔╝███████║██║  ███╗║
    ║    ██╔══██╗╚════██║██║   ██║╚════██║██╔═══╝ ██╔══██║██║   ██║║
    ║    ██║  ██║███████║╚██████╔╝███████║██║     ██║  ██║╚██████╔╝║
    ║    ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ║
    ║                                                              ║
    ║                    Terminal Portfolio                        ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
    // Matrix Style
    `
    ████████████████████████████████████████████████████████████████
    ██                                                          ██
    ██  ███╗   ██╗███████╗██╗  ██╗████████╗    ████████╗███████╗ ██
    ██  ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝    ╚══██╔══╝██╔════╝ ██
    ██  ██╔██╗ ██║█████╗   ╚███╔╝    ██║          ██║   █████╗   ██
    ██  ██║╚██╗██║██╔══╝   ██╔██╗    ██║          ██║   ██╔══╝   ██
    ██  ██║ ╚████║███████╗██╔╝ ██╗   ██║          ██║   ███████╗ ██
    ██  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝          ╚═╝   ╚══════╝ ██
    ██                                                          ██
    ████████████████████████████████████████████████████████████████
    `,
    // Code Style
    `
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │  function devspaceTerminal() {                             │
    │    const developer = {                                     │
    │      name: "Developer",                                    │
    │      skills: ["React", "TypeScript", "3D", "WebGL"],      │
    │      passion: "Creating amazing experiences"               │
    │    };                                                      │
    │                                                             │
    │    return (                                                │
    │      <Terminal>                                            │
    │        <Code />                                            │
    │        <Magic />                                           │
    │      </Terminal>                                           │
    │    );                                                      │
    │  }                                                         │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
    `,
    // Minimalist
    `
    ╭─────────────────────────────────────────────────────────────╮
    │                                                             │
    │                    ⚡ DEVSPACE TERMINAL ⚡                  │
    │                                                             │
    │              Where Code Meets Creativity                    │
    │                                                             │
    │              Type 'help' to explore commands                │
    │                                                             │
    ╰─────────────────────────────────────────────────────────────╯
    `
  ]

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentArt(prev => (prev + 1) % asciiArts.length)
      }, 2000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isAnimating, asciiArts.length])

  const currentASCII = asciiArts[currentArt]

  return (
    <motion.div
      className={`ascii-art ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.pre
        className="ascii-text"
        key={currentArt}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {currentASCII}
      </motion.pre>
      
      <motion.div
        className="ascii-decoration"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="decoration-line"></div>
        <div className="decoration-dots">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
        <div className="decoration-line"></div>
      </motion.div>
    </motion.div>
  )
}

