import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PortfolioItemProps {
  image: string;
  title: string;
  category: string;
  delay: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ image, title, category, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden bg-epystemy-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-epystemy-black bg-opacity-70 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col justify-center items-center h-full text-center p-6">
            <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
            <p className="text-sm text-epystemy-gray">{category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const portfolioItems = [
    {
      image: "https://images.pexels.com/photos/1162519/pexels-photo-1162519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Majesty Coffee",
      category: "Web Design & Development",
    },
    {
      image: "https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Namashi",
      category: "E-commerce Platform",
    },
    {
      image: "https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Eiux T-Shirt",
      category: "Brand Identity",
    },
    {
      image: "https://images.pexels.com/photos/5077064/pexels-photo-5077064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Smart Bio",
      category: "Web Application",
    },
  ];

  return (
    <section id="portfolio" className="py-20 marble-bg">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-epystemy-black mb-6">
            Nossos Projetos
          </h2>
          <p className="text-lg text-epystemy-black max-w-2xl mx-auto">
            Conheça alguns de nossos trabalhos que transformaram a presença digital de nossos clientes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              image={item.image}
              title={item.title}
              category={item.category}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;