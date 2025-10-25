'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/Imperiex-1911' },
    { name: 'Portfolio', icon: '🌐', url: 'https://devspace-terminal.vercel.app' }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ]

  const techStack = [
    'Next.js', 'React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'
  ]

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-content">
          {/* Brand section */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">devspace-terminal</span>
            </div>
            <p className="brand-description">
              A terminal-themed portfolio showcasing modern web development
              with interactive 3D elements and immersive experiences.
            </p>
            <div className="tech-stack">
              <span className="tech-label">Built with:</span>
              <div className="tech-tags">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links section */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="links-title">Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social section */}
          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="social-title">Connect</h3>
            <div className="social-links">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter section */}
          <motion.div
            className="footer-newsletter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get notified about new projects and updates
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <motion.button
                className="newsletter-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Developer. All rights reserved.</p>
            </div>
            
            <div className="footer-meta">
              <span className="meta-item">
                Made with <span className="heart">❤️</span> and lots of ☕
              </span>
              <span className="meta-item">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Terminal-style decoration */}
          <div className="footer-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-text">
              <span className="terminal-prompt">sanjay@devspace-terminal:~$</span>
              <span className="terminal-command">echo "Thanks for visiting!"</span>
            </div>
            <div className="decoration-line"></div>
          </div>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="footer-effects">
        <div className="footer-glow"></div>
        {mounted && (
          <div className="footer-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3]
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
    </footer>
  )
}

