import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Cta: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 marble-bg relative overflow-hidden">
      {/* Decorative columns */}
      <div className="absolute left-0 h-full w-8 md:w-16 bg-epystemy-shadow hidden md:block"></div>
      <div className="absolute right-0 h-full w-8 md:w-16 bg-epystemy-shadow hidden md:block"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-epystemy-black mb-6">
            Pronto para transformar o seu negócio?
          </h2>
          <p className="text-lg text-epystemy-black mb-10">
            Solicite um orçamento e vamos construir sua presença digital que elevará sua marca ao próximo nível.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-epystemy-black border-2 border-epystemy-black text-epystemy-white inline-block text-lg font-medium hover:bg-transparent hover:text-epystemy-black transition-all"
          >
            Solicitar agora
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;