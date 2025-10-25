import { About } from '@/components/Sections/About'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | DevSpace Terminal',
  description: 'Learn more about my background, experience, and passion for web development and technology.',
  openGraph: {
    title: 'About | DevSpace Terminal',
    description: 'Learn more about my background, experience, and passion for web development.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-terminal-bg" role="main">
      <About />
    </div>
  )
}

