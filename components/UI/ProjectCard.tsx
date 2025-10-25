'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  status: string
  github: string | null
  demo: string | null
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [stats, setStats] = useState({ views: 0, stars: 0, forks: 0 })

  useEffect(() => {
    // Generate stats once on client side to avoid hydration mismatch
    setStats({
      views: Math.floor(Math.random() * 1000) + 100,
      stars: Math.floor(Math.random() * 50) + 5,
      forks: Math.floor(Math.random() * 20) + 1
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#00ff41'
      case 'in progress':
        return '#ffaa00'
      case 'planned':
        return '#0080ff'
      default:
        return '#666'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return '🌐'
      case '3d':
        return '🎮'
      case 'mobile':
        return '📱'
      case 'ai':
        return '🧠'
      default:
        return '💻'
    }
  }

  return (
    <motion.div
      className={`project-card ${project.featured ? 'featured' : ''} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Project image */}
      <div className="project-image-container">
        <div className="project-image">
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Image failed to load:', project.image);
            }}
          />
        </div>
        
        {/* Overlay */}
        <motion.div
          className="project-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overlay-content">
            <div className="project-actions">
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button demo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="button-icon">🚀</span>
                  <span className="button-text">Live Demo</span>
                </motion.a>
              )}
              
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button github"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="button-icon">🐙</span>
                  <span className="button-text">Code</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Status badge */}
        <div className="project-status">
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(project.status) }}
          >
            {project.status}
          </span>
        </div>

        {/* Category badge */}
        <div className="project-category">
          <span className="category-badge">
            <span className="category-icon">{getCategoryIcon(project.category)}</span>
            <span className="category-text">{project.category.toUpperCase()}</span>
          </span>
        </div>
      </div>

      {/* Project content */}
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-meta">
            <span className="project-category-text">{project.category}</span>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        {/* Tech stack */}
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="project-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Project stats */}
        <div className="project-stats">
          <div className="stat-item">
            <span className="stat-icon">👀</span>
            <span className="stat-value">{stats.views}</span>
            <span className="stat-label">views</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{stats.stars}</span>
            <span className="stat-label">stars</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🍴</span>
            <span className="stat-value">{stats.forks}</span>
            <span className="stat-label">forks</span>
          </div>
        </div>
      </div>

      {/* Hover effects */}
      <motion.div
        className="project-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

