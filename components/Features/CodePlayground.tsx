'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodePlaygroundProps {
  className?: string
}

interface CodeExample {
  id: string
  title: string
  description: string
  language: string
  code: string
  category: string
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [customCode, setCustomCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'examples' | 'custom' | 'output'>('examples')

  const codeExamples: CodeExample[] = [
    {
      id: 'react-component',
      title: 'React Component',
      description: 'A simple React component with TypeScript',
      language: 'tsx',
      category: 'React',
      code: `import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={\`btn btn-\${variant} \${isPressed ? 'pressed' : ''}\`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
};

export default Button;`
    },
    {
      id: 'threejs-scene',
      title: 'Three.js Scene',
      description: 'Basic Three.js scene setup with a rotating cube',
      language: 'javascript',
      category: 'Three.js',
      code: `import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer();

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ 
  color: 0x00ff41 
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();`
    },
    {
      id: 'terminal-command',
      title: 'Terminal Command',
      description: 'A custom terminal command implementation',
      language: 'typescript',
      category: 'Terminal',
      code: `interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => Promise<string>;
}

class TerminalCommand implements Command {
  name = 'hello';
  description = 'Say hello to the user';

  async execute(args: string[]): Promise<string> {
    const name = args[0] || 'World';
    return \`Hello, \${name}! Welcome to the terminal.\`;
  }
}

// Usage
const command = new TerminalCommand();
const result = await command.execute(['Developer']);
console.log(result); // "Hello, Developer! Welcome to the terminal."`
    },
    {
      id: 'animation-hook',
      title: 'Animation Hook',
      description: 'Custom React hook for animations',
      language: 'typescript',
      category: 'React',
      code: `import { useState, useEffect } from 'react';

interface UseAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

export const useAnimation = (options: UseAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, options.delay || 0);

    return () => clearTimeout(timer);
  }, [options.delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = options.duration || 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, options.duration]);

  return { isVisible, progress };
};`
    }
  ]

  const runCode = async (code: string, language: string) => {
    setIsRunning(true)
    setOutput('')

    // Simulate code execution
    setTimeout(() => {
      let result = ''
      
      if (language === 'javascript' || language === 'tsx') {
        result = 'Code executed successfully!\n\nOutput:\nHello, World!\n\nExecution time: 0.001s'
      } else if (language === 'typescript') {
        result = 'TypeScript compiled successfully!\n\nNo errors found.\n\nGenerated JavaScript:\n// Compiled output would appear here'
      } else {
        result = 'Code processed successfully!\n\nThis is a demo output.\n\nIn a real environment, this would execute the actual code.'
      }

      setOutput(result)
      setIsRunning(false)
    }, 1000 + Math.random() * 1000)
  }

  const getLanguageIcon = (language: string) => {
    const icons: Record<string, string> = {
      'tsx': '⚛️',
      'typescript': '🔷',
      'javascript': '⚡',
      'python': '🐍',
      'css': '🎨',
      'html': '🌐'
    }
    return icons[language] || '💻'
  }

  return (
    <div className={`code-playground ${className}`}>
      {/* Toggle button */}
      <motion.button
        className="playground-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="playground-icon">💻</span>
        <span className="playground-text">Code Playground</span>
      </motion.button>

      {/* Playground window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="playground-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="playground-header">
              <div className="playground-title">
                <span className="title-icon">🚀</span>
                <span className="title-text">Code Playground</span>
              </div>
              <div className="playground-actions">
                <button
                  className="action-button"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="playground-tabs">
              <button
                className={`tab ${activeTab === 'examples' ? 'active' : ''}`}
                onClick={() => setActiveTab('examples')}
              >
                📚 Examples
              </button>
              <button
                className={`tab ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                ✏️ Custom
              </button>
              <button
                className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                📤 Output
              </button>
            </div>

            {/* Content */}
            <div className="playground-content">
              {activeTab === 'examples' && (
                <div className="examples-tab">
                  <div className="examples-grid">
                    {codeExamples.map((example) => (
                      <motion.div
                        key={example.id}
                        className="example-card"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedExample(example.id)}
                      >
                        <div className="example-header">
                          <span className="example-icon">
                            {getLanguageIcon(example.language)}
                          </span>
                          <h3 className="example-title">{example.title}</h3>
                        </div>
                        <p className="example-description">{example.description}</p>
                        <div className="example-meta">
                          <span className="example-language">{example.language}</span>
                          <span className="example-category">{example.category}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {selectedExample && (
                    <motion.div
                      className="example-code"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {(() => {
                        const example = codeExamples.find(e => e.id === selectedExample)
                        if (!example) return null

                        return (
                          <div className="code-container">
                            <div className="code-header">
                              <h4>{example.title}</h4>
                              <button
                                className="run-button"
                                onClick={() => runCode(example.code, example.language)}
                                disabled={isRunning}
                              >
                                {isRunning ? 'Running...' : '▶️ Run'}
                              </button>
                            </div>
                            <SyntaxHighlighter
                              language={example.language}
                              style={vscDarkPlus}
                              customStyle={{
                                background: 'transparent',
                                padding: 0,
                                margin: 0,
                                fontSize: '0.9rem'
                              }}
                            >
                              {example.code}
                            </SyntaxHighlighter>
                          </div>
                        )
                      })()}
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'custom' && (
                <div className="custom-tab">
                  <div className="code-editor">
                    <div className="editor-header">
                      <span className="editor-title">Custom Code</span>
                      <select className="language-select">
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="tsx">React (TSX)</option>
                        <option value="python">Python</option>
                      </select>
                    </div>
                    <textarea
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder="Write your code here..."
                      className="code-textarea"
                    />
                    <div className="editor-actions">
                      <button
                        className="run-button"
                        onClick={() => runCode(customCode, 'javascript')}
                        disabled={!customCode.trim() || isRunning}
                      >
                        {isRunning ? 'Running...' : '▶️ Run Code'}
                      </button>
                      <button
                        className="clear-button"
                        onClick={() => setCustomCode('')}
                      >
                        🗑️ Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'output' && (
                <div className="output-tab">
                  <div className="output-container">
                    <div className="output-header">
                      <span className="output-title">Execution Output</span>
                      <span className="output-status">
                        {isRunning ? 'Running...' : 'Ready'}
                      </span>
                    </div>
                    <pre className="output-content">
                      {output || 'No output yet. Run some code to see the results!'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

