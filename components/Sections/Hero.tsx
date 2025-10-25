'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Terminal } from '../Terminal/Terminal'
import { Scene } from '../3D/Scene'

interface HeroProps {
  className?: string
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [show3D, setShow3D] = useState(false)
  
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
      setTimeout(() => setShowTerminal(true), 1000)
      setTimeout(() => setShow3D(true), 2000)
    }
  }, [inView, controls])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section ref={ref} className={`hero-section ${className}`}>
      <div className="hero-background">
        {/* Animated background grid */}
        <div className="grid-overlay" />
        
        {/* Floating particles */}
        {isLoaded && (
          <div className="particles">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Main heading */}
          <motion.div className="hero-text" variants={textVariants}>
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              <span className="title-line">
                <span className="title-greeting">Hello, I'm a Full-Stack Developer</span>
              </span>
            </motion.h1>

            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              I create immersive digital experiences with modern web technologies.
              <br />
              Passionate about AI/ML, educational technology, and clean code.
            </motion.p>

            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTerminal(true)}
              >
                <span className="btn-icon">⚡</span>
                Open Terminal
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Passion</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive elements */}
          <motion.div 
            className="hero-interactive"
            variants={itemVariants}
          >
            {showTerminal && (
              <motion.div
                className="hero-terminal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className="hero-terminal-component" />
              </motion.div>
            )}

            {show3D && (
              <motion.div
                className="hero-3d"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Scene className="hero-scene-component" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="scroll-arrow">
            <span>↓</span>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="hero-effects">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>
    </section>
  )
}

