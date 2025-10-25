interface CommandResult {
  type: 'success' | 'error' | 'info'
  content: string
  data?: any
}

interface Command {
  name: string
  description: string
  usage: string
  aliases?: string[]
  execute: (args: string[]) => Promise<string>
}

const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    usage: 'help [command]',
    execute: async (args) => {
      if (args.length > 0 && args[0]) {
        const firstArg = args[0]
        const command = commands.find(cmd => 
          cmd.name === firstArg || cmd.aliases?.includes(firstArg)
        )
        if (command) {
          return `Command: ${command.name}
Description: ${command.description}
Usage: ${command.usage}
${command.aliases ? `Aliases: ${command.aliases.join(', ')}` : ''}`
        }
        return `Command '${args[0]}' not found. Type 'help' to see all commands.`
      }

      const helpText = `Available commands:
${commands.map(cmd => `  ${cmd.name.padEnd(15)} - ${cmd.description}`).join('\n')}

Type 'help <command>' for detailed information about a specific command.`
      return helpText
    }
  },
  {
    name: 'about',
    description: 'Show information about the developer',
    usage: 'about',
    execute: async () => {
      return `About Me
========

Name:       Sanjay
GitHub:     github.com/Imperiex-1911
Email:      sanjayravichandran170606@gmail.com

Passion:    Building innovative web applications with AI/ML

---

I'm a passionate full-stack developer specializing in AI/ML
integration and educational technology. I focus on creating
interactive applications that combine cutting-edge AI with
practical user experiences.

Current Project:
• Phantom Phisher - AI-powered phishing awareness platform

Core Skills:
• Next.js & TypeScript - Modern web development
• AI/ML Integration - Google Gemini, scikit-learn
• Python & FastAPI - Backend & ML services
• Chrome Extensions - Browser automation

Type 'projects' to see my work
Type 'skills' for detailed technical abilities
Type 'github' to visit my GitHub profile`
    }
  },
  {
    name: 'projects',
    description: 'Show featured projects',
    usage: 'projects',
    execute: async () => {
      return `Featured Project:

⭐ Phantom Phisher (Active Development)
   AI-powered educational phishing awareness platform
   
   🎮 Educational Game Features:
   • AI-Generated Emails - Powered by Google Gemini 1.5 Flash
   • ML Phishing Classifier - Real-time detection with confidence scores
   • Gamification System - Points, streaks, 17 unlockable achievements
   • Custom Usernames - Personalized leaderboard profiles
   • Global Leaderboard - Compete with players worldwide
   • Halloween Theme - Spooky animations and particle effects
   
   🔧 Chrome Extension Features:
   • Real-time Gmail Protection - Automatic email scanning
   • Visual Risk Warnings - Color-coded threat indicators
   • Statistics Dashboard - Track scanned emails & blocked threats
   • Privacy-First - All processing happens locally
   • Manifest V3 - Modern Chrome extension architecture
   
   Technologies:
   • Next.js 14 & TypeScript - Modern web framework
   • Python & FastAPI - Backend ML service
   • Google Gemini API - AI email generation
   • scikit-learn - Machine learning classifier
   • Supabase - Authentication & database
   • Tailwind CSS & Framer Motion - Beautiful UI
   
   Status: In Active Development
   GitHub: github.com/Imperiex-1911/phantom-phisher
   
   Combining AI and ML to teach phishing awareness through
   interactive gameplay and real-world browser protection.

Visit github.com/Imperiex-1911 to see all repositories!`
    }
  },
  {
    name: 'skills',
    description: 'Show technical skills and expertise',
    usage: 'skills [category]',
    execute: async (args) => {
      const skills = {
        frontend: [
          'Next.js 14', 'React', 'TypeScript',
          'Tailwind CSS', 'Framer Motion', 'HTML5 & CSS3'
        ],
        backend: [
          'Python', 'FastAPI', 'Supabase',
          'PostgreSQL', 'REST APIs'
        ],
        ai: [
          'Google Gemini API', 'scikit-learn',
          'Machine Learning', 'AI Integration'
        ],
        tools: [
          'Git & GitHub', 'VS Code', 'Chrome Extensions',
          'Vercel', 'Docker', 'Manifest V3'
        ]
      }

      if (args.length > 0 && args[0]) {
        const category = args[0].toLowerCase()
        if (skills[category as keyof typeof skills]) {
          return `${category.toUpperCase()} Skills:
${skills[category as keyof typeof skills].map(skill => `  • ${skill}`).join('\n')}`
        }
        return `Category '${category}' not found. Available: ${Object.keys(skills).join(', ')}`
      }

      return `Technical Skills
================

Frontend Development
-------------------
  • Next.js 14              Modern React framework
  • React                   UI library
  • TypeScript              Type-safe development
  • Tailwind CSS            Utility-first CSS
  • Framer Motion           Animation library
  • HTML5 & CSS3            Web fundamentals

Backend Development
------------------
  • Python                  Backend programming
  • FastAPI                 Modern Python framework
  • Supabase                Backend as a service
  • PostgreSQL              Database
  • REST APIs               API development

AI & Machine Learning
--------------------
  • Google Gemini API       AI text generation
  • scikit-learn            ML library
  • Machine Learning        Classification models
  • AI Integration          Practical AI applications

Tools & Technologies
-------------------
  • Git & GitHub            Version control
  • VS Code                 Code editor
  • Chrome Extensions       Browser automation
  • Vercel                  Deployment platform
  • Docker                  Containerization
  • Manifest V3             Modern extension API

Type 'skills <category>' for specific details.
Available categories: frontend, backend, ai, tools`
    }
  },
  {
    name: 'contact',
    description: 'Show contact information',
    usage: 'contact',
    execute: async () => {
      return `Contact Information:

Name:      Sanjay
Email:     sanjayravichandran170606@gmail.com
GitHub:    github.com/Imperiex-1911
Portfolio: devspace-terminal.vercel.app

Feel free to reach out for collaboration or just to connect!

Type 'github' to visit my GitHub profile.`
    }
  },
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    usage: 'clear',
    aliases: ['cls'],
    execute: async () => {
      return 'CLEAR' // Special command that will be handled by the terminal component
    }
  },
  {
    name: 'whoami',
    description: 'Display current user information',
    usage: 'whoami',
    execute: async () => {
      return `User: developer
Host: devspace-terminal
System: Next.js Terminal
Shell: /bin/bash
Home: /home/developer
Terminal: devspace-terminal v1.0.0`
    }
  },
  {
    name: 'ls',
    description: 'List directory contents',
    usage: 'ls [path]',
    execute: async (args) => {
      const path = args[0] || '.'
      return `Directory: ${path}

drwxr-xr-x  2 developer developer  4096 Sep 20 11:00 .
drwxr-xr-x  3 developer developer  4096 Sep 20 10:59 ..
-rw-r--r--  1 developer developer  1024 Sep 20 11:00 about.txt
-rw-r--r--  1 developer developer  2048 Sep 20 11:00 projects.txt
-rw-r--r--  1 developer developer  1536 Sep 20 11:00 skills.txt
-rw-r--r--  1 developer developer   512 Sep 20 11:00 contact.txt
drwxr-xr-x  2 developer developer  4096 Sep 20 11:00 src/
drwxr-xr-x  2 developer developer  4096 Sep 20 11:00 docs/`
    }
  },
  {
    name: 'cat',
    description: 'Display file contents',
    usage: 'cat <filename>',
    execute: async (args) => {
      if (args.length === 0) {
        return 'Usage: cat <filename>'
      }

      const filename = args[0]
      const files: Record<string, string> = {
        'about.txt': `About Developer
================

I'm a passionate full-stack developer with expertise in
modern web technologies. I love creating interactive
experiences and solving complex problems.

Specialties:
- Frontend: React, TypeScript, Three.js
- Backend: Node.js, Python, Databases
- 3D Graphics: WebGL, Blender, Shaders
- DevOps: Docker, AWS, CI/CD

Always learning and exploring new technologies!`,
        'projects.txt': `Featured Project
===============

Phantom Phisher (Active Development)
------------------------------------

Description:
  AI-powered educational phishing awareness platform
  combining AI email generation with ML-based detection.

🎮 Educational Game Features:
  • AI-Generated Emails by Google Gemini 1.5 Flash
  • ML Phishing Classifier with confidence scores
  • Gamification: Points, streaks, 17 achievements
  • Custom Usernames & Global Leaderboard
  • Halloween Theme with spooky animations
  • 8 synthesized sound effects (Web Audio API)

🔧 Chrome Extension Features:
  • Real-time Gmail Protection
  • Visual Risk Warnings (color-coded)
  • Statistics Dashboard
  • Privacy-First (local processing)
  • Chrome Manifest V3

Technologies:
  • Next.js 14 & TypeScript
  • Python & FastAPI
  • Google Gemini API (AI)
  • scikit-learn (ML)
  • Supabase (Auth & DB)
  • Tailwind CSS & Framer Motion

Repository:
  github.com/Imperiex-1911/phantom-phisher

Status:
  In Active Development

About:
  A comprehensive platform teaching phishing awareness
  through interactive AI-powered gameplay and real-world
  browser protection. Combines cutting-edge AI with ML
  to create engaging educational experiences.`,
        'skills.txt': `Technical Skills
===============

Frontend:
- Next.js 14 & React
- TypeScript
- Tailwind CSS
- Framer Motion

Backend:
- Python & FastAPI
- Supabase
- PostgreSQL

AI & Machine Learning:
- Google Gemini API
- scikit-learn

Tools:
- Chrome Extensions
- Git & GitHub
- Vercel & Docker`,
        'contact.txt': `Contact Information
==================

Name:      Sanjay
Email:     sanjayravichandran170606@gmail.com
GitHub:    github.com/Imperiex-1911
Portfolio: devspace-terminal.vercel.app

Open to collaboration and new opportunities!
Visit my GitHub to see my work and projects.`
      }

      if (filename && files[filename]) {
        return files[filename]
      }
      return `File '${filename}' not found.`
    }
  },
  {
    name: 'echo',
    description: 'Display text',
    usage: 'echo <text>',
    execute: async (args) => {
      return args.join(' ')
    }
  },
  {
    name: 'date',
    description: 'Display current date and time',
    usage: 'date',
    execute: async () => {
      const now = new Date()
      return now.toString()
    }
  },
  {
    name: 'github',
    description: 'Show GitHub information',
    usage: 'github',
    execute: async () => {
      return `GitHub Profile
==============

Profile: github.com/Imperiex-1911

Current Focus:
--------------
• Phantom Phisher - AI-powered phishing awareness platform
• AI/ML Integration - Google Gemini & scikit-learn
• Educational Technology - Gamified learning experiences
• Chrome Extensions - Browser automation & security

Featured Repository:
-------------------
⭐ Phantom Phisher
   AI-powered educational phishing awareness platform
   
   Technologies: Next.js 14, TypeScript, Python, FastAPI,
                Google Gemini API, scikit-learn, Supabase
   
   Status: Active Development

Visit my profile to see more projects and contributions:
→ github.com/Imperiex-1911`
    }
  },
  {
    name: 'social',
    description: 'Show social media links',
    usage: 'social',
    execute: async () => {
      return `Social Media Links:

Name:      Sanjay
Email:     sanjayravichandran170606@gmail.com
GitHub:    github.com/Imperiex-1911
Portfolio: devspace-terminal.vercel.app

Connect with me on GitHub to see my latest work!`
    }
  },
  {
    name: 'resume',
    description: 'Download or view resume',
    usage: 'resume',
    execute: async () => {
      return `Resume Information:

PDF Download: /resume/developer-resume.pdf
Online View:  /resume/view

Experience:
• Senior Developer at TechCorp (2022-Present)
• Full-Stack Developer at StartupXYZ (2020-2022)
• Frontend Developer at WebAgency (2019-2020)

Education:
• Computer Science Degree (2015-2019)
• Various online certifications

Type 'contact' for more information.`
    }
  },
  {
    name: 'weather',
    description: 'Get current weather (demo)',
    usage: 'weather [location]',
    execute: async (args) => {
      const location = args[0] || 'Digital Space'
      return `Weather for ${location}:
Temperature: 22°C (72°F)
Condition: Partly Cloudy
Humidity: 65%
Wind: 10 km/h
Pressure: 1013 hPa

Note: This is a demo weather command.`
    }
  }
]

export const commandRegistry = {
  commands,
  
  findCommand: (name: string): Command | undefined => {
    return commands.find(cmd => 
      cmd.name === name || cmd.aliases?.includes(name)
    )
  },
  
  execute: async (commandName: string, args: string[]): Promise<string> => {
    const command = commandRegistry.findCommand(commandName)
    
    if (!command) {
      throw new Error(`Command '${commandName}' not found. Type 'help' for available commands.`)
    }
    
    try {
      return await command.execute(args)
    } catch (error) {
      throw new Error(`Error executing command '${commandName}': ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  },
  
  getSuggestions: (input: string): string[] => {
    const allCommands = commands.flatMap(cmd => [cmd.name, ...(cmd.aliases || [])])
    return allCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    )
  }
}

