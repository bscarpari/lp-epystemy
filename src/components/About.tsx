import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const StatueModel = () => {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.8}
        roughness={0.2}
        wireframe={true}
      />
    </mesh>
  );
};

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-epystemy-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Sobre Nós
          </h2>
          <p className="text-lg text-epystemy-gray max-w-2xl mx-auto">
            Transformando ideias em experiências digitais extraordinárias.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg">
              Somos uma equipe apaixonada por criar experiências digitais únicas e memoráveis.
              Nossa abordagem combina design inovador com tecnologia de ponta para entregar
              soluções que superam expectativas.
            </p>
            <p className="text-lg">
              Com anos de experiência no mercado, nos especializamos em criar websites
              e aplicações que não apenas impressionam visualmente, mas também
              entregam resultados tangíveis para nossos clientes.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-epystemy-gray">Projetos Entregues</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-epystemy-gray">Clientes Satisfeitos</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="h-[500px]"
          >
            <Canvas>
              <Suspense fallback={null}>
                <StatueModel />
                <Environment preset="studio" />
                <OrbitControls 
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={1}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;