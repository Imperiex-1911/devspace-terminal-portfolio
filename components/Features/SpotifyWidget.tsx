'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpotifyWidgetProps {
  className?: string
}

interface Track {
  id: string
  name: string
  artist: string
  album: string
  duration: number
  image: string
  url: string
  isPlaying: boolean
}

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)

  // Mock data - in a real app, this would come from Spotify API
  const mockTracks: Track[] = [
    {
      id: '1',
      name: 'Coding Vibes',
      artist: 'Developer',
      album: 'Late Night Sessions',
      duration: 240,
      image: '/images/albums/coding-vibes.jpg',
      url: 'https://open.spotify.com/track/1',
      isPlaying: false
    },
    {
      id: '2',
      name: 'Algorithm Dreams',
      artist: 'Code Master',
      album: 'Binary Beats',
      duration: 180,
      image: '/images/albums/algorithm-dreams.jpg',
      url: 'https://open.spotify.com/track/2',
      isPlaying: false
    },
    {
      id: '3',
      name: 'React State of Mind',
      artist: 'Frontend Hero',
      album: 'Component Life',
      duration: 200,
      image: '/images/albums/react-state.jpg',
      url: 'https://open.spotify.com/track/3',
      isPlaying: false
    }
  ]

  useEffect(() => {
    // Set initial track
    if (mockTracks.length > 0 && mockTracks[0]) {
      setCurrentTrack(mockTracks[0])
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (!currentTrack) return
    
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % mockTracks.length
    const nextTrack = mockTracks[nextIndex]
    if (nextTrack) {
      setCurrentTrack(nextTrack)
    }
    setProgress(0)
  }

  const handlePrevious = () => {
    if (!currentTrack) return
    
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1
    const prevTrack = mockTracks[prevIndex]
    if (prevTrack) {
      setCurrentTrack(prevTrack)
    }
    setProgress(0)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value)
    setProgress(newProgress)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value))
  }

  if (!currentTrack) return null

  return (
    <div className={`spotify-widget ${className}`}>
      {/* Widget toggle */}
      <motion.button
        className="spotify-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="spotify-icon">🎵</span>
        <span className="spotify-text">Now Playing</span>
        {isPlaying && (
          <motion.div
            className="playing-indicator"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Widget window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="spotify-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="spotify-header">
              <div className="spotify-title">
                <span className="title-icon">🎵</span>
                <span className="title-text">Now Playing</span>
              </div>
              <div className="spotify-status">
                <span className={`status-dot ${isPlaying ? 'playing' : 'paused'}`}></span>
                <span className="status-text">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Track info */}
            <div className="track-info">
              <div className="track-image">
                <div className="album-art-placeholder">
                  <span className="album-icon">🎵</span>
                </div>
                {isPlaying && (
                  <motion.div
                    className="vinyl-effect"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
              
              <div className="track-details">
                <h3 className="track-name">{currentTrack.name}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
                <p className="track-album">{currentTrack.album}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-section">
              <div className="progress-time">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={currentTrack.duration}
                value={progress}
                onChange={handleProgressChange}
                className="progress-bar"
              />
            </div>

            {/* Controls */}
            <div className="player-controls">
              <motion.button
                className="control-button"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏮️
              </motion.button>
              
              <motion.button
                className="play-button"
                onClick={handlePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>
              
              <motion.button
                className="control-button"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏭️
              </motion.button>
            </div>

            {/* Volume control */}
            <div className="volume-section">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-bar"
              />
              <span className="volume-value">{volume}%</span>
            </div>

            {/* Playlist */}
            <div className="playlist-section">
              <h4 className="playlist-title">Recently Played</h4>
              <div className="playlist-tracks">
                {mockTracks.map((track) => (
                  <motion.div
                    key={track.id}
                    className={`playlist-track ${currentTrack.id === track.id ? 'active' : ''}`}
                    whileHover={{ x: 5 }}
                    onClick={() => setCurrentTrack(track)}
                  >
                    <div className="track-thumbnail-placeholder">
                      <span className="track-icon">🎵</span>
                    </div>
                    <div className="track-info-small">
                      <span className="track-name-small">{track.name}</span>
                      <span className="track-artist-small">{track.artist}</span>
                    </div>
                    <span className="track-duration">{formatTime(track.duration)}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="spotify-footer">
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-link"
              >
                <span className="link-icon">🎵</span>
                <span className="link-text">Open in Spotify</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

