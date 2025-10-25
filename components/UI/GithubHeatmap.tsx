'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GithubHeatmapProps {
  className?: string
}

interface ContributionData {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export const GithubHeatmap: React.FC<GithubHeatmapProps> = ({ className = '' }) => {
  const [contributions, setContributions] = useState<ContributionData[]>([])
  const [hoveredDay, setHoveredDay] = useState<ContributionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate mock contribution data for the last year
    const generateMockData = () => {
      const data: ContributionData[] = []
      const today = new Date()
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        const count = Math.floor(Math.random() * 20)
        const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 5)) as 0 | 1 | 2 | 3 | 4
        const dateString = date.toISOString().split('T')[0]
        
        if (dateString) {
          data.push({
            date: dateString,
            count,
            level
          })
        }
      }
      
      return data
    }

    // Simulate API call
    setTimeout(() => {
      setContributions(generateMockData())
      setIsLoading(false)
    }, 1000)
  }, [])

  const getLevelColor = (level: number) => {
    const colors = {
      0: '#161b22',
      1: '#0e4429',
      2: '#006d32',
      3: '#26a641',
      4: '#39d353'
    }
    return colors[level as keyof typeof colors] || colors[0]
  }

  const getWeekDays = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  const getMonthLabels = () => {
    const months = []
    const today = new Date()
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push(date.toLocaleDateString('en-US', { month: 'short' }))
    }
    
    return months
  }

  const getTotalContributions = () => {
    return contributions.reduce((sum, day) => sum + day.count, 0)
  }

  const getLongestStreak = () => {
    let currentStreak = 0
    let longestStreak = 0
    
    for (const day of contributions) {
      if (day.count > 0) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }
    
    return longestStreak
  }

  const getCurrentStreak = () => {
    let currentStreak = 0
    
    for (let i = contributions.length - 1; i >= 0; i--) {
      const contribution = contributions[i]
      if (contribution && contribution.count > 0) {
        currentStreak++
      } else {
        break
      }
    }
    
    return currentStreak
  }

  if (isLoading) {
    return (
      <div className={`github-heatmap loading ${className}`}>
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-grid">
            {[...Array(53)].map((_, i) => (
              <div key={i} className="skeleton-week">
                {[...Array(7)].map((_, j) => (
                  <div key={j} className="skeleton-day"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`github-heatmap ${className}`}>
      <div className="heatmap-container">
        {/* Header */}
        <div className="heatmap-header">
          <h3 className="heatmap-title">GitHub Activity</h3>
          <div className="heatmap-stats">
            <div className="stat-item">
              <span className="stat-value">{getTotalContributions()}</span>
              <span className="stat-label">contributions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getCurrentStreak()}</span>
              <span className="stat-label">current streak</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getLongestStreak()}</span>
              <span className="stat-label">longest streak</span>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="heatmap-content">
          {/* Month labels */}
          <div className="month-labels">
            {getMonthLabels().map((month, index) => (
              <span key={index} className="month-label">
                {month}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="heatmap-grid">
            {/* Day labels */}
            <div className="day-labels">
              {getWeekDays().map((day, index) => (
                <span key={index} className="day-label">
                  {day}
                </span>
              ))}
            </div>

            {/* Contribution squares */}
            <div className="contribution-grid">
              {Array.from({ length: 53 }, (_, weekIndex) => (
                <div key={weekIndex} className="week-column">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const contributionIndex = weekIndex * 7 + dayIndex
                    const contribution = contributions[contributionIndex]
                    
                    if (!contribution) return null

                    return (
                      <motion.div
                        key={contributionIndex}
                        className="contribution-square"
                        style={{
                          backgroundColor: getLevelColor(contribution.level)
                        }}
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={() => setHoveredDay(contribution)}
                        onHoverEnd={() => setHoveredDay(null)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: contributionIndex * 0.001 }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend">
          <span className="legend-text">Less</span>
          <div className="legend-squares">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="legend-square"
                style={{ backgroundColor: getLevelColor(level) }}
              />
            ))}
          </div>
          <span className="legend-text">More</span>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <motion.div
            className="heatmap-tooltip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="tooltip-content">
              <div className="tooltip-count">
                {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}
              </div>
              <div className="tooltip-date">
                {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity summary */}
        <div className="activity-summary">
          <h4>Activity Summary</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-icon">📅</span>
              <div className="summary-content">
                <span className="summary-value">365</span>
                <span className="summary-label">days tracked</span>
              </div>
            </div>
            <div className="summary-item">
              <span className="summary-icon">🔥</span>
              <div className="summary-content">
                <span className="summary-value">{getCurrentStreak()}</span>
                <span className="summary-label">day streak</span>
              </div>
            </div>
            <div className="summary-item">
              <span className="summary-icon">📈</span>
              <div className="summary-content">
                <span className="summary-value">
                  {Math.round((getTotalContributions() / 365) * 10) / 10}
                </span>
                <span className="summary-label">avg/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

