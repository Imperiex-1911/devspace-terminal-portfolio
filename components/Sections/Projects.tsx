'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProjectCard } from '../UI/ProjectCard'

interface AboutProps {
  className?: string
}

export const Projects: React.FC<AboutProps> = ({ className = '' }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | '3d' | 'mobile' | 'ai'>('all')
  
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
        staggerChildren: 0.1
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

  const filters = [
    { id: 'all', label: 'Featured Project', count: 1 }
  ]

  const projects = [
    {
      id: 1,
      title: 'Phantom Phisher',
      description: 'Educational phishing awareness platform combining AI-powered email generation with ML-based detection. Features an interactive game with AI-generated phishing scenarios powered by Google Gemini 1.5 Flash, real-time ML classification with confidence scores, gamification system with 17 achievements, and a Chrome extension for real-time Gmail protection. Built with Next.js, FastAPI, and scikit-learn.',
      image: '/images/projects/phantom-phisher.jpg',
      tags: ['Next.js', 'TypeScript', 'AI/ML', 'Chrome Extension', 'Python', 'FastAPI'],
      category: 'ai',
      status: 'Active Development',
      github: 'https://github.com/Imperiex-1911/phantom-phisher',
      demo: null,
      featured: true
    }
  ]

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  )

  return (
    <section ref={ref} className={`projects-section ${className}`}>
      <div className="projects-container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              My <span className="title-accent">Projects</span>
            </h2>
            <p className="section-subtitle">
              A collection of my recent work and side projects
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div className="project-filters" variants={itemVariants}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id as any)}
              >
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className={`project-item ${project.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div 
            className="projects-cta"
            variants={itemVariants}
          >
            <div className="cta-content">
              <h3>Interested in working together?</h3>
              <p>Let's discuss your next project and bring your ideas to life.</p>
              <div className="cta-buttons">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-icon">💬</span>
                  Get In Touch
                </motion.button>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-icon">📧</span>
                  View Resume
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

