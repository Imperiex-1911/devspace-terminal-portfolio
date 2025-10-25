# DevSpace Terminal

A terminal-themed portfolio website showcasing modern web development with 3D elements, interactive features, and immersive user experiences.

## 🚀 Features

- **Interactive Terminal**: Real-time command execution with custom commands
- **3D Graphics**: Three.js-powered 3D scenes and animations
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Theme Support**: Dark, Light, and Matrix themes
- **AI Chatbot**: Interactive assistant for portfolio exploration
- **Code Playground**: Live code editor with syntax highlighting
- **GitHub Integration**: Real-time GitHub activity and stats
- **PWA Support**: Installable as a Progressive Web App

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/developer/devspace-terminal.git
   cd devspace-terminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Terminal Commands

The interactive terminal supports various commands:

- `help` - Show available commands
- `about` - Display developer information
- `projects` - List featured projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `clear` - Clear terminal screen
- `whoami` - Show current user info
- `ls` - List directory contents
- `cat <filename>` - Display file contents
- `echo <text>` - Display text
- `date` - Show current date/time
- `github` - GitHub profile information
- `social` - Social media links
- `resume` - Resume information
- `weather [location]` - Weather information (demo)

### 3D Scene Controls

- **Mouse**: Rotate camera
- **Scroll**: Zoom in/out
- **Right-click + drag**: Pan camera
- **Double-click**: Reset camera position

### Theme Switching

- Click the theme switcher in the navbar
- Available themes: Dark, Light, Matrix
- Theme preference is saved in localStorage

## 📁 Project Structure

```
devspace-terminal/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (sections)/        # Route groups
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Terminal/          # Terminal components
│   ├── 3D/               # Three.js components
│   ├── Sections/         # Page sections
│   ├── UI/               # UI components
│   └── Features/         # Feature components
├── lib/                  # Utility libraries
│   ├── commands.ts       # Terminal commands
│   ├── chatbot.ts        # AI chatbot logic
│   ├── github.ts         # GitHub API integration
│   └── animations.ts     # Animation utilities
├── store/                # State management
│   └── terminal.ts       # Terminal store
├── utils/                # Utility functions
│   ├── theme.ts          # Theme management
│   ├── helpers.ts        # Helper functions
│   └── constants.ts      # App constants
├── styles/               # Additional styles
│   └── terminal.css      # Terminal-specific styles
└── public/               # Static assets
    ├── manifest.json     # PWA manifest
    └── service-worker.js # Service worker
```

## 🎨 Customization

### Adding New Terminal Commands

1. Edit `lib/commands.ts`
2. Add your command to the `commands` array:

```typescript
{
  name: 'mycommand',
  description: 'My custom command',
  usage: 'mycommand [args]',
  execute: async (args) => {
    return 'Command executed!'
  }
}
```

### Adding New 3D Objects

1. Create a new component in `components/3D/`
2. Use React Three Fiber syntax:

```typescript
export const MyObject = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}
```

### Customizing Themes

1. Edit `utils/theme.ts`
2. Add your theme to the `themes` object:

```typescript
myTheme: {
  name: 'My Theme',
  colors: {
    primary: '#ff0000',
    // ... other colors
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Environment Variables

Set these in your deployment platform:

- `NEXT_PUBLIC_API_URL` - Your API base URL
- `GITHUB_TOKEN` - GitHub API token (optional)
- `NODE_ENV` - Set to 'production'

## 📱 PWA Features

The app is a Progressive Web App with:

- **Offline Support**: Cached resources work offline
- **Installable**: Add to home screen on mobile
- **Responsive**: Works on all device sizes
- **Fast Loading**: Optimized for performance

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add proper TypeScript types
- Include JSDoc comments for complex functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Three.js](https://threejs.org/) - 3D graphics library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

- **Email**: developer@example.com
- **GitHub**: [@developer](https://github.com/developer)
- **LinkedIn**: [developer](https://linkedin.com/in/developer)
- **Portfolio**: [devspace-terminal.vercel.app](https://devspace-terminal.vercel.app)

---

Made with ❤️ and lots of ☕ by [Developer](https://github.com/developer)

