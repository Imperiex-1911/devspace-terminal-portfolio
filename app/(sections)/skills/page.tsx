import { Skills } from '@/components/Sections/Skills'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills | DevSpace Terminal',
  description: 'Discover my technical skills, programming languages, frameworks, and tools I use for web development.',
  openGraph: {
    title: 'Skills | DevSpace Terminal',
    description: 'Discover my technical skills and expertise in web development technologies.',
  },
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-terminal-bg" role="main">
      <Skills />
    </div>
  )
}

