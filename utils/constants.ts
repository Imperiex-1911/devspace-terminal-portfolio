// Application constants
export const APP_NAME = 'DevSpace Terminal'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'A terminal-themed portfolio showcasing modern web development with 3D elements and interactive features'
export const APP_AUTHOR = 'Developer'
export const APP_URL = 'https://devspace-terminal.vercel.app'

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
export const API_ENDPOINTS = {
  CHAT: '/chat',
  CONTACT: '/contact',
  GITHUB: '/github',
  ANALYTICS: '/analytics'
} as const

// GitHub configuration
export const GITHUB = {
  USERNAME: 'developer',
  REPO: 'devspace-terminal',
  API_URL: 'https://api.github.com',
  RATE_LIMIT: 5000, // requests per hour
  CONTRIBUTION_YEARS: 3
} as const

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/developer',
  LINKEDIN: 'https://linkedin.com/in/developer',
  TWITTER: 'https://twitter.com/developer',
  DISCORD: 'https://discord.com/users/developer',
  EMAIL: 'mailto:developer@example.com',
  PORTFOLIO: 'https://devspace-terminal.vercel.app'
} as const

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'developer@example.com',
  PHONE: '+1 (555) 123-4567',
  LOCATION: 'Digital Space',
  TIMEZONE: 'UTC+0',
  AVAILABILITY: 'Open to opportunities'
} as const

// Terminal configuration
export const TERMINAL_CONFIG = {
  MAX_HISTORY: 100,
  MAX_COMMAND_LENGTH: 1000,
  TYPING_SPEED: 50, // ms per character
  CURSOR_BLINK_SPEED: 500, // ms
  AUTO_COMPLETE: true,
  SOUND_ENABLED: false,
  THEME: 'dark' as const
} as const

// Command configuration
export const COMMANDS = {
  HELP: 'help',
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACT: 'contact',
  CLEAR: 'clear',
  WHOAMI: 'whoami',
  LS: 'ls',
  CAT: 'cat',
  ECHO: 'echo',
  DATE: 'date',
  GITHUB: 'github',
  SOCIAL: 'social',
  RESUME: 'resume',
  WEATHER: 'weather'
} as const

// 3D configuration
export const THREE_CONFIG = {
  CAMERA: {
    FOV: 50,
    NEAR: 0.1,
    FAR: 1000,
    POSITION: { x: 5, y: 5, z: 5 }
  },
  LIGHTING: {
    AMBIENT_INTENSITY: 0.4,
    DIRECTIONAL_INTENSITY: 1,
    POINT_INTENSITY: 0.5
  },
  CONTROLS: {
    ENABLE_PAN: true,
    ENABLE_ZOOM: true,
    ENABLE_ROTATE: true,
    MIN_DISTANCE: 3,
    MAX_DISTANCE: 20,
    AUTO_ROTATE: false
  }
} as const

// Animation configuration
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.0
  },
  EASING: {
    EASE_OUT: 'easeOut',
    EASE_IN: 'easeIn',
    EASE_IN_OUT: 'easeInOut',
    LINEAR: 'linear'
  },
  STAGGER: {
    DELAY: 0.1,
    CHILDREN: 0.2
  }
} as const

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE: 1536
} as const

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  NOTIFICATION: 1080
} as const

// Color schemes
export const COLOR_SCHEMES = {
  PRIMARY: '#00ff41',
  SECONDARY: '#0080ff',
  ACCENT: '#ff0080',
  SUCCESS: '#00ff41',
  WARNING: '#ffaa00',
  ERROR: '#ff0040',
  INFO: '#0080ff'
} as const

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILIES: {
    PRIMARY: 'Inter, system-ui, sans-serif',
    SECONDARY: 'Inter, system-ui, sans-serif',
    MONO: 'JetBrains Mono, Fira Code, monospace',
    TERMINAL: 'Courier New, monospace'
  },
  FONT_SIZES: {
    XS: '0.75rem',
    SM: '0.875rem',
    BASE: '1rem',
    LG: '1.125rem',
    XL: '1.25rem',
    '2XL': '1.5rem',
    '3XL': '1.875rem',
    '4XL': '2.25rem',
    '5XL': '3rem'
  },
  FONT_WEIGHTS: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800
  },
  LINE_HEIGHTS: {
    TIGHT: 1.25,
    NORMAL: 1.5,
    RELAXED: 1.75
  }
} as const

