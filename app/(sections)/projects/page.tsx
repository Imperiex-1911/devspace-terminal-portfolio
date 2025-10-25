import { Projects } from '@/components/Sections/Projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | DevSpace Terminal',
  description: 'Explore my portfolio of web development projects, featuring modern technologies and innovative solutions.',
  openGraph: {
    title: 'Projects | DevSpace Terminal',
    description: 'Explore my portfolio of web development projects and innovative solutions.',
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-terminal-bg" role="main">
      <Projects />
    </div>
  )
}

