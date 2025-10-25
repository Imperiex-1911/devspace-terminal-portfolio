'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text3D, Center } from '@react-three/drei'
import { Group, Mesh } from 'three'

interface FloatingLaptopProps {
  position?: [number, number, number]
  className?: string
}

export const FloatingLaptop: React.FC<FloatingLaptopProps> = ({ 
  position = [0, 0, 0],
  className = '' 
}) => {
  const groupRef = useRef<Group>(null)
  const laptopRef = useRef<Mesh>(null)
  const screenRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }

    if (screenRef.current) {
      // Screen glow animation
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      if (screenRef.current.material && 'emissiveIntensity' in screenRef.current.material) {
        (screenRef.current.material as any).emissiveIntensity = intensity
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Laptop base */}
      <Box
        ref={laptopRef}
        args={[1.5, 0.1, 1]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.3}
          metalness={0.7}
        />
      </Box>

      {/* Laptop screen */}
      <Box
        args={[1.4, 0.8, 0.05]}
        position={[0, 0.45, -0.4]}
        rotation={[0.2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={0.8}
        />
      </Box>

      {/* Screen display */}
      <Box
        ref={screenRef}
        args={[1.3, 0.7, 0.02]}
        position={[0, 0.45, -0.35]}
        rotation={[0.2, 0, 0]}
      >
        <meshStandardMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Screen hinge */}
      <Box
        args={[0.2, 0.05, 0.1]}
        position={[0, 0.05, -0.45]}
        castShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.2}
        />
      </Box>

      {/* Keyboard keys */}
      <KeyboardKeys />

      {/* Trackpad */}
      <Box
        args={[0.3, 0.02, 0.2]}
        position={[0, 0.05, 0.1]}
        castShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.6}
          metalness={0.4}
        />
      </Box>

      {/* Code on screen */}
      <Center position={[0, 0.45, -0.33]} rotation={[0.2, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.2, 0.2]} />
          <meshBasicMaterial
            color="#00ff41"
            transparent
            opacity={0.8}
          />
        </mesh>
      </Center>

      {/* Floating particles around laptop */}
      <FloatingParticles />
    </group>
  )
}

const KeyboardKeys: React.FC = () => {
  const keys = []
  const keySize = 0.08
  const keySpacing = 0.1
  const rows = 3
  const keysPerRow = 12

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < keysPerRow; col++) {
      const x = (col - keysPerRow / 2) * keySpacing
      const z = (row - rows / 2) * keySpacing + 0.2
      
      keys.push(
        <Box
          key={`${row}-${col}`}
          args={[keySize, 0.02, keySize * 0.6]}
          position={[x, 0.06, z]}
          castShadow
        >
          <meshStandardMaterial
            color="#333333"
            roughness={0.7}
            metalness={0.3}
          />
        </Box>
      )
    }
  }

  return <group>{keys}</group>
}

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const particleCount = 20
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const radius = 2 + Math.random() * 1
    const angle = (i / particleCount) * Math.PI * 2
    const height = (Math.random() - 0.5) * 2

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius

    colors[i * 3] = 0 // R
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.5 // G
    colors[i * 3 + 2] = 0.25 + Math.random() * 0.25 // B
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

