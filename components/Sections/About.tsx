'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Timeline } from '../UI/Timeline'
import { SkillTree } from '../UI/SkillTree'

interface AboutProps {
  className?: string
}

export const About: React.FC<AboutProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'timeline'>('story')
  
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

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

  const tabs = [
    { id: 'story', label: 'My Story', icon: '📖' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'timeline', label: 'Timeline', icon: '📅' }
  ]

  return (
    <section ref={ref} className={`about-section ${className}`}>
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              <span className="title-accent">About</span> Me
            </h2>
            <p className="section-subtitle">
              Passionate developer crafting digital experiences
            </p>
          </motion.div>

          {/* Tab navigation */}
          <motion.div className="about-tabs" variants={itemVariants}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <motion.div 
            className="tab-content"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'story' && (
              <div className="story-content">
                <motion.div 
                  className="story-text"
                  variants={itemVariants}
                >
                  <p className="story-paragraph">
                    Hello! I'm Sanjay, a passionate full-stack developer specializing in AI/ML 
                    integration and educational technology. My journey in tech is driven by a 
                    mission to create innovative solutions that educate and protect users.
                  </p>
                  
                  <p className="story-paragraph">
                    I specialize in modern web technologies with expertise in Next.js, TypeScript, 
                    Python, and AI/ML frameworks. My approach combines cutting-edge AI capabilities 
                    with practical user experiences and educational value.
                  </p>

                  <p className="story-paragraph">
                    Currently, I'm working on <strong>Phantom Phisher</strong> - an AI-powered 
                    educational platform that teaches phishing awareness through interactive gameplay 
                    and real-world browser protection. This project combines Google Gemini AI for 
                    email generation, scikit-learn for ML classification, and a Chrome extension 
                    for real-time Gmail protection.
                  </p>

                  <p className="story-paragraph">
                    When I'm not coding, I'm exploring new AI models, building educational tools, 
                    and contributing to cybersecurity awareness. I'm passionate about creating 
                    technology that not only solves problems but also educates and empowers users.
                  </p>
                </motion.div>

                <motion.div 
                  className="story-highlights"
                  variants={itemVariants}
                >
                  <div className="highlight-item">
                    <div className="highlight-icon">🎯</div>
                    <div className="highlight-content">
                      <h4>Mission-Driven</h4>
                      <p>Building solutions that make a real impact</p>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">🚀</div>
                    <div className="highlight-content">
                      <h4>Innovation-Focused</h4>
                      <p>Always exploring cutting-edge technologies</p>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">🤝</div>
                    <div className="highlight-content">
                      <h4>Collaborative</h4>
                      <p>Thriving in team environments</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="skills-content">
                <SkillTree />
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="timeline-content">
                <Timeline />
              </div>
            )}
          </motion.div>

          {/* Fun facts */}
          <motion.div 
            className="fun-facts"
            variants={itemVariants}
          >
            <h3 className="facts-title">Fun Facts</h3>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-number">☕</span>
                <span className="fact-text">Coffee consumed daily</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">🌙</span>
                <span className="fact-text">Night owl coder</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">🎮</span>
                <span className="fact-text">Gaming enthusiast</span>
              </div>
              <div className="fact-item">
                <span className="fact-number">📚</span>
                <span className="fact-text">Always learning</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

