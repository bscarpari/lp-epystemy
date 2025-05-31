import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  position?: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials: Testimonial[] = [
    {
      text: "A Epystemy transformou completamente a nossa presença digital! A combinação de design clássico com tecnologia moderna é simplesmente impressionante.",
      author: "João P.",
      position: "CEO, TechStart"
    },
    {
      text: "Design impecável e tecnologia de ponta. A equipe da Epystemy entendeu perfeitamente o que queríamos e entregou além das expectativas.",
      author: "Maria L.",
      position: "Diretora de Marketing, Luxus"
    },
    {
      text: "O software que criaram elevou nossa produtividade em mais de 40%. Uma solução verdadeiramente personalizada para nossas necessidades.",
      author: "Lucas S.",
      position: "COO, InnovateLab"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-epystemy-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 border border-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            O que dizem sobre nós
          </h2>
          <p className="text-lg text-epystemy-gray max-w-2xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nossas soluções e serviços.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-epystemy-shadow p-8 md:p-12 rounded-lg text-center relative"
            >
              <Quote className="w-12 h-12 mx-auto mb-6 text-epystemy-gray opacity-50" />
              <p className="text-xl md:text-2xl font-serif mb-8 text-epystemy-white">
                "{testimonials[currentIndex].text}"
              </p>
              <div>
                <p className="font-bold">{testimonials[currentIndex].author}</p>
                <p className="text-epystemy-gray text-sm">{testimonials[currentIndex].position}</p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 border border-epystemy-white rounded-full hover:bg-epystemy-shadow transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 border border-epystemy-white rounded-full hover:bg-epystemy-shadow transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;