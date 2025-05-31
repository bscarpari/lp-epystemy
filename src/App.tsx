import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Cta from './components/Cta';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Background from './components/Background';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-epystemy-black text-epystemy-white overflow-hidden">
      <Background />
      <AnimatePresence>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Testimonials />
            <Cta />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;