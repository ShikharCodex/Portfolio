import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Blob = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.15;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.5}>
      <Sphere ref={mesh} args={[1, 128, 128]} scale={1.5}>
        <MeshDistortMaterial
          color="#d1d5db"
          speed={3}
          distort={0.5}
          radius={1}
          metalness={1}
          roughness={0.02}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </Sphere>
    </Float>
  );
};

const LiquidMetalScene = () => {
  return (
    <div className="h-full w-full">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          {/* Main lighting setup for realistic reflections */}
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
          
          {/* Accent lights to give the metal that branded glow */}
          <pointLight position={[-10, 10, -5]} intensity={1.5} color="#3ddc97" />
          <pointLight position={[5, -5, 5]} intensity={1} color="#52b6ff" />
          
          <Blob />
          
          {/* Environment is what makes metal look real */}
          <Environment preset="city" />
          
          <ContactShadows 
            position={[0, -2.2, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2.5} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LiquidMetalScene;
