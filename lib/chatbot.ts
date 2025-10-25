interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    entities?: Record<string, any>
  }
}

interface ChatbotConfig {
  name: string
  personality: string
  responses: {
    greeting: string[]
    about: string[]
    projects: string[]
    skills: string[]
    contact: string[]
    default: string[]
  }
  commands: {
    [key: string]: (args: string[]) => string
  }
}

export class Chatbot {
  private config: ChatbotConfig
  private conversationHistory: ChatMessage[] = []
  private context: Record<string, any> = {}

  constructor(config?: Partial<ChatbotConfig>) {
    this.config = {
      name: 'AI Assistant',
      personality: 'helpful and friendly',
      responses: {
        greeting: [
          "Hello! Great to meet you! 👋",
          "Hi there! How can I assist you today?",
          "Hey! Welcome to the devspace terminal!",
          "Greetings! What brings you here?",
          "Hello! I'm here to help you explore this portfolio."
        ],
        about: [
          "I'm an AI assistant created to help visitors learn about this portfolio. I can answer questions about projects, skills, and more!",
          "This is a terminal-themed portfolio showcasing modern web development with 3D elements and interactive features.",
          "The developer behind this site specializes in React, TypeScript, Three.js, and creating immersive web experiences.",
          "This portfolio demonstrates skills in full-stack development, 3D graphics, and modern web technologies."
        ],
        projects: [
          "Here are some featured projects: DevSpace Terminal (current), 3D Portfolio, Real-time Chat App, and ML Dashboard.",
          "The projects showcase various technologies including Next.js, Three.js, Node.js, and Python.",
          "You can explore the projects section to see detailed information about each one.",
          "The developer has worked on both frontend and backend projects, with a focus on interactive web experiences."
        ],
        skills: [
          "The developer's skills include React, TypeScript, Three.js, Node.js, Python, and many more modern technologies.",
          "Frontend: React, Next.js, TypeScript, Three.js, WebGL, Tailwind CSS",
          "Backend: Node.js, Python, PostgreSQL, MongoDB, Docker, AWS",
          "Tools: Git, VS Code, Figma, Blender, Linux",
          "The skill set covers the full development stack from frontend to backend and DevOps."
        ],
        contact: [
          "You can reach out via email at developer@example.com or through the contact form.",
          "Social media links are available in the footer: GitHub, LinkedIn, Twitter, Discord.",
          "Feel free to ask about collaboration opportunities or just say hello!",
          "The developer is always open to discussing new projects and opportunities."
        ],
        default: [
          "That's an interesting question! Let me think about that...",
          "I'm not sure about that specific topic, but I can help with questions about this portfolio.",
          "Could you rephrase that? I want to make sure I understand correctly.",
          "I'm still learning! Try asking about projects, skills, or the developer's background.",
          "That's a great question! While I don't have specific information about that, I can help with portfolio-related topics."
        ]
      },
      commands: {
        help: () => "I can help you with information about projects, skills, contact details, and more. Just ask me anything!",
        clear: () => "Conversation cleared! How can I help you?",
        time: () => `The current time is ${new Date().toLocaleTimeString()}`,
        date: () => `Today is ${new Date().toLocaleDateString()}`,
        weather: () => "I don't have access to real-time weather data, but I can help with portfolio-related questions!",
        joke: () => "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        quote: () => "Code is like humor. When you have to explain it, it's bad. - Cory House"
      },
      ...config
    }
  }

  async processMessage(input: string): Promise<ChatMessage> {
    const metadata = this.analyzeIntent(input)
    const userMessage: ChatMessage = {
      id: this.generateId(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      ...(metadata && { metadata })
    }

    this.conversationHistory.push(userMessage)

    const botResponse = await this.generateResponse(input)
    
    const botMessage: ChatMessage = {
      id: this.generateId(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    }

    this.conversationHistory.push(botMessage)
    return botMessage
  }

  private analyzeIntent(input: string): ChatMessage['metadata'] {
    const lowerInput = input.toLowerCase()
    
    // Intent detection
    let intent = 'general'
    let confidence = 0.5

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      intent = 'greeting'
      confidence = 0.9
    } else if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('what')) {
      intent = 'about'
      confidence = 0.8
    } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      intent = 'projects'
      confidence = 0.8
    } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('technology')) {
      intent = 'skills'
      confidence = 0.8
    } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
      intent = 'contact'
      confidence = 0.8
    } else if (lowerInput.startsWith('/')) {
      intent = 'command'
      confidence = 0.9
    }

    // Entity extraction
    const entities: Record<string, any> = {}
    
    // Extract names
    const nameMatch = input.match(/(?:my name is|i'm|i am)\s+(\w+)/i)
    if (nameMatch) {
      entities.name = nameMatch[1]
    }

    // Extract technologies
    const techKeywords = ['react', 'typescript', 'javascript', 'python', 'node', 'three', 'webgl']
    const mentionedTechs = techKeywords.filter(tech => lowerInput.includes(tech))
    if (mentionedTechs.length > 0) {
      entities.technologies = mentionedTechs
    }

    return {
      intent,
      confidence,
      entities
    }
  }

  private async generateResponse(input: string): Promise<string> {
    const lowerInput = input.toLowerCase()
    
    // Check for commands
    if (lowerInput.startsWith('/')) {
      const command = lowerInput.slice(1).split(' ')[0]
      const args = lowerInput.slice(1).split(' ').slice(1)
      
      if (command && this.config.commands[command]) {
        return this.config.commands[command](args)
      } else {
        return `Unknown command: ${command}. Type /help for available commands.`
      }
    }

    // Intent-based responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return this.getRandomResponse('greeting')
    }
    
    if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('what')) {
      return this.getRandomResponse('about')
    }
    
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return this.getRandomResponse('projects')
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('technology')) {
      return this.getRandomResponse('skills')
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
      return this.getRandomResponse('contact')
    }

    // Context-aware responses
    if (this.context.lastTopic) {
      const contextResponse = this.getContextualResponse(lowerInput, this.context.lastTopic)
      if (contextResponse) {
        return contextResponse
      }
    }

    // Default response
    return this.getRandomResponse('default')
  }

  private getRandomResponse(category: keyof ChatbotConfig['responses']): string {
    const responses = this.config.responses[category]
    return responses[Math.floor(Math.random() * responses.length)] || "I'm not sure how to respond to that."
  }

  private getContextualResponse(input: string, lastTopic: string): string | null {
    // Add contextual responses based on conversation history
    if (lastTopic === 'projects' && input.includes('technology')) {
      return "The projects use various technologies like React, TypeScript, Three.js, Node.js, and Python. Each project is built with modern best practices!"
    }
    
    if (lastTopic === 'skills' && input.includes('experience')) {
      return "The developer has 3+ years of experience with modern web technologies and is always learning new skills!"
    }

    return null
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory]
  }

  clearHistory(): void {
    this.conversationHistory = []
    this.context = {}
  }

  getContext(): Record<string, any> {
    return { ...this.context }
  }

  setContext(key: string, value: any): void {
    this.context[key] = value
  }
}

// Export a default instance
export const defaultChatbot = new Chatbot()

