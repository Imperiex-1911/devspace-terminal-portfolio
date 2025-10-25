'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center, Box, Cylinder } from '@react-three/drei'
import { Group, Mesh } from 'three'
import * as THREE from 'three'

interface WorkspaceProps {
  position?: [number, number, number]
  className?: string
}

export const Workspace: React.FC<WorkspaceProps> = ({ 
  position = [0, 0, 0],
  className = '' 
}) => {
  const groupRef = useRef<Group>(null)
  const deskRef = useRef<Mesh>(null)
  const monitorRef = useRef<Mesh>(null)
  const keyboardRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (deskRef.current) {
      // Subtle desk animation
      deskRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Desk */}
      <Box
        ref={deskRef}
        args={[4, 0.1, 2]}
        position={[0, -0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.8}
          metalness={0.2}
        />
      </Box>

      {/* Desk legs */}
      {[
        [-1.8, -1, -0.8],
        [1.8, -1, -0.8],
        [-1.8, -1, 0.8],
        [1.8, -1, 0.8]
      ].map((pos, index) => (
        <Cylinder
          key={index}
          args={[0.05, 0.05, 1]}
          position={pos as [number, number, number]}
          castShadow
        >
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.9}
            metalness={0.1}
          />
        </Cylinder>
      ))}

      {/* Monitor */}
      <Box
        ref={monitorRef}
        args={[1.2, 0.8, 0.1]}
        position={[0, 0.2, -0.3]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={0.8}
        />
      </Box>

      {/* Monitor stand */}
      <Box
        args={[0.1, 0.1, 0.3]}
        position={[0, -0.2, -0.3]}
        castShadow
      >
        <meshStandardMaterial
          color="#333333"
          roughness={0.7}
          metalness={0.3}
        />
      </Box>

      {/* Monitor screen (glowing) */}
      <Box
        args={[1.1, 0.7, 0.05]}
        position={[0, 0.2, -0.25]}
      >
        <meshStandardMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Keyboard */}
      <Box
        ref={keyboardRef}
        args={[1, 0.05, 0.4]}
        position={[0, -0.4, 0.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.6}
          metalness={0.4}
        />
      </Box>

      {/* Mouse */}
      <Box
        args={[0.2, 0.05, 0.3]}
        position={[0.6, -0.4, 0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.5}
          metalness={0.5}
        />
      </Box>

      {/* Coffee cup */}
      <Cylinder
        args={[0.1, 0.1, 0.3]}
        position={[-0.8, -0.2, 0.5]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0.1}
        />
      </Cylinder>

      {/* Coffee cup handle */}
      <Cylinder
        args={[0.05, 0.05, 0.1]}
        position={[-0.9, -0.1, 0.5]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0.1}
        />
      </Cylinder>

      {/* Floating code particles */}
      <CodeParticles />

      {/* Terminal text on screen */}
      <Center position={[0, 0.2, -0.2]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial
            color="#00ff41"
            transparent
            opacity={0.8}
          />
        </mesh>
      </Center>
    </group>
  )
}

const CodeParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = Math.random() * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    colors[i * 3] = 0 // R
    colors[i * 3 + 1] = 1 // G
    colors[i * 3 + 2] = 0.25 // B
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

