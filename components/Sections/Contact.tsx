'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Chatbot } from '../Features/Chatbot'

interface ContactProps {
  className?: string
}

export const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'sanjayravichandran170606@gmail.com',
      link: 'mailto:sanjayravichandran170606@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: '�',
      title: 'GitHub',
      value: 'github.com/Imperiex-1911',
      link: 'https://github.com/Imperiex-1911',
      description: 'Check out my projects'
    }
  ]

  return (
    <section ref={ref} className={`contact-section ${className}`}>
      <div className="contact-container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              Get In <span className="title-accent">Touch</span>
            </h2>
            <p className="section-subtitle">
              Let's discuss your next project or just say hello
            </p>
          </motion.div>

          <div className="contact-grid">
            {/* Contact form */}
            <motion.div className="contact-form-container" variants={itemVariants}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>I'll get back to you as soon as possible</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🚀</span>
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    className="form-status success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="form-status error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ❌ Something went wrong. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact methods */}
            <motion.div className="contact-methods" variants={itemVariants}>
              <div className="methods-header">
                <h3>Other Ways to Reach Me</h3>
                <p>Choose your preferred method</p>
              </div>

              <div className="methods-list">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.link}
                    className="method-item"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <h4>{method.title}</h4>
                      <p className="method-value">{method.value}</p>
                      <p className="method-description">{method.description}</p>
                    </div>
                    <div className="method-arrow">→</div>
                  </motion.a>
                ))}
              </div>

              {/* Quick actions */}
              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <motion.button
                    className="action-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="action-icon">📄</span>
                    Download Resume
                  </motion.button>
                  <motion.button
                    className="action-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="action-icon">📅</span>
                    Schedule Call
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive chatbot */}
          <motion.div 
            className="contact-chatbot"
            variants={itemVariants}
          >
            <div className="chatbot-header">
              <h3>Or chat with my AI assistant</h3>
              <p>Get instant answers to common questions</p>
            </div>
            <Chatbot />
          </motion.div>

          {/* Fun facts */}
          <motion.div 
            className="contact-fun-facts"
            variants={itemVariants}
          >
            <h3>Fun Facts About Me</h3>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-icon">⚡</span>
                <span className="fact-text">Usually respond within 24 hours</span>
              </div>
              <div className="fact-item">
                <span className="fact-icon">🌍</span>
                <span className="fact-text">Available for remote work worldwide</span>
              </div>
              <div className="fact-item">
                <span className="fact-icon">☕</span>
                <span className="fact-text">Best time to reach me: 9 AM - 6 PM UTC</span>
              </div>
              <div className="fact-item">
                <span className="fact-icon">🚀</span>
                <span className="fact-text">Always excited about new projects</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

