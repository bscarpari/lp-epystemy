import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

const GreekStatue = () => {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
    }
  });

  // Create a simple 3D geometry to represent a statue
  return (
    <group ref={mesh} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
      {/* Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.4, 32]} />
        <meshStandardMaterial color="#ffffff" opacity={0.1} transparent={true} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.6, 1.5, 8, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.2} 
          transparent={true} 
          wireframe={true} 
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          opacity={0.2} 
          transparent={true} 
          wireframe={true} 
        />
      </mesh>
    </group>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <GreekStatue />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-shadow mb-6">
            Elevamos sua presença digital ao nível da arte.
          </h1>
          <p className="text-lg md:text-xl text-epystemy-gray mb-10 max-w-2xl mx-auto">
            Soluções de Web Design, Desenvolvimento e Softwares que transformam negócios.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-button px-8 py-3 bg-transparent border-2 border-epystemy-white inline-block text-lg font-medium hover:border-epystemy-gray transition-all relative overflow-hidden"
          >
            Comece Agora
          </motion.a>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;