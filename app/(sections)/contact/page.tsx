import { Contact } from '@/components/Sections/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | DevSpace Terminal',
  description: 'Get in touch with me for collaboration, project inquiries, or just to say hello.',
  openGraph: {
    title: 'Contact | DevSpace Terminal',
    description: 'Get in touch with me for collaboration and project inquiries.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-terminal-bg" role="main">
      <Contact />
    </div>
  )
}

