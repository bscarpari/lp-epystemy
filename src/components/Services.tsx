import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Cog } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="card-3d bg-epystemy-black p-8 border border-epystemy-shadow rounded-lg"
    >
      <div className="text-white mb-6">{icon}</div>
      <h3 className="text-xl font-serif font-bold mb-4">{title}</h3>
      <p className="text-epystemy-gray">{description}</p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Code size={48} />,
      title: "Desenvolvimento Web",
      description: "Sites e plataformas robustas, seguras e escaláveis."
    },
    {
      icon: <Palette size={48} />,
      title: "Web Design",
      description: "Layouts que convertem, combinando estética clássica e UX moderna."
    },
    {
      icon: <Cog size={48} />,
      title: "Softwares sob medida",
      description: "Automatize e otimize seu fluxo com soluções personalizadas."
    }
  ];

  return (
    <section id="services" className="py-20 bg-epystemy-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            O que fazemos
          </h2>
          <p className="text-lg text-epystemy-gray max-w-2xl mx-auto">
            Transformamos ideias em experiências digitais excepcionais através de nossas soluções personalizadas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;