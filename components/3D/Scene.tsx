'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { Workspace } from './Workspace'
import { FloatingLaptop } from './FloatingLaptop'

interface SceneProps {
  className?: string
}

const SceneContent: React.FC = () => {
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Environment preset="city" />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Point lights for atmosphere */}
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00ff41" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#0080ff" />
      
      {/* Main workspace */}
      <Workspace position={[0, 0, 0]} />
      
      {/* Floating laptop */}
      <FloatingLaptop position={[2, 1, -2]} />
      
      {/* Additional floating elements */}
      <FloatingElement position={[-3, 2, 1]} />
      <FloatingElement position={[4, 1.5, 2]} />
    </group>
  )
}

const FloatingElement: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#00ff41"
        emissive="#00ff41"
        emissiveIntensity={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

export const Scene: React.FC<SceneProps> = ({ className = '' }) => {
  return (
    <div className={`scene-container ${className}`}>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          autoRotate={false}
        />
        <SceneContent />
      </Canvas>
    </div>
  )
}