// Spacing
export const SPACING = {
  XS: '0.25rem',
  SM: '0.5rem',
  MD: '1rem',
  LG: '1.5rem',
  XL: '2rem',
  '2XL': '3rem',
  '3XL': '4rem',
  '4XL': '6rem'
} as const

// Border radius
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '0.25rem',
  MD: '0.5rem',
  LG: '0.75rem',
  XL: '1rem',
  '2XL': '1.5rem',
  FULL: '9999px'
} as const

// Shadows
export const SHADOWS = {
  SM: '0 1px 2px rgba(0, 0, 0, 0.1)',
  MD: '0 4px 6px rgba(0, 0, 0, 0.1)',
  LG: '0 10px 15px rgba(0, 0, 0, 0.1)',
  XL: '0 20px 25px rgba(0, 0, 0, 0.1)',
  '2XL': '0 25px 50px rgba(0, 0, 0, 0.25)',
  INNER: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  GLOW: '0 0 20px rgba(0, 255, 65, 0.3)'
} as const

// Project categories
export const PROJECT_CATEGORIES = {
  WEB: 'web',
  THREE_D: '3d',
  MOBILE: 'mobile',
  AI: 'ai',
  DESKTOP: 'desktop',
  GAME: 'game'
} as const

// Skill categories
export const SKILL_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  TOOLS: 'tools',
  LANGUAGES: 'languages',
  DATABASES: 'databases',
  DEVOPS: 'devops',
  DESIGN: 'design'
} as const

// Experience levels
export const EXPERIENCE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
} as const

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

// File types
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  VIDEO: ['mp4', 'webm', 'ogg', 'avi', 'mov'],
  AUDIO: ['mp3', 'wav', 'ogg', 'aac'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  CODE: ['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'sass', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs', 'swift', 'kt']
} as const

// MIME types
export const MIME_TYPES = {
  IMAGE: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    SVG: 'image/svg+xml',
    WEBP: 'image/webp'
  },
  VIDEO: {
    MP4: 'video/mp4',
    WEBM: 'video/webm',
    OGG: 'video/ogg'
  },
  AUDIO: {
    MP3: 'audio/mpeg',
    WAV: 'audio/wav',
    OGG: 'audio/ogg'
  },
  APPLICATION: {
    PDF: 'application/pdf',
    JSON: 'application/json',
    ZIP: 'application/zip'
  }
} as const

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
} as const

// Environment variables
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test'
} as const

// Feature flags
export const FEATURES = {
  TERMINAL: true,
  THREE_D: true,
  CHATBOT: true,
  CODE_PLAYGROUND: true,
  SPOTIFY_WIDGET: true,
  GITHUB_INTEGRATION: true,
  ANALYTICS: true,
  PWA: true
} as const

// Performance thresholds
export const PERFORMANCE = {
  LCP_THRESHOLD: 2500, // ms
  FID_THRESHOLD: 100, // ms
  CLS_THRESHOLD: 0.1,
  FCP_THRESHOLD: 1800, // ms
  TTI_THRESHOLD: 3800 // ms
} as const

// Cache configuration
export const CACHE = {
  TTL: {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 30 * 60 * 1000, // 30 minutes
    LONG: 24 * 60 * 60 * 1000, // 24 hours
    VERY_LONG: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  KEYS: {
    THEME: 'theme',
    USER_PREFERENCES: 'user_preferences',
    CACHED_DATA: 'cached_data'
  }
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  CREATED: 'Item created successfully.',
  UPDATED: 'Item updated successfully.',
  SENT: 'Message sent successfully.',
  UPLOADED: 'File uploaded successfully.'
} as const

// Validation rules
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/
} as const

// Default values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  DEBOUNCE_DELAY: 300, // ms
  THROTTLE_DELAY: 100, // ms
  RETRY_ATTEMPTS: 3,
  TIMEOUT: 10000 // ms
} as const

