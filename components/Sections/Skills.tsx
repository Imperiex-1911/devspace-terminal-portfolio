'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GithubHeatmap } from '../UI/GithubHeatmap'

interface SkillsProps {
  className?: string
}

export const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'tools' | 'languages'>('frontend')
  
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

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: '🎨', color: '#00ff41' },
    { id: 'backend', label: 'Backend', icon: '⚙️', color: '#0080ff' },
    { id: 'tools', label: 'Tools', icon: '🛠️', color: '#ff8000' },
    { id: 'languages', label: 'Languages', icon: '💻', color: '#ff0080' }
  ]

  const skills = {
    frontend: [
      { name: 'React & Next.js', level: 95, years: 3, description: 'Building modern web applications' },
      { name: 'TypeScript', level: 90, years: 2, description: 'Type-safe JavaScript development' },
      { name: 'Three.js & WebGL', level: 85, years: 2, description: '3D graphics and interactive experiences' },
      { name: 'HTML5 & CSS3', level: 95, years: 4, description: 'Semantic markup and modern styling' },
      { name: 'Tailwind CSS', level: 90, years: 2, description: 'Utility-first CSS framework' },
      { name: 'Framer Motion', level: 80, years: 1, description: 'Animation and gesture library' },
      { name: 'Canvas API', level: 75, years: 1, description: '2D graphics and animations' },
      { name: 'Web Components', level: 70, years: 1, description: 'Reusable custom elements' }
    ],
    backend: [
      { name: 'Node.js', level: 90, years: 3, description: 'Server-side JavaScript runtime' },
      { name: 'Python', level: 85, years: 2, description: 'Versatile programming language' },
      { name: 'Express.js', level: 85, years: 2, description: 'Web application framework' },
      { name: 'PostgreSQL', level: 80, years: 2, description: 'Relational database management' },
      { name: 'MongoDB', level: 75, years: 1, description: 'NoSQL document database' },
      { name: 'Redis', level: 70, years: 1, description: 'In-memory data structure store' },
      { name: 'Docker', level: 75, years: 1, description: 'Containerization platform' },
      { name: 'AWS & Vercel', level: 80, years: 2, description: 'Cloud platforms and deployment' }
    ],
    tools: [
      { name: 'Git & GitHub', level: 95, years: 4, description: 'Version control and collaboration' },
      { name: 'VS Code', level: 95, years: 4, description: 'Code editor and IDE' },
      { name: 'Figma', level: 80, years: 2, description: 'Design and prototyping tool' },
      { name: 'Blender', level: 70, years: 1, description: '3D modeling and animation' },
      { name: 'Docker', level: 75, years: 1, description: 'Containerization and deployment' },
      { name: 'Linux', level: 80, years: 3, description: 'Operating system and command line' },
      { name: 'Webpack & Vite', level: 85, years: 2, description: 'Build tools and bundlers' },
      { name: 'Jest & Testing', level: 80, years: 2, description: 'Testing frameworks and practices' }
    ],
    languages: [
      { name: 'JavaScript/TypeScript', level: 95, years: 4, description: 'Primary programming language' },
      { name: 'Python', level: 85, years: 2, description: 'Data science and backend development' },
      { name: 'HTML/CSS', level: 95, years: 4, description: 'Web markup and styling' },
      { name: 'SQL', level: 80, years: 2, description: 'Database query language' },
      { name: 'Bash', level: 75, years: 2, description: 'Shell scripting and automation' },
      { name: 'C++', level: 60, years: 1, description: 'System programming and performance' },
      { name: 'Java', level: 65, years: 1, description: 'Object-oriented programming' }
    ]
  }

  const currentSkills = skills[activeCategory]

  return (
    <section ref={ref} className={`skills-section ${className}`}>
      <div className="skills-container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              My <span className="title-accent">Skills</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I work with
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div className="skill-categories" variants={itemVariants}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id as any)}
                style={{ '--category-color': category.color } as React.CSSProperties}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            key={activeCategory}
          >
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                variants={itemVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-header">
                  <h4 className="skill-name">{skill.name}</h4>
                  <div className="skill-meta">
                    <span className="skill-level">{skill.level}%</span>
                    <span className="skill-years">{skill.years}y</span>
                  </div>
                </div>
                
                <div className="skill-description">
                  {skill.description}
                </div>
                
                <div className="skill-progress">
                  <motion.div
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{ backgroundColor: categories.find(c => c.id === activeCategory)?.color }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub activity */}
          <motion.div 
            className="github-activity"
            variants={itemVariants}
          >
            <h3 className="activity-title">GitHub Activity</h3>
            <GithubHeatmap />
          </motion.div>

          {/* Learning goals */}
          <motion.div 
            className="learning-goals"
            variants={itemVariants}
          >
            <h3 className="goals-title">Currently Learning</h3>
            <div className="goals-grid">
              <div className="goal-item">
                <span className="goal-icon">🚀</span>
                <div className="goal-content">
                  <h4>Rust</h4>
                  <p>Systems programming and performance</p>
                </div>
              </div>
              <div className="goal-item">
                <span className="goal-icon">🧠</span>
                <div className="goal-content">
                  <h4>Machine Learning</h4>
                  <p>AI/ML with Python and TensorFlow</p>
                </div>
              </div>
              <div className="goal-item">
                <span className="goal-icon">⚡</span>
                <div className="goal-content">
                  <h4>WebAssembly</h4>
                  <p>High-performance web applications</p>
                </div>
              </div>
              <div className="goal-item">
                <span className="goal-icon">🔗</span>
                <div className="goal-content">
                  <h4>Blockchain</h4>
                  <p>Web3 and decentralized applications</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

