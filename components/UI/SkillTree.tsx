'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillTreeProps {
  className?: string
}

interface SkillNode {
  id: string
  name: string
  level: number
  category: string
  dependencies: string[]
  position: { x: number; y: number }
  color: string
  icon: string
}

export const SkillTree: React.FC<SkillTreeProps> = ({ className = '' }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
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

  const skillNodes: SkillNode[] = [
    // Frontend
    {
      id: 'nextjs',
      name: 'Next.js 14',
      level: 90,
      category: 'frontend',
      dependencies: [],
      position: { x: 50, y: 20 },
      color: '#000000',
      icon: '▲'
    },
    {
      id: 'react',
      name: 'React',
      level: 95,
      category: 'frontend',
      dependencies: ['nextjs'],
      position: { x: 30, y: 40 },
      color: '#61dafb',
      icon: '⚛️'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 90,
      category: 'core',
      dependencies: ['react'],
      position: { x: 70, y: 40 },
      color: '#3178c6',
      icon: '🔷'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      level: 90,
      category: 'frontend',
      dependencies: ['nextjs'],
      position: { x: 50, y: 60 },
      color: '#06b6d4',
      icon: '💨'
    },
    {
      id: 'framermotion',
      name: 'Framer Motion',
      level: 85,
      category: 'frontend',
      dependencies: ['react'],
      position: { x: 20, y: 60 },
      color: '#ff0055',
      icon: '🎬'
    },
    // Backend & AI/ML
    {
      id: 'python',
      name: 'Python',
      level: 85,
      category: 'backend',
      dependencies: [],
      position: { x: 80, y: 20 },
      color: '#3776ab',
      icon: '�'
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      level: 80,
      category: 'backend',
      dependencies: ['python'],
      position: { x: 90, y: 40 },
      color: '#009688',
      icon: '⚡'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      level: 85,
      category: 'ai',
      dependencies: ['python'],
      position: { x: 80, y: 60 },
      color: '#4285f4',
      icon: '🤖'
    },
    {
      id: 'sklearn',
      name: 'scikit-learn',
      level: 80,
      category: 'ai',
      dependencies: ['python'],
      position: { x: 70, y: 80 },
      color: '#f7931e',
      icon: '🧠'
    },
    {
      id: 'supabase',
      name: 'Supabase',
      level: 85,
      category: 'backend',
      dependencies: [],
      position: { x: 50, y: 80 },
      color: '#3ecf8e',
      icon: '🗄️'
    },
    {
      id: 'chrome-ext',
      name: 'Chrome Extensions',
      level: 85,
      category: 'frontend',
      dependencies: ['typescript'],
      position: { x: 30, y: 80 },
      color: '#4285f4',
      icon: '🧩'
    }
  ]

  const getNodeSize = (level: number) => {
    return Math.max(20, (level / 100) * 40)
  }

  const getNodeGlow = (level: number) => {
    return (level / 100) * 20
  }

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

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const connectionVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div ref={ref} className={`skill-tree ${className}`}>
      <motion.div
        className="skill-tree-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="skill-tree-svg">
          <svg viewBox="0 0 100 100" className="tree-svg">
            {/* Connections */}
            {skillNodes.map((node) =>
              node.dependencies.map((depId) => {
                const depNode = skillNodes.find(n => n.id === depId)
                if (!depNode) return null

                return (
                  <motion.line
                    key={`${node.id}-${depId}`}
                    x1={depNode.position.x}
                    y1={depNode.position.y}
                    x2={node.position.x}
                    y2={node.position.y}
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    opacity="0.6"
                    variants={connectionVariants}
                  />
                )
              })
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff41" />
                <stop offset="100%" stopColor="#0080ff" />
              </linearGradient>
            </defs>

            {/* Skill nodes */}
            {skillNodes.map((node) => (
              <motion.g
                key={node.id}
                variants={nodeVariants}
                className="skill-node-group"
              >
                {/* Node circle */}
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={getNodeSize(node.level) / 2}
                  fill={node.color}
                  stroke="#ffffff"
                  strokeWidth="0.5"
                  className={`skill-node ${selectedNode === node.id ? 'selected' : ''} ${hoveredNode === node.id ? 'hovered' : ''}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    filter: `drop-shadow(0 0 ${getNodeGlow(node.level)}px ${node.color})`
                  }}
                />

                {/* Node icon */}
                <text
                  x={node.position.x}
                  y={node.position.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fill="#ffffff"
                  className="node-icon"
                >
                  {node.icon}
                </text>

                {/* Node label */}
                <text
                  x={node.position.x}
                  y={node.position.y + getNodeSize(node.level) / 2 + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="4"
                  fill="#ffffff"
                  className="node-label"
                >
                  {node.name}
                </text>

                {/* Level indicator */}
                <text
                  x={node.position.x}
                  y={node.position.y + getNodeSize(node.level) / 2 + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="3"
                  fill="#00ff41"
                  className="node-level"
                >
                  {node.level}%
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Node details panel */}
        {selectedNode && (
          <motion.div
            className="node-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {(() => {
              const node = skillNodes.find(n => n.id === selectedNode)
              if (!node) return null

              return (
                <div className="details-content">
                  <div className="details-header">
                    <span className="details-icon">{node.icon}</span>
                    <h3 className="details-title">{node.name}</h3>
                    <span className="details-level">{node.level}%</span>
                  </div>
                  
                  <div className="details-body">
                    <div className="details-category">
                      <span className="category-label">Category:</span>
                      <span className="category-value">{node.category}</span>
                    </div>
                    
                    <div className="details-dependencies">
                      <span className="deps-label">Dependencies:</span>
                      <div className="deps-list">
                        {node.dependencies.length > 0 ? (
                          node.dependencies.map(depId => {
                            const depNode = skillNodes.find(n => n.id === depId)
                            return depNode ? (
                              <span key={depId} className="dep-tag">
                                {depNode.icon} {depNode.name}
                              </span>
                            ) : null
                          })
                        ) : (
                          <span className="no-deps">None</span>
                        )}
                      </div>
                    </div>

                    <div className="details-progress">
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${node.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{ backgroundColor: node.color }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}

        {/* Legend */}
        <motion.div
          className="skill-legend"
          variants={nodeVariants}
        >
          <h4 className="legend-title">Categories</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color core"></div>
              <span>Core</span>
            </div>
            <div className="legend-item">
              <div className="legend-color frontend"></div>
              <span>Frontend</span>
            </div>
            <div className="legend-item">
              <div className="legend-color backend"></div>
              <span>Backend</span>
            </div>
            <div className="legend-item">
              <div className="legend-color 3d"></div>
              <span>3D Graphics</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

