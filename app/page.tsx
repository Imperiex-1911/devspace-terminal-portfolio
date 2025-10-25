'use client'

import React, { Suspense } from 'react'
import { Hero } from '@/components/Sections/Hero'
import { About } from '@/components/Sections/About'
import { Projects } from '@/components/Sections/Projects'
import { Skills } from '@/components/Sections/Skills'
import { Contact } from '@/components/Sections/Contact'

// Dynamic imports for better performance
const Chatbot = React.lazy(() => 
  import('@/components/Features/Chatbot').then(mod => ({ default: mod.Chatbot }))
)
const CodePlayground = React.lazy(() => 
  import('@/components/Features/CodePlayground').then(mod => ({ default: mod.CodePlayground }))
)
const SpotifyWidget = React.lazy(() => 
  import('@/components/Features/SpotifyWidget').then(mod => ({ default: mod.SpotifyWidget }))
)

// Loading component for suspense
const WidgetLoader = () => (
  <div className="animate-pulse bg-terminal-accent/20 rounded-lg w-16 h-16" />
)

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Main sections */}
      <section id="home" aria-label="Home section">
        <Hero />
      </section>
      
      <section id="about" aria-label="About section">
        <About />
      </section>
      
      <section id="projects" aria-label="Projects section">
        <Projects />
      </section>
      
      <section id="skills" aria-label="Skills section">
        <Skills />
      </section>
      
      <section id="contact" aria-label="Contact section">
        <Contact />
      </section>

      {/* Floating widgets - loaded lazily for better performance */}
      <Suspense fallback={<WidgetLoader />}>
        <Chatbot />
      </Suspense>
      
      <Suspense fallback={<WidgetLoader />}>
        <CodePlayground />
      </Suspense>
      
      <Suspense fallback={<WidgetLoader />}>
        <SpotifyWidget />
      </Suspense>
    </div>
  )
}

