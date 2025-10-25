'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface TimelineProps {
  className?: string
}

interface TimelineItem {
  id: string
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'education' | 'project' | 'achievement'
  skills: string[]
  icon: string
  color: string
}

export const Timeline: React.FC<TimelineProps> = ({ className = '' }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({})
  
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    // Generate skill levels once on client side
    const levels: Record<string, number> = {}
    // Pre-generate some random levels to avoid hydration issues
    for (let i = 0; i < 50; i++) {
      levels[`skill_${i}`] = Math.floor(Math.random() * 40) + 60
    }
    setSkillLevels(levels)
  }, [])

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  const timelineItems: TimelineItem[] = [
    {
      id: 'education',
      title: 'Undergraduate Student',
      company: 'Reputed University',
      period: '2023 - Present',
      description: 'Pursuing undergraduate degree with focus on computer science, software development, and AI/ML technologies.',
      type: 'education',
      skills: ['Computer Science', 'Software Engineering', 'AI/ML'],
      icon: '�',
      color: '#00ff41'
    }
  ]

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      work: '#00ff41',
      education: '#0080ff',
      project: '#ff8000',
      achievement: '#ff0080'
    }
    return colors[type as keyof typeof colors] || '#666'
  }

  return (
    <div ref={ref} className={`timeline ${className}`}>
      <motion.div
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Timeline line */}
        <div className="timeline-line">
          <motion.div
            className="timeline-progress"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>

        {/* Timeline items */}
        <div className="timeline-items">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-item ${activeItem === item.id ? 'active' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            >
              {/* Timeline dot */}
              <motion.div
                className="timeline-dot"
                style={{ backgroundColor: item.color }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="dot-icon">{item.icon}</span>
              </motion.div>

              {/* Timeline content */}
              <motion.div
                className="timeline-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="content-header">
                  <h3 className="content-title">{item.title}</h3>
                  <div className="content-meta">
                    <span className="content-company">{item.company}</span>
                    <span className="content-period">{item.period}</span>
                  </div>
                </div>

                <p className="content-description">{item.description}</p>

                <div className="content-skills">
                  {item.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expandable details */}
                {activeItem === item.id && (
                  <motion.div
                    className="timeline-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="details-content">
                      <h4>Key Achievements:</h4>
                      <ul>
                        <li>Led development of 5+ major features</li>
                        <li>Improved application performance by 40%</li>
                        <li>Mentored 3 junior developers</li>
                        <li>Reduced bug reports by 60%</li>
                      </ul>
                      
                      <h4>Technologies Used:</h4>
                      <div className="skills-list">
                        {item.skills.map((skill, idx) => {
                          const key = `${item.id}_${idx}`
                          const width = skillLevels[key] || 80
                          return (
                            <div key={idx} className="skill-tech">
                              <span className="tech-name">{skill}</span>
                              <div className="tech-level">
                                <div 
                                  className="tech-progress"
                                  style={{ 
                                    width: `${width}%`,
                                    backgroundColor: item.color
                                  }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Timeline legend */}
        <motion.div
          className="timeline-legend"
          variants={itemVariants}
        >
          <h4 className="legend-title">Timeline Types</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-dot work"></div>
              <span>Work Experience</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot education"></div>
              <span>Education</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot project"></div>
              <span>Projects</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot achievement"></div>
              <span>Achievements</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

